import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiLine } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";
import liff from '@line/liff';


const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Token:", tokenResponse);

      try {
        const res = await fetch("http://localhost:3000/api/users/google-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_token: tokenResponse.access_token,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Server Response:", data);

        if (data.token) {
          sessionStorage.setItem("user", JSON.stringify(data.user));
          sessionStorage.setItem("token", data.token);

          navigate("/HomeLogin");
        } else {
          console.error("Login failed:", data.error);
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    },
    onError: () => console.log("Google Login Failed"),
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");

    if (user && token) {
      navigate("/HomeLogin");
    }
  }, [navigate]);

  useEffect(() => {
    liff.init({ liffId: '2006838508-WR0kK6DG' })
  }, [])

  const handleLineLogin = () => {
    try {
      liff.login()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    console.log("e.target:", e.target);

    const email = e.target.email ? e.target.email.value : '';
    const password = e.target.password ? e.target.password.value : '';

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:3000/api/users/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json(); // แปลง response เป็น JSON

      if (!response.ok) {
        throw new Error(data.message || "Login failed!");
      }

      console.log("Login successful:", response.data);
      sessionStorage.setItem("token", response.data.token);

      navigate("/HomeLogin");
    } catch (error) {
      console.error("Error logging in:", error.response?.data?.message || error.message);
    }
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
          <input type="email" name="email" placeholder="Email" className="input" required />
          <input type="password" name="password" placeholder="Password" className="input" required />
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