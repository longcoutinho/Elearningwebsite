import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/practice.css"

const Practice = function(props) {
    const [abc, setabc] = useState(JSON.parse(localStorage.getItem("windowdisplaylistcard")));
    const [value, incValue] = useState(0);
    useEffect(() => {
        var size = Object.keys(abc).length;
        console.log(1);
       for(var i = 0; i < size; i++) {
           abc[i].display = 0;
       }
       setabc(abc);
    },[]);
    function dontrememberhandle() {
        abc[0].display = 1;
        setabc(abc);
        console.log(abc[0].display);
    }
    


    const Card = (props) => {
        return (
            abc.map((item) => (
                <div class="cards-study-container" style={{display:  item.display ? 'flex' : 'none'}}>
                    <div class="cards-study-name">
                        <h1>{item.name}</h1>
                    </div> 
                    <div class="card-study-type">
                        <h1>{item.type}</h1>
                    </div>
                    <div class="cards-study-spelling">
                        <h1>{item.spelling}</h1>
                    </div>
                </div>
            ))
        );
    }

    return (
        <div class="study-container">
            <Card></Card>
            <div class="check-container">
                <button>REMEMBER</button>
                <button onClick={() => dontrememberhandle()}>DONT REMEMBER</button>
            </div>
            
        </div>
    )
}
export default Practice