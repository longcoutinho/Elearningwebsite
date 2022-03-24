import React from "react";
import "../styles/signup.css"

const Signup = function(props) {
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
                    <form>
                        <input class="input_username" type="text" name="name" placeholder="User name"/>
                        <input class="input_email" type="text" name="email" placeholder="Email"/>
                        <input class="input_password" type="password" name="password" placeholder="Password"/>
                        <input class="input_confpassword" type="password" name="confpassword" placeholder="Confirm Password"/>
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