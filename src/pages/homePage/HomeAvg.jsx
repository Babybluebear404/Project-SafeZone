import React, { useState, useEffect } from "react";
import "../../style/dashboard.css";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";

export const AverageEmotion = ({ data, COLORS }) => {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const [feeling, setFeeling] = useState(null);

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

            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                setFeeling(data[0].feeling);
            } else {
                setFeeling(null);
            }

        } catch (error) {
            console.error("Failed to fetch today's feeling:", error.message);
        }
    };
    useEffect(() => {
        if (token) {
            fetchTodayFeeling();
        }
    }, [token]);

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

    const getEmojiIcon = (percentage) => {
        if (percentage <= 20) {
            return <BsEmojiTearFill className="Icon-Feeling" />;
        } else if (percentage <= 40) {
            return <BsEmojiFrownFill className="Icon-Feeling" />;
        } else if (percentage <= 60) {
            return <BsEmojiNeutralFill className="Icon-Feeling" />;
        } else if (percentage <= 80) {
            return <BsEmojiSmileFill className="Icon-Feeling" />;
        } else {
            return <BsEmojiLaughingFill className="Icon-Feeling" />;
        }
    };

    const labelMessage = (rating) => {
        switch (rating) {
            case 5:
                return "Answer";
            case 4:
                return "Good";
            case 3:
                return "Alright";
            case 2:
                return "Bad";
            case 1:
                return "Awful";
            default:
                return "NaN";
        }
    };

    return (
        <div className="EmotionWrapper">
            <div className="EmotionDay" style={{ backgroundColor: colorEmoji[feeling] }}>
                <span className="description-chart">ระดับอารมณ์ล่าสุดของวันนี้</span>
                {getEmojiIcon((feeling * 100) / 5)}
                <span className="description-chart">{labelMessage(feeling)}</span>
            </div>
        </div>
    )
}