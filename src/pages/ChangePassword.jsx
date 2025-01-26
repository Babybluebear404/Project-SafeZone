import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "./ChangePassword.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirm = () => {
    if (newPassword === confirmPassword && newPassword.length > 0) {
      alert("Password changed successfully!");
      navigate("/login");
    } else {
      alert("Passwords do not match or are empty!");
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
