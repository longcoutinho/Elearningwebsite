import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/signin.css"
import { useEffect } from "react";




const Signin = function(props) {
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const onClickimg = () => {
        setDisplay("flex");
        setDisplay2("none");
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
    const handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            username: event.target.signin_username.value,
            password: event.target.signin_password.value
        };
        axios.post("http://localhost:3001/person", config)
        .then(res=> {
            if (res.data != "0") {
                localStorage.setItem("windowdisplayname", res.data);
                localStorage.setItem("windowuserinfoboxstate", "flex");
                localStorage.setItem("windowloginboxstate", "none");
                localStorage.setItem("windowusername", event.target.signin_username.value);
                onClickimg();
                console.log(localStorage.getItem("windowdisplayname"));
                console.log("Sign in successfully");
                window.location.href = '/'
            }
            else {
                console.log("Invalid username or password!");
            }
        })
        
      }
    const signoutOnclick = () => {
        setDisplay("none");
        setDisplay2("block");
        localStorage.setItem("windowuserinfoboxstate", "none");
        localStorage.setItem("windowloginboxstate", "block");
        localStorage.setItem("windowusername", "");
    }
  return (
    <div>
        {/* header menu */} 
        <div class="container-fluid">
            {/* logo */} 
            <div class="header-logo">
                <span class="name">IamRoht</span>
            </div>
            {/* menu */}
            <div class="header-menu collapse navbar-collapse" id="navbarResponsive">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav__item"><a href="/" class="nav__link active">Home</a></li>
                    <li class="nav__item"><a href={decklink} class="nav__link">Decks</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">Statistics</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">About</a></li>
                </ul>
            </div>
        
            <div class="user-info" style={{display:userinfostate}}>
                <div class="user-displayname">
                    <span>Hello, </span>
                    <a href="#">{localStorage.getItem("windowdisplayname")}</a>
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

        {/* form sign in */} 
        <div class="signin-content-container">
            <div class="signin-title">
                <h1>Sign In</h1>
            </div>
            <div class="signin-content"> 
                <div class="signin-form">
                    <form onSubmit={handleSubmit}>
                        <input class="input_username" type="text" name="signin_username" placeholder="User name"/>
                        <input class="input_password" type="password" name="signin_password" placeholder="********"/>
                        <div class="remember-me">
                            <input type="checkbox" />
                            <h1>Remember me?</h1>
                        </div>
                        <input type="submit" value="Sign in"/>
                    </form>
                </div>
            </div>
        </div>

        {/* footer */}
        <div class="footer-container">
            <h1>Hotline: 0363137565</h1>
            <h1>Address: Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội</h1>
            <h1>Email: maitho3101@gmail.com</h1>
        </div>

    </div>
  )
}
 
export default Signin;