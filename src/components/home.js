import React from "react";
import "../styles/home.css";
import pic_bg_content from "../image/pripic.jpg";
import { useState } from "react";

const Test = function(props) {
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const signoutOnclick = () => {
        setDisplay("none");
        setDisplay2("block");
        localStorage.setItem("windowuserinfoboxstate", "none");
        localStorage.setItem("windowloginboxstate", "block");
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

        {/* study now, be proud later */} 
        <div class="content-container">
			<img class="content-picture" src={pic_bg_content} />
			<div class="carousel-caption">
				<h1 class="display-2">Study now </h1>
				<h1 class="display-2">be proud later</h1>
				<button type="button" class="content-btn"><a href="#">Get started</a></button>
			</div>
		</div>
        
        {/* 3 cols learn anything */}
        <div class="learning-container">
            <div class="learning-content">
                <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anything</h3>
            </div>
            <div class="learning-content">
                <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anytime</h3>
            </div>
            <div class="learning-content">
                <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anywhere</h3>
            </div>
        </div>

        {/* contact us */}
        <div class="contactus-container">
            <div class="contactus-content">
                <div class="contactus-title">
                    <h2>Contact us</h2>
                </div>
                <div class="contact-ways">
                    <a href="#"><i class="fa-brands fa-facebook"></i></a>
                    <a href="#"><i class="fa-brands fa-google-plus-g"></i></a>
                    <a href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a href="#"><i class="fa-brands fa-youtube"></i></a>
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
 
export default Test;