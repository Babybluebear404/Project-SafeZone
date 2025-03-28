import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "../style/ChangePassword.css";
import { useCookies } from "react-cookie";
import axios from "axios"; // ใช้ axios เพื่อยิง API

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, removeCookie] = useCookies(["token"]);

  const handleConfirm = async () => {
    const token = cookies.tokenforget;
    console.log(cookies.tokenforget);
    if (!token) {
        alert("No saved token found. Please try again.");
        return;
    }

    if (newPassword !== confirmPassword || newPassword.length === 0) {
        alert("Passwords do not match or are empty!");
        return;
    }

    try {
        const response = await axios.put(
            "http://localhost:3000/api/users/change",
            {
                newPassword: newPassword,  // ✅ ถ้ามี oldPassword ต้องเพิ่มตรงนี้
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // ✅ ส่ง Token ไป
                },
            }
        );

        alert(response.data.message); // ✅ API ส่ง response กลับมา ใช้ response.data.message
        setNewPassword(""); // ✅ เคลียร์ state
        setConfirmPassword("");
        removeCookie("tokenforget");
        navigate("/login"); // ✅ นำทางไปหน้า Login หลังเปลี่ยนรหัสผ่านสำเร็จ
    } catch (error) {
        if (error.response) {
            // ❌ เซิร์ฟเวอร์ส่ง response กลับมา แต่มี error (เช่น 400, 500)
            console.error("❌ Server Error:", error.response.data.error);
            alert(error.response.data.error);
        } else if (error.request) {
            // ❌ Request ถูกส่งออกไป แต่ไม่มี response (เช่น เซิร์ฟเวอร์ดับ)
            console.error("❌ No Response from Server:", error.request);
            alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
        } else {
            // ❌ Error อื่นๆ เช่น Axios ตั้งค่าผิดพลาด
            console.error("❌ Request Setup Error:", error.message);
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
        }
    }
  };

  return (
    <div className="change-password-container">
      <div className="card">
        <h1 className="title">Change Password</h1>
        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-field"
          />
          <FaLock className="icon" />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
          <FaLock className="icon" />
        </div>
        <button className="confirm-button" onClick={handleConfirm}>
          Confirm
        </button>
        <p className="redirect-text">
          I remember my password.{" "}
          <span onClick={() => navigate("/login")} className="login-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ChangePassword;
