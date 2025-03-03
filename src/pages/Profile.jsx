import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaTimes, FaCamera } from "react-icons/fa";
import "./Profile.css";
import Tab from "./Tab";

const Profile = () => {
  const navigate = useNavigate(); 
  
    const goTohome = () => {
      navigate("/");
    };

    const clearSessionStorage = () => {
      sessionStorage.clear();
      console.log('Session storage has been cleared');
    };

  return (
    <div className="home-container">
      <Tab />
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
        <button onClick={() => {goTohome();clearSessionStorage();}} className="logout-button">Log Out</button>
      </div>
    </div>
    </div>
  );
};

export default Profile;
