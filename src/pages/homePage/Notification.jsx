import React, { useState, useEffect } from 'react';
import '../../style/Notification.css';
import Tab from "../Tab";


const Notification = ({ currentUser, friendName, onConfirm }) => {
  const [showNotification, setShowNotification] = useState(false); // ติดตามสถานะการแสดงการแจ้งเตือน
  //const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(`Aren ต้องการเพิ่มคุณเป็นเพื่อน`); //TEST!!!!!!!!!!!
  const [showButtons, setShowButtons] = useState(true);  // ปุ่ม Yes/No

  // ใช้ useEffect เพื่อกำหนดข้อความแจ้งเตือนเมื่อมีคำขอเพิ่มเพื่อน
  useEffect(() => {
    if (friendName && friendName !== currentUser) {
      setNotificationMessage(`${friendName} ต้องการเพิ่มคุณเป็นเพื่อน`);
      setShowNotification(true); // ถ้ามีคำขอเพิ่มเพื่อน จะแสดงการแจ้งเตือน
    } else {
      setShowNotification(false); // ถ้าไม่มีคำขอเพิ่มเพื่อน จะไม่แสดงการแจ้งเตือน
    }
  }, [friendName, currentUser]);

  const notifySuccess = () => {
    //setNotificationMessage(`คุณเป็นเพื่อนกับ ${friendName} แล้ว`);
    setNotificationMessage(`คุณเป็นเพื่อนกับ Aren แล้ว`); //TEST!!!!!!!!!!!
    setShowButtons(false);
  };

  const notifyError = () => {
    //setNotificationMessage(`คุณปฏิเสธการเป็นเพื่อนกับ ${friendName} แล้ว`);
    setNotificationMessage(`คุณปฏิเสธการเป็นเพื่อนกับ Aren แล้ว`);  //TEST!!!!!!!!!!!
    setShowButtons(false);
  };

  const handleYesClick = () => {
    notifySuccess();
    if (onConfirm) onConfirm(true);
  };

  const handleNoClick = () => {
    notifyError();
    if (onConfirm) onConfirm(false);
  };

  //if (!showNotification) return null; // ถ้าไม่มีการแจ้งเตือน ก็ไม่แสดงอะไรเลย

  return (
    <div className="page-container">
      <Tab />
      <div className="notification-list">
        <div className="notification-item">
          <img src="/src/assets/LogoSafeZone.png" alt="logo" className="logo" />
          <div className="notification-text">
            <div className="notification-date">วันนี้</div>
            <div className="notification-title">{notificationMessage}</div>
          </div>
          <div className="button-group">
            {showButtons && (
              <>
                <button className="btn yes" onClick={handleYesClick}>ยอมรับ</button>
                <button className="btn no" onClick={handleNoClick}>ปฏิเสธ</button>
              </>
            )}
          </div>
          <div className="notification-time">10:12 น.</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
