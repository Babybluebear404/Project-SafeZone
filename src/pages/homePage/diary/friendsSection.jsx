import { useState, useEffect } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { FcPlus } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { toast } from 'react-toastify';
import "../../../style/Diary.css";
import { useCookies } from "react-cookie";
import imageTemplates from "../../../components/imageTemplates";
import { YesNoPage } from "./confirmBox.jsx";


export const FriendSection = ({ setAddfrienSec, addfriendSec, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);

  const [friends, setFriends] = useState([]);
  const [removeFriName, setRemoveFriends] = useState("");
  const [showStatus, setShowStatus] = useState([]);
  const [users, setUsers] = useState([]);

  const token = cookies.token;

  const fetchAcceptedFriends = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/closefriends/getaccepted', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error(`Error ${res.status}`)
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setFriends(data);
      } else if (data.data && Array.isArray(data.data)) {
        setFriends(data.data);
      } else {
        setFriends([]);
      }
    } catch (error) {
      console.error('Failed to fetch accepted friends:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchShowStatus = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/closefriends/getAllStatusFriend', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const result = await res.json();
      if (result.success) {
        setShowStatus(result.data);
      } else {
        console.error('API error:', result.error);
      }

    } catch (error) {
      console.error('Failed to fetch status users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users/allusers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      } else {
        console.error('API error:', result.error);
      }

    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAcceptedFriends()
      fetchShowStatus();
      fetchAllUsers();
    }
  }, [token]);

  const [request, Setrequest] = useState([])

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUser = users.filter((users) =>
    users.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFriend = async (friend) => {
    try {
      const res = await fetch("http://localhost:3000/api/closefriends/addfriend", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendid: friend.id }), // ส่ง friendid
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }
      // เพิ่มเพื่อนใน state ขอเป็นเพื่อน
      Setrequest(prev => [...prev, friend]);

      toast.success(`A friend request has been sent to ${friend.username}.`, {
        position: "top-center",
        autoClose: 1500,
        closeButton: false,
        hideProgressBar: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);

    } catch (error) {
      toast.error("Failed to send the request.", {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
      });
      console.error("Failed to add friend:", error);
    }
  };

  const unrequest = (id) => {
    setFriends((prevFriends) => prevFriends.filter((f) => f.id !== id));
  }

  const deleteFriend = async (token, friendid) => {
    try {
      const res = await fetch('http://localhost:3000/api/closefriends/deletefrined', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendid }),
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}`);
      }

      const result = await res.json();
      return result;
    } catch (error) {
      console.error("Failed to delete friend:", error);
      throw error;
    }
  };

  const removeFriend = async (id) => {
    try {
      await deleteFriend(token, id);
      setFriend((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      toast.error("You have unfriended this person.", {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    addfriendSec ? (
      <div className="friend-display">
        <div className="header-friend">
          <SlArrowLeft
            onClick={() => setCurrentPage("Diary") & setSearchTerm("") & setAddfrienSec(false)}
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
          <div className="friend-content">
            <div className="friends-list">
              {filteredUser.length > 0 ? (
                filteredUser.map((friend) => {
                  const statusEntry = showStatus.find((s) => s.friend_id === friend.id);
                  const friendStatus = statusEntry ? statusEntry.Status : null;

                  const template = imageTemplates.find(img => img.id === Number(friend.profile));
                  const profileSrc = template?.src || "/assets/0.png";

                  return (
                    <div key={friend.id} className="friend-item">
                      <img
                        src={profileSrc}
                        alt={template?.name || "Unknown Cat"}
                        className="logo-friends"
                      />
                      <span>{friend.username}</span>

                      {/* แสดง icon หรือข้อความตาม friendStatus */}
                      {friendStatus === "accepted" ? (
                        <span className="friend-emojicon"><FaUserFriends /></span>
                      ) : friendStatus === "pending" ? (
                        <span className="friend-icon" onClick={() => unrequest(friend.id)}>
                          Pending...
                        </span>
                      ) : (
                        <FcPlus
                          className="add-button"
                          onClick={() => addFriend(friend)}
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-general" style={{ fontSize: '16px' }}>ไม่พบรายชื่อผู้ใช้</p>
              )}

            </div>
          </div>
        )}

      </div>
    ) : (
      <div className="friend-display">
        <div className="header-friend">
          <SlArrowLeft
            onClick={() => setCurrentPage("Diary") & setSearchTerm("") & setAddfrienSec(false)}
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
          <div className="friend-list">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => {
                const template = imageTemplates.find(img => img.id === Number(friend.profile));
                const profileSrc = template?.src || "/assets/0.png";
                return (
                  <div key={friend.id} className="friend-item">
                    <img
                      src={profileSrc}
                      alt={template?.name || "Unknown Cat"}
                      className="logo-friends"
                    />
                    <span>{friend.username}</span>
                    <TiDelete
                      className="delete-button"
                      onClick={() => {
                        setShowConfirm(true);
                        setRemoveFriends(friend.id);
                      }}
                    // onClick={
                    //   () => removeFriend(friend.id)}
                    />
                  </div>
                )
              })
            ) : (
              <p className="text-general" style={{ fontSize: '16px' }}>ไม่พบรายชื่อเพื่อน</p>
            )}
          </div>
        </div>
        {showConfirm && <YesNoPage
          question="คุณต้องการที่จะยกเลิกการเป็นเพื่อนใช่หรือไม่?"
          onYes={() => {
            removeFriend(removeFriName);
            setShowConfirm(false);
          }}
          onNo={() => setShowConfirm(false)}
        />}
      </div>
    )
  )
}

