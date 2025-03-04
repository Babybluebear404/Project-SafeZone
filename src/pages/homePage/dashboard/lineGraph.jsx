import { CartesianGrid, ReferenceLine, Area, XAxis, YAxis, AreaChart, Tooltip, ResponsiveContainer } from "recharts";
import "../../../style/dashboard.css"

export const LineGraph = ({ data }) => {
    const today = new Date();
    let thisDay = today.getDate();
    let thisMonth = today.getMonth();

    const getMonthName = () => {
        const monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        return monthNames[thisMonth < 0 ? 11 : thisMonth];
    };
    const thisMonthName = getMonthName();

    const getlastDays = ()=>{
        if ([0, 2, 4, 6, 7, 9, 11].includes(thisMonth)) {
            return 31;
        }else if(thisMonth==1){
            return 28;
        }else return 30;
    }

    const getSinceBegin = (thisDay, thisMonth, getlastDays) => {
        let dayBegin = thisDay - 14;
        let monthBegin = thisMonth;
        const previousMonthDays = getlastDays() - 1; 
    
        if (dayBegin <= 0) {
            dayBegin = previousMonthDays + dayBegin;
            monthBegin = monthBegin - 1; 
        }
    
        return { dayBegin, monthBegin }; 
    };

    const { dayBegin, monthBegin } = getSinceBegin(thisDay, thisMonth, getlastDays);
    const monthBeginName = getMonthName();

    const filterLastTwoWeeksData = (data) => {
        const last14Days = [];

        for (let i = 0; i <= 14; i += 1) {
            const date = new Date();
            date.setDate(today.getDate() - i);
            const formattedDate = date.toISOString().split("T")[0];

            const found = data.find(d => d.date === formattedDate);
            if (found) {
                last14Days.push(found);
            }
        }

        return last14Days.reverse();
    };

    const filteredData = filterLastTwoWeeksData(data);

    return (
        <div className="lineGraph">
            <span className="Title-chart">กราฟแสดงอารมณ์ที่ผ่านมาใน 2 สัปดาห์</span>
            <span className="description-chart">โดยกราฟนี้จะแสดงภาพรวมระดับของอารมณ์ที่ผ่านมา 2 สัปดาห์</span>
            <div className="weekLineChart">
                <ResponsiveContainer width={400} height={300}>
                    <AreaChart data={filteredData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis
                            dataKey="date"
                            tickFormatter={(date) =>
                                new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
                            } />
                        <YAxis domain={[1, 5]} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                        <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="label" stroke="#FAC67A" fill="#FAC67A" />
                    </AreaChart>
                </ResponsiveContainer>
                <span className="description-chart">แสดงข้อมูลตั้งแต่วันที่ {dayBegin} {monthBeginName} ถึงวันที่ {thisDay} {thisMonthName}</span>
            </div>
        </div>
    );
};
