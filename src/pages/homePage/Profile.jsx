import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import '../../style/Profile.css';
import { useCookies } from "react-cookie";
import imageTemplates from '../../components/imageTemplates';

const Profile = ( userService ) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [userData, setUserData] = useState({ id: '', name: '', email: '', password: '' });
  const [isChange, setIsChange] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = cookies.token;
        if (!token) {
          alert("No saved answers or token found. Please try again.");
          return;
        }

        const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        }
      });
        if (response.ok) {
        const profileData = await response.json();
        if (profileData) {  // เช็คว่ามีข้อมูลก่อนเซ็ตค่า
          setUserData({
            id: profileData.id,
            name: profileData.username,
            email: profileData.email
          });
        }
        const selecImage = imageTemplates.find(image => String(image.id) === profileData.profile);
        if (selecImage) {
          setSelectedImage({
            id: selecImage.id,
            src: selecImage.src,
            name: selecImage.name
          });  // ตั้งค่า selectedImage จาก src ของภาพที่ตรงกัน
        } else {
          setSelectedImage(null);  // กรณีไม่พบภาพจะตั้งค่า defaultImage
        }
      } else {
        const errorData = await response.json();
        console.error("❌ Error:", errorData.error);
      }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [userService]);

  const clearCookie = () => {
    removeCookie("token");
    navigate("/");
    console.log('Session storage has been cleared');
  };

  // อัพเดทข้อมูล user
  const handleSave = async () => {
    try {
      const token = cookies.token;

      if (!token) {
        alert("No saved answers or token found. Please try again.");
        return;
      }

      const requestData = {
        newusername: userData.name,
        profile: selectedImage.id
      };

      const response = await fetch("http://localhost:3000/api/users/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("✅ ", result.message);
      } else {
        const errorData = await response.json();
        console.error("❌ Error:", errorData.error);
      }
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const selectImage = (index) => {
<<<<<<< HEAD
    setSelectedImage(imageTemplates[index]?.src);
    setUpdateData({ ...updateData, profile: index });
=======
    const selected = imageTemplates[index];
    setSelectedImage({
      id: selected.id,
      src: selected.src,
      name: selected.name
    });
>>>>>>> 2906f5b313e390075c79aa975c7a2ed413f8b60a
    setIsPopupOpen(false);
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
              <span>Name</span>
              <div className="input-setup">
                <input
                  type="text"
<<<<<<< HEAD
                  name="newusername"
                  value={updateData.newusername}
=======
                  value={userData.name || ""}
>>>>>>> 2906f5b313e390075c79aa975c7a2ed413f8b60a
                  disabled={!isChange}
                  onChange={handleChange}
                />
                <a className='change-button' onClick={() => setIsChange(!isChange)}>Change</a>
              </div>

              <span>Email</span>
              <div className="input-setup">
<<<<<<< HEAD
                <input type="email" disabled value={userData.email} />
=======
                <input
                  type="email"
                  disabled={true}
                  value={userData.email || ""}
                />
>>>>>>> 2906f5b313e390075c79aa975c7a2ed413f8b60a
              </div>

              <span>Password</span>
              <div className="input-setup">
<<<<<<< HEAD
                <input type="password" />
=======
                <input
                  type="password"
                  disabled={true}
                  value={userData.password || ""}
                />
>>>>>>> 2906f5b313e390075c79aa975c7a2ed413f8b60a
                <a className='change-button' onClick={() => navigate("/ChangePassword")}>Change</a>
              </div>

              <div className='profile-button'>
                <button className="saveSetting-button" onClick={handleSubmit}>Save</button>
                <button className="cancelSetting-button" onClick={() => navigate("/HomeLogin")}>Cancel</button>
              </div>
            </div>
          </div>

          <div className='image-Section'>
<<<<<<< HEAD
            <div className="image-selector-container">
              <div className="profile-image">
                <img
                  src={imageTemplates[updateData.profile]?.src || image0}
                  alt="Profile"
                  className="profile-img"
=======
          <div className="image-selector-container">
            <div className="profile-image">
                {selectedImage ? (
                    <img 
                    src={selectedImage.src}
                    alt="Profile" 
                    className="profile-img" 
>>>>>>> 2906f5b313e390075c79aa975c7a2ed413f8b60a
                />
              </div>

              <button onClick={togglePopup} className='selected-picture'>
                Select Picture Profile
              </button>

              {isPopupOpen && (
                <div className="popup">
                  <div className="popup-content">
                    <h2>Select Your Profile Picture</h2>
                    <div className="template-grid">
                      {imageTemplates.map((image, index) => (
                        <div key={index} className="template-item" onClick={() => selectImage(index)} >
                          <img src={image.src} alt={image.name} className="template-image" />
                          <p>{image.name}</p>
                        </div>
                      ))}
                    </div>
                    <button onClick={togglePopup} className="close-button">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="idText">User ID</div>
<<<<<<< HEAD
            <div className="idFriend">{userData.id || 'Loading...'}</div>
            <button onClick={() => { navigate("/"); sessionStorage.clear(); localStorage.clear();}} className="logout-button"><IoIosLogOut /> Log Out</button>
            {/*<button className='delete-account'>Delete Account</button>*/}
=======
            <div className="idFriend">{userData.id || 'Loading...'}</div><br />
            <button onClick={ clearCookie } className="logout-button"><IoIosLogOut />  Log Out</button>
            <button className='delete-account'>Delete Account</button>
>>>>>>> 2906f5b313e390075c79aa975c7a2ed413f8b60a
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
