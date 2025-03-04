import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import "../style/Forget.css"; 
const Forget = () => {
  const [form, setForm] = useState({ email_address: "", otp: "" });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", form);

  
    navigate("/ChangePassword");
  };

  const handleResendOTP = () => {
    console.log("Resend OTP clicked");
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
              RESEND
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
