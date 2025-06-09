import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "../style/ChangePassword.css";
import { useCookies } from "react-cookie";
import axios from "axios"; // ใช้ axios เพื่อยิง API
import { toast } from 'react-toastify';


const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cookies, removeCookie] = useCookies(["token"]);

  const handleConfirm = async () => {
    const token = cookies.tokenforget;
    if (!token) {
      alert("No saved token found. Please try again.");
      return;
    }

    if (newPassword !== confirmPassword || newPassword.length === 0) {
      toast.warning("Passwords do not match or are empty!",
        {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
        });
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

      toast.success("Password changed successfully!",
        {
          position: "top-center",
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true
        });

      setNewPassword(""); // ✅ เคลียร์ state
      setConfirmPassword("");
      removeCookie("tokenforget");
      navigate("/login"); // ✅ นำทางไปหน้า Login หลังเปลี่ยนรหัสผ่านสำเร็จ
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data.error);
        toast.error("Something went wrong.",
          {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
      } else if (error.request) {
        toast.error("Something went wrong.",
          {
            position: "top-center",
            autoClose: 2000,
            closeButton: false,
            hideProgressBar: true,
          });
        console.error("❌ No Response from Server:", error.request);
      } else {
        // ❌ Error อื่นๆ เช่น Axios ตั้งค่าผิดพลาด
        console.error("❌ Request Setup Error:", error.message);
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
