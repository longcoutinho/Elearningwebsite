import React from "react";
import "../styles/signin.css"

const Signin = function(props) {
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

        {/* form sign in */} 
        <div class="signin-content-container">
            <div class="signin-title">
                <h1>Sign In</h1>
            </div>
            <div class="signin-content"> 
                <div class="signin-form">
                    <form>
                        <input class="input_username" type="text" name="name" placeholder="User name"/>
                        <input class="input_password" type="password" name="password" placeholder="********"/>
                        <div class="remember-me">
                            <input type="checkbox" />
                            <h1>Remember me?</h1>
                        </div>
                        <input type="submit" value="Sign in" />
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
 
export default Signin;