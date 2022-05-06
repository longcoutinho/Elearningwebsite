import React from "react";
import "../styles/signup.css"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Signup = function(props) {
    const [decklink, setDecklink] = useState("#"); 
    const [eyedisplay1, setEyeDisplay1] = useState("none");
    const [eyedisplay2, setEyeDisplay2] = useState("none");
    const [eyeslashdisplay1, setEyeSlashDisplay1] = useState("block");
    const [eyeslashdisplay2, setEyeSlashDisplay2] = useState("block");
    const [passwordtype1, setPasswordType1] = useState("password");
    const [passwordtype2, setPasswordType2] = useState("password");
    const [notify, setNotify] = useState("");
    useEffect( () => {
        console.log(localStorage.getItem("windowusername"));
        if (localStorage.getItem("windowusername") == "") {
            setDecklink("/signin");
        }
        else {
            setDecklink("/decks");
        }
    },[]);
    function onClickEye1() {
        console.log(1);
        setPasswordType1("password");
        setEyeDisplay1("none");
        setEyeSlashDisplay1("block");
    }

    function onClickEye2() {
        console.log(2);
        setPasswordType1("text");
        setEyeDisplay1("block");
        setEyeSlashDisplay1("none");
    }
    function onClickEye3() {
        console.log(1);
        setPasswordType2("password");
        setEyeDisplay2("none");
        setEyeSlashDisplay2("block");
    }

    function onClickEye4() {
        console.log(2);
        setPasswordType2("text");
        setEyeDisplay2("block");
        setEyeSlashDisplay2("none");
    }
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
                    <li class="nav__item"><a href="/about" class="nav__link">About</a></li>
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
                            <input class="input_password" type={passwordtype1} name="signup_password" placeholder="Password"/>
                            <i onClick={onClickEye1} style={{"display":eyedisplay1}} class="fa-solid fa-eye eye-icon"></i>
                            <i onClick={onClickEye2} style={{"display":eyeslashdisplay1}} class="fa-solid fa-eye-slash eye-icon"></i>
                        </div>
                        
                        <div class="hihi">
                        <i class="fa-solid fa-lock"></i>
                            <input class="input_confpassword" type={passwordtype2} name="signup_confpassword" placeholder="Confirm Password"/>
                            <i onClick={onClickEye3} style={{"display":eyedisplay2}} class="fa-solid fa-eye eye-icon"></i>
                            <i onClick={onClickEye4} style={{"display":eyeslashdisplay2}} class="fa-solid fa-eye-slash eye-icon"></i>
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

        {/* footer */}
        <div class="footer-container">
            <div class=" in4">
                <div>Hotline: 0363137565</div>
                <div>Address: Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội</div>
                <div>Email: <a href="">maitho3101@gmail.com</a> </div>
            </div>
            <div class=" contactus ">
                <h3>Contact us: </h3>
                <div class=" social ">
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
        </div>
    </div>
  )
}
 
export default Signup;