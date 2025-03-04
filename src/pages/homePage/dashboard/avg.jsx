import "../../../style/dashboard.css"
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";

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

    const colorEmoji = [ '#D0D0D0','#E1BBFF','#ABDCFF','#FDBA83','#FF92CD'];

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

    return (
        <div className="Emotion-Section">
            <div className="emotionThisday" style={{ backgroundColor: colorEmoji[4]}}>
                <span className="description-chart">ระดับอารมณ์ของวันนี้</span>
                {getEmojiIcon(percentage)}
                <span className="description-chart">{averageMood.toFixed(2)}</span>
            </div>
            <div className="avg-Label" style={{ backgroundImage: averageColor }}>
                <span className="description-chart">ระดับอารมณ์โดยเฉลี่ย</span>
                {getEmojiIcon(percentage)}
                <span className="description-chart">{averageMood.toFixed(2)}</span>
            </div>
            <div className="avg-Model" style={{ backgroundImage: getColor(40) }}>
                <span className="description-chart">การประเมินระดับอารมณ์จาก AI</span>
                {getEmojiIcon(percentage)}
                <span className="description-chart">{averageMood.toFixed(2)}</span>
            </div>


        </div>
    )

}