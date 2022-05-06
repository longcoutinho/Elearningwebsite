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
    const [eyedisplay, setEyeDisplay] = useState("none");
    const [eyeslashdisplay, setEyeSlashDisplay] = useState("block");
    const [passwordtype, setPasswordType] = useState("password");
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
                setNotify("Invalid username or password!");
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

    function onClickEye1() {
        console.log(1);
        setPasswordType("password");
        setEyeDisplay("none");
        setEyeSlashDisplay("block");
    }

    function onClickEye2() {
        console.log(2);
        setPasswordType("text");
        setEyeDisplay("block");
        setEyeSlashDisplay("none");
    }

  return (
    <div class="signin-container">
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
        
            <div class="user-info" style={{display:userinfostate}}>
                <div class="user-displayname">
                    <span>Hello, </span>
                    <a href="#">{localStorage.getItem("windowdisplayname")}</a>
                </div>
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
                        <div class="hihi">
                            <i class="fa-solid fa-user-large"></i>
                            <input class="input_username" type="text" name="signin_username" placeholder="User name"/>
                        </div>
                        <div class="hihi">
                            <i class="fa-solid fa-lock"></i>
                            <input class="input_password" type={passwordtype} name="signin_password" placeholder="********"/>
                            <i onClick={onClickEye1} style={{"display":eyedisplay}} class="fa-solid fa-eye eye-icon"></i>
                            <i onClick={onClickEye2} style={{"display":eyeslashdisplay}} class="fa-solid fa-eye-slash eye-icon"></i>
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
 
export default Signin;