import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/practice.css"
import axios from "axios";

const Practice = function(props) {
    const [abc, setabc] = useState(JSON.parse(localStorage.getItem("windowdisplaylistcard")));
    const [value, incValue] = useState(Object.keys(abc).length - 1);
    const [displaysentence, setdisplaysentence] = useState("none");
    const [rotationstate, setrotation] = useState("none");
    const [rotationstate2, setrotation2] = useState("none");
    useEffect(() => {
        var xyz = [];
        var size = Object.keys(abc).length;
        console.log(1);
       for(var i = 0; i < size; i++) {
           abc[i].display = 1;
           xyz.push(abc[i]);
       }
       xyz[value].display = 0;
       setabc(xyz); 
    },[]);

    function rememberhandle() {
        //abc[0].display = 1;
        const config = {
            cardname: abc[value].name,
            deck_owner: localStorage.getItem("windowdisplaydeck"),
            owner: localStorage.getItem("windowusername"),
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
        var xyz = [];
        var size = Object.keys(abc).length;
        for(var i = 0; i < size; i++) {
            xyz.push(abc[i]);
        }
        xyz[value].display = 1;
        if (value >= 0) {
            if (value > 0) {
                var newvalue = value - 1;
                xyz[newvalue].display = 0;
                incValue(newvalue);
            }
            if (value == 0) {
                setdisplaysentence("flex");
            }
        }
        setabc(xyz);
        //console.log(abc[0].display);
    }


    function dontrememberhandle() {
        var xyz = [];
        var size = Object.keys(abc).length;
        for(var i = 0; i < size; i++) {
            xyz.push(abc[i]);
        }
        xyz[value].display = 1;
        if (value >= 0) {
            if (value > 0) {
                var newvalue = value - 1;
                xyz[newvalue].display = 0;
                incValue(newvalue);
            }
            if (value == 0) {
                setdisplaysentence("flex");
            }
        }
        setabc(xyz);
        //console.log(abc[0].display);
    }
    
    function backhandle() {
        window.location.href="/cards";
    }

    function rotatehandle() {
        setrotation("rotateY(180deg)");
        setrotation2("none");
        console.log(1);
    }

    function rotatehandle2() {
        setrotation("none");
        setrotation2("rotateY(180deg)");
        console.log(1);
    }

    const Card = (props) => {
        return (
            abc.map((item) => (
                <div>
                <div onClick={() => rotatehandle()} class="cards-study-container" style={{display:  item.display ? 'none' : 'flex', transform:rotationstate}}>
                     <div class="cards-study-name" >
                            <h1>{item.name}</h1>
                        </div> 
                        <div class="card-study-type">
                            <h1>{item.type}</h1>
                        </div>
                        <div class="cards-study-spelling">
                            <h1>{item.spelling}</h1>
                        </div>
                </div>
                </div>
            ))
        );
    }

    const BackCard = (props) => {
        return (
            abc.map((item) => (
                <div>
                <div onClick={() => rotatehandle2()} class="cards-study-container-2" style={{display:  item.display ? 'none' : 'flex', transform:rotationstate2}}>
                     <div class="cards-study-name">
                            <h1>{item.meaning}</h1>
                        </div> 
                        <div class="card-study-type">
                            <h1>{item.anonym}</h1>
                        </div>
                        <div class="cards-study-spelling">
                            <h1>{item.example}</h1>
                        </div>
                </div>
                 </div>
            ))
        );
    }

    return (
        <div class="study-container">
            <BackCard></BackCard>
            <Card></Card>
            <div class="check-container">
                <button onClick={() => rememberhandle()}>REMEMBER</button>
                <button onClick={() => dontrememberhandle()}>DONT REMEMBER</button>
            </div>
            <div class="finish-sentence" style={{display:displaysentence}}>
                <p>ALL DONE!</p>
                <button onClick={backhandle}>FINISH</button>
            </div>
        </div>
    )
}
export default Practice