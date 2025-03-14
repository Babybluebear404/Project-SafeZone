import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

export const PieMonth = ({ data, COLORS }) => {
    const today = new Date();
    let thisDay = today.getDate();
    let thisMonth = today.getMonth();
    let thisYear = today.getFullYear();

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

    const getSinceBegin = (thisDay, thisMonth, thisYear) => {
        let dayBegin = thisDay;
        let monthBegin = thisMonth;
        let yearBegin = thisYear;

        for (let i = 0; i < 365; i++) {
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

    const { dayBegin, monthBegin, yearBegin } = getSinceBegin(thisDay, thisMonth, thisYear);
    const monthBeginName = getMonthName(monthBegin);

    const filterLastOneYearData = (data) => {
        const last365Days = [];
        const today = dayjs();

        for (let i = 0; i < 365; i += 1) {
            const date = today.subtract(i, 'day').format('YYYY-MM-DD');
            const found = data.find(d => dayjs(d.timestamp).format('YYYY-MM-DD') === date);
            if (found) {
                last365Days.push(found);
            }
        }

        return last365Days.reverse();
    };
    
    data = filterLastOneYearData(data);

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

    const aggregatedData = data.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === `${curr.label}:${levelDescriptions[curr.label]}`);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ name: `${curr.label}:${levelDescriptions[curr.label]}`, value: 1 });
        }
        return acc;
    }, []);

    aggregatedData.sort((a, b) => parseInt(a.name.split(":")[0]) - parseInt(b.name.split(":")[0]));

    return (
        <div className="pieChart">
            <span className="Title-chart">แผนภูมิแสดงอารมณ์ที่ผ่านมาย้อนหลัง 1 ปี</span>
            <span className="description-chart">โดยกราฟนี้จะแสดงภาพรวมจำนวนของแต่ระดับของอารมณ์แต่ละเดือนที่ผ่านมาย้อนหลัง 1 ปี</span>
            <ResponsiveContainer width={800} height={500}>
                <PieChart >
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
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="left"
                        iconSize={20}
                    />
                </PieChart>
            </ResponsiveContainer>
            <span className="description-chart">แสดงข้อมูลตั้งแต่วันที่ {dayBegin} {monthBeginName} {yearBegin} ถึงวันที่ {thisDay} {thisMonthName}</span>
        </div>
    )
} 