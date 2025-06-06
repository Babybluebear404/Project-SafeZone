import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/HomeLogin.css";
import Tab from "../Tab";
import { AverageEmotion } from "./HomeAvg";
import { EmotionSummary } from "./Home3&7";


const HomeLogin = () => {
  const [data, setData] = useState([]);
  
      useEffect(() => {
          const storedData = sessionStorage.getItem("messages");
          if (storedData) {
            setData(JSON.parse(storedData)); 
          } else {
            setData([]);
          }
        }, []);
        
      const COLORS = ["#FF6384", "#FF9F40", "#FFCD56", "#4BC0C0", "#36A2EB"];
  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate(); 

  const goToDepressionScreening = () => {
    navigate("/depression-screening");
  };

  const openPopup = () => {
    setShowPopup(true); 
  };

  const closePopup = () => {
    setShowPopup(false); 
  };

  return (
    <div className="home-container">   
      <Tab/>

      <div className="cat-fish-container">
        <img src="/src/assets/Cat&Fish.png" alt="Cat and Fish" className="cat-fish" />
      </div>

      
      <div className="avg-emotionDay">
                          <AverageEmotion 
                              data = {data}
                              COLORS={COLORS}/>
                      </div>
      <div className="avg-perWeek">
                          <EmotionSummary
                              data={data} />
                      </div>

      <main className="content">
        <h1 className="title">SAFE ZONE</h1>
        <p className="subtitle">
          เพื่อนเคียงข้างกายในวันที่คุณอยากคุยกับใครสักคน <br />
          และเราสามารถช่วยคุณในการประเมินระดับโรคซึมเศร้า
        </p>
        <button onClick={goToDepressionScreening} className="quiz-button">
          แบบทดสอบโรคซึมเศร้า
        </button>

        <button onClick={openPopup} className="consult-button">
          ช่องทางการฮีลใจ
        </button>
      </main>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>ช่องทางปรึกษาจิตแพทย์</h2>
            <p>
              สายด่วนสุขภาพจิต: 1323 <br /><br />
              ติดต่อ: ภาควิชาจิตเวชศาสตร์ <br />
              ที่อยู่: ชั้น 3 อาคารสิรินธร โรงพยาบาลมหาวิทยาลัยนเรศวร มหาวิทยาลัยนเรศวร
              ตำบลท่าโพธิ์ อำเภอเมือง จังหวัดพิษณุโลก 65000. 
              <br />
              คลินิกจิตเวช: 0-5596-5702-3 <br /><br />
              ศูนย์สุขภาวะนิสิต มหาวิทยาลัยนเรศวร
            </p>
            <button onClick={closePopup} className="close-popup">Close</button>
          </div>
        </div>
      )}
      <div className="cat-eye2-container">
        <img src="/src/assets/CatEye2.png" alt="Cat Eye2" className="cat-eye2" />
      </div>
    </div>
  );
};

export default HomeLogin;