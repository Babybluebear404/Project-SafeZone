import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Notification.css';
import Tab from "../Tab";
import { useCookies } from "react-cookie";

const Notification = ({ onConfirm }) => {
  const [showNotification, setShowNotification] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [friends, setFriends] = useState([]);
  const [sharedDiaries, setSharedDiaries] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const getPendingFriends = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/closefriends/getpending', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch pending friends:", error);
      return [];
    }
  };

  const fetchFriends = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/closefriends/getaccepted', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch friends list");
      const data = await res.json();
      setFriends(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSharedDiaries = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/diaries/getsharediary', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error("Failed to fetch shared diaries");
      const data = await res.json();
      setSharedDiaries(data);
    } catch (err) {
      console.error(err);
      setSharedDiaries([]);
    }
  };

  const getUsernameByUserId = (userid) => {
    const friend = friends.find(f => f.id === userid);
    return friend ? friend.username : "Unknown User";
  };

  useEffect(() => {
    if (!token) return;

    const fetchAll = async () => {
      await Promise.all([fetchFriends(), fetchSharedDiaries()]);
      const response = await getPendingFriends();
      const pendingFriends = response.data || [];

      const friendNotifications = pendingFriends.map(friend => ({
        type: "friendRequest",
        friendId: friend.id,
        friendName: friend.username,
      }));


      const diaryNotifications = sharedDiaries.map(diary => ({
        type: "diaryShare",
        diaryId: diary.id,
        userId: diary.userid,
        username: getUsernameByUserId(diary.userid),
      }));

      setShowNotification([...friendNotifications, ...diaryNotifications]);
    };

    fetchAll().catch(console.error);
  }, [token, friends, sharedDiaries]);

  const handleYesClick = async (friendId, friendName) => {
    try {
      await fetch('http://localhost:3000/api/closefriends/updatestatus', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendid: friendId, status: 'accepted' }),
      });
      setNotificationMessage(`คุณเป็นเพื่อนกับ ${friendName} แล้ว`);
      setShowButtons(false);
      setShowNotification(prev => prev.filter(n => n.friendId !== friendId));
      if (onConfirm) onConfirm(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNoClick = async (friendId, friendName) => {
    try {
      await fetch('http://localhost:3000/api/closefriends/updatestatus', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendid: friendId, status: 'refuse' }),
      });
      setNotificationMessage(`คุณปฏิเสธการเป็นเพื่อนกับ ${friendName} แล้ว`);
      setShowButtons(false);
      setShowNotification(prev => prev.filter(n => n.friendId !== friendId));
      if (onConfirm) onConfirm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDiary = () => {
    navigate("/Diary");
  };

  return (
    <div className="page-container">
      <Tab />
      <div className="notification-list">
        {showNotification.length > 0 ? (
          showNotification.map((notification, index) => (
            <div key={index} className="notification-item">
              <img src="/src/assets/LogoSafeZone.png" alt="logo" className="logo" />
              <div className="notification-text">
                {notification.type === "friendRequest" && (
                  <div>{notification.friendName} ต้องการเป็นเพื่อนกับคุณ</div>
                )}
                {notification.type === "diaryShare" && (
                  <>
                    <div>{notification.username} ได้แชร์ไดอารี่ของเขาให้คุณ</div>
                    <div className="notification-story">{notification.story}</div>
                  </>
                )}
              </div>

              {notification.type === "friendRequest" && showButtons && (
                <div className="actionB">
                  <button className="btn yes" onClick={() => handleYesClick(notification.friendId, notification.friendName)}>ยอมรับ</button>
                  <button className="btn no" onClick={() => handleNoClick(notification.friendId, notification.friendName)}>ปฏิเสธ</button>
                </div>
              )}

              {notification.type === "diaryShare" && (
                <div className="diaryB">
                  <button className="btn view" onClick={handleViewDiary}>ดูไดอารี่</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-notifications">No Notification Yet.</div>
        )}

        {notificationMessage && (
          <p className="notification-message">{notificationMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
