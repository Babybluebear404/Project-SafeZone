import React, { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { generateDate, months } from "./calendar";
import Tab from "./Tab";
import dayjs from "dayjs";
import "./Diary.css";

const Diary = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

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
          <div className="diary-buttons">
            <button className="add-friends-button">Add Friends</button>
            <button className="close-friends-button">Close Friends</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
