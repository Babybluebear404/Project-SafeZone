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
          เว็บไซต์นี้สร้างขึ้นเพื่อเป็นพื้นที่ปลอดภัยสำหรับคุณ โดยใช้โมเดล AI ในการวิเคราะห์บันทึกประจำวัน (Diary) 
          เพื่อช่วยวิเคราะห์ระดับความเสี่ยงต่อภาวะซึมเศร้า โดยแบ่งการวิเคราะห์ออกเป็น 5 ระดับตามสภาวะอารมณ์ 
          และอ้างอิงจากแบบคัดกรองโรคซึมเศร้าของกรมสุขภาพจิต เพื่อช่วยให้คุณเข้าใจและรับรู้ความเปลี่ยนแปลงในอารมณ์ของตนเองมากขึ้น 
          ไม่ว่าผลการวิเคราะห์จะแสดงว่าคุณไม่มีภาวะซึมเศร้า มีความเสี่ยง หรืออาจมีแนวโน้มที่จะเกิดภาวะซึมเศร้า 
          เราหวังว่าเครื่องมือนี้จะเป็นเพื่อนที่คอยรับฟังและอยู่เคียงข้างคุณเสมอ
          <br /><br />
          หากผลการวิเคราะห์บ่งชี้ว่าคุณอาจมีความเสี่ยงต่อภาวะซึมเศร้า เราขอแนะนำให้คุณพูดคุยกับบุคลากรทางสุขภาพจิต 
          หรือค้นหาแหล่งข้อมูลที่น่าเชื่อถือ เพื่อรับคำแนะนำและดูแลใจตัวเองอย่างเหมาะสม เพราะคุณไม่ได้อยู่คนเดียว 
          และการขอความช่วยเหลือเป็นก้าวแรกที่สำคัญในการดูแลสุขภาพใจของคุณ ✨ <br /><br />
          
          </p>
        </div>
      </main>
      <div className="contact-section">
          <h2>Contact</h2>
          <p><strong>Gmail:</strong> safezone.healjai@gmail.com</p>
      </div>
      
      <div className="cat-lick-container">
        <img src="/assets/cat-lick.png" alt="Cat Lick" className="cat-lick" />
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
