import { useState, useEffect } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { FcPlus, FcLike } from "react-icons/fc";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { FriendSection } from "./friendsSection";
import { generateDate, months } from "./calendar";
import dayjs from "dayjs";
import "../../../style/Diary.css";
import Tab from "../../Tab";

const Diary = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(null);

  const [currentPage, setCurrentPage] = useState("Diary");
  const [addfriendSec, setAddfrienSec] = useState(false);

  //text box write message
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {

    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        timestamp: selectDate.toDate().toDateString(),
        label: selectedEmoji[selectDate?.toDate().toDateString()] || null,
        status: isShared
      };

      const storedMessages = JSON.parse(sessionStorage.getItem("messages")) || [];
      const updatedMessages = [...storedMessages, newMessage];
      sessionStorage.setItem("messages", JSON.stringify(updatedMessages));
      setMessages(updatedMessages);

      setInput("");
    }
  };

  const deleteMessage = () => {
    if (!selectDate) return;

    const dateString = selectDate.toDate().toDateString();
    setMessages(messages.filter((msg) => msg.timestamp !== dateString));
  }

  //check selected date have message(no filterred message on this date)
  const filteredMessages = messages.filter(
    (msg) => selectDate && msg.timestamp === selectDate.toDate().toDateString()
  );

  const [selectedEmoji, setSelectedEmoji] = useState({});
  const getRatingClass = (rating) => {
    switch (rating) {
      case 5:
        return "awesome-rating";
      case 4:
        return "good-rating";
      case 3:
        return "alright-rating";
      case 2:
        return "bad-rating";
      case 1:
        return "awful-rating";
      default:
        return "";
    }
  };

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
  };


  useEffect(() => {
    const storedMessages = JSON.parse(sessionStorage.getItem("messages")) || [];
    setMessages(storedMessages);
  }, []);

  
  const [isShared, setIsShared] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const showMessages = messages
    .filter((msg) => selectDate && msg.timestamp === selectDate.toDate().toDateString())
    .map((msg, index) => {
      const emojiRating = msg.label
      return (
        <div key={index} className="showMessages">
          {emojiRating && getEmojiIcon(emojiRating)}
          <p className="display-text">{msg.text}</p>
          <div className="show-footer">
            <div>
              <input
                type="checkbox"
                checked={msg.status}
                onChange={() => { setIsShared(!isShared); setIsChanged(!isChanged); }}
              />
              <span>แชร์เรื่องราวให้เพื่อนของคุณ</span>
            </div>
            <a></a>
            <button onClick={deleteMessage} className="delete-diary">Delete</button>
            <button onClick={() => {

            }} className="save-diary"
              disabled={!isChanged}>
              Save
            </button>
          </div>

        </div>
      );
    });

  const handleAnswer = (emojiRating) => {
    if (selectDate) {
      const dateKey = selectDate.toDate().toDateString();

      setSelectedEmoji((prev) => ({
        ...prev,
        [dateKey]: emojiRating,
      }));
    }
  };


  return (
    <div className="diary-container">
      <Tab />
      <button className="diary-friend"><FaBook /></button>
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

                  const hasMessages = messages.some(
                    (msg) => msg.timestamp === date.toDate().toDateString()
                  );

                  const dateString = date.toDate().toDateString();
                  const messageForDate = messages.find((msg) => msg.timestamp === dateString);
                  const emojiRating = messageForDate ? messageForDate.label : null;

                  const ratingClass = hasMessages && emojiRating ? getRatingClass(emojiRating) : "";

                  const handleDateClick = () => {
                    if (selectDate && selectDate.toDate().toDateString() === date.toDate().toDateString()) {
                      // If the same date is clicked, unselect it
                      setSelectDate(null);
                      setInput("");
                    } else {
                      setSelectDate(date);
                      setInput("");
                    }
                  };

                  return (
                    <div key={index} className="current-circle">
                      <h1
                        className={`base-style ${isGray} ${isToday} ${isSelected} ${ratingClass}`}
                        onClick={() => handleDateClick(date)}
                      >
                        {date.toDate().getDate()}
                      </h1>
                    </div>
                  );
                }
              )
              }
            </div>
          </div>

          {/* Diary Section */}
          <div className="diary-section">
            {
              selectDate === null && currentPage === "Diary" ? (
                <div className="diary-page">
                  <div className="diary-name">
                    <span className="diary-title">Diary</span>
                    <span className="description-function">บันทึกเรื่องราวของคุณในแต่ละวันสามารถบันทึกได้ทั้งข้อความ <br />และระดับอารมณ์ของคุณในวันนั้น</span>
                  </div>
                  <span className="add-friends-button" onClick={() => setCurrentPage("friends") & setAddfrienSec(true)}>Add Friend <FcPlus /></span>
                  <span className="close-friends-button" onClick={() => setCurrentPage("friends")}>Friends <FcLike /></span>
                </div>
              ) : (
                currentPage === "friends" ? (
                  <div className="friends-section">
                    <FriendSection
                      addfriendSec={addfriendSec}
                      setAddfrienSec={setAddfrienSec}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                ) : (
                  filteredMessages.length > 0 ? (
                    <div className="diary-display">
                      <span className="diary-header">Diary</span>
                      <div className="day-selected">
                        <h1>
                          Day : {selectDate.toDate().getDate()} {months[selectDate.month()]} {selectDate.year()}
                        </h1>
                      </div>
                      {showMessages}
                    </div>
                  ) : (
                    <div className="diary-display">
                      <span className="diary-header">Diary</span>
                      <div className="day-selected">
                        <h1>
                          Day : {selectDate.toDate().getDate()} {months[selectDate.month()]} {selectDate.year()}
                        </h1>
                      </div>
                      <div className="emoji-selected">
                        <span className="text-general">How are you?</span>
                        <div className="emoji-icon" key={selectDate?.toDate().toDateString()}>
                          <BsEmojiLaughingFill
                            className={`awesome-icon ${selectedEmoji[selectDate?.toDate().toDateString()] === 5 ? 'selected' : ''}`}
                            onClick={() => handleAnswer(5)}
                          />
                          <BsEmojiSmileFill
                            className={`good-icon ${selectedEmoji[selectDate?.toDate().toDateString()] === 4 ? 'selected' : ''}`}
                            onClick={() => handleAnswer(4)}
                          />
                          <BsEmojiNeutralFill
                            className={`alright-icon ${selectedEmoji[selectDate?.toDate().toDateString()] === 3 ? 'selected' : ''}`}
                            onClick={() => handleAnswer(3)}
                          />
                          <BsEmojiFrownFill
                            className={`bad-icon ${selectedEmoji[selectDate?.toDate().toDateString()] === 2 ? 'selected' : ''}`}
                            onClick={() => handleAnswer(2)}
                          />
                          <BsEmojiTearFill
                            className={`awful-icon ${selectedEmoji[selectDate?.toDate().toDateString()] === 1 ? 'selected' : ''}`}
                            onClick={() => handleAnswer(1)}
                          />
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
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="text here..."
                          className="meassage-textarea"
                        ></textarea>
                        <div className="save-footer">
                          <input
                            type="checkbox"
                            checked={isShared}
                            onChange={() => setIsShared(!isShared)}
                          />
                          <span>แชร์เรื่องราวให้เพื่อนของคุณ</span>
                          <a></a>
                          <button onClick={() => {
                            sendMessage();
                          }} className="save-message"
                            disabled={input.trim() === "" || !selectedEmoji[selectDate?.toDate().toDateString()]}>
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )
              )
            }
          </div> {/*End of Diary Section*/}
        </div>
      </div>
    </div>

  );
};

export default Diary;