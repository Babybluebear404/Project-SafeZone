import React, { useState, useEffect } from "react";
import { CartesianGrid, ReferenceLine, Area, XAxis, YAxis, AreaChart, Tooltip, ResponsiveContainer, Label } from "recharts";
import "../../../style/dashboard.css";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";

export const LineGraph = ({ data }) => {

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
                    const sortedData = data.sort((a, b) => new Date(a.date_and_time) - new Date(b.date_and_time));
                    setFilteredData(sortedData);
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

    const handleSelectChange = (e) => {
        setSelected(e.target.value);
    };

    return (
        <div className="lineGraph">
            <span className="Title-chart">กราฟแสดงอารมณ์ที่ผ่านมาย้อนหลัง</span>
            <div className="dropdownChartSelected">
                <label htmlFor="dropdown">เลือกจำนวนวันย้อนหลัง:</label>
                <select id="dropdown" className="dropdown" value={selected} onChange={handleSelectChange}>
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
                            dataKey="date_and_time"
                            tickFormatter={(date) =>
                                new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
                            }
                            height={50} 
                        >
                            <Label 
                                value="วันที่ที่บันทึกไดอารี่"
                                dy= {0}
                                className="description-chart"
                                position="insideBottom" />
                        </XAxis>
                        <YAxis 
                            domain={[1, 5]} 
                            tickFormatter={(value) => {
                                const labels = ['', 'แย่มาก', 'ไม่ดีเลย', 'ก็ดีนะ', 'ดี', 'สุดยอด'];
                                return labels[value] || '';
                            }}
                            ticks={[1, 2, 3, 4, 5]}
                        >
                            <Label
                                value="ระดับอารมณ์"
                                angle={-90}
                                dx={-25}    
                                className="description-chart"
                            />
                        </YAxis>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                        <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="feeling" stroke="#57a3d5" fill="#57a3d5" />
                    </AreaChart>
                </ResponsiveContainer>
                <span className="description-chart">
                    แสดงข้อมูลตั้งแต่วันที่ {dayBegin} {monthBeginName} {yearBegin} ถึงวันที่ {thisDay} {thisMonthName}
                </span>
            </div>
        </div >
    );
};
