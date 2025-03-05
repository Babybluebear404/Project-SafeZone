import React, { useState, useEffect } from 'react';
import '../../style/Notification.css';
import Tab from "../Tab";


const Notification = ({ currentUser, friendName, onConfirm, sharedDiary }) => {
  const [showNotification, setShowNotification] = useState(false); // ติดตามสถานะการแสดงการแจ้งเตือน
  //const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(`Aren ต้องการเพิ่มคุณเป็นเพื่อน`); //TEST!!!!!!!!!!!
 // const [notificationMessage, setNotificationMessage] = useState(`Aren แชร์ไดอารี่กับคุณ`); //TEST!!!!!!!!!!!
  const [showButtons, setShowButtons] = useState(true);  // ปุ่ม Yes/No
  const [isFriendRequest, setIsFriendRequest] = useState(false); // เช็คการแจ้งเตือนเพื่อน
  const [isDiaryShare, setIsDiaryShare] = useState(false); // เช็คการแจ้งเตือนแชร์ไดอารี่

  // ใช้ useEffect เพื่อกำหนดข้อความแจ้งเตือนเมื่อมีคำขอเพิ่มเพื่อน
  useEffect(() => {
    if (friendName && friendName !== currentUser) {
      setNotificationMessage(`${friendName} ต้องการเพิ่มคุณเป็นเพื่อน`);
      setIsFriendRequest(true);
      setIsDiaryShare(false);
      setShowNotification(true); // ถ้ามีคำขอเพิ่มเพื่อน จะแสดงการแจ้งเตือน
    } else if (sharedDiary) {
      setNotificationMessage(`${sharedDiary.owner} แชร์ไดอารี่กับคุณ`);
      setIsDiaryShare(true);
      setIsFriendRequest(false);
      setShowNotification(true);
      setShowButtons(false); // ไม่ต้องแสดงปุ่ม Yes/No ในการแชร์
    } else {
      setShowNotification(false); // ถ้าไม่มีคำขอเพิ่มเพื่อน จะไม่แสดงการแจ้งเตือน
    }
  }, [friendName, currentUser, sharedDiary]);

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

  const handleViewDiary = () => {
    if (sharedDiary && sharedDiary.link) {
      window.location.href = sharedDiary.link;
    }
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
          {showButtons ? (
              <>
                <button className="btn yes" onClick={handleYesClick}>ยอมรับ</button>
                <button className="btn no" onClick={handleNoClick}>ปฏิเสธ</button>
              </>
            ) : sharedDiary ? (
              <button className="btn view" onClick={handleViewDiary}>ดูไดอารี่</button>
            ) : null}
          </div>
          <div className="notification-time">10:12 น.</div>
        </div>

        {/* TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <div className="notification-item"> 
          <img src="/src/assets/LogoSafeZone.png" alt="logo" className="logo" />
          <div className="notification-text">
            <div className="notification-date">วันนี้</div>
            <div className="notification-title">Aren แชร์ไดอารี่กับคุณ</div>
          </div>
          <div className="button-group">
          {showButtons ? (
              <>
                <button className="btn view" onClick={handleViewDiary}>ดูไดอารี่</button>
              </>
            ) : sharedDiary ? (
              <button className="btn view" onClick={handleViewDiary}>ดูไดอารี่</button>
            ) : null}
          </div>
          <div className="notification-time">12:12 น.</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
