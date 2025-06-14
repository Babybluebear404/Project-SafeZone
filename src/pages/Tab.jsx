import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import "../style/Tab.css";
import imageTemplates from "../components/imageTemplates";
import { useCookies } from "react-cookie";

const Tab = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = cookies.token;
        if (!token) {
          console.log("No token found.");
          return;
        }

        const response = await fetch("https://project-safezone.onrender.com/api/users/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const json = await response.json();
          const profileData = json.data;
          const selecImage = imageTemplates.find(
            (image) => String(image.id) === String(profileData?.profile)
          );
          setSelectedImage(selecImage || null);
        } else {
          console.error("❌ Error fetching profile");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [cookies.token]);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo-section">
          <div className="logo-placeholder"></div>
          <span className="logo-text">SafeZone</span>
        </div>

        <nav className="nav-links">
          {/* ใช้ NavLink เพื่อจัดการ active class อัตโนมัติ */}
          <NavLink
            to="/HomeLogin"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            DashBoard
          </NavLink>

          <NavLink
            to="/diary"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Diary
          </NavLink>

          <NavLink
            to="/friendFeed"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Friendary
          </NavLink>

          <NavLink
            to="/AboutUs"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            About Us
          </NavLink>

          <NavLink
            to="/info"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <FaCircleInfo />
          </NavLink>

          <NavLink
            to="/notification"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            <IoNotifications />
          </NavLink>
        </nav>

        <Link to="/Profile">
          {selectedImage ? (
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="profile-picture-placeholder"
            />
          ) : (
            <div className="profile-picture-placeholder"></div>
          )}
        </Link>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Tab;
