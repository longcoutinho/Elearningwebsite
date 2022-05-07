import React from "react";
import "../styles/cards.css"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import edit_icon from "../image/edit_icon.png"
import delete_icon from "../image/delete_icon.jpg"
import { useSpeechSynthesis } from "react-speech-kit";
const Cards = function(props) {
    var state = {
        users: [
        ]
      };
    const [cardname, setCardname] = useState(localStorage.getItem("windowdisplaydeck"));
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
    const [adddeckstate, setStateOfAddingBox] = useState("none");
    const [editcardstate, setStateOfEditBox] = useState("none");
    const [bgopacity, setBackGroundOpacity] = useState("1");
    const [linkcontent, setLinkContent] = useState("");
    const [linkcontent2, setLinkContent2] = useState("");
    const [imagelink, setImage] = useState("");
    const [imagelink2, setImage2] = useState("");
    const [abc, setabc] = useState(state.users);
    const [notify, setNotify] = useState("");
    const [searchContent, setSearchContent] = useState("");
    const [nameInputContent, setNameInput] = useState("");
    const [typeInputContent, setTypeInput] = useState("");
    const [spellingInputContent, setSpellingInput] = useState("");
    const [meaningInputContent, setMeaningInput] = useState("");
    const [imageInputContent, setImageInput] = useState("");
    const [synonymInputContent, setSynonymInput] = useState("");
    const [antonymInputContent, setAntonymInput] = useState("");
    const [exampleInputContent, setExampleInput] = useState("");
    useEffect( async () => {
        await listofCards(localStorage.getItem("windowusername"), localStorage.getItem("windowdisplaydeck"), "").then(value => {
            setabc(value);
        })
    },[]);
    const addOnClick = () => {
        setStateOfAddingBox("flex");
        //setBackGroundOpacity("0.7");
        //state.users = abc;
        //console.log(state.users);
    }

    const editOnClick = (item) => {
        console.log(item);
        setNameInput(item.name);
        setTypeInput(item.type);
        setSpellingInput(item.spelling);
        setMeaningInput(item.meaning);
        setImageInput(item.image);
        setImage2(item.image);
        setSynonymInput(item.synonym);
        setAntonymInput(item.antonym);
        setExampleInput(item.example);
        setStateOfEditBox("flex");
        //setBackGroundOpacity("0.7");
        localStorage.setItem("windowdisplaycardname", item.name);
    }

    async function closeOnClick() {
        setStateOfAddingBox("none");
        setBackGroundOpacity("1");
        setNotify("");
        await listofCards(localStorage.getItem("windowusername"), localStorage.getItem("windowdisplaydeck"), "").then(value => {
            setabc(value);
        })
    }

    async function editcloseOnClick(deck_owner, name) {
        setStateOfEditBox("none");
        setBackGroundOpacity("1");
        setNotify("");
        await listofCards(localStorage.getItem("windowusername"), localStorage.getItem("windowdisplaydeck"), "").then(value => {
            setabc(value);
        })
    }

    async function deletehandle(deck_owner, cardname, owner) {
        const config = {
            name: cardname,
            deck_owner: deck_owner,
            owner: owner
        };
        await axios.post("http://localhost:3001/deletecard", config)
        .then(res=> {
            console.log(res.data);
            setabc(res.data);
        });
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
        await listofCards(localStorage.getItem("windowusername"), localStorage.getItem("windowdisplaydeck"), searchContent).then(value => {
            setabc(value);
        })
    }

    const edithandleSubmit = (event) => {
        event.preventDefault();
        const config = {
            name: localStorage.getItem("windowdisplaycardname"),
            deck_owner: localStorage.getItem("windowdisplaydeck"),
            owner: localStorage.getItem("windowusername"),
            newname: event.target.edit_card_name.value,
            newtype: event.target.edit_card_type.value,
            newspelling: event.target.edit_card_spelling.value,
            newmeaning: event.target.edit_card_meaning.value,
            newimage: event.target.edit_card_image.value,
            newsynonym: event.target.edit_card_synonym.value,
            newantonym: event.target.edit_card_antonym.value,
            newexample: event.target.edit_card_example.value,
        };
        if (config.newname.localeCompare("") == 0) {
            setNotify("Please fill in card's name!");
        }
        else if (config.newtype.localeCompare("") == 0) {
            setNotify("Please select card's type!");
        }
        else if (config.newspelling.localeCompare("") == 0) {
            setNotify("Please fill in card's spelling!");
        }
        else if (config.newmeaning.localeCompare("") == 0) {
            setNotify("Please fill in card's meaning!");
        }
        else if (config.newimage.localeCompare("") == 0) {
            setNotify("Please fill in card's image!");
        }
        else if (config.newsynonym.localeCompare("") == 0) {
            setNotify("Please fill in card's synonym!");
        }
        else if (config.newantonym.localeCompare("") == 0) {
            setNotify("Please fill in card's antonym!");
        }
        else if (config.newexample.localeCompare("") == 0) {
            setNotify("Please fill in card's example!");
        }
        else {
            axios.post("http://localhost:3001/editcard", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Add successfully");
                event.target.reset(); 
                editcloseOnClick();
            }
            else {
                setNotify("Card's already exist!");
            }
        })
        }
        
    }

    const onChangehandle = (event) => {
        setLinkContent(event.target.value);
    }

    const onChangehandle2 = (event) => {
        setLinkContent2(event.target.value);
        setImageInput(event.target.value);
    }


    function uploadImage() {
        setImage(linkcontent);
        
    }

    function uploadImage2() {
        setImage2(linkcontent2);
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);
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
            owner: localStorage.getItem("windowusername"),
            box: 1,
            time: dateNow.toLocaleString(),
        };
        console.log(config.name);
        console.log(config.type);
        if (config.name.localeCompare("") == 0) {
            setNotify("Please fill in card's name!");
        }
        else if (config.type.localeCompare("") == 0) {
            setNotify("Please select card's type!");
        }
        else if (config.spelling.localeCompare("") == 0) {
            setNotify("Please fill in card's spelling!");
        }
        else if (config.meaning.localeCompare("") == 0) {
            setNotify("Please fill in card's meaning!");
        }
        else if (config.image.localeCompare("") == 0) {
            setNotify("Please fill in card's image!");
        }
        else if (config.synonym.localeCompare("") == 0) {
            setNotify("Please fill in card's synonym!");
        }
        else if (config.antonym.localeCompare("") == 0) {
            setNotify("Please fill in card's antonym!");
        }
        else if (config.example.localeCompare("") == 0) {
            setNotify("Please fill in card's example!");
        }
        else {
        axios.post("http://localhost:3001/addcard", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Add successfully");
                event.target.reset(); 
                closeOnClick();
            }
            else {
                setNotify("Card's already exist!");
            }
        })
        }    
    }

    
    function getDay(a, b) {
        return (b - a) / (24*3600*1000);
    }

    function studyhandle() {
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);
        console.log(abc);
        var xyz = [];
        for(var i = 0; i < abc.length; i++) {
            var dateDiff = getDay(new Date(abc[i].time).getTime(), dateNow.getTime());
            if (abc[i].box == 1) xyz.push(abc[i]);
            else if (abc[i].box == 2 && dateDiff % 3 == 0 && dateDiff) xyz.push(abc[i]);
            else if (abc[i].box == 3 && dateDiff % 10 == 0 && dateDiff) xyz.push(abc[i]);
            else if (abc[i].box == 4 && dateDiff % 30 == 0 && dateDiff) xyz.push(abc[i]);
            else if (abc[i].box == 5 && dateDiff % 90 == 0 && dateDiff) xyz.push(abc[i]); 
        }
        localStorage.setItem("windowdisplaylistcard", JSON.stringify(xyz));    
        localStorage.setItem("windowrememberedwords", 0);
        localStorage.setItem("windowtotalwords", 0);     
        window.location.href = '/practice';
    }

    const searchChange = (event) => {
        setSearchContent(event.target.value);
    }

    const Card = (props) => {
        return (
            abc.map((item) => (
                <div class="cards-container">
                    <div class="cards-name">
                        <span>{item.name}</span>
                        <span>{item.type}</span>
                    </div> 
                    <div class="cards-spelling">
                        <span>{item.spelling}</span>
                    </div>
                    <div class="handle-icon">
                        <i onClick = {() => editOnClick(item)} class="fa-solid fa-pen-to-square"></i>
                        <i onClick = {() => deletehandle(item.deck_owner, item.name, item.owner)} class="fa-solid fa-trash-can"></i>
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
                        <li class="nav__item"><a href="/statistic" class="nav__link">Statistics</a></li>
                        <li class="nav__item"><a href="/about" class="nav__link">About</a></li>
                    </ul>
                </div>
                <div class="user-info" style={{display:userinfostate}}>
                    <div class="user-displayname">
                        <span>Hello, </span>
                        <a href="/user">{localStorage.getItem("windowdisplayname")}</a>
                    </div>
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
                    <h1>{cardname}</h1>
                </div>

                <div class="hehe">
                    <div class="cards-statistics">
                        <div class="study-button">
                            <button onClick={studyhandle}>STUDY</button>
                        </div>
                    </div>
                    <div class="cards-search">
                        {/* <button onClick={addOnClick}><i class="fa-solid fa-plus"></i></button> */}
                        <form>
                            <input onChange={searchChange} type="text" name="inputcardsearch" placeholder="Search" />
                            <i onClick={searchSubmit}  class="fa-solid fa-magnifying-glass" type="submit" value="search"></i>
                            <hr/>
                        </form>
                    </div>
                </div>

                <div class="cards-display">
                    <div class="cards-display-content">
                        <div class="cards-plus">
                            <button onClick={addOnClick}><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <Card></Card>
                    </div>
                </div>
            </div>
            <div class="add-cards" style={{"display":adddeckstate}}>
                <div class="add-card-title">
                    <p>CREATE NEW CARD</p>
                </div>
                <div class="add-card-content">
                    <form onSubmit={handleSubmit}>
                        <div class="add-card-input">
                            <div class="add-front-cards">
                                <p>FRONT</p>
                                <div class="input-in4">
                                    <span>NAME</span>
                                    <input type="text" name="card_name" />
                                </div>
                                <div class="input-in4">
                                    <span>TYPE</span>
                                    <select id="numberToSelect" name="card_type" onchange="selectNum()">
                                        <option value="">Selected</option>
                                        <option value="(adj)">Adjective</option>
                                        <option value="(n)">Noun</option>
                                        <option value="(v)">Verb</option>
                                        <option value="(adv)">Adverb</option>
                                        <option value="(prep)">Preposition</option>
                                        <option value="(others)">Others</option>
                                    </select>   
                                </div>
                                <div class="input-in4">
                                    <span>SPELLING</span>
                                    <input type="text" name="card_spelling" />
                                </div>
                            </div>
                            <div class="image-cards">
                                <p>IMAGE PREVIEW</p>
                                <button type="button" onClick={uploadImage}>LOAD IMAGE</button>
                                <img style={{"width":"300px", "height":"300px"}} src={imagelink} />
                            </div>
                            <div class="add-back-cards">
                                <p>BACK</p>
                                <div class="input-in4">
                                    <span>MEANING</span>
                                    <input type="text" name="card_meaning" />
                                </div>
                                <div class="input-in4">
                                    <span>IMAGE</span>
                                    <input type="text" name="card_image" onChange={onChangehandle}/>
                                </div>
                                <div class="input-in4">
                                    <span>SYNONYM</span>
                                    <input type="text" name="card_synonym" />
                                </div>
                                <div class="input-in4">
                                    <span>ANTONYM</span>
                                    <input type="text" name="card_antonym" />
                                </div>
                                <div class="input-in4">
                                    <span>EXAMPLE</span>
                                    <input type="text" name="card_example" />
                                </div>
                            </div>
                        </div>
                        <p>{notify}</p>
                        <div class="add-card-submit">
                            <input type="submit" value="ADD" />
                        </div>
                    </form>
                </div>
                <button class="close-button" onClick={closeOnClick}>X</button>
            </div>

            <div class="edit-cards" style={{"display":editcardstate}}>
                <div class="edit-card-title">
                    <p>EDIT CARDS</p>
                </div>
                <div class="edit-card-content">
                    <form onSubmit={edithandleSubmit}>
                        <div class="edit-card-input">
                            <div class="edit-front-cards">
                            <p>FRONT</p>
                                <div class="input-in4">
                                    <span>NAME</span>
                                    <input value={nameInputContent} onChange={(e) => {setNameInput(e.target.value)}} type="text" name="edit_card_name" />
                                </div>
                                <div class="input-in4">
                                    <span>TYPE</span>
                                    <select value={typeInputContent} onChange={(e) => {setTypeInput(e.target.value)}} id="numberToSelect" name="edit_card_type" onchange="selectNum()">
                                        <option value="">Selected</option>
                                        <option value="(adj)">Adjective</option>
                                        <option value="(n)">Noun</option>
                                        <option value="(v)">Verb</option>
                                        <option value="(adv)">Adverb</option>
                                        <option value="(prep)">Preposition</option>
                                        <option value="(others)">Others</option>
                                    </select>   
                                </div>
                                <div class="input-in4">
                                    <span>SPELLING</span>
                                    <input value={spellingInputContent} onChange={(e) => {setSpellingInput(e.target.value)}} type="text" name="edit_card_spelling" />
                                </div>
                            </div>
                            <div class="image-cards">
                                <p>IMAGE PREVIEW</p>
                                <button type="button" onClick={uploadImage2}>LOAD IMAGE</button>
                                <img style={{"width":"300px", "height":"300px"}} src={imagelink2} />
                            </div>
                            <div class="edit-back-cards">
                            <p>BACK</p>
                                <div class="input-in4">
                                    <span>MEANING</span>
                                    <input value={meaningInputContent} onChange={(e) => setMeaningInput(e.target.value)} type="text" name="edit_card_meaning" />
                                </div>
                                <div class="input-in4">
                                    <span>IMAGE</span>
                                    <input value={imageInputContent} type="text" name="edit_card_image" onChange={onChangehandle2}/>
                                </div>
                                <div class="input-in4">
                                    <span>SYNONYM</span>
                                    <input value={synonymInputContent} onChange={(e) => setSynonymInput(e.target.value)} type="text" name="edit_card_synonym" />
                                </div>
                                <div class="input-in4">
                                    <span>ANTONYM</span>
                                    <input value={antonymInputContent} onChange={(e) => setAntonymInput(e.target.value)} type="text" name="edit_card_antonym" />
                                </div>
                                <div class="input-in4">
                                    <span>EXAMPLE</span>
                                    <input value={exampleInputContent} onChange={(e) => setExampleInput(e.target.value)} type="text" name="edit_card_example" />
                                </div>
                            </div>
                        </div>
                        <p>{notify}</p>
                        <div class="edit-card-submit">
                            <input type="submit" value="EDIT" />
                        </div>
                    </form>
                </div>
                <button class="edit-close-button" onClick={editcloseOnClick}>X</button>
            </div>
        </div>
    );
}
export default Cards