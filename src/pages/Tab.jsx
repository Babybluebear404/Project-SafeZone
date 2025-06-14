import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          const selecImage = imageTemplates.find((image) => String(image.id) === String(profileData?.profile));
          setSelectedImage(selecImage || null);
        } else {
          console.error("❌ Error fetching profile");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo-section">
          <div className="logo-placeholder"></div>
          <span className="logo-text">SafeZone</span>
        </div>
        <nav className="nav-links">
          <Link href="/HomeLogin" className="nav-item active">Home</Link>
          <Link href="/dashboard" className="nav-item">DashBoard</Link>
          <Link href="/diary" className="nav-item">Diary</Link>
          <Link href="/friendFeed" className="nav-item">Friendary</Link>
          <Link href="/AboutUs" className="nav-item">About Us</Link>
          <Link href="/info" className="nav-item"><FaCircleInfo /></Link>
          <Link href="/notification" className="nav-item"><IoNotifications /></Link>
        </nav>

        <Link href="/Profile">
          {selectedImage ? (
            <img src={selectedImage.src} alt={selectedImage.name} className="profile-picture-placeholder" />
          ) : (
            <div className="profile-picture-placeholder"></div>
          )}
        </Link>
      </header>
    </div>
  );
};

export default Tab;
