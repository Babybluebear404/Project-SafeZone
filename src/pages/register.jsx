import React, { useState } from "react";
import "./register.css"; 
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", passwordConfirm: "" });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    
    navigate("/depression-screening");
  };

  return ( 
    <div className="signup-box">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="inputLogin-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Password Confirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            required
          />
        </div>
        <div className="terms">
          <input type="checkbox" required />
          <label>I agree to the terms and conditions</label>
        </div>
        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>
      <p className="alreadyTxt">
        Already have an account? <a href="/login" >Login</a>
      </p>
    </div>
  );
};

export default SignUp;
