import { useState, useEffect } from "react";
import "../../../style/FriendShare.css";
import Tab from "../../Tab";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";


const FriendShare = () => {

    const [loading, setLoading] = useState(true);         // Manage loading state
    const [error, setError] = useState(null);             // Manage error state

    const data = [
        {
            name: "Friend 1",
            label: 3,
            message: "Hey, how's it going?"
        },
        {
            name: "Friend 2",
            label: 2,
            message: "Let's meet up soon!"
        }
    ];

    // ใช้ useState เพื่อเก็บข้อมูล
    const [friendData] = useState(data);
    console.log(friendData);


    const getEmojiIcon = (rating) => {
        switch (rating) {
            case 5:
                return <BsEmojiLaughingFill className="awesome-selected" />;
            case 4:
                return <BsEmojiSmileFill className="good-selected" />;
            case 3:
                return <BsEmojiNeutralFill className="alright-selected" />;
            case 2:
                return <BsEmojiFrownFill className="bad-selected" />;
            case 1:
                return <BsEmojiTearFill className="awful-selected" />;
            default:
                return null;
        }
    }

    return (
        <div className="diary-container">
            <Tab />
            <div className="diary-wrapper">
                <div className="cover-page">

                    <div className="diaryLeft-section">
                        <div className="diaryFriend-display">
                            <span className="diary-header">Diary</span>
                            <div className="friendTitleName">{friendData[0].name}</div>
                            <div className="friendLabal">{getEmojiIcon(friendData[0].label)}</div>
                            <div className="friendMessage">{friendData[0].message}</div>
                        </div>
                    </div>


                    <div className="diaryRight-section">
                        <div className="diaryFriend-display">
                            <span className="diary-header">Diary</span>
                            <div className="friendTitleName">{friendData[1].name}</div>
                            <div className="friendLabal">{getEmojiIcon(friendData[1].label)}</div>
                            <div className="friendMessage">{friendData[1].message}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FriendShare;