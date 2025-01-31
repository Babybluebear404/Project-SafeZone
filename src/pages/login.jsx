import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiLine } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import "./Login.css";
import liff from '@line/liff' ;


const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Token:", tokenResponse);

      try {
        const res = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
        );
        const user = await res.json();
        console.log("Google User Info:", user);

        localStorage.setItem("user", JSON.stringify(user));

        navigate("/HomeLogin");
      } catch (err) {
        console.error("Fetch error:", err);
      }
    },
    onError: () => console.log("Google Login Failed"),
  });

  useEffect(()=>{
    liff.init({liffId:'2006838508-WR0kK6DG'})
  },[])

  const handleLineLogin = () => {
    try{
      liff.login()
    }catch(err){
      console.log(err)
    }
  }

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
            <a href="/forget" className="link">Forget Password</a>
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
