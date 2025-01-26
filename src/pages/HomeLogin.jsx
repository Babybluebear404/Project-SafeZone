import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegNewspaper, FaRegBell } from "react-icons/fa"; 
import { AiOutlineDashboard } from "react-icons/ai"; 
import "./HomeLogin.css";

const HomeLogin = () => {
  const navigate = useNavigate(); 

  const goToDepressionScreening = () => {
    navigate("/depression-screening");
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo-section">
          {/* Placeholder for logo */}
          <div className="logo-placeholder"></div>
          <span className="logo-text">SafeZone</span> {/* Add space here */}
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
          {/* Replacing icons with new ones */}
          <AiOutlineDashboard className="icon dashboard" />
          <FaRegNewspaper className="icon info" />
          <FaRegBell className="icon notification" />
          {/* Placeholder for profile picture */}
          <a href="/Profile"> <div className="profile-picture-placeholder"></div> </a>
        </div>
      </header>

      <main className="content">
        <h1 className="title">SAFE ZONE</h1>
        <p className="subtitle">
          เพื่อนเสียงข้างกายในวันที่คุณอยากคุยกับใครสักคน <br />
          และเราสามารถช่วยคุณในการประเมินระดับโรคซึมเศร้า
        </p>
        <button onClick={goToDepressionScreening} className="quiz-button">
          แบบทดสอบโรคซึมเศร้า
        </button>
      </main>
    </div>
  );
};

export default HomeLogin;
