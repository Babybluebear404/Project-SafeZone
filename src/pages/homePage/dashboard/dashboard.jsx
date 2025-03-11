import React, { useState,useEffect } from "react";
import Tab from "../../Tab";
import "../../../style/dashboard.css"
import { PieMonth } from "./pieChart";
import { LineGraph } from "./lineGraph";
import { AverageEmotion } from "./avg";

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const storedData = sessionStorage.getItem("messages");
        if (storedData) {
          setData(JSON.parse(storedData)); 
        } else {
          setData([]);
        }
      }, []);
      
    const COLORS = ["#FF6384", "#FF9F40", "#FFCD56", "#4BC0C0", "#36A2EB"];

    return (
        <div className="Dashboard-Container">
            <Tab />
            <div className="Dashboard-Section">
                <div className="TitleSub">
                    <h1 className="Title">Dashboard</h1>
                    <span>แสดงภาพรวมของระดับอารมณ์ที่คุณได้เลือกไว้ภายใน Diary ในระยะเวลาต่าง ๆ ที่ผ่านมารวมถึงการให้ประเมินระดับอารมณ์จาก Diary ของ AI</span>
                </div>
                <div className="avg-emotionDay">
                    <AverageEmotion 
                        data = {data}
                        COLORS={COLORS}/>
                </div>
                <div className="avg-perWeek">
                    <LineGraph
                        data={data} />
                </div>
                <div className="avg-perMonth">
                    <PieMonth
                        data={data}
                        COLORS={COLORS} />
                </div>
            </div>
            <div className="CF-container">
                <img src="/src/assets/Cat&Fish.png" alt="Cat and Fish" className="CF" />
            </div>
            <div className="cat-tongue-container">
                <img src="/src/assets/CatTongue.png" alt="Cat Tongue" className="cat-tongue" />
            </div>
        </div>

    )
}

export default Dashboard