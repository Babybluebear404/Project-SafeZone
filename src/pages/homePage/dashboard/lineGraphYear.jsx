
import React, { useState } from "react";
import { BarChart, CartesianGrid, Legend, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../../../style/dashboard.css";
import dayjs from "dayjs";

export const LineGraphYear = ({ data, COLORS }) => {
    const today = new Date();
    let thisDay = today.getDate();
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();
    const [selected, setSelected] = useState("twoWeekAgo");

    // คำนวณจำนวนวันที่เลือกจาก dropdown
    const getDaysAgo = (selectedOption) => {
        switch (selectedOption) {
            case "twoWeekAgo":
                return 14;
            case "oneMonthAgo":
                return 30;
            case "threeMonthAgo":
                return 90;
            case "sixMonthAgo":
                return 180;
            case "oneYearAgo":
                return 365;
            default:
                return 0;
        }
    };

    const getMonthName = (name) => {
        const monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        return monthNames[name < 0 ? 11 : name];
    };

    const thisMonthName = getMonthName(thisMonth);

    const isLeapYear = (year) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const getLastDays = (month, year) => {
        if ([0, 2, 4, 6, 7, 9, 11].includes(month)) {
            return 31;
        } else if (month === 1) { // กุมภาพันธ์
            return isLeapYear(year) ? 29 : 28;
        } else {
            return 30;
        }
    };

    const getSinceBegin = (thisDay, thisMonth, thisYear, selectedOption) => {
        let dayBegin = thisDay;
        let monthBegin = thisMonth;
        let yearBegin = thisYear;
        const daysAgo = getDaysAgo(selectedOption);

        for (let i = 0; i < daysAgo; i++) {
            dayBegin--;
            if (dayBegin <= 0) {
                monthBegin--;
                if (monthBegin < 0) {
                    monthBegin = 11; // ย้อนกลับไปเดือนธันวาคม
                    yearBegin--;
                }
                dayBegin = getLastDays(monthBegin, yearBegin);
            }
        }

        return { dayBegin, monthBegin, yearBegin };
    };

    const { dayBegin, monthBegin, yearBegin } = getSinceBegin(thisDay, thisMonth, thisYear, selected);
    const monthBeginName = getMonthName(monthBegin);

    // ฟังก์ชันกรองข้อมูลตามจำนวนวันย้อนหลัง
    const filterData = (data, selectedOption) => {
        const today = dayjs();
        const lastDays = getDaysAgo(selectedOption);
        const filteredData = [];

        for (let i = 0; i < lastDays; i += 1) {
            const date = today.subtract(i, 'day').format('YYYY-MM-DD'); // ลดวันย้อนหลัง
            const found = data.find(d => dayjs(d.timestamp).format('YYYY-MM-DD') === date);
            if (found) {
                filteredData.push(found);
            }
        }

        return filteredData.reverse();
    };

    const filteredData = filterData(data, selected);

    const countLabelsPerMonth = (data) => {
        const counts = {};

        data.forEach(item => {
            const monthKey = dayjs(item.timestamp).format("YYYY-MM");
            const label = item.label; // ค่าของ label ที่เป็น 1-5

            if (!counts[monthKey]) {
                counts[monthKey] = { month: monthKey, label1: 0, label2: 0, label3: 0, label4: 0, label5: 0 };
            }

            if (label >= 1 && label <= 5) {
                counts[monthKey][`label${label}`] += 1;
            }
        });

        return Object.values(counts);
    };

    const labelColors = {
        1: COLORS[0],
        2: COLORS[1],
        3: COLORS[2],
        4: COLORS[3],
        5: COLORS[4]
    };

    const labelCounts = countLabelsPerMonth(filteredData);

    const handleSelectChange = (e) => {
        setSelected(e.target.value);
    };

    return (
        <div className="lineGraph">
            <span className="Title-chart">กราฟแท่งแสดงอารมณ์ในแต่ละเดือนที่ผ่านมาย้อนหลัง 1 ปี</span>
            <div>
                <label htmlFor="dropdown">เลือกจำนวนวันย้อนหลัง:</label>
                <select id="dropdown" value={selected} onChange={handleSelectChange}>
                    <option value="twoWeekAgo">2 สัปดาห์ที่ผ่านมา</option>
                    <option value="oneMonthAgo">1 เดือนที่ผ่านมา</option>
                    <option value="threeMonthAgo">3 เดือนที่ผ่านมา</option>
                    <option value="sixMonthAgo">6 เดือนที่ผ่านมา</option>
                    <option value="oneYearAgo">1 ปีที่ผ่านมา</option>
                </select>
            </div>
            <div className="yearLineChart">
                <ResponsiveContainer width={500} height={300}>
                    <BarChart
                        data={labelCounts}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                             dataKey="month"
                             tickFormatter={(month) => dayjs(month).format("MMM YYYY")}
                        />
                        <YAxis domain={[0, "auto"]} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="label1" fill={labelColors[1]} name="Awful" />
                        <Bar dataKey="label2" fill={labelColors[2]} name="Bad" />
                        <Bar dataKey="label3" fill={labelColors[3]} name="Alright" />
                        <Bar dataKey="label4" fill={labelColors[4]} name="Good" />
                        <Bar dataKey="label5" fill={labelColors[5]} name="Awesome" />
                    </BarChart>
                </ResponsiveContainer>
                <p></p>
                <span className="description-chart">แสดงข้อมูลตั้งแต่วันที่ {dayBegin} {monthBeginName} {yearBegin} ถึงวันที่ {thisDay} {thisMonthName}</span>
            </div>
        </div>
    );
};
