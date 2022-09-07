import React from "react";
import axios from "axios";
import { useState } from "react";
import "../styles/signin.css"
import Menu from "./Menu.js";
import Footer from "./Footer.js";

const Signin = function(props) {
    const [eyedisplay, setEyeDisplay] = useState("none");
    const [eyeslashdisplay, setEyeSlashDisplay] = useState("block");
    const [passwordtype, setPasswordType] = useState("password");
    const [notify, setNotify] = useState("Enter username and password !");
    const handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            username: event.target.signin_username.value,
            password: event.target.signin_password.value
        };
        axios.post("http://localhost:3001/person", config)
        .then(res=> {
            if (res.data != "0") {
                localStorage.setItem("user_logedin", "true");
                localStorage.setItem("windowdisplayname", res.data);
                localStorage.setItem("windowusername", event.target.signin_username.value);
                window.location.href = '/'
            }
            else {
                setNotify("Invalid username or password !");
            }
        })
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
    <div class="signin-container">
        <Menu user_logedin = "false"></Menu>
        {/* form sign in */} 
        <div class="signin-content-container">
            <div class="signin-title">
                <h1>Sign In</h1>
            </div>
            <div class="signin-content"> 
                <div class="signin-form">
                    <form onSubmit={handleSubmit}>
                        <div class="hihi">
                            <i class="fa-solid fa-user-large"></i>
                            <input class="input_username" type="text" name="signin_username" placeholder="User name"/>
                        </div>
                        <div class="hihi">
                            <i class="fa-solid fa-lock"></i>
                            <input class="input_password" type={passwordtype} name="signin_password" placeholder="********"/>
                            <i onClick={() => onClickEyeIcon("hidden")} style={{"display":eyedisplay}} class="fa-solid fa-eye eye-icon"></i>
                            <i onClick={() => onClickEyeIcon("display")} style={{"display":eyeslashdisplay}} class="fa-solid fa-eye-slash eye-icon"></i>
                        </div>
                        <div class="remember-me">
                            <input type="checkbox" />
                            <h1>Remember me?</h1>
                        </div>
                        <p class="notify-p">{notify}</p>
                        <input type="submit" value="Sign in"/>
                    </form>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
 
export default Signin;