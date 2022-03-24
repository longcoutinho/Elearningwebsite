import React from "react";
import "../styles/decks.css"
import { ReactDOM } from "react";

const Decks = function(props) {
    const Card = (props) => {
        return (
            <div class="decks-cards-container">
                <div class="decks-cards-name">
                    <a href="#">Name of decks</a>
                </div>
                <div class="decks-cards-content">
                    <h1>Decription: abcdefas dasda sdasd asdasdasdas</h1>
                </div>
                <div class="decks-cards-info">
                    <div class="decks-cards-number">
                        <h1>200</h1>
                    </div>
                    <div class="decks-cards-date">
                        <h1>06-02-2020</h1>
                    </div>
                </div>
            </div>
        )
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
            {/* signin signup */}
            <div class="header-signin collapse navbar-collapse" id="navbarResponsive">
                <span class="btn signin"><a href="/signin">Sign in </a></span>
                <span class="btn-or"> / </span>
                <span class="btn signup"><a href="/signup">Sign up</a></span>
            </div>
        </div>
        <div class="decks-content">
            <div class="decks-back">
                <a href="/">&lt; Back</a>
            </div>
            <div class="decks-title">
                <h1>DECKS</h1>
            </div>
            <div class="decks-search"></div>
            <div class="decks-display">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
        
    </div>
  )
}
export default Decks;