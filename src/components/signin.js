import React from "react";
import "../styles/signin.css"

const Signin = function(props) {
  return (
    <div>
        <div class="container-fluid">
            <div class="header-logo">
                <span class="name">IamRoht</span>
            </div>
            <div class="header-menu collapse navbar-collapse " id="navbarResponsive">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav__item"><a href="index.html" class="nav__link active">Home</a></li>
                    <li class="nav__item"><a href="deck.html" class="nav__link">Decks</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">Statistics</a></li>
                    <li class="nav__item"><a href="#" class="nav__link">About</a></li>
                </ul>
            </div>
            <div class="header-signin collapse navbar-collapse" id="navbarResponsive">
                <span class="btn signin"><a href="signin.html">Sign in </a></span>
                <span class="btn-or"> / </span>
                <span class="btn signup"><a href="signup.html">Sign up</a></span>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarResponsive">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <div class="container-fluid">
            <div class="signin-form  ">
            <div class="title-signin">Sign In</div>
            <div class="input-in4 ">
                <div class="input-username">
                    <i class="fa-solid fa-user-large"></i>
                </div>
                <div class="input-password">
                    <i class="fa-solid fa-lock"></i>
                    <i class="fa-solid fa-eye"></i>
                </div>
                <div class="remem">
                    <i class="fa-solid fa-square-check"></i>
                    <span>Remember me</span>
                </div>
            </div>
            <div class="button-sigin">
                <button class="btn-signin"> Sign In</button>
            </div>
        </div>
    </div>
    <footer>
        <div class="container-fluid padding">
            <div class=" text-center">

                <div>Hotline: 0363137565</div>
                <div>Address: Trần Bình, Mai Dịch, Cầu Giấy, Hà Nội</div>
                <div>Email: <a href="">maitho3101@gmail.com</a> </div>
            </div>
        </div>
    </footer>
    </div>
  )
}
 
export default Signin;