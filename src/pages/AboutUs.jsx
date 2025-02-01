import React from 'react';
import "./AboutUs.css";

const AboutUs = () => {
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
          <a href="/AboutUs" className="nav-item active">About Us</a>
          <a href="/diary" className="nav-item">Diary</a>
          <a href="/info" className="icon-info"></a>
          <a href="/dashboard" className="icon-dashboard"></a>
          <a href="/notification" className="icon-notification"></a>
        </nav>
       
          <a href="/Profile"> <div className="profile-picture-placeholder"></div> </a>
       
      </header>
      <main className="about-content">
        <h1 className="about-title">About Us</h1>
        <div className="about-box">
          <p>
            <strong>Website</strong> นี้มีจุดประสงค์เพื่อการนำ <strong>Chat Bot</strong> มาพูดคุยเพื่อประเมินระดับอาการของโรคซึมเศร้า
            จากแบบประเมินคัดกรองโรคซึมเศร้าด้วย <strong>2 คำถาม (2Q)</strong> 
            เพื่อประเมินว่าไม่เป็นโรคซึมเศร้าหรือเป็นผู้มีความเสี่ยงหรือมีแนวโน้มที่จะเป็นโรคซึมเศร้า
          </p>
        </div>

        <div className="contact-section">
          <h2>Contact</h2>
          <p><strong>Gmail:</strong> SafeZone@gmail.com</p>
          <p><strong>Line:</strong> @SafeZone</p>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
