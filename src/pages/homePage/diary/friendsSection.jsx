import { useState, useEffect } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { FcPlus } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { toast } from 'react-toastify';
import "../../../style/Diary.css";
import { useCookies } from "react-cookie";
import imageTemplates from "../../../components/imageTemplates";

export const FriendSection = ({ setAddfrienSec, addfriendSec, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cookies] = useCookies(["token"]);
  const [loading, setLoading] = useState(true);

  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);

  const token = cookies.token;

  useEffect(() => {
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
          setFriends(data.data); // กรณี API ตอบแบบ { success: true, data: [...] }
        } else {
          setFriends([]); // fallback
        }
      } catch (error) {
        console.error('Failed to fetch accepted friends:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAcceptedFriends()
  }, [token])

  useEffect(() => {
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

    if (token) {
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
        autoClose: 2000,
        closeButton: false,
      });
    } catch (error) {
      toast.error("Failed to send the request.", {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
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
      toast.warning("You have unfriended this person.", {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };

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
                  const isRequest = request.some((f) => f.id === friend.id);
                  const isFriends = friends.some((f) => f.id === friend.id);

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
                      {isFriends ? (
                        <span className="friend-emojicon" ><FaUserFriends /></span>
                      ) : (isRequest ? (
                        <span className="friend-icon" onClick={() => unrequest(friend.id)} >Pending...</span>
                      ) : (<FcPlus
                        className="add-button"
                        onClick={() => {
                          addFriend(friend);
                        }}
                      />
                      )
                      )}
                    </div>
                  );
                })

              ) : (
                <p>No friends found.</p>
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
                      onClick={() => removeFriend(friend.id)}
                    />
                  </div>
                )
              })
            ) : (
              <p>No friends found.</p>
            )}
          </div>
        </div>
      </div>
    )
  )
}

