import React, { useEffect, useState } from "react"; 
const Menu = function(props) {
    const [user_logedin, setUserLogin] = useState(props.user_logedin === "true");
    const [box1, setBox1] = useState("block");
    const [box2, setBox2] = useState("block");
    useEffect(() => {
        if (user_logedin === true) {
            setBox1("flex");
            setBox2("none");
        } 
        else {
            setBox1("none");
            setBox2("flex");
        }
    });
    return (
        <div>
        {/* header menu */} 
        <div class="container-fluid">
            {/* logo */} 
            <div class="header-logo">
                <span>IamRoht</span>
            </div>
            {/* menu */}
            <div class="header-menu collapse navbar-collapse" id="navbarResponsive">
                <ul class="nav navbar-nav ml-auto">
                    <li class="nav__item"><a href="/" class="nav__link active">Home</a></li>
                    <li class="nav__item"><a href="/" class="nav__link">Decks</a></li>
                    <li class="nav__item"><a href="/statistic" class="nav__link">Statistics</a></li>
                    <li class="nav__item"><a href="/about" class="nav__link">About</a></li>
                </ul>
            </div>

            <div class="user-info" style={{display:box1}}>
                <div class="user-displayname">
                    <span>Hello, </span>
                    <a href="/user">{localStorage.getItem("windowdisplayname")}</a>
                </div>
            </div>

            {/* signin signup */}
            <div class="header-signin collapse navbar-collapse" id="navbarResponsive" style={{display:box2}}>
                <span class="btn signin"><a href="/signin">Sign in </a></span>
                <span class="btn-or"> / </span>
                <span class="btn signup"><a href="/signup">Sign up</a></span>
            </div>
        </div>
    </div>
    )
}

export default Menu;