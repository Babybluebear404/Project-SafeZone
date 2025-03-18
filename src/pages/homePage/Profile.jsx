import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import '../../style/Profile.css';


const Profile = ({ userService }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ id: '', name: '', email: '', password: '' });
  const [isChange, setIsChange] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");

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
        setUserData({ id: profileData.id, name: profileData.username, email: profileData.email });
        const selecImage = imageTemplates.find(image => String(image.id) === profileData.profile);
        console.log("Selected Image:", selecImage);
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

  const clearSessionStorage = () => {
    sessionStorage.clear();
    console.log('Session storage has been cleared');
  };

  // อัพเดทข้อมูล user
  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem("token");

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

  const goToHome = () => {
    navigate("/"); // กลับไปหน้าหลัก
  };

  // ลิสต์รูปภาพ
  const imageTemplates = [
    {id: 0,src : "/assets/0.png",name: "Banana Cat"},
    {id: 1,src : "/assets/1.png",name: "Banana Cat"},
    {id: 2,src : "/assets/2.png",name: "Bread Cat"},
    {id: 3,src : "/assets/3.png",name: "Cake Cat"},
    {id: 4,src : "/assets/4.png",name: "Croissant Cat"},
    {id: 5,src : "/assets/5.png",name: "Hot Milk Cat"},
    {id: 6,src : "/assets/6.png",name: "Milk Tea Cat"},
    {id: 7,src : "/assets/7.png",name: "Pudding Cat"},
    {id: 8,src : "/assets/8.png",name: "Berger Cat"},
  ];

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const selectImage = (index) => {
    const selected = imageTemplates[index];
    setSelectedImage({
      id: selected.id,
      src: selected.src,
      name: selected.name
    });
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
          <div className="image-selector-container">
            <div className="profile-image">
                {selectedImage ? (
                    <img 
                    src={selectedImage.src}
                    alt="Profile" 
                    className="profile-img" 
                />
                ) : (
                    <p>เลือกรูปภาพ</p>
                )}
            </div>

            <button onClick={togglePopup} className='selected-picture'>
            Select Picture Profile
            </button>

            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>เลือกภาพที่คุณต้องการ</h2>
                        <div className="template-grid">
                            {imageTemplates.map((image, index) => (
                                <div key={index} className="template-item" onClick={() => selectImage(index)}>
                                    <img src={image.src} alt={image.name} className="template-image" />
                                    <p>{image.name}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={togglePopup} className="close-button">
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </div>
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
