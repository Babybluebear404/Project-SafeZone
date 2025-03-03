import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Notification.css';
import Tab from "./Tab";


const Notification = () => {
  const notifySuccess = () => toast.success('🎉 สำเร็จ! การดำเนินการเสร็จสิ้น');
  const notifyError = () => toast.error('❌ เกิดข้อผิดพลาด! กรุณาลองใหม่');
  const notifyInfo = () => toast.info('ℹ️ ข้อมูลเพิ่มเติม: โปรดตรวจสอบการอัปเดต');
  const notifyWarning = () => toast.warn('⚠️ คำเตือน: โปรดระวังข้อมูลที่ไม่ถูกต้อง');

  return (
    <div className="page-container">
      <Tab />
      <div className="notification-list">
        <div className="notification-item">
          <img src="/src/assets/LogoSafeZone.png" alt="logo" className="logo" />
          <div className="notification-text">
            <div className="notification-title">Mimi addfriends</div>
            <div className="notification-date">Today</div>
          </div>
          <div className="button-group">
            <button className="btn yes">Yes</button>
            <button className="btn no">No</button>
          </div>
          <div className="notification-time">10:12 AM</div>
        </div>

        <div className="notification-item">
          <div className="notification-text">
            <div className="notification-date">Today</div>
            <span className="notification-message">08:29 AM</span>
          </div>
          <div className="notification-time">08:29 AM</div>
        </div>

        <div className="notification-item">
          <div className="notification-text">
            <div className="notification-date">21 May 2024</div>
            <span className="notification-message">10:12 AM</span>
          </div>
          <div className="notification-time">10:12 AM</div>
        </div>

        <div className="notification-item">
          <div className="notification-text">
            <div className="notification-date">21 May 2024</div>
            <span className="notification-message">08:29 AM</span>
          </div>
          <div className="notification-time">08:29 AM</div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default Notification;
