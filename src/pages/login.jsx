import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiLine } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import "../style/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      //console.log("Google Token:", tokenResponse);

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

        if (data.token) {
          // Switch from sessionStorage to localStorage
          localStorage.setItem("token", data.token);
          try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/questions/getquestion", { 
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
              }
            });
            const data = await response.json();
            if(data.qusetion){
              navigate("/HomeLogin");
            } else {
              navigate("/depression-screening");
            }
          } catch (error) {
            console.error("Error", error.message);
          }
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
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/HomeLogin");
    }
  }, [navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

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

      if (response.ok) {
        const data = await response.json(); 
        console.log("✅ Success:", data.message);
        localStorage.setItem("token", data.token); 
        try {
          const token = localStorage.getItem("token");
          const response = await fetch("http://localhost:3000/api/questions/getquestion", { 
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            }
          });
          const data = await response.json();
          if(data.qusetion){
            navigate("/HomeLogin");
          } else {
            navigate("/depression-screening");
          }
        } catch (error) {
          console.error("Error", error.message);
        }
      } else {
        const errorData = await response.json();
        console.error("❌ Error:", errorData.error);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
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
            <p>Login with Google</p>
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
