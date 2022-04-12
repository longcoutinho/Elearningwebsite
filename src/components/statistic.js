import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../image/liverpool.png"
import "../styles/statistic.css"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Monday',
    Total_words: 20,
    Remembered_words: 12,
  },
  {
    name: 'Tuesday',
    Total_words: 30,
    Remembered_words: 13,
  },
  {
    name: 'Wednesday',
    Total_words: 20,
    Remembered_words: 12,
  },
  {
    name: 'Thursday',
    Total_words: 27,
    Remembered_words: 19,
  },
  {
    name: 'Friday',
    Total_words: 18,
    Remembered_words: 18,
  },
  {
    name: 'Saturday',
    Total_words: 23,
    Remembered_words: 23,
  },
  {
    name: 'Sunday',
    Total_words: 15,
    Remembered_words: 5
  },
];

const Statistic = function(props) {
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const signoutOnclick = () => {
        setDisplay("none");
        setDisplay2("block");
        localStorage.setItem("windowuserinfoboxstate", "none");
        localStorage.setItem("windowloginboxstate", "block");
        localStorage.setItem("windowusername", "");
        window.localStorage.href="/";
    }
    const [decklink, setDecklink] = useState("#");
    useEffect( () => {
        console.log(localStorage.getItem("windowusername"));
        if (localStorage.getItem("windowusername") == "") {
            setDecklink("/signin");
        }
        else {
            setDecklink("/decks");
        }
    },[]);
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
            <div class="statistic-content">
            <BarChart
          width={800}
          height={400}
          data={data}
          barCategoryGap={40}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total_words" fill="#2B2A3A" />
          <Bar dataKey="Remembered_words" fill="#DD8593" />
        </BarChart>
            </div>
        </div>
    )
}

export default Statistic