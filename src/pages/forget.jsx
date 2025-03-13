import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ใช้ axios เพื่อยิง API
import "../style/Forget.css";

const Forget = () => {
  const [form, setForm] = useState({ email_address: "", otp: "" });
  const [message, setMessage] = useState(""); // เก็บข้อความแจ้งเตือน
  const navigate = useNavigate();

  // จัดการการเปลี่ยนแปลงของ input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ส่ง OTP ไปยังอีเมลที่กรอก
  const handleResendOTP = async () => {
    if (!form.email_address) {
      setMessage("กรุณากรอกอีเมลก่อนส่ง OTP!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/send-otp", {
        email: form.email_address,
      });

      setMessage("OTP ถูกส่งไปยังอีเมลของคุณแล้ว!");
      console.log("OTP Response:", response.data);
    } catch (error) {
      setMessage("เกิดข้อผิดพลาดในการส่ง OTP");
      console.error("OTP Error:", error);
    }
  };

  // ตรวจสอบ OTP ตอนกด Confirm
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", form);

    try {
      const response = await axios.post("http://localhost:3000/verify-otp", {
        email: form.email_address,
        otp: form.otp,
      });

      setMessage("OTP ถูกต้อง! กำลังเปลี่ยนรหัสผ่าน...");
      navigate("/ChangePassword"); // ถ้า OTP ถูกต้อง นำทางไปเปลี่ยนรหัสผ่าน
    } catch (error) {
      setMessage("OTP ไม่ถูกต้อง หรือหมดอายุ");
      console.error("Verify OTP Error:", error);
    }
  };

  return (
    <div className="forget-box">
      <h1 className="forget-title">Forget Password</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="forget-form">
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email_address"
            placeholder="Email Address"
            value={form.email_address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="text"
            name="otp"
            placeholder="OTP from Email"
            value={form.otp}
            onChange={handleChange}
            required
          />
        </div>
        <p className="resend-text">
          Didn’t receive OTP?{" "}
          <span className="resend-link" onClick={handleResendOTP}>
            SEND OTP
          </span>
        </p>
        <button type="submit" className="confirm-button">
          Confirm
        </button>
      </form>
      <p className="login-link">
        I remember my password? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Forget;
