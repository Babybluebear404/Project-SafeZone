import React from 'react';
import "../../style/AboutUs.css";
import Tab from "../Tab";

const AboutUs = () => {
  return (
    <div className="home-container">
      <Tab />
      <main className="about-content">
        <h1 className="about-title">About Us</h1>
        <div className="about-box">
          <p>
          เว็บไซต์นี้สร้างขึ้นเพื่อเป็นพื้นที่ปลอดภัยสำหรับคุณ โดยใช้โมเดล AI ในการวิเคราะห์บันทึกประจำวัน (Diary) เพื่อช่วยประเมินระดับความเสี่ยงต่อภาวะซึมเศร้า อ้างอิงจากแบบคัดกรองโรคซึมเศร้าจากกรมสุขภาพจิต เพื่อช่วยให้คุณเข้าใจสภาวะอารมณ์ของตนเองมากขึ้น ไม่ว่าจะไม่มีภาวะซึมเศร้า มีความเสี่ยง หรืออาจมีแนวโน้มที่จะเกิดภาวะซึมเศร้า เราหวังว่าเครื่องมือนี้จะเป็นเพื่อนร่วมทางที่คอยสนับสนุนสุขภาพใจของคุณในทุกวัน
          </p>
        </div>

        <div className="contact-section">
          <h2>Contact</h2>
          <p><strong>Gmail:</strong> SafeZone@gmail.com</p>
        </div>
      </main>
      
      <div className="cat-lick-container">
        <img src="/src/assets/CatLick.png" alt="Cat Lick" className="cat-lick" />
      </div>
      {/*<div className="chocolate-container">
        <img src="/src/assets/Chocolate.png" alt="Cat Chocolate" className="chocolate" />
      </div>
      <div className="chocolate2-container">
        <img src="/src/assets/Chocolate.png" alt="Cat Chocolate2" className="chocolate2" />
      </div>
      <div className="chocolate3-container">
        <img src="/src/assets/Chocolate.png" alt="Cat Chocolate3" className="chocolate3" />
      </div>
       */}
    </div>
  );
};

export default AboutUs;
