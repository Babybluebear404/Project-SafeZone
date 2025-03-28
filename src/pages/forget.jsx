import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ใช้ axios เพื่อยิง API
import "../style/Forget.css";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode"; // ใช้สำหรับถอดรหัส JWT

const Forget = () => {
  const [form, setForm] = useState({ email_address: "", otp: "" });
  const [message, setMessage] = useState(""); // เก็บข้อความแจ้งเตือน
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
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
      await axios.post("http://localhost:3000/api/otps/send-otp", {
        email: form.email_address,
      });

      setMessage("OTP ถูกส่งไปยังอีเมลของคุณแล้ว!");
    } catch (error) {
      setMessage("เกิดข้อผิดพลาดในการส่ง OTP");
      console.error("OTP Error:", error);
    }
  };

  // ตรวจสอบ OTP ตอนกด Confirm
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 ตรวจสอบ OTP ก่อน
      await axios.post("http://localhost:3000/api/otps/verify-otp", {
        email: form.email_address,
        otp: form.otp,
      });

      setMessage("✅ OTP ถูกต้อง! กำลังเปลี่ยนรหัสผ่าน...");

      // 🔹 ขอ Token สำหรับเปลี่ยนรหัสผ่าน
      const response = await axios.post("http://localhost:3000/api/users/forgot", {
        email: form.email_address,
      });

      // ✅ axios คืนค่า JSON ตรงๆ → ใช้ response.data ได้เลย
      const { token } = response.data;

      // 🔹 ถอดรหัส JWT เพื่อดึงเวลา "exp"
      const decoded = jwtDecode(token);
      const expirationDate = new Date(decoded.exp * 1000); // แปลง Unix Timestamp เป็น Date

      // 🔹 เก็บ Token ใน Cookie พร้อมกำหนด path และหมดอายุ
      setCookie("tokenforget", token, { path: "/ChangePassword", expires: expirationDate });

      // 🔹 นำทางไปหน้าเปลี่ยนรหัสผ่าน
      navigate("/ChangePassword");
    } catch (error) {
      if (error.response) {
        console.error("❌ Error:", error.response.data.error);
        setMessage(error.response.data.error || "เกิดข้อผิดพลาด");
      } else {
        console.error("❌ Unexpected Error:", error.message);
        setMessage("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
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
