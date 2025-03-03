import React, { useState } from "react";
import Tab from "./Tab";
import "./dashboard.css"
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";


const Dashboard = () => {
    const data = [
        { date: "2025-02-20", label: 3 },
        { date: "2025-02-21", label: 4 },
        { date: "2025-02-22", label: 2 },
        { date: "2025-02-23", label: 4 },
        { date: "2025-02-24", label: 3 },
        { date: "2025-02-25", label: 4 },
        { date: "2025-02-26", label: 5 },
    ];

    const averageMood = data.reduce((sum, entry) => sum + entry.label, 0) / data.length;
    const percentage = (averageMood / 5) * 100;

    const getColor = (percentage) => {
        if (percentage <= 20) return "#FF0000"; // แดง
        if (percentage <= 40) return "#FF8000"; // ส้ม
        if (percentage <= 60) return "#FFFF00"; // เหลือง
        if (percentage <= 80) return "#00FF00"; // เขียว
        return "#008000"; // เขียวเข้ม
    };

    const averageColor = getColor(percentage);

    const getEmojiIcon = (percentage) => {
        
        if (percentage <= 20) {
            return <BsEmojiTearFill />;
        } else if (percentage <= 40) {
            return <BsEmojiFrownFill />;
        } else if (percentage <= 60) {
            return <BsEmojiNeutralFill />;
        } else if (percentage <= 80) {
            return <BsEmojiSmileFill />;
        } else {
            return <BsEmojiLaughingFill />;
        }
    };
    const aggregatedData = data.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === `ระดับ ${curr.label}`);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: `ระดับ ${curr.label}`, value: 1 });
        }
        return acc;
    }, []);

    const COLORS = ["#FF6384", "#FF9F40", "#FFCD56", "#4BC0C0", "#36A2EB"];

    return (
        <div className="Dashboard-Container">
            <Tab />
            <div className="Dashboard-Section">
                <h1 className="Title">Dashboard</h1>
                <div className="avg-emotionDay" style={{ backgroundColor: averageColor }}>
                    <a>อารมณ์ส่วนใหญ่โดยเฉลี่ย</a>
                    <p className="text-lg font-medium">ค่าเฉลี่ยอารมณ์: {averageMood.toFixed(2)} ({percentage.toFixed(2)}%)</p>
                    {getEmojiIcon(percentage)}
                </div>
                <div className="avg-perWeek">
                    <a>1 Week</a>
                    <div className="weekLineChart">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis domain={[1, 5]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="label" stroke="#8884d8" strokeWidth={2} dot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="avg-perMonth">
                    <a>1 Month</a>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={aggregatedData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {aggregatedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

    )
}

export default Dashboard