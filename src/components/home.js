import React from "react";
import "../styles/home.css";
import pic_bg_content from "../image/pripic.jpg";
import { useState } from "react";
import { useEffect } from "react";
import duongcong from "../image/duongcong.png";
import box from "../image/76867.png"
import Menu from "./Menu.js"
import Footer  from "./Footer.js";

const Home = function(props) {
    const [userinfostate, setDisplay] = useState(localStorage.getItem("windowuserinfoboxstate"));
    const [loginsignupstate, setDisplay2] = useState(localStorage.getItem("windowloginboxstate"));
  return (
    
    <div>
        <Menu user_logedin="false"></Menu>
        {/* study now, be proud later */} 
        <div class="content-container">
			<img class="content-picture" src={pic_bg_content} />
			<div class="carousel-caption">
				<h1 class="display-2">Study now </h1>
				<h1 class="display-2">be proud later</h1>
				<button type="button" class="content-btn"><a href="#">Get started</a></button>
			</div>
		</div>
        
         {/* 3 cols learn anything */}
         <div class="learning-container">
            <div class="learning-content">
            <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anything</h3>
            </div>
            <div class="learning-content">
            <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anytime</h3>
            </div>
            <div class="learning-content">
            <i class="fa-solid fa-box-archive"></i>
                <h3>Learn anywhere</h3>
            </div>
        </div>    

         {/* pp */}
         <div class="about">
            <div class="problem">
                <img src={duongcong}/>
                <div class="problem-content">
                    <h3>Đường cong lãng quên</h3>
                    <p class="problem-text">Hơn một thế kỷ trước, Hermann Ebbinghaus – một bác sĩ tâm thần học và nhà vật lý người Đức – đã cho ra đời một định lý mang tên ông hay còn gọi là định lý Đường cong lãng quên (Forgetting Curve).Trong định lý này, ông giả định: Nếu một người có trí nhớ hoàn hảo và có khả năng nhớ 100% những gì được giảng dạy trên lớp thì 20 phút saukhi tan lớp, anh ta chỉ còn nhớ khoảng 58,2%bài, 1 giờ sau còn 44,2%... Cứ thế cho đến đúng 1 tháng sau, anh ta chỉ còn nhớ được21,1%.

                    </p>
                    <button class="read-btn">
                            <a href="#">Read more</a>
                    </button>
                </div>
            </div>
            <div class="solution">
                <div class="solution-content">
                    <h3>Spaced Repetition - Hệ thống Leitner</h3>
                    <span>Kỹ thuật lặp lại ngắt quãng (Spaced Repetition) của Hermann Ebbinghaus là kỹ thuật gia tăng thời gian giữa những lần ôn tập để khai thác hiệu ứng tâm lý ngắt quãng (spacing effect), giúp cải thiện khả năng ghi nhớ cùng một khối lượng nội dung trong một khoảng thời gian trải dài.</span> <br/>
                    <span> “Hệ thống Leitner” – hệ thống giúp ôn tập nhiều lần để đạt được các thành tích thông qua việc sử dụng flashcards</span><br/>
                    <button class="read-btn">
                        <a href="#">Read more</a>
                    </button>
                </div>
                <img src={box} />

            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
 
export default Home;