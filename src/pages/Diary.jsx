import React, { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { FcPlus, FcLike } from "react-icons/fc";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import { generateDate, months } from "./calendar";
import Tab from "./Tab";
import dayjs from "dayjs";
import "./Diary.css";

const CloseFriendsPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Friends</h2>
        <input type="text" placeholder="Search..." className="search-box" />
        <div className="friends-list">
          {Array(7).fill("SafeZone").map((friend, index) => (
            <div key={index} className="friend-item">
              <div className="logo-friends"></div>
              <span>{friend}</span>
              <button className="delete-button">🗑</button>
            </div>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

const Diary = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  console.log("Popup state:", isPopupOpen);
  const togglePopup = () => {
    console.log("Toggle clicked!");
    setIsPopupOpen(!isPopupOpen);
  };

  //text box write message
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        timestamp: selectDate.toDate().toDateString()
      };

      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const filteredMessages = messages.filter(
    (msg) => selectDate && msg.timestamp === selectDate.toDate().toDateString()
  );
  

  return (
    <div className="diary-container">
      <Tab />
      <div className="diary-wrapper">
        <div className="cover-page">
          {/* Calendar Section */}
          <div className="calendar-section">
            <div className="calendar-title"><h2>Calendar</h2></div>
            <div className="calendar-header" >
              <h3 className="calendar-month">
                {months[today.month()]}, {today.year()}
              </h3>
              <div className="arrow-month">
                <SlArrowLeft
                  onClick={() => {
                    setToday(today.month(today.month() - 1));
                  }}
                />
                <SlArrowRight
                  onClick={() => {
                    setToday(today.month(today.month() + 1));
                  }}
                />
              </div>
            </div>
            <div className="days-container">
              {days.map((day, index) => {
                return <h1 key={index}>{day}</h1>;
              })}
            </div>
            <div className="calendar-container">
              {generateDate(today.month(), today.year()).map(
                ({ date, currentMonth, today: isTodayFlag }, index) => {
                  const isGray = currentMonth ? "" : "text-gray";
                  const isToday = isTodayFlag ? "bg-red" : "";
                  const isSelected =
                    selectDate && selectDate.toDate().toDateString() === date.toDate().toDateString()
                      ? "bg-black"
                      : "";

                  const handleDateClick = () => {
                    if (selectDate && selectDate.toDate().toDateString() === date.toDate().toDateString()) {
                      // If the same date is clicked, unselect it
                      setSelectDate(null);
                    } else {
                      setSelectDate(date);
                    }
                  };

                  return (
                    <div key={index} className="current-cycle">
                      <h1
                        className={`base-style ${isGray} ${isToday} ${isSelected}`}
                        onClick={handleDateClick}
                      >
                        {date.toDate().getDate()}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Diary Section */}
          <div className="diary-section">
            {selectDate === null ? (
              <div className="diary-page">
                <a className="diary-title">Diary</a>
                <a className="add-friends-button">Add Friend <FcPlus /></a>
                <a className="close-friends-button" onClick={togglePopup}>Friends <FcLike /></a>
              </div>
            ) : (
              filteredMessages.length > 0 ? (
                <div className="diary-display">
                  <a className="diary-header">Diary</a>
                  <div className="day-selected">
                    <h1>
                      Day : {selectDate.toDate().getDate()} {months[selectDate.month()]} {selectDate.year()}
                    </h1>
                  </div>
                  {messages.map((msg, index) => (
                      <div key={index}>
                        <p>{msg.text}</p>
                        <p>{msg.timestamp}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="diary-display">
                  <a className="diary-header">Diary</a>
                  <div className="day-selected">
                    <h1>
                      Day : {selectDate.toDate().getDate()} {months[selectDate.month()]} {selectDate.year()}
                    </h1>
                  </div>
                  <div className="emoji-selected">
                    <a className="text-general">How are you?</a>
                    <div className="emoji-icon">
                      <BsEmojiLaughingFill />
                      <BsEmojiSmileFill />
                      <BsEmojiNeutralFill />
                      <BsEmojiFrownFill />
                      <BsEmojiTearFill />
                    </div>
                    <div className="emoji-text">
                      <a className="text-general">Awesome</a>
                      <a className="text-general">Good</a>
                      <a className="text-general">Alright</a>
                      <a className="text-general">Bad</a>
                      <a className="text-general">Awful</a>
                    </div>
                  </div>
                  <div className="messageBox">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="text here..."
                    />
                    <button onClick={sendMessage} className="save-message">
                      Save
                    </button>
                  </div>
                </div>
              )
            )}
          </div> {/*End of Diary Section*/}
        </div>
        {isPopupOpen && <CloseFriendsPopup onClose={togglePopup} />}
        )
      </div>
    </div>

  );
};

export default Diary;
