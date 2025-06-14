import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/Notification.css';
import Tab from "../Tab";
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';

const Notification = ({ onConfirm }) => {
  const [showNotification, setShowNotification] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [friends, setFriends] = useState([]);
  const [sharedDiaries, setSharedDiaries] = useState([]);
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const getPendingFriends = async () => {
    try {
      const res = await fetch('https://project-safezone.onrender.com/api/closefriends/getpending', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const json = await res.json();
      return Array.isArray(json.data) ? json.data : [];
    } catch (error) {
      console.error("Failed to fetch pending friends:", error);
      return [];
    }
  };

  const fetchFriendsReturn = async () => {
    try {
      const res = await fetch('https://project-safezone.onrender.com/api/closefriends/getaccepted', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch friends list");
      const data = await res.json();
      return Array.isArray(data.data) ? data.data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const fetchSharedDiariesReturn = async () => {
    try {
      const res = await fetch('https://project-safezone.onrender.com/api/diaries/getsharediary', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error("Failed to fetch shared diaries");

      const json = await res.json();
      const data = json.data;
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const fetchAll = async () => {
    const [friendsList, sharedList, pendingFriends] = await Promise.all([
      fetchFriendsReturn(),
      fetchSharedDiariesReturn(),
      getPendingFriends()
    ]);

    const friendNotifications = pendingFriends.map(friend => ({
      type: "friendRequest",
      friendId: friend.id,
      friendName: friend.username,
    }));

    const getUsernameByUserId = (userid) => {
      const friend = friendsList.find(f => f.id === userid);
      return friend ? friend.username : "Unknown User";
    };

    const diaryNotifications = sharedList.map(diary => ({
      type: "diaryShare",
      diaryId: diary.id,
      userId: diary.userid,
      username: getUsernameByUserId(diary.userid),
    }));

    setFriends(friendsList);
    setSharedDiaries(sharedList);
    setShowNotification([...friendNotifications, ...diaryNotifications]);
  };

  useEffect(() => {
    if (!token) return;
    fetchAll().catch(console.error);
  }, [token]);

  const handleYesClick = async (friendId, friendName) => {
    try {
      await fetch('https://project-safezone.onrender.com/api/closefriends/updatestatus', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendid: friendId, status: 'accepted' }),
      });
      toast.success(`You are now friends with ${friendName}.`, {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
      });
      setShowButtons(false);
      setShowNotification(prev => prev.filter(n => n.friendId !== friendId));
      if (onConfirm) onConfirm(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNoClick = async (friendId, friendName) => {
    try {
      await fetch('https://project-safezone.onrender.com/api/closefriends/updatestatus', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendid: friendId, status: 'refuse' }),
      });
      toast.error(`You declined ${friendName}’s friend request.`, {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
      });
      setShowButtons(false);
      setShowNotification(prev => prev.filter(n => n.friendId !== friendId));
      if (onConfirm) onConfirm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewDiary = () => {
    navigate("/friendFeed");
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
          <div className="no-notifications">ไม่พบแจ้งเตือนในขณะนี้</div>
        )}
      </div>
    </div>
  );
};

export default Notification;
