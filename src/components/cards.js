import React from "react";
import "../styles/cards.css"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
const Cards = function(props) {
    var state = {
        users: [
        ]
      };
    const [cardname, setCardname] = useState(localStorage.getItem("windowdisplaydeck"));
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const [adddeckstate, setStateOfAddingBox] = useState("none");
    const [bgopacity, setBackGroundOpacity] = useState("1");
    const [abc, setabc] = useState(state.users);
    useEffect( async () => {
        await listofCards(localStorage.getItem("windowusername"), localStorage.getItem("windowdisplaydeck"), "").then(value => {
            setabc(value);
        })
    },[]);
    const addOnClick = () => {
        setStateOfAddingBox("flex");
        setBackGroundOpacity("0.7");
        //state.users = abc;
        //console.log(state.users);
    }
    async function closeOnClick() {
        setStateOfAddingBox("none");
        setBackGroundOpacity("1");
        await listofCards(localStorage.getItem("windowusername"), localStorage.getItem("windowdisplaydeck"), "").then(value => {
            setabc(value);
        })
    }

    async function listofCards(username, nameOfDeck, nameOfCard) {
        const config = {
            username: username,
            nameOfDeck: nameOfDeck,
        };
        var returnValue = [];
        await axios.post("http://localhost:3001/searchcard", config)
        .then(res=> {
            //localStorage("arrayOfDecks", res.data);
            //console.log(JSON.parse(res.data));
            //console.log(res.data);
            //var obj = JSON.parse(res.data);
            //console.log(obj[0]);
            var currentValue = res.data;
            for(let i = 0; i < currentValue.length; i++) {
                if (currentValue[i].name.startsWith(nameOfCard)) {
                    returnValue.push(currentValue[i]);
                }
            }
        })
        return returnValue;
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
        await listofCards(localStorage.getItem("windowusername"), localStorage.getItem("windowdisplaydeck"), event.target.inputcardsearch.value).then(value => {
            setabc(value);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            name: event.target.card_name.value,
            type: event.target.card_type.value,
            spelling: event.target.card_spelling.value, 
            meaning: event.target.card_meaning.value,
            image: event.target.card_image.value,
            synonym: event.target.card_synonym.value,
            antonym: event.target.card_antonym.value,
            example: event.target.card_example.value,
            deck_owner: localStorage.getItem("windowdisplaydeck"),
            owner: localStorage.getItem("windowusername")
        };
        axios.post("http://localhost:3001/addcard", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Add successfully");
            }
            else {
                console.log("Deck da ton tai!");
            }
        })
    }

    const Card = (props) => {
        return (
            abc.map((item) => (
                <div class="cards-container">
                    <div class="cards-name">
                        <h1>{item.name}</h1>
                    </div> 
                    <div class="card-type">
                        <h1>{item.type}</h1>
                    </div>
                    <div class="cards-spelling">
                        <h1>{item.spelling}</h1>
                    </div>
                </div>
            ))
        );
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
                        <input type="text" name="inputcardsearch" />
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
                    <div class="cards-display-content">
                        <Card></Card>
                    </div>
                </div>
            </div>
            <div class="add-cards" style={{"display":adddeckstate}}>
                <div class="add-card-title">
                    <p>ADD CARDS</p>
                </div>
                <div class="add-card-content">
                    <form onSubmit={handleSubmit}>
                        <div class="add-card-input">
                            <div class="add-front-cards">
                                <p>FRONT</p>
                                <label>NAME</label>
                                <input type="text" name="card_name" />
                                <label>TYPE</label>
                                <input type="text" name="card_type" />
                                <label>SPELLING</label>
                                <input type="text" name="card_spelling" />
                            </div>
                            <div class="add-back-cards">
                                <p>BACK</p>
                                <label>MEANING</label>
                                <input type="text" name="card_meaning" />
                                <label>IMAGE</label>
                                <input type="text" name="card_image" />
                                <label>SYNONYM</label>
                                <input type="text" name="card_synonym" />
                                <label>ANTONYM</label>
                                <input type="text" name="card_antonym" />
                                <label>EXAMPLE</label>
                                <input type="text" name="card_example" />
                            </div>
                        </div>
                        <div class="add-card-submit">
                            <input type="submit" value="ADD" />
                        </div>
                    </form>
                </div>
                <button class="close-button" onClick={closeOnClick}>X</button>
            </div>
        </div>
    );
}
export default Cards