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

    // ฟังก์ชันคำนวณค่าเฉลี่ยของ label
    const calculateAverageMood = (entries) => {
        if (entries.length === 0) return "ไม่มีข้อมูล"; // กรณีไม่มีข้อมูล
        const totalMood = entries.reduce((sum, entry) => sum + entry.label, 0); // คำนวณผลรวมของ label
        const averageMood = totalMood / entries.length; // คำนวณค่าเฉลี่ย
        return averageMood.toFixed(2); // คืนค่าค่าเฉลี่ยที่มีทศนิยม 2 ตำแหน่ง
    };

    // คำนวณค่าเฉลี่ยอารมณ์ในช่วง 3 วัน และ 7 วัน
    const moodAverageLast3Days = calculateAverageMood(filterDataByDays(3));
    const moodAverageLast7Days = calculateAverageMood(filterDataByDays(7));

    return (
        <div className="EmotionSummaryContainer">
            <span className="SummaryTitle">สรุปอารมณ์ที่ผ่านมา</span><br />
            <p className="SummaryText">ค่าเฉลี่ยอารมณ์ในช่วง 3 วันที่ผ่านมา: <strong>{moodAverageLast3Days}</strong></p>
            <p className="SummaryText">ค่าเฉลี่ยอารมณ์ในช่วง 7 วันที่ผ่านมา: <strong>{moodAverageLast7Days}</strong></p>
        </div>
    );
};
