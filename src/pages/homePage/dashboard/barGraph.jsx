import React, { useState, useEffect } from "react";
import { BarChart, CartesianGrid, Legend, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";
import "../../../style/dashboard.css";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";

export const LineGraphYear = ({ data, COLORS }) => {

    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const today = new Date();
    let thisDay = today.getDate();
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();
    const [selected, setSelected] = useState("twoWeekAgo");
    const [filteredData, setFilteredData] = useState([]);

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
            return data;
        } catch (error) {
            console.error("Failed to fetch feeling data:", error.message);
        }
    };

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

    useEffect(() => {
        const loadData = async () => {
            if (token && selected) {
                const days = getDaysAgo(selected);
                const data = await fetchFeelingData(days, token);
                if (data) {
                    setFilteredData(data);
                }
            }
        };

        loadData();
    }, [token, selected]);


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

    const countLabelsPerMonth = (data) => {
        const counts = {};

        data.forEach(item => {
            const monthKey = dayjs(item.date_and_time).format("YYYY-MM");
            const label = item.feeling; // ค่าของ label ที่เป็น 1-5

            if (!counts[monthKey]) {
                counts[monthKey] = { month: monthKey, label1: 0, label2: 0, label3: 0, label4: 0, label5: 0 };
            }

            if (label >= 1 && label <= 5) {
                counts[monthKey][`label${label}`] += 1;
            }
        });

        return Object.values(counts).sort((a, b) => a.month.localeCompare(b.month));
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
            <span className="Title-chart">กราฟแสดงความถี่ของแต่ละระดับอารมณ์ในแต่ละเดือน</span>
            <div className="dropdownChartSelected">
                <label htmlFor="dropdown">เลือกช่วงเวลาย้อนหลัง:</label>
                <select id="dropdown" className="dropdown" value={selected} onChange={handleSelectChange}>
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
                            height={50} 
                            tick={{ dy: 10 }}
                            >
                            <Label
                                value="เดือนที่บันทึกไดอารี่"
                                className="description-chart"
                                dy={20}
                                position="Bottom" />
                        </XAxis>

                        <YAxis domain={[0, "auto"]} >
                            <Label
                                value="ความถี่ของแต่ละระดับอารมณ์"
                                angle={-90}
                                dx={-22}
                                className="description-chart"
                            />
                        </YAxis>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="label1" fill={labelColors[1]} name="แย่มาก"  />
                        <Bar dataKey="label2" fill={labelColors[2]} name="ไม่ดีเลย" />
                        <Bar dataKey="label3" fill={labelColors[3]} name="ก็ดีนะ" />
                        <Bar dataKey="label4" fill={labelColors[4]} name="ดี" />
                        <Bar dataKey="label5" fill={labelColors[5]} name="สุดยอด" />
                    </BarChart>
                </ResponsiveContainer>
                <p></p>
                <span className="description-chart">แสดงข้อมูลตั้งแต่วันที่ {dayBegin} {monthBeginName} {yearBegin} ถึงวันที่ {thisDay} {thisMonthName}</span>
            </div>
        </div>
    );
};
