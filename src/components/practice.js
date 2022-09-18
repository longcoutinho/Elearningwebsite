import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/practice.css"
import axios from "axios";
import voice_icon from "../image/voice_icon.jpg"
import { useLocation } from "react-router";

const Practice = function(props) {
    const [listCardStudy, setListCardStudy] = useState([]);
    const [displaysentence, setdisplaysentence] = useState("none");
    const [displaybutton, setDisplayButton] = useState("flex");
    const [rotateState, setrotation] = useState("none");
    const [buttonstate, setButton] = useState(false);
    const [cardInd, setCardInd] = useState();
    const [rememWords, setRememWords] = useState(0);
    const [totalWords, setTotalWords] = useState(0);
    const { state } = useLocation();    
    useEffect(() => {
        var xyz = [];
        var size = state.listCardStudy.length
        console.log(state.listCardStudy);
        if (size == 0) {
            setdisplaysentence("flex");
            setDisplayButton("none");
        }
        else {
            setCardInd(size - 1);
            for(var i = 0; i < size; i++) {
                state.listCardStudy[i].display = 0;
                xyz.push(state.listCardStudy[i]);
            }
            setdisplaysentence("none");
            setDisplayButton("flex");
            console.log(xyz);
            setListCardStudy(xyz); 
        }
    },[state]);

    function changecard() {
        var newListCard = [];
        for(let i = 0; i < listCardStudy.length; i++) {
            newListCard.push(listCardStudy[i]);
        }
        if (cardInd >= 0) {
            newListCard[cardInd].display = 1;
            setCardInd(cardInd - 1);
            if (cardInd == 0) {
                setdisplaysentence("flex");
                setDisplayButton("none");
            }
        }
        setListCardStudy(newListCard);
        setButton(false);
    }

    function rememberhandle() {
        setrotation("none");
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);
        const config = {
            cardname: listCardStudy[cardInd].name,
            deck_owner: props.deckUsing,
            owner: props.username,
            box: listCardStudy[cardInd].box + 1,
            time: dateNow.toLocaleString()
        };
        axios.post("http://localhost:3001/updatecardbox", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Update succesfully");
            }
            else {
                console.log("No!");
            }
        })
        setButton(true);
        setTimeout(changecard, 1000);
        setRememWords(rememWords + 1);
        setTotalWords(totalWords + 1); 
    }

    function dontrememberhandle() {
        setrotation("none");
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);
        const config = {
            cardname: listCardStudy[cardInd].name,
            deck_owner: props.deckUsing,
            owner: props.username,
            box: 1,
            time: dateNow.toLocaleString()
        };
        console.log(cardInd);
        axios.post("http://localhost:3001/updatecardbox", config)
        .then(res=> {
            console.log(res.data);
            if (res.data == "0") {
                console.log("Update succesfully");
            }
            else {
                console.log("No!");
            }
        })
        setButton(true);
        setTimeout(changecard, 1000);
        setTotalWords(totalWords + 1);
    }
    
    function backhandle() {
        var dateNow = new Date();
        dateNow.setHours(0,0,0,0);
        const config = {
            owner: props.username,
            time: dateNow.toLocaleString(),
            r_words: rememWords,
            t_words: totalWords,
        };
        console.log(config);
        axios.post("http://localhost:3001/updatecountwords", config)
        .then(res=> {
            console.log(res.data);
        })
        window.location.href="/cards";
    }

    const rotatehandle = (event) => {
        if (event.target.tagName == "DIV") setrotation("rotateY(180deg)");
    }

    const rotatehandle2 = (event) => {
        setrotation("none");
    }

    function readOnClick(content) {
        let utterance = new SpeechSynthesisUtterance(content);
        speechSynthesis.speak(utterance);
        console.log("kk");
    }

    const Card = (props) => {
        return (
            listCardStudy.map((item) => (
                <div onClick={rotatehandle} class="cards-study-container" style={{display:  item.display ? 'none' : 'flex'}}>
                    <div class="cards-study-name" >
                        <span>{item.name}</span>
                        <span>{item.type}</span>
                    </div> 
                    <div class="cards-study-spelling">
                        <span>{item.spelling}</span>
                    </div>
                    <i onClick={() => readOnClick(item.name)} class="fa-solid fa-volume-high"></i>
                </div>
            ))
        );
    }

    const BackCard = (props) => {
        return (
            listCardStudy.map((item) => (
                <div onClick={rotatehandle2} class="cards-study-container-2" style={{display:  item.display ? 'none' : 'flex'}}>
                    
                    <div class="cards-study-meaning">
                        <span>{item.meaning}</span>
                    </div> 
                    <div class="cards-study-word">
                        <span>Synonym: {item.synonym}</span>
                        <span>Antonym: {item.antonym}</span>
                    </div>
                    <div class="cards-study-example">
                        <span>Ex: {item.example}</span>
                    </div>
                    <div class="cards-study-image">
                        <img style={{"height":"200px", "width":"200px"}} src={item.image}></img>
                    </div>
                </div>
            ))
        );
    }

    return (
        <div class="study-container">
            <div  style={{"transform":rotateState}} class="flip-card">
                <Card></Card>
                <BackCard></BackCard>
            </div>
            
            <div class="check-container">
                <button disabled={buttonstate} onClick={() => rememberhandle()} style={{display:displaybutton}} >REMEMBER</button>
                <button disabled={buttonstate} onClick={() => dontrememberhandle()} style={{display:displaybutton}}>DONT REMEMBER</button>
            </div>
            <div class="finish-sentence" style={{display:displaysentence}}>
                <p>ALL DONE!</p>
                <button onClick={backhandle}>FINISH</button>
            </div>
        </div>
    )
}
export default Practice