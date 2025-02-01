import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaTimes, FaCamera } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate(); 
  
    const goTohome = () => {
      navigate("/");
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
          <a href="/HomeLogin" className="nav-item">Home</a>
          <a href="/AboutUs" className="nav-item">About Us</a>
          <a href="/diary" className="nav-item">Diary</a>
          <a href="/info" className="icon-info"></a>
          <a href="/dashboard" className="icon-dashboard"></a>
          <a href="/notification" className="icon-notification"></a>
        </nav>
       
          <a href="/Profile"> <div className="profile-picture-placeholder active"></div> </a>
       
      </header>
    <div className="profile-container">
      <div className="profile-card">
        {/* ปุ่มปิด */}
        <button className="close-button">
          <FaTimes />
        </button>

        {/* ชื่อ Profile */}
        <h1 className="profile-title">Profile</h1>

        {/* รูปโปรไฟล์ */}
        <div className="profile-image">
          <button className="camera-icon">
            <FaCamera />
          </button>
        </div>

        {/* ฟอร์มข้อมูลผู้ใช้ */}
        <div className="profile-form">
          <div className="input-group">
            <input type="text" placeholder="Name" />
            <FaUser className="icon" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" />
            <FaLock className="icon" />
          </div>
          <button className="save-button">Save</button>
        </div>

        {/* ปุ่ม Log Out */}
        <button onClick={goTohome} className="logout-button">Log Out</button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
