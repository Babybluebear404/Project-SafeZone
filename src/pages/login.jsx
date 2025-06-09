import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
// import { SiLine } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from 'react-toastify';
import "../style/Login.css";
// import liff from '@line/liff';
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode"; // ใช้สำหรับถอดรหัส JWT


const Login = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [statuslogin, setsatuslogin] = useState(false);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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

        if (res.ok) {
          const json = await res.json();
          if (!json.token) {
            throw new Error("Missing token from response");
          }

          const decoded = jwtDecode(json.token);
          const expirationDate = new Date(decoded.exp * 1000); // แปลงจาก Unix Timestamp เป็น Date

          toast.success("Login successful",
            {
              position: "top-center",
              autoClose: 2000,
              closeButton: false,
            });

          setCookie("token", json.token, { path: "/", expires: expirationDate });
          setsatuslogin(true);
        } else {
          toast.error(`"Login failed:" ${errorData.error}`, {
            position: "top-center",
            autoClose: 2000,
            closeButton: false
          });
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    },
    onError: () => console.log("Google Login Failed"),
  });

  useEffect(() => {
    let token = cookies.token;
    if (!token || token === "undefined" || token === "null" || token === "text") {
      token = "";
    }

    if (token) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/questions/getquestion", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          const json = await response.json();
          const data = json.data;
          if (data) {
            navigate("/HomeLogin");
          } else {
            navigate("/depression-screening");
          }
        } catch (error) {
          console.error("Error", error.message);
        }
      };

      fetchData();
    }
  }, [statuslogin, cookies.token, navigate]);

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

        const json = await response.json();
        const data = json.data;

        // ⬇️ ถอดรหัส JWT เพื่อดึงเวลา "exp"
        const decoded = jwtDecode(data.token);
        const expirationDate = new Date(decoded.exp * 1000); // แปลงจาก Unix Timestamp เป็น Date

        // ⬇️ เก็บ Token ไว้ใน Cookie และตั้งค่าให้หมดอายุพร้อม Token
        setCookie("token", data.token, { path: "/", expires: expirationDate });
        setsatuslogin(true);
        toast.success("Login successful",
          {
            position: "top-center",
            autoClose: 500,
            closeButton: false,
          });
      } else {
        toast.error("Incorrect email or password.", {
          position: "top-center",
          autoClose: 2000,
          closeButton: false
        });
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
