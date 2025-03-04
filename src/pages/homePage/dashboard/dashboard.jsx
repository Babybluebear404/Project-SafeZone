import React, { useState } from "react";
import Tab from "../../Tab";
import "../../../style/dashboard.css"
import { PieMonth } from "./pieChart";
import { LineGraph } from "./lineGraph";
import { AverageEmotion } from "./avg";

const Dashboard = () => {
    const data = [
        { date: "2025-01-01", label: 1 },
        { date: "2025-02-20", label: 3 },
        { date: "2025-02-21", label: 4 },
        { date: "2025-02-22", label: 2 },
        { date: "2025-02-23", label: 4 },
        { date: "2025-02-24", label: 3 },
        { date: "2025-02-25", label: 4 },
        { date: "2025-02-26", label: 5 },
    ];
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
        </div>

    )
}

export default Dashboard