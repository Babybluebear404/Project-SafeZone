import "../../style/HomeLogin.css";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import dayjs from "dayjs";

export const AverageEmotion = ({ data, COLORS }) => {
    const averageMood = data.reduce((sum, entry) => sum + entry.label, 0) / data.length;
    const percentage = (averageMood / 5) * 100;

    const getColor = (percentage) => {
        if (percentage <= 20) {
            return `linear-gradient(90deg, #C599B6 0%, ${COLORS[0]} 100%)`;
        }
        if (percentage <= 40) {
            return `linear-gradient(90deg,rgb(223, 160, 143) 0%, ${COLORS[1]} 100%)`;
        }
        if (percentage <= 60) {
            return `linear-gradient(90deg, #F2E2B1 0%, ${COLORS[2]} 100%)`;
        }
        if (percentage <= 80) {
            return `linear-gradient(90deg,rgb(185, 232, 203) 0%, ${COLORS[3]} 100%)`;
        }
        return `linear-gradient(90deg,#C7D9DD 0%, ${COLORS[4]} 100%)`;
    };

    const colorEmoji = ['#D0D0D0', '#E1BBFF', '#ABDCFF', '#FDBA83', '#FF92CD'];

    const averageColor = getColor(percentage);

    const getEmojiIcon = (percentage) => {

        if (percentage <= 20) {
            return <BsEmojiTearFill className="Icon-Emoji" />;
        } else if (percentage <= 40) {
            return <BsEmojiFrownFill className="Icon-Emoji" />;
        } else if (percentage <= 60) {
            return <BsEmojiNeutralFill className="Icon-Emoji" />;
        } else if (percentage <= 80) {
            return <BsEmojiSmileFill className="Icon-Emoji" />;
        } else {
            return <BsEmojiLaughingFill className="Icon-Emoji" />;
        }
    };

    const labelToday = () => {
        const today = dayjs().format('YYYY-MM-DD'); // แปลงวันนี้เป็น YYYY-MM-DD
        const todayData = data.find(item => dayjs(item.timestamp).format('YYYY-MM-DD') === today);
        return todayData ? todayData.label : null;

    }

    const labelMessage = (rating) => {
        switch (rating) {
            case 5:
                return "Answer";
            case 4:
                return "Good";
            case 3:
                return "Alright";
            case 2:
                return "Bad";
            case 1:
                return "Awful";
            default:
                return "NaN";
        }
    };

    return (
        <div className="Emotion-Section">
            <div className="emotionThisday" style={{ backgroundColor: colorEmoji[labelToday() - 1] }}>
                <span className="description-chart">ระดับอารมณ์ของวันนี้</span>
                {getEmojiIcon((labelToday() * 100) / 5)}
                <span className="description-chart">{labelMessage(labelToday())}</span>
            </div>

        </div>
    )

}