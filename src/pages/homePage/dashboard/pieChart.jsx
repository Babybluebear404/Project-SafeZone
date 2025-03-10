import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export const PieMonth = ({ data, COLORS }) => {

    const today = new Date();
    let lastMonth = today.getMonth() - 1;
    let lastMonthYear = today.getFullYear();

    const filterLastMonthData = (data) => {

        if (lastMonth < 0) {
            lastMonthYear -= 1;
        }


        const lastMonthData = data.filter(d => {
            const date = new Date(d.timestamp);
            const dataMonth = date.getMonth();
            const dataYear = date.getFullYear();

            return dataMonth === lastMonth && dataYear === lastMonthYear;
        });

        return lastMonthData;
    };

    data = filterLastMonthData(data);

    const getLastMonthName = () => {
        const monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        return monthNames[lastMonth < 0 ? 11 : lastMonth];
    };

    const lastMonthName = getLastMonthName();

    const getlastDays = ()=>{
        if ([0, 2, 4, 6, 7, 9, 11].includes(lastMonth)) {
            return 31;
        }else if(lastMonth==1){
            return 28;
        }else return 30;
    }

    const lastDays = getlastDays();


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
            <span className="Title-chart">แผนภูมิแสดงอารมณ์ที่ผ่านมาของเดือน{lastMonthName}</span>
            <span className="description-chart">โดยแผนภูมินี้จะแสดงจำนวนของแต่ละระดับอารมณ์ของเดือนที่แล้ว</span>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={aggregatedData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
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
                        iconSize={10}
                    />
                </PieChart>
            </ResponsiveContainer>
            <span className="description-chart">แสดงข้อมูลตั้งแต่วันที่ 1 {lastMonthName} ถึงวันที่ {lastDays} {lastMonthName}</span>
        </div>
    )
} 