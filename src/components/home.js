import React from "react";
import "../styles/home.css";
import pic_bg_content from "../image/pripic.jpg";
import { useState } from "react";

const Test = function(props) {
  const [color, setColor] = useState("green");
  const onClickimg = () => {
    setColor("red");
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
                    <li class="nav__item"><a href="#" class="nav__link">Decks</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">Statistics</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">About</a></li>
                </ul>
            </div>
            {/* sigin signup */}
            <div class="header-signin collapse navbar-collapse" id="navbarResponsive">
                <span class="btn signin"><a href="/sigin">Sign in </a></span>
                <span class="btn-or"> / </span>
                <span class="btn signup"><a href="#">Sign up</a></span>
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
  )
}
 
export default Test;