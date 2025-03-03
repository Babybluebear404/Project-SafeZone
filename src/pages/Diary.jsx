import { useState } from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { FcPlus, FcLike } from "react-icons/fc";
import { FaUserFriends } from "react-icons/fa";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { generateDate, months } from "./calendar";
import dayjs from "dayjs";
import "./Diary.css";
import Tab from "./Tab";
import { toast } from 'react-toastify';

const Diary = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(null);

  const [friendSection, setFriendSection] = useState(false);
  const [addfriendSec, setAddfrienSec] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [isShared, setIsShared] = useState(false);

  const [friends, setFriends] = useState([
    { id: "test1", name: "Aren" },
    { id: "test2", name: "Mikasa" },
    { id: "test3", name: "Armin" },
    { id: "test4", name: "Levi" }
  ]);

  const user = [
    { id: "test1", name: "Aren" },
    { id: "test2", name: "Mikasa" },
    { id: "test3", name: "Armin" },
    { id: "test4", name: "Levi" },
    { id: "test5", name: "Himmel" },
    { id: "test6", name: "Frieren" },
    { id: "test7", name: "Heiter" },
    { id: "test8", name: "Eisen" }
  ];

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUser = user.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFriend = (friend) => {
    setFriends([...friends, friend]);
    toast.success(`คำขอเป็นเพื่อนกับ ${friend.name} ถูกส่งไปแล้ว`, {
      position: "top-center",
      autoClose: 2000,
      closeButton: false,
    });
  };

  const removeFriend = (id) => {
    const removedFriend = friends.find((friend) => friend.id === id);
    setFriends(friends.filter((friend) => friend.id !== id));
    toast.error(`${removedFriend.name} ถูกลบออกจากเพื่อนแล้ว!`, {
      position: "top-center",
      autoClose: 2000,
      closeButton: false,
    });
  };



  const FriendSection = () => {
    return (
      addfriendSec ? (
        <div className="friend-display">
          <div className="header-friend">
            <SlArrowLeft
              onClick={() => setFriendSection(!friendSection) & setAddfrienSec(!addfriendSec) & setSearchTerm("") & setSelectDate(null)}
            />
            <h2>Add Friends</h2>
          </div>
          <input type="text"
            placeholder="Search..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus />
          {searchTerm.trim() !== "" && (
            <div className="friends-list">
              {filteredUser.length > 0 ? (
                filteredUser.map((friend) => {
                  const isFriend = friends.some((f) => f.id === friend.id);

                  return (
                    <div key={friend.id} className="friend-item">
                      <div className="logo-friends"></div>
                      <span>{friend.name}</span>
                      {isFriend ? (
                        <FaUserFriends className="friend-icon" />
                      ) : (
                        <FcPlus
                          className="add-button"
                          onClick={() => {
                            addFriend(friend);
                          }}
                        />
                      )}
                    </div>
                  );
                })

              ) : (
                <p>No friends found.</p>
              )}
            </div>
          )}

        </div>
      ) : (
        <div className="friend-display">
          <div className="header-friend">
            <SlArrowLeft
              onClick={() => setFriendSection(!friendSection) & setSearchTerm("") & setSelectDate(null)}
            />
            <h2>Friends</h2>
          </div>
          <input type="text"
            placeholder="Search..."
            className="search-box"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus />
          <div className="friend-content">
            <div className="friends-list">
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <div key={friend.id} className="friend-item">
                    <div className="logo-friends"></div>
                    <span>{friend.name}</span>
                    <TiDelete
                      className="delete-button"
                      onClick={() => removeFriend(friend.id)}
                    />
                  </div>
                ))
              ) : (
                <p>No friends found.</p>
              )}
            </div>
          </div>
        </div>
      )
    )
  }


  //text box write message
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        timestamp: selectDate.toDate().toDateString(),
        emojiRating: selectedEmoji.rating,
      };

      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

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

  const showMessages = messages
    .filter((msg) => selectDate && msg.timestamp === selectDate.toDate().toDateString())
    .map((msg, index) => {
      const emojiRating = selectedEmoji[msg.timestamp] || null;

      return (
        <div key={index} className="showMessages">
          {emojiRating && getEmojiIcon(emojiRating)}
          <p className="display-text">{msg.text}</p>
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
                  const emojiRating = selectedEmoji[dateString] || null;
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
              )}
            </div>
          </div>

          {/* Diary Section */}
          <div className="diary-section">
            {
              selectDate === null && !friendSection ? (
                <div className="diary-page">
                  <a className="diary-title">Diary</a>
                  <a className="add-friends-button" onClick={() => setFriendSection(!friendSection) & setAddfrienSec(!addfriendSec)}>Add Friend <FcPlus /></a>
                  <a className="close-friends-button" onClick={() => setFriendSection(!friendSection)}>Friends <FcLike /></a>
                </div>
              ) : (
                friendSection ? (
                  <div className="friends-section">
                    <FriendSection />
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
                      {showMessages}
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
                          <span>Shared</span>
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
        )
      </div>
    </div>

  );
};

export default Diary;
