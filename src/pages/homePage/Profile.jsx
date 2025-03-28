import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import '../../style/Profile.css';
import image0 from "../../assets/0.png";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";
import image4 from "../../assets/4.png";
import image5 from "../../assets/5.png";
import image6 from "../../assets/6.png";
import image7 from "../../assets/7.png";
import image8 from "../../assets/8.png";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ id: "", username: "", email: "", profile: "" });
  const [updateData, setUpdateData] = useState({ id: "", newusername: "", profile: "" });
  const [isChange, setIsChange] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imageTemplates = [
    { src: image1, name: "Banana Cat" },
    { src: image2, name: "Bread Cat" },
    { src: image3, name: "Cake Cat" },
    { src: image4, name: "Croissant Cat" },
    { src: image5, name: "Hot Milk Cat" },
    { src: image6, name: "Milk Tea Cat" },
    { src: image7, name: "Pudding Cat" },
    { src: image8, name: "Berger Cat" },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setUserData(data);
      setUpdateData({ id: data.id, newusername: data.username, profile: data.profile });
      setSelectedImage(data.profile || image0);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = (e) => {
    setUpdateData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/users/updateprofile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: updateData.id,
          newusername: updateData.newusername,
          profile: updateData.profile
        }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsChange(false);
        fetchProfile();
      } else {
        const errorData = await response.json();
        alert("Update failed: " + errorData.error);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const selectImage = (index) => {
    setSelectedImage(imageTemplates[index]?.src);
    setUpdateData({ ...updateData, profile: index });
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
                  name="newusername"
                  value={updateData.newusername}
                  disabled={!isChange}
                  onChange={handleChange}
                />
                <a className='change-button' onClick={() => setIsChange(!isChange)}>Change</a>
              </div>

              <span>Email</span>
              <div className="input-setup">
                <input type="email" disabled value={userData.email} />
              </div>

              <span>Password</span>
              <div className="input-setup">
                <input type="password" />
                <a className='change-button' onClick={() => navigate("/ChangePassword")}>Change</a>
              </div>

              <div className='profile-button'>
                <button className="saveSetting-button" onClick={handleSubmit}>Save</button>
                <button className="cancelSetting-button" onClick={() => navigate("/HomeLogin")}>Cancel</button>
              </div>
            </div>
          </div>

          <div className='image-Section'>
            <div className="image-selector-container">
              <div className="profile-image">
                <img
                  src={imageTemplates[updateData.profile]?.src || image0}
                  alt="Profile"
                  className="profile-img"
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
            <div className="idFriend">{userData.id || 'Loading...'}</div>
            <button onClick={() => { navigate("/"); sessionStorage.clear(); localStorage.clear();}} className="logout-button"><IoIosLogOut /> Log Out</button>
            {/*<button className='delete-account'>Delete Account</button>*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
