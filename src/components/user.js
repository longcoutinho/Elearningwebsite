import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/user.css"
import logo from "../image/liverpool.png"
import axios from "axios";

const User = function(props) {
    var state = {
        users: [
        ]
      };
    const [abc, setabc] = useState(state.users);
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
    const [displayusercard, setDisplayUser] = useState("flex");
    const [displaychangename, setDisplayChangeName] = useState("none");
    const [displaychangepassword, setDisplayChangePassword] = useState("none");

    async function listofUserCards() {
        const config = {

        };
        var returnValue = [];
        await axios.post("http://localhost:3001/searchaccount", config)
        .then(res=> {
            //localStorage("arrayOfDecks", res.data);
            //console.log(JSON.parse(res.data));
            //console.log(res.data);
            //var obj = JSON.parse(res.data);
            //console.log(obj[0]);
            returnValue = res.data;
        })
        return returnValue;
    }

    useEffect( async () => {
        if (localStorage.getItem("windowusername") == "admin") {
            setDisplayUser("flex");
        }
        else {
            setDisplayUser("none");
        }
        await listofUserCards().then(value => {
            setabc(value);
        })
    },[]);
    
    const UserCard = () => {
        return (
            abc.map((item, index) => (
                <div class="user-card-container" style={{display:displayusercard}}>
                    <p>{index + 1}</p>
                    <p>username: {item.username}</p>
                    <p>password: {item.password}</p>
                </div>
            ))
        );
    }

    function changenamehandle() {
        setDisplayChangeName("flex");
    }

    function changepasswordhandle() {
        setDisplayChangePassword("flex");
    }

    return (
        <div class="study-container">
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
            <div class="title-user-info">
                <p>Thong tin ca nhan</p>
            </div>
            <div>
                <p>Name: {localStorage.getItem("windowdisplayname")} </p>
                <button onClick={() => changenamehandle()}>CHANGE NAME</button>
            </div>
            <form class="change-name-container" style={{display:displaychangename}}>
                <label>
                    New name:
                </label>
                <input type="text" />
                <input type="submit" value="CHANGE" />
            </form>
            <p>Username: {localStorage.getItem("windowusername")}</p>
            <button onClick={() => changepasswordhandle()}>CHANGE PASSWORD</button>
            <form class="change-password-container" style={{display:displaychangepassword}}>
                <label>
                    Old password
                </label>
                <input type="text" />
                <label>New password</label>
                <input type="text" />
                <label>Confirm password</label>
                <input type="text" />
                <input type="submit" value="CHANGE" />
            </form>
            <p style={{display:displayusercard}}>Danh sach user</p>
            <div class="display-user-card">
                <UserCard></UserCard>
            </div>
           
        </div>
    )
}
export default User
