import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Notification.css';
import Tab from "../Tab";


const Notification = ({ currentUser, friendName, onConfirm, sharedDiary }) => {
  const [showNotification, setShowNotification] = useState(false); // ติดตามสถานะการแสดงการแจ้งเตือน
  //const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(`Eren ต้องการเพิ่มคุณเป็นเพื่อน`); //TEST!!!!!!!!!!!
 // const [notificationMessage, setNotificationMessage] = useState(`Aren แชร์ไดอารี่กับคุณ`); //TEST!!!!!!!!!!!
  const [showButtons, setShowButtons] = useState(true);  // ปุ่ม Yes/No
  const [currentDate, setCurrentDate] = useState("");  
  const [currentTime, setCurrentTime] = useState("");  
  const [isFriendRequest, setIsFriendRequest] = useState(false); // เช็คการแจ้งเตือนเพื่อน
  const [isDiaryShare, setIsDiaryShare] = useState(false); // เช็คการแจ้งเตือนแชร์ไดอารี่
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

    if (friendName && friendName !== currentUser) {
      setNotificationMessage(`${friendName} ต้องการเพิ่มคุณเป็นเพื่อน`);
      setIsFriendRequest(true);
      setIsDiaryShare(false);
      setShowNotification(true); // ถ้ามีคำขอเพิ่มเพื่อน จะแสดงการแจ้งเตือน
    } else if (sharedDiary) {
      setNotificationMessage(`${sharedDiary.owner} แชร์ Diary ของเขากับคุณ`);
      setIsDiaryShare(true);
      setIsFriendRequest(false);
      setShowNotification(true);
      setShowButtons(false); // ไม่ต้องแสดงปุ่ม Yes/No ในการแชร์
    } else {
      setShowNotification(false); // ถ้าไม่มีคำขอเพิ่มเพื่อน จะไม่แสดงการแจ้งเตือน
    }
  }, [friendName, currentUser, sharedDiary]);

  const notifySuccess = () => {
    setNotificationMessage(`คุณเป็นเพื่อนกับ Eren แล้ว`); //TEST!!!!!!!!!!!
    setShowButtons(false);
  };

  const notifyError = () => {
    setNotificationMessage(`คุณปฏิเสธการเป็นเพื่อนกับ Eren แล้ว`);  //TEST!!!!!!!!!!!
    setShowButtons(false);
  };

  const handleYesClick = () => {
    notifySuccess();
    setShowNotification(false);  // ซ่อนการแจ้งเตือนหลังจากกดยอมรับ
    if (onConfirm) onConfirm(true);
  };

  const handleNoClick = () => {
    notifyError();
    setShowNotification(false);  // ซ่อนการแจ้งเตือนหลังจากกดปฏิเสธ
    if (onConfirm) onConfirm(false);
  };

  const handleViewDiary = () => {
    navigate("/Diary");
  };

  return (
    <div className="page-container">
      <Tab />
      <div className="notification-list">
        <div className="notification-item">
          <img src="/src/assets/LogoSafeZone.png" alt="logo" className="logo" />
          <div className="notification-text">
            <div className="notification-date">{currentDate}</div>  {/* แสดงวันที่จาก currentDate */}
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
          <div className="notification-time">{currentTime} น.</div>  {/* แสดงเวลาจาก currentTime */}
        </div>

        {/* TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        <div className="notification-item"> 
          <img src="/src/assets/LogoSafeZone.png" alt="logo" className="logo" />
          <div className="notification-text">
            <div className="notification-date">{currentDate}</div>  {/* แสดงวันที่จาก currentDate */}
            <div className="notification-title">Eren แชร์ไดอารี่กับคุณ</div>
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
          <div className="notification-time">{currentTime} น.</div>  {/* แสดงเวลาจาก currentTime */}
        </div>
      </div>
    </div>
  );
};

export default Notification;