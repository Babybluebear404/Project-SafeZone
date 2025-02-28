import React from "react";
import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5"
import "./Tab.css";

const Tab = () => {
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo-section">
          <div className="logo-placeholder"></div>
          <span className="logo-text">SafeZone</span>
        </div>
        <nav className="nav-links">
          <a href="/HomeLogin" className="nav-item active">Home</a>
          <a href="/dashboard" className="nav-item ">DashBoard</a>
          <a href="/diary" className="nav-item">Diary</a>
          <a href="/AboutUs" className="nav-item">About Us</a>
          <a href="/info" className="nav-item"><FaCircleInfo /></a>
          <a href="/notification" className="nav-item"><IoNotifications /></a>
        </nav>

        <a href="/Profile"> <div className="profile-picture-placeholder"></div> </a>
      </header>
    </div>
  );
};

export default Tab;