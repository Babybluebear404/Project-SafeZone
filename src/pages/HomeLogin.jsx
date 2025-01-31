import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegNewspaper, FaRegBell } from "react-icons/fa"; 
import { AiOutlineDashboard } from "react-icons/ai"; 
import "./HomeLogin.css";

const HomeLogin = () => {
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
      <header className="navbar">
        <div className="logo-section">
          {/* Placeholder for logo */}
          <div className="logo-placeholder"></div>
          <span className="logo-text">SafeZone</span>
        </div>
        <nav className="nav-links">
          <a href="/" className="nav-item active">Home</a>
          <a href="/AboutUs" className="nav-item">About Us</a>
          <a href="/diary" className="nav-item">Diary</a>
          <a href="/info" className="nav-item">Info</a>
          <a href="/dashboard" className="nav-item">Dashboard</a>
          <a href="/notification" className="nav-item">Notification</a>
        </nav>
        <div className="user-section">
          <AiOutlineDashboard className="icon dashboard" />
          <FaRegNewspaper className="icon info" />
          <FaRegBell className="icon notification" />
          <a href="/Profile"> <div className="profile-picture-placeholder"></div> </a>
        </div>
      </header>

      <main className="content">
        <h1 className="title">SAFE ZONE</h1>
        <p className="subtitle">
          เพื่อนเคียงข้างกายในวันที่คุณอยากคุยกับใครสักคน <br />
          และเราสามารถช่วยคุณในการประเมินระดับโรคซึมเศร้า
        </p>
        <button onClick={goToDepressionScreening} className="quiz-button">
          แบบทดสอบโรคซึมเศร้า
        </button>

        {/* เพิ่มปุ่มสำหรับช่องทางปรึกษาจิตแพทย์ */}
        <button onClick={openPopup} className="consult-button">
          ช่องทางปรึกษาจิตแพทย์
        </button>
      </main>

      {/* Popup สำหรับแสดงช่องทางการปรึกษาจิตแพทย์ */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>ช่องทางปรึกษาจิตแพทย์</h2>
            <p>
              สายด่วนสุขภาพจิต: 1323 <br /><br />
              ติดต่อ: ภาควิชาจิตเวชศาสตร์ <br />
              ที่อยู่: ชั้น 3 อาคารสิรินธร โรงพยาบาลมหาวิทยาลัยนเรศวร มหาวิทยาลัยนเรศวร
              ตำบลท่าโพธิ์ อำเภอเมือง จังหวัดพิษณุโลก 65000. 
              คลินิกจิตเวช: 0-5596-5702-3 <br /><br />
              ศูนย์สุขภาวะนิสิต มหาวิทยาลัยนเรศวร
            </p>
            <button onClick={closePopup} className="close-popup">ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLogin;
