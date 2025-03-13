import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Notification.css';
import Tab from "../Tab";

const Notification = ({ currentUser, friendName, onConfirm, sharedDiary }) => {
  const [showNotification, setShowNotification] = useState([]); // ใช้เป็น array สำหรับเก็บการแจ้งเตือน
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showButtons, setShowButtons] = useState(true);  // ปุ่ม Yes/No
  const [currentDate, setCurrentDate] = useState("");  
  const [currentTime, setCurrentTime] = useState("");  
  const navigate = useNavigate();

  // ใช้ useEffect เพื่อกำหนดข้อความแจ้งเตือนเมื่อมีคำขอเพิ่มเพื่อน
  useEffect(() => {
    // ดึงวันที่และเวลาปัจจุบัน
    const date = new Date();
    const formattedDate = date.toLocaleDateString('th-TH', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    setCurrentDate(formattedDate);  // เก็บวันที่
    setCurrentTime(formattedTime);  // เก็บเวลา

    const notifications = [];

    // ตรวจสอบการแจ้งเตือนจากคำขอเพื่อน
    if (friendName && friendName !== currentUser) {
      notifications.push({ 
        type: "friendRequest", 
        message: `${friendName} ต้องการเพิ่มคุณเป็นเพื่อน`
      });
    }
  
    // ตรวจสอบการแจ้งเตือนจากการแชร์ไดอารี่
    if (sharedDiary) {
      notifications.push({ 
        type: "diaryShare", 
        message: `${sharedDiary.owner} แชร์ Diary ของเขากับคุณ`
      });
    }

    setShowNotification(notifications);  // อัพเดทการแจ้งเตือน
  }, [friendName, currentUser, sharedDiary]);

  const notifySuccess = () => {
    setNotificationMessage(`คุณเป็นเพื่อนกับ ${friendName} แล้ว`); 
    setShowButtons(false);
  };

  const notifyError = () => {
    setNotificationMessage(`คุณปฏิเสธการเป็นเพื่อนกับ ${friendName} แล้ว`);  
    setShowButtons(false);
  };

  const handleYesClick = () => {
    notifySuccess();
    setShowNotification([]);  // ซ่อนการแจ้งเตือนหลังจากกดยอมรับ
    if (onConfirm) onConfirm(true);
  };

  const handleNoClick = () => {
    notifyError();
    setShowNotification([]);  // ซ่อนการแจ้งเตือนหลังจากกดปฏิเสธ
    if (onConfirm) onConfirm(false);
  };

  const handleViewDiary = () => {
    navigate("/Diary");
  };

  return (
    <div className="page-container">
      <Tab />
      <div className="notification-list">
        {showNotification.length > 0 ? (
          showNotification.map((notification, index) => (
            <div key={index} className="notification-item">
              <div className="notification-title">{notification.message}</div>
              <div className="notification-item">
                <img src="/src/assets/LogoSafeZone.png" alt="logo" className="logo" />
                <div className="notification-text">
                  <div className="notification-date">{currentDate}</div>
                  <div className="notification-time">{currentTime} น.</div>
                </div>

                {notification.type === "friendRequest" && showButtons && (
                  <div className="actionB">
                    <button className="btn yes" onClick={handleYesClick}>ยอมรับ</button>
                    <button className="btn no" onClick={handleNoClick}>ปฏิเสธ</button>
                  </div>
                )}
                
                {notification.type === "diaryShare" && (
                  <div className="diaryB">
                    <button className="btn view" onClick={handleViewDiary}>ดูไดอารี่</button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-notifications">ไม่มีการแจ้งเตือน</div>
        )}
      </div>
    </div>
  );
};

export default Notification;
