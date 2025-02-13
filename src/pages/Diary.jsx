import React, { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
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


  return (
    <div className="diary-container">
      <Tab />
      <div className="diary-wrapper">
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
                  selectDate.toDate().toDateString() === date.toDate().toDateString()
                    ? "bg-black"
                    : "";

                return (
                  <div key={index} className="current-cycle">
                    <h1
                      className={`base-style ${isGray} ${isToday} ${isSelected}`}
                      onClick={() => setSelectDate(date)}
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
          <h2 className="diary-title">Diary</h2>
          <button className="diary-button"></button>
          <div className="diary-buttons">
            <button className="add-friends-button">Add Friends</button>
            <button className="close-friends-button"onClick={togglePopup}>Friends</button>
          </div>
        </div>
      </div>
      {isPopupOpen && <CloseFriendsPopup onClose={togglePopup} />}
    </div>
  );
};

export default Diary;
