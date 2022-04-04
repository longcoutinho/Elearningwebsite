import React from "react";
import "../styles/cards.css"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Cards = function(props) {
    const [cardname, setCardname] = useState(localStorage.getItem("windowdisplaydeck"));
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const [adddeckstate, setStateOfAddingBox] = useState("none");
    const [bgopacity, setBackGroundOpacity] = useState("1");
    const addOnClick = () => {
        setStateOfAddingBox("flex");
        setBackGroundOpacity("0.7");
        //state.users = abc;
        //console.log(state.users);
    }
    async function closeOnClick() {
        setStateOfAddingBox("none");
        setBackGroundOpacity("1");
        /*
        await listofDecks(localStorage.getItem("windowusername"), "").then(value => {
            setabc(value);
        })
        */
    }
    const signoutOnclick = () => {
        setDisplay("none");
        setDisplay2("block");
        localStorage.setItem("windowuserinfoboxstate", "none");
        localStorage.setItem("windowloginboxstate", "block");
        localStorage.setItem("windowusername", "");
        console.log("1");
        window.location.href="/";
    }

    const searchSubmit = async (event) => {
        console.log(1);
        event.preventDefault();
        /*
        await listofDecks(localStorage.getItem("windowusername"), event.target.inputdecksearch.value).then(value => {
            setabc(value);
        })
        */
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
            <div class="cards-content" style={{"opacity":bgopacity}}>
                <div class="cards-back">
                    <a href="/decks">&lt; Back</a>
                </div>
                <div class="cards-title">
                    <h1>CARDS</h1>
                </div>
                <div class="cards-search">
                    <button onClick={addOnClick}>ADD</button>
                    <form onSubmit={searchSubmit}>
                        <input type="text" name="inputdecksearch" />
                        <input type="submit" value="SEARCH" />
                    </form>
                </div>
                <div class="cards-display">
                    <div class="cards-statistics">
                        <div class="cards-title-and-number">
                            <div class="cards-statistics-title">
                                <p>{cardname}</p>
                                <p>Card of deck</p>
                                <p>Created date</p>
                                <p>Remember Cards</p>
                                <p>Not Remember Cards</p>
                            </div>
                            <div class="cards-statistics-number">
                                <p>...</p>
                                <p>13</p>
                                <p>14</p>
                                <p>13</p>
                                <p>13</p>
                            </div>
                        </div>
                        <div class="study-button">
                            <button>STUDY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Cards