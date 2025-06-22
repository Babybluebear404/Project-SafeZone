import React, { useState, useEffect } from "react";
import "../../../style/dashboard.css";
import { useCookies } from "react-cookie";

export const ProgressBarEmotion = ({ COLORS }) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [recent7Days, setRecent7Days] = useState([]);

  const fetchFeelingData = async (day, token) => {
    try {
      const res = await fetch(
        `https://project-safezone.onrender.com/api/diaries/feeling?day=${day}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const json = await res.json();
      return json.data;
    } catch (error) {
      console.error("Failed to fetch feeling data:", error.message);
    }
  };

  useEffect(() => {
    const loadRecent7Days = async () => {
      if (token) {
        const data = await fetchFeelingData(7, token);
        if (data) {
          const sorted = data.sort((a, b) => new Date(a.date_and_time) - new Date(b.date_and_time));
          const last7Days = [];
          const today = new Date();

          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            const found = sorted.find(item => item.date_and_time.startsWith(dateStr));
            last7Days.push(found || { date_and_time: dateStr, feeling: 0 });
          }

          setRecent7Days(last7Days);
        }
      }
    };
    loadRecent7Days();
  }, [token]);

  const getEmotionLabel = (value) => {
    const labels = ["", "แย่มาก", "ไม่ดีเลย", "ก็ดีนะ", "ดี", "สุดยอด"];
    return labels[value] || "";
  };

  const getEmotionColor = (value) => {
    return value >= 1 && value <= 5 ? COLORS[value - 1] : "#ffffff";
  };

  return (
    <div className="progressBar">
      <h3 className="Title-chart">อารมณ์ 7 วันล่าสุด</h3>
      <div className="progress-bar-container" style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "10px" }}>
        {recent7Days.map((item, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "30px",
                height: "30px",
                backgroundColor: getEmotionColor(item.feeling),
                border: "2px solid black",
                borderRadius: "4px",
              }}
            ></div>
            <div style={{ fontSize: "0.75rem", marginTop: "4px" }}>
              {new Date(item.date_and_time).getDate()}
            </div>
          </div>
        ))}
      </div>
      <div className="progress-legend" style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", backgroundColor: COLORS[0], display: "inline-block" }}></span> แย่มาก
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", backgroundColor: COLORS[1], display: "inline-block" }}></span> ไม่ดีเลย
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", backgroundColor: COLORS[2], display: "inline-block" }}></span> ก็ดีนะ
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", backgroundColor: COLORS[3], display: "inline-block" }}></span> ดี
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ width: "10px", height: "10px", backgroundColor: COLORS[4], display: "inline-block" }}></span> สุดยอด
        </span>
      </div>
    </div>
  );
};