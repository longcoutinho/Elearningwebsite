import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect, useRef } from "react";
import logo from "../image/liverpool.png"
import "../styles/statistic.css"
import Chart from 'react-apexcharts'
import Menu from "./Menu";

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
        colors: ['#23222F', '#DD8593'],
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
          data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: 'Remembered words',
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
        )

    const BarChart = () => {
    return (
        <Chart options={options} series={series} type="bar" width={1200} height={500}/>
  )
    }

    return (
        <div>
            <Menu user_logedin={localStorage.getItem("user_logedin")}></Menu>
            <div class="statistic-content">
              <BarChart></BarChart>
            </div>
        </div>
        
    )
}

export default Statistic