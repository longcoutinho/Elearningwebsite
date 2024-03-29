import React, { useEffect, useState } from "react"; 
import { useLayoutEffect } from "react";
const Menu = function(props) {
    const [user_logedin, setUserLogin] = useState(props.logedIn);
    const [box1, setBox1] = useState("block");
    const [box2, setBox2] = useState("block");
    const [deckLink, setDecklink] = useState("/");
    const [statisticLink, setStatisticLink] = useState("/");
    const [displayname, setDisplayname] = useState(props.displayName);
    useEffect(() => {
        //console.log(user_logedin);
        if (user_logedin === 'true') {
            setBox1("flex");
            setBox2("none");
            setDecklink("/decks");
            setStatisticLink("/statistic");
        } 
        else {
            setBox1("none");
            setBox2("flex");
            setDecklink("/signin");
            setStatisticLink("/signin");
        }
    }, [user_logedin]);
    useEffect(() => {
        //console.log(props);
        setUserLogin(props.logedIn);
        setDisplayname(props.displayName);
    }, [props]);
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
                    <li class="nav__item"><a href={deckLink} class="nav__link">Decks</a></li>
                    <li class="nav__item"><a href={statisticLink} class="nav__link">Statistics</a></li>
                    <li class="nav__item"><a href="/about" class="nav__link">About</a></li>
                </ul>
            </div>

            <div class="user-info" style={{display:box1}}>
                <div class="user-displayname">
                    <span>Hello, </span>
                    <a href="/user">{displayname}</a>
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