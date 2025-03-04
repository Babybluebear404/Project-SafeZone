import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import '../../style/Profile.css';
import Tab from "../Tab";

const Profile = ({ userService }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ id: '', name: '', email: '', password: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ใช้ require ในการนำเข้า
        const ProfileUser = require('./database/src/application/useCases/user/ProfileUser');
        
        // สร้าง instance จาก class Profile
        const profile = new ProfileUser(userService);
        const user = await profile.execute({ UserID: user.id }); // ดึงข้อมูลผู้ใช้ตาม UserID
        setUserData({ id: user.id, name: user.name, email: user.email, password: '' });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, [userService]);

  const clearSessionStorage = () => {
    sessionStorage.clear();
    console.log('Session storage has been cleared');
  };

  const handleSave = async () => {
    try {
      await userService.updateUser(userData.id, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      alert('แก้ไขข้อมูลและบันทึกเรียบร้อย');
    } catch (error) {
      console.error('Failed to save user data:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const goToHome = () => {
    navigate("/"); // กลับไปหน้าหลัก
  };

  return (
    <div className="home-container">
      <Tab />
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-title">Profile</h1>

          <div className="profile-image">
            <button className="camera-icon">
              <FaCamera />
            </button>
          </div>

          <div className="idText">Friend ID</div>
          <div className="idFriend">{userData.id || 'Loading...'}</div><br />

          <div className="profile-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <FaUser className="icon" />
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <FaEnvelope className="icon" />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <FaLock className="icon" />
            </div>

            <button className="save-button" onClick={handleSave}>Save</button>
          </div>

          <button onClick={()=>{goToHome();clearSessionStorage();}} className="logout-button">Log Out</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
