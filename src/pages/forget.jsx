import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ใช้ axios เพื่อยิง API
import "../style/Forget.css";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode"; // ใช้สำหรับถอดรหัส JWT
import { toast } from 'react-toastify';


const Forget = () => {
  const [form, setForm] = useState({ email_address: "", otp: "" });
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  // จัดการการเปลี่ยนแปลงของ input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ส่ง OTP ไปยังอีเมลที่กรอก
  const handleResendOTP = async () => {
    if (!form.email_address) {
      toast.warning("Please enter your email before sending the OTP!",
        {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
        });
      return;
    }

    try {
      await axios.post("https://project-safezone.onrender.com/api/otps/send-otp", {
        email: form.email_address,
      });

      toast.success("An OTP has been sent to your email address.",
        {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
        });
    } catch (error) {
      toast.error("An error occurred while sending the OTP.", {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
      });
      console.error("OTP Error:", error);
    }
  };

  // ตรวจสอบ OTP ตอนกด Confirm
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 ตรวจสอบ OTP ก่อน
      await axios.post("https://project-safezone.onrender.com/api/otps/verify-otp", {
        email: form.email_address,
        otp: form.otp,
      });

      toast.success("The OTP is correct! Changing your password…",
        {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
        });

      // 🔹 ขอ Token สำหรับเปลี่ยนรหัสผ่าน
      const response = await axios.post("https://project-safezone.onrender.com/api/users/forgot", {
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
        console.error("Error:", error.response.data.error);
        toast.error("The OTP is incorrect.",
          {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
      } else {
        console.error("Unexpected Error:", error.message);
        toast.error("Something went wrong.",
          {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
      }
    }
  };


  return (
    <div className="forget-box">
      <h1 className="forget-title">Forget Password</h1>
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
        I remember my password? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default Forget;
