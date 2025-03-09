import React from 'react';
import "../../style/AboutUs.css";
import Tab from "../Tab";

const AboutUs = () => {
  return (
    <div className="home-container">
      <Tab />
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
      
      <div className="chocolate-container">
        <img src="/src/assets/Chocolate.png" alt="Cat Chocolate" className="chocolate" />
      </div>
      <div className="chocolate2-container">
        <img src="/src/assets/Chocolate.png" alt="Cat Chocolate2" className="chocolate2" />
      </div>
      <div className="chocolate3-container">
        <img src="/src/assets/Chocolate.png" alt="Cat Chocolate3" className="chocolate3" />
      </div>
      <div className="cat-lick-container">
        <img src="/src/assets/CatLick.png" alt="Cat Lick" className="cat-lick" />
      </div>
    </div>
  );
};

export default AboutUs;
