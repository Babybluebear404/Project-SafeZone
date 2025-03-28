import { useState, useEffect, useLayoutEffect } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { FcPlus, FcLike } from "react-icons/fc";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import { FriendSection } from "./friendsSection";
import { generateDate, months } from "./calendar";
import dayjs from "dayjs";
import "../../../style/Diary.css";
import Tab from "../../Tab";
import { FriendFeed } from "./friendFeed";
import { useCookies } from "react-cookie";

const Diary = () => {

  useLayoutEffect(() => {
    window.scrollTo(0, 0); // เลื่อนหน้าไปที่บนสุด
  }, []);

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(null);

  const [currentPage, setCurrentPage] = useState("Diary");
  const [addfriendSec, setAddfrienSec] = useState(false);

  //text box write message
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() !== "") {
      const currentTime = new Date();
      const newMessage = {
        story: input,
        timestamp: currentTime.toDateString(),
        feeling: selectedEmoji[selectDate?.toDate().toDateString()] || null,
        status: isShared
      };

      try {
        const response = await fetch("http://localhost:3000/api/diaries/adddiary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(newMessage),
        });

        if (!response.ok) throw new Error("Failed to send message");

        const result = await response.json();
        console.log("Message sent:", result);

        const updatedMessages = [...messages, result];
        setMessages(updatedMessages);

        setInput("");

      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const deleteMessage = async () => {
    const selectedDiary = messages.find((msg) => selectDate && dayjs(msg.date_and_time).format('YYYY-MM-DD') === selectDate.format('YYYY-MM-DD'));
    const diaryId = selectedDiary ? selectedDiary.id : null;
    if (!diaryId) return;

    try {
      const response = await fetch('http://localhost:3000/api/diaries/deletediary', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ส่ง token หากมีการยืนยันตัวตน
        },
        body: JSON.stringify({
          diaryId: diaryId
        })
      });

      if (response.ok) {
        setMessages(messages.filter(msg =>
          msg.diaryId !== diaryId
        ));
        alert('Diary deleted successfully');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Error occurred while deleting the diary.');
    }
  };

  //check selected date have message(no filterred message on this date)
  const filteredMessages = messages.filter(
    (msg) =>
      today &&
      dayjs(msg.timestamp).format('YYYY-MM-DD') === today.format('YYYY-MM-DD')
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


  const fetchMessages = async () => {
    if (!selectDate) return;

    try {
      const formattedDate = selectDate.format("YYYY-MM-DD");
      const apiUrl = `http://localhost:3000/api/diaries/getdiary?day=${formattedDate}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const result = await response.json();
      console.log(result);

      if (result && result.length > 0) {
        const firstMessage = result[0];
        setMessages([firstMessage]);
      } else {
        console.log("No messages found for the selected date.");
      }

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectDate]);

  const [isShared, setIsShared] = useState(false);

  const showMessages = messages
    .filter((msg) => selectDate && dayjs(msg.date_and_time).format('YYYY-MM-DD') === selectDate.format('YYYY-MM-DD'))
    .map((msg, index) => {
      const emojiRating = msg.feeling
      return (
        <div key={index} className="showMessages">

          {emojiRating && getEmojiIcon(emojiRating)}
          <p className="display-text">{msg.story}</p>
          <div className="show-footer">
            <button onClick={deleteMessage} className="delete-diary">Delete</button>
            <button onClick={() => {
              setIsShared(!isShared);
            }} className="share-diary">
              {isShared ? "Share" : "Not Share"}
            </button>
          </div>
          <p className="mesStatusShare">
            {isShared ? (
              <>
                ไดอารี่นี้ของคุณไม่ได้ถูกแชร์ให้ใคร <br />
                กดปุ่มแชร์เมื่อต้องการแชร์ให้เพื่อนของคุณ
              </>
            ) : (
              <>
                ขณะนี้คุณกำลังแชร์ไดอารี่นี้ให้เพื่อนของคุณอยู่ <br />
                กดปุ่มแชร์อีกครั้งเพื่อยกเลิกการแชร์
              </>
            )}
          </p>
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
      {/*<button className="diary-friend" onClick={() => navigate("/friendShare")}><FaBook /></button>*/}
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
                  const dateString = dayjs(date).format('YYYY-MM-DD');
                  const messageForDate = messages.find(
                    (msg) => dayjs(msg.date_and_time).format('YYYY-MM-DD') === dateString
                  );
                  const emojiRating = messageForDate?.feeling ?? null;

                  const hasMessages = messages.some(
                    (msg) => dayjs(msg.date_and_time).format('YYYY-MM-DD') === dateString
                  );

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
          </div>{/*End of Calendar Section*/}

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
                  filteredMessages.length <= 0 && selectDate && selectDate.isSame(today, 'day') ? (
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
                  ) : (
                    <div className="diary-display">
                      <span className="diary-header">Diary</span>
                      <div className="day-selected">
                        <h1>
                          Day : {selectDate.toDate().getDate()} {months[selectDate.month()]} {selectDate.year()}
                        </h1>
                      </div>
                      {showMessages}
                    </div>
                  )
                )
              )
            }
          </div> {/*End of Diary Section*/}
        </div>
      </div>
      <div className="friendFeed">
        <FriendFeed />
      </div>
    </div>


  );
};

export default Diary;