import React from "react";
import { FcGoogle } from "react-icons/fc";
import { SiLine } from "react-icons/si";  
import { useNavigate } from "react-router-dom"; 
import "./Login.css";

const Login = () => {
  const navigate = useNavigate(); 

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    
  };

  const handleLineLogin = () => {
    console.log("Line login clicked");
    
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    console.log("Email login submitted");
    
    navigate("/HomeLogin");
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="text-6xl font-bold text-navy-900">Login</h1>
        <p className="text-lg text-gray-800">
          Welcome back! Select method to log in:
        </p>
        <div className="iconContainer">
          <div className="iconWrapper" onClick={handleGoogleLogin}>
            <FcGoogle size={32} />
          </div>
          <div className="iconWrapper" onClick={handleLineLogin}>
            <SiLine size={32} color="#00C300" />
          </div>
        </div>
        <p className="orText">_________or continue with email_________</p>
        <form onSubmit={handleEmailLogin} className="form">
          <input type="email" placeholder="Email" className="input" required />
          <input type="password" placeholder="Password" className="input" required />
          <div className="options-center">
            <span>Remember me</span>
            <a href="/forget" className="link">
              Forget Password
            </a>
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
        <p className="signup">
          Don’t have an account? <a href="/register" className="link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
