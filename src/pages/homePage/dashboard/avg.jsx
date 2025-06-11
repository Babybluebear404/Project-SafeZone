import React, { useState, useEffect } from "react";
import "../../../style/dashboard.css"
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";

export const AverageEmotion = ({ data, COLORS }) => {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const [averageMood, setAverageMood] = useState(0);
    const [feeling, setFeeling] = useState(null);
    const [aifeeling, setAifeeling] = useState(null);

    const fetchFeelingData = async (token) => {
        try {
            const res = await fetch(`http://localhost:3000/api/diaries/average-feeling?day=7`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }


            const json = await res.json();
            const data = json.data;
            return data;
        } catch (error) {
            console.error("Failed to fetch feeling data:", error.message);
            return [];
        }
    };

    const fetchTodayFeeling = async () => {
        const today = dayjs().format("YYYY-MM-DD"); // รูปแบบวัน: 2025-06-01
        try {
            const res = await fetch(`http://localhost:3000/api/diaries/getdiary?day=${today}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }


            const json = await res.json();
            const data = json.data;
            if (Array.isArray(data) && data.length > 0) {
                setFeeling(data[0].feeling);
                setAifeeling(data[0].aifeeling);
            } else {
                setFeeling(null);
            }

        } catch (error) {
            console.error("Failed to fetch today's feeling:", error.message);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (token) {
                const data = await fetchFeelingData(token);
                setAverageMood(data.averageFeeling || 0);
            }
        };
        loadData();
        fetchTodayFeeling();
    }, [token]);

    const percentage = (averageMood / 5) * 100;


    const getColor = (percentage) => {
        if (percentage <= 20) {
            return `linear-gradient(90deg, #C599B6 0%, ${COLORS[0]} 100%)`;
        }
        if (percentage <= 40) {
            return `linear-gradient(90deg,rgb(223, 160, 143) 0%, ${COLORS[1]} 100%)`;
        }
        if (percentage <= 60) {
            return `linear-gradient(90deg, #F2E2B1 0%, ${COLORS[2]} 100%)`;
        }
        if (percentage <= 80) {
            return `linear-gradient(90deg,rgb(185, 232, 203) 0%, ${COLORS[3]} 100%)`;
        }
        return `linear-gradient(90deg,#C7D9DD 0%, ${COLORS[4]} 100%)`;
    };

    const colorEmoji = ['#D0D0D0', '#E1BBFF', '#ABDCFF', '#FDBA83', '#FF92CD'];

    const averageColor = getColor(percentage);

    const getEmojiIcon = (percentage) => {

        if (percentage <= 20) {
            return <BsEmojiTearFill className="Icon-Emoji" />;
        } else if (percentage <= 40) {
            return <BsEmojiFrownFill className="Icon-Emoji" />;
        } else if (percentage <= 60) {
            return <BsEmojiNeutralFill className="Icon-Emoji" />;
        } else if (percentage <= 80) {
            return <BsEmojiSmileFill className="Icon-Emoji" />;
        } else {
            return <BsEmojiLaughingFill className="Icon-Emoji" />;
        }
    };

    const labelMessage = (rating) => {
        switch (rating) {
            case 5:
                return "สุดยอด";
            case 4:
                return "ดี";
            case 3:
                return "ก็ดีนะ";
            case 2:
                return "ไม่ดีเลย";
            case 1:
                return "แย่มาก";
            default:
                return "รอการป้อนข้อมูล...";
        }
    };

    return (
        <div className="Emotion-Section">
            <div className="emotionThisday" style={{ backgroundColor: colorEmoji[feeling - 1] }}>
                <span className="description-chart">ระดับอารมณ์ของวันนี้</span>
                {getEmojiIcon((feeling * 100) / 5)}
                <span className="description-chart">{labelMessage(feeling)}</span>
            </div>
            <div className="avg-Label" style={{ backgroundImage: averageColor }}>
                <span className="description-chart">ระดับอารมณ์<br/>โดยเฉลี่ยใน 1 สัปดาห์</span>
                {getEmojiIcon(percentage)}
                <span className="description-chart">{averageMood.toFixed(2)}</span>
            </div>
            <div className="avg-Model" style={{ backgroundColor: colorEmoji[aifeeling - 1] }}>
                <span className="description-chart">ผลประเมินระดับอารมณ์จาก AI ของวันนี้</span>
                {getEmojiIcon((aifeeling * 100) / 5)}
                <span className="description-chart">{labelMessage(aifeeling)}</span>
            </div>
        </div>
    )

}