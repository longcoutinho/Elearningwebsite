import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/signin.css"





const Signin = function(props) {
    const [userinfostate, setDisplay] = useState("none");
    const [loginsignupstate, setDisplay2] = useState("block");
    const [userdisplayname, setContent] = useState("");
    const onClickimg = (content) => {
        setDisplay("flex");
        setDisplay2("none");
        setContent(content);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            username: event.target.signin_username.value,
            password: event.target.signin_password.value
        };
        axios.post("http://localhost:3001/person", config)
        .then(res=> {
            console.log(res.data);
            if (res.data != "0") {
                onClickimg(res.data );
                console.log("Sign in successfully");
            }
            else {
                console.log("Invalid username or password!");
            }
        })
        
      }
    const signoutOnclick = () => {
        setDisplay("none");
        setDisplay2("block");
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
                    <li class="nav__item"><a href="/decks" class="nav__link">Decks</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">Statistics</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">About</a></li>
                </ul>
            </div>
        
            <div class="user-info" style={{display:userinfostate}}>
                <div class="user-displayname">
                    <span>Hello, </span>
                    <a href="#">{userdisplayname}</a>
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