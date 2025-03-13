import dayjs from "dayjs";
import "../../style/HomeLogin.css";

export const EmotionSummary = ({ data }) => {
    const today = dayjs();

    // ฟังก์ชันกรองข้อมูลตามวันที่
    const filterDataByDays = (days) => {
        return data.filter(entry => {
            const entryDate = dayjs(entry.timestamp);
            return entryDate.isAfter(today.subtract(days, 'day'));
        });
    };

    // ฟังก์ชันนับจำนวนวันที่ label < 3
    const countLowMoodDays = (entries) => {
        return entries.filter(entry => entry.label < 3).length;
    };

    // ตรวจสอบการแจ้งเตือนตามเงื่อนไข
    const shouldShowNotification = (lowMoodCount3Days, lowMoodCount7Days) => {
        return (lowMoodCount3Days >= 3 || lowMoodCount7Days > 7);
    };

    // นับจำนวนวันที่ label < 3 ในช่วง 3 วัน และ 7 วัน
    const lowMoodCountLast3Days = countLowMoodDays(filterDataByDays(3));
    const lowMoodCountLast7Days = countLowMoodDays(filterDataByDays(7));

    // ตรวจสอบว่าควรแจ้งเตือนหรือไม่
    const notificationMessage = shouldShowNotification(lowMoodCountLast3Days, lowMoodCountLast7Days)
        ? (lowMoodCountLast3Days >= 3 ? "แนะนำให้ทำแบบทดสอบคัดกรองอารมณ์" : "ขอแนะนำให้ปรึกษาผู้เชี่ยวชาญหรือสายด่วนสุขภาพจิต และลองพูดคุยหรือขอความช่วยเหลือจากคนใกล้ตัว")
        : "ในช่วง 3 หรือ 7 วันที่ผ่านมา label > 3 คุณดูสดใสและมีความสุข ขอให้ทุกวันของคุณเป็นวันที่ดีตลอดไป✨";

    return (
        <div className="EmotionSummaryContainer">
            <span className="SummaryTitle">แจ้งเตือน</span><br />
            <p className="SummaryText"><strong>{notificationMessage}</strong></p>
        </div>
    );
};
