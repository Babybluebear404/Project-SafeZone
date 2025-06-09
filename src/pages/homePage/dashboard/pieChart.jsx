import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useCookies } from "react-cookie";
import dayjs from "dayjs";

export const PieMonth = ({ COLORS }) => {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const [filteredData, setFilteredData] = useState([]);

    const today = new Date();
    const thisDay = today.getDate();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const fetchFeelingData = async (day, token) => {
        try {
            const res = await fetch(`http://localhost:3000/api/diaries/feeling?day=${day}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }

            
            const json= await res.json();
            const data = json.data;
            return data;
        } catch (error) {
            console.error("Failed to fetch feeling data:", error.message);
            return [];
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (token) {
                const data = await fetchFeelingData(365, token);
                const sorted = data.sort((a, b) => new Date(a.date_and_time) - new Date(b.date_and_time));
                setFilteredData(sorted);
            }
        };
        loadData();
    }, [token]);

    const getMonthName = (name) => {
        const monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        return monthNames[name < 0 ? 11 : name];
    };

    const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    const getLastDays = (month, year) => {
        if ([0, 2, 4, 6, 7, 9, 11].includes(month)) return 31;
        if (month === 1) return isLeapYear(year) ? 29 : 28;
        return 30;
    };

    const getSinceBegin = () => {
        let dayBegin = thisDay;
        let monthBegin = thisMonth;
        let yearBegin = thisYear;
        for (let i = 0; i < 365; i++) {
            dayBegin--;
            if (dayBegin <= 0) {
                monthBegin--;
                if (monthBegin < 0) {
                    monthBegin = 11;
                    yearBegin--;
                }
                dayBegin = getLastDays(monthBegin, yearBegin);
            }
        }
        return { dayBegin, monthBegin, yearBegin };
    };

    const { dayBegin, monthBegin, yearBegin } = getSinceBegin();
    const thisMonthName = getMonthName(thisMonth);
    const monthBeginName = getMonthName(monthBegin);

    const levelDescriptions = {
        1: "Awful",
        2: "Sad",
        3: "Alright",
        4: "Good",
        5: "Awesome",
    };

    const labelColors = {
        1: COLORS[0],
        2: COLORS[1],
        3: COLORS[2],
        4: COLORS[3],
        5: COLORS[4]
    };

    const aggregatedData = filteredData.reduce((acc, curr) => {
        const label = curr.feeling;
        const name = `${label}:${levelDescriptions[label]}`;
        const existing = acc.find(item => item.name === name);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name, value: 1 });
        }
        return acc;
    }, []);

    aggregatedData.sort((a, b) => parseInt(a.name.split(":")[0]) - parseInt(b.name.split(":")[0]));

    return (
        <div className="pieChart">
            <span className="Title-chart">แผนภูมิแสดงอารมณ์ที่ผ่านมาย้อนหลัง 1 ปี</span>
            <span className="description-chart">โดยกราฟนี้จะแสดงภาพรวมจำนวนของแต่ระดับของอารมณ์แต่ละเดือนที่ผ่านมาย้อนหลัง 1 ปี</span>
            <ResponsiveContainer width={800} height={500}>
                <PieChart>
                    <Pie
                        data={aggregatedData}
                        cx="50%"
                        cy="50%"
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="none"
                    >
                        {aggregatedData.map((entry, index) => {
                            const label = parseInt(entry.name.split(":")[0]);
                            return (
                                <Cell key={`cell-${index}`} fill={labelColors[label]} />
                            );
                        })}
                    </Pie>
                    <Tooltip />
                    <Legend layout="vertical" verticalAlign="middle" align="left" iconSize={20} />
                </PieChart>
            </ResponsiveContainer>
            <span className="description-chart">
                แสดงข้อมูลตั้งแต่วันที่ {dayBegin} {monthBeginName} {yearBegin} ถึงวันที่ {thisDay} {thisMonthName}
            </span>
        </div>
    );
};
