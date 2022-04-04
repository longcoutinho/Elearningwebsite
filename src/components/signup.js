import React from "react";
import "../styles/signup.css"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Signup = function(props) {
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
            username: event.target.signup_username.value,
            password: event.target.signup_password.value,
            displayname: event.target.signup_displayname.value
        };
        axios.post("http://localhost:3001/signup", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Signup successfully");
            }
            else {
                console.log("Username da ton tai!");
            }
        })
        
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
            {/* signin signup */}
            <div class="header-signin collapse navbar-collapse" id="navbarResponsive">
                <span class="btn signin"><a href="/signin">Sign in </a></span>
                <span class="btn-or"> / </span>
                <span class="btn signup"><a href="/signup">Sign up</a></span>
            </div>
        </div>

        {/* form sign up */} 
        <div class="signup-content-container">
            <div class="signup-title">
                <h1>Sign Up</h1>
            </div>
            <div class="signup-content"> 
                <div class="signup-form">
                    <form onSubmit={handleSubmit}>
                        <input class="input_username" type="text" name="signup_username" placeholder="User name"/>
                        <input class="input_email" type="text" name="signup_displayname" placeholder="Display name"/>
                        <input class="input_password" type="password" name="signup_password" placeholder="Password"/>
                        <input class="input_confpassword" type="password" name="signup_confpassword" placeholder="Confirm Password"/>
                        <input type="submit" value="Sign Up" />
                        <div class="already-a-member">
                            <h1>Already a member ?</h1>
                            <a href="/signin">Sign in </a>
                        </div>
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
 
export default Signup;