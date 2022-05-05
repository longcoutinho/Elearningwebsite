import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";
import logo from "../image/liverpool.png"
import "../styles/statistic.css"
import Chart from 'react-apexcharts'

const Statistic = function(props) {
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const signoutOnclick = () => {
        setDisplay("none");
        setDisplay2("block");
        localStorage.setItem("windowuserinfoboxstate", "none");
        localStorage.setItem("windowloginboxstate", "block");
        localStorage.setItem("windowusername", "");
        window.location.href="/";
    }
    const [decklink, setDecklink] = useState("#");
    
    useEffect( async () => {
        if (localStorage.getItem("windowusername") == "") {
            setDecklink("/signin");
        }
        else {
            setDecklink("/decks");
        }
        var newseries =  [
          {    
            name: 'Total words',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: 'Remembered words',
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
        var d = new Date();
        var ind = 0;
        d.setHours(0,0,0,0);
        var day = d.getDay();
        console.log(day);
        if (day == 0) day = 7;
        for(let i = day - 1; i >=0; i--) {
          var newd = new Date(d.getDate() - i);
          var oldd = new Date(); 
          oldd.setDate(newd);
          oldd.setHours(0, 0, 0, 0);

          const config = {
            owner: localStorage.getItem("windowusername"),
            time: oldd.toLocaleString(),
          };

          await axios.post("http://localhost:3001/takewordsinfo", config)
          .then(res=> {
            if (res.data == "0") {
              console.log("no data!");
            }
            else {
              ind = (day - 1) - i;
              newseries[0].data[ind] = res.data[0].t_words;
              newseries[1].data[ind] = res.data[0].r_words;
            } 
          })
        }
        setSeries(newseries);
    
    },[]); 
    
    const [options, setOptions] = useState(
      {
        chart: {
          id: 'apexchart-example',
          type: 'bar'
        },
        
        xaxis: {
          categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }
      }
    )
    const [series, setSeries] = useState([
        {    
          name: 'Total words',
          data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: 'Remembered words',
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
        )

    const BarChart = () => {
    return (
        <Chart options={options} series={series} type="bar" width={500} height={320}/>
  )
    }

    return (
        <div>
            {/* header menu */} 
            <div class="container-fluid">
                {/* logo */} 
                <div class="header-logo">
                    <img src={logo} width="80px" />
                </div>
                {/* menu */}
                <div class="header-menu collapse navbar-collapse" id="navbarResponsive">
                    <ul class="nav navbar-nav ml-auto">
                        <li class="nav__item"><a href="/" class="nav__link active">Home</a></li>
                        <li class="nav__item"><a href={decklink} class="nav__link">Decks</a></li>
                        <li class="nav__item"><a href="/statistic" class="nav__link">Statistics</a></li>
                        <li class="nav__item"><a href="#" class="nav__link">About</a></li>
                    </ul>
                </div>

                <div class="user-info" style={{display:userinfostate}}>
                    <div class="user-displayname">
                        <span>Hello, </span>
                        <a href="/user">{localStorage.getItem("windowdisplayname")}</a>
                    </div>
                    <button onClick={signoutOnclick}>Sign out </button>
                </div>

                {/* signin signup */}
                <div class="header-signin collapse navbar-collapse" id="navbarResponsive" style={{display:loginsignupstate}}>
                    <span class="btn signin"><a href="/signin">Sign in </a></span>
                    <span class="btn-or"> / </span>
                    <span class="btn signup"><a href="/signup">Sign up</a></span>
                </div>
            </div>
            <div>
            <BarChart></BarChart>
            </div>
        </div>
        
    )
}

export default Statistic