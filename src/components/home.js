import React from "react";
import "../styles/home.css";
import Menu from "./Menu.js"
import Footer  from "./Footer.js";
import Introduction from "./Introduction.js";

const Home = function(props) {
  return (
    <div>
        <Menu user_logedin={localStorage.getItem("user_logedin")}></Menu>
        <Introduction></Introduction>
        <Footer></Footer>
    </div>
  )
}
 
export default Home;