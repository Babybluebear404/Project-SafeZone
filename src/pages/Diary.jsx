import React from "react";
import Tab from "./Tab";
import "./Diary.css";

const Diary = () => {
  return (
    <div className="diary-container">
      <Tab />
      <div className="diary-wrapper">
        {/* Calendar Section */}
        <div className="calendar-section">
          <h2 className="calendar-title">Calendar</h2>
          <h3 className="calendar-month">August 2024</h3>
          <div className="calendar-navigation">
            <button className="icon-button ghost">
            </button>
            <button className="icon-button2">
            </button>
          </div>
          <div className="calendar-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={index} className="calendar-day">
                {day}
              </span>
            ))}
            {Array.from({ length: 31 }, (_, index) => (
              <button
                key={index}
                className={`calendar-date ${
                  [4, 5, 6, 8, 9, 10].includes(index + 1) ? "highlighted" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Diary Section */}
        <div className="diary-section">
          <h2 className="diary-title">Diary</h2>
          <div className="diary-buttons">
            <button className="add-friends-button">
              Add Friends
            </button>
            <button className="close-friends-button">
              Close Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary;
