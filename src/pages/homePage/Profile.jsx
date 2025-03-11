import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import '../../style/Profile.css';

const Profile = ({ userService }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ id: '', name: '', email: '', password: '' });
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const ProfileUser = require('./database/src/application/useCases/user/ProfileUser');

        const profile = new ProfileUser(userService);
        const user = await profile.execute({ UserID: user.id });
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
      <div className="profile-container">
        <div className="profile-card">

          <div className='setting-Section'>
            <div className='profile-title'>
              <h1 className="profile-title">Profile Setting</h1>
              <span>__ edit your name, picture, password</span>
            </div>
            <div className="profile-form">
              <span >Name</span>
              <div className="input-setup">
                <input
                  type="text"
                  value={userData.name}
                  disabled={!isChange}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
                <a className='change-button' onClick={() => { setIsChange(!isChange) }}>Change</a>
              </div>

              <span>Email</span>
              <div className="input-setup">
                <input
                  type="email"
                  disabled={true}
                  value={userData.email}
                />
              </div>

              <span>Password</span>
              <div className="input-setup">
                <input
                  type="password"
                  disabled={true}
                  value={userData.password}
                />
                <a className='change-button' onClick={() => navigate("/ChangePassword")}>Change</a>
              </div>
              <div className='profile-button'>
                <button className="saveSetting-button"
                  onClick={() => { handleSave(); setIsChange(false); }}>Save</button>
                <button className="cancelSetting-button"
                  onClick={() => navigate("/HomeLogin")}>Cancel</button>
              </div>
            </div>
          </div>

          <div className='image-Section'>
            <div className="profile-image">
            </div>
            <button className='selected-picture'>Select Picture Profile</button>
            <div className="idText">User ID</div>
            <div className="idFriend">{userData.id || 'Loading...'}</div><br />
            <button onClick={() => { goToHome(); clearSessionStorage(); }} className="logout-button"><IoIosLogOut />  Log Out</button>
            <button className='delete-account'>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
