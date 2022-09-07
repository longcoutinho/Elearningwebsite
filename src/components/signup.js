import React from "react";
import "../styles/signup.css"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Menu from "./Menu.js"
import Footer from "./Footer.js";

const Signup = function(props) {
    const [eyedisplay, setEyeDisplay] = useState("none");
    const [eyeslashdisplay, setEyeSlashDisplay] = useState("block");
    const [passwordtype, setPasswordType] = useState("password");
    const [notify, setNotify] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            username: event.target.signup_username.value,
            password: event.target.signup_password.value,
            displayname: event.target.signup_displayname.value,
            confirm_password: event.target.signup_confpassword.value
        };
        if (config.username == "") {
            setNotify("Please fill in username!")
        }
        else if (config.displayname == "") {
            setNotify("Please fill in displayname!")
        }
        else if (config.password == "") {
            setNotify("Please fill in password!")
        }
        else if (config.password != config.confirm_password) {
            setNotify("Password doesn't match!")
        }
        else {
            axios.post("http://localhost:3001/signup", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                setNotify("Signup successfully");
            }
            else {
                setNotify("Username's already exist!");
            }
        })
        }
    }
    const onClickEyeIcon = (type) => {
        console.log("called");
        if (type === "display") {
            setPasswordType("text");
            setEyeDisplay("block");
            setEyeSlashDisplay("none");
        }
        else if (type === "hidden") {
            setPasswordType("password");
            setEyeDisplay("none");
            setEyeSlashDisplay("block");
        }
    }
  return (
    <div>
        <Menu user_logedin = "false"></Menu>
        {/* form sign up */} 
        <div class="signup-content-container">
            <div class="signup-title">
                <h1>Sign Up</h1>
            </div>
            <div class="signup-content"> 
                <div class="signup-form">
                    <form onSubmit={handleSubmit}>
                    <div class="hihi">
                            <i class="fa-solid fa-user-large"></i>
                            <input class="input_username" type="text" name="signup_username" placeholder="User name"/>
                        </div>
                        <div class="hihi">
                        <i class="fa-solid fa-user-large"></i>
                            <input class="input_email" type="text" name="signup_displayname" placeholder="Display name"/>
                        </div>
                        <div class="hihi">
                        <i class="fa-solid fa-lock"></i>
                            <input class="input_password" type={passwordtype} name="signup_password" placeholder="Password"/>
                            <i onClick={() => onClickEyeIcon("hidden")} style={{"display":eyedisplay}} class="fa-solid fa-eye eye-icon"></i>
                            <i onClick={() => onClickEyeIcon("display")} style={{"display":eyeslashdisplay}} class="fa-solid fa-eye-slash eye-icon"></i>
                        </div>
                        
                        <div class="hihi">
                        <i class="fa-solid fa-lock"></i>
                            <input class="input_confpassword" type={passwordtype} name="signup_confpassword" placeholder="Confirm Password"/>
                            <i onClick={() => onClickEyeIcon("hidden")} style={{"display":eyedisplay}} class="fa-solid fa-eye eye-icon"></i>
                            <i onClick={() => onClickEyeIcon("display")} style={{"display":eyeslashdisplay}} class="fa-solid fa-eye-slash eye-icon"></i>
                        </div>
                        <p class="notify-p">{notify}</p>
                        <input type="submit" value="Sign Up" />
                        <div class="already-a-member">
                            <h1>Already a member ?</h1>
                            <a href="/signin">Sign in </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
 
export default Signup;