import React, { useState } from "react";
import { CartesianGrid, ReferenceLine, Area, XAxis, YAxis, AreaChart, Tooltip, ResponsiveContainer } from "recharts";
import "../../../style/dashboard.css";
import dayjs from "dayjs";

export const LineGraph = ({ data }) => {
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

    const handleSelectChange = (e) => {
        setSelected(e.target.value);
    };

    return (
        <div className="lineGraph">
            <span className="Title-chart">กราฟแสดงอารมณ์ที่ผ่านมาย้อนหลัง</span>
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
            <div className="weekLineChart">
                <ResponsiveContainer width={450} height={300}>
                    <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(date) => new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                        />
                        <YAxis domain={[1, 5]} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                        <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="label" stroke="#57a3d5" fill="#57a3d5" />
                    </AreaChart>
                </ResponsiveContainer>
                <span className="description-chart">
                    แสดงข้อมูลตั้งแต่วันที่ {dayBegin} {monthBeginName} {yearBegin} ถึงวันที่ {thisDay} {thisMonthName}
                </span>
            </div>
        </div>
    );
};
