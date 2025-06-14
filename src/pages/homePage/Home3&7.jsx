import { useState, useEffect } from "react";
import "../../style/HomeLogin.css";
import { useCookies } from "react-cookie";


export const EmotionSummary = () => {
    const [labelCount, setLabelCount] = useState([]);
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const fetchFeelingData = async (day, token) => {
        try {
            const res = await fetch(`https://project-safezone.onrender.com/api/diaries/feeling?day=${day}`, {
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
            return data
        } catch (error) {
            console.error("Failed to fetch feeling data:", error.message);
        }
    };

    useEffect(() => {
    if (token) {
        const loadData = async () => {
            try {
                const data = await fetchFeelingData(7, token);
                setLabelCount(data); 
            } catch (error) {
                
            }
        };
        loadData();
    }
}, [token]);

    // ฟังก์ชันนับจำนวนวันที่ label < 3
    const countLowMoodDays = (entries) => {
        return entries.filter(entry => entry.feeling < 3).length;
    };

    // ตรวจสอบการแจ้งเตือนตามเงื่อนไข
    const shouldShowNotification = (lowMoodCount3Days, lowMoodCount7Days) => {
        return (lowMoodCount3Days >= 3 || lowMoodCount7Days > 7);
    };

    // นับจำนวนวันที่ label < 3 ในช่วง 3 วัน และ 7 วัน
    const lowMoodCountLast3Days = countLowMoodDays(labelCount);
    const lowMoodCountLast7Days = countLowMoodDays(labelCount);

    //random no notification
    const getRandomPositiveMessage = () => {
        const positiveMessages = [
            "ขอให้ทุกวันของคุณเป็นวันที่ดีตลอดไป✨",
            "ขอให้วันนี้เต็มไปด้วยรอยยิ้มและความสุข 😊",
            "ขอให้คุณเจอเรื่องดี ๆ และพลังบวกในทุกวัน 🌈",
            "ขอให้หัวใจของคุณเบิกบานเสมอ 💖",
            "ขอให้ชีวิตคุณเปล่งประกายเหมือนดวงดาว ✨",
            "ขอให้คุณมีความสุขในทุกย่างก้าวของชีวิต 🚶‍♀️🌸",
            "ขอให้ความฝันของคุณกลายเป็นจริงในเร็ววัน ✨",
            "ขอให้วันนี้เป็นวันที่เต็มไปด้วยแรงบันดาลใจ 🚀",
            "ขอให้คุณพบแต่สิ่งดี ๆ และผู้คนที่จริงใจ 💬",
            "ขอให้สุขภาพแข็งแรงและจิตใจสงบสุข 🧘‍♀️",
            "ขอให้คุณมีพลังใจสู้กับทุกปัญหา 🛡️",
            "ขอให้ความรักโอบกอดหัวใจคุณในทุกวัน ❤️",
            "ขอให้คุณมีแต่โชคดีและสมหวังในทุกเรื่อง 🍀",
            "ขอให้ทุกความพยายามของคุณสำเร็จดังใจหวัง 🏆",
            "ขอให้คุณเป็นแสงสว่างให้กับตัวเองและคนรอบข้าง 🌟"
        ];

        const randomIndex = Math.floor(Math.random() * positiveMessages.length);
        return positiveMessages[randomIndex];
    };
    // ตรวจสอบว่าควรแจ้งเตือนหรือไม่
    const notificationMessage = shouldShowNotification(lowMoodCountLast3Days, lowMoodCountLast7Days)
        ? (lowMoodCountLast3Days >= 3 ? "แนะนำให้ทำแบบทดสอบเช็กสุขภาพใจนะ" : "ขอแนะนำให้ปรึกษาผู้เชี่ยวชาญหรือสายด่วนสุขภาพจิต และลองพูดคุยหรืออาจขอความช่วยเหลือจากคนใกล้ตัว")
        : getRandomPositiveMessage();

    return (
        <div className="EmotionSummaryContainer">
            <span className="SummaryTitle">วันนี้อยากจะบอกว่า</span><br />
            <p className="SummaryText"><strong>{notificationMessage}</strong></p>
        </div>
    );
};
