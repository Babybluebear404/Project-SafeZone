import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { FcPlus } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { toast } from 'react-toastify';
import "../../../style/Diary.css";

export const FriendSection = ({setAddfrienSec,addfriendSec, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [friends, setFriends] = useState([
    { id: "test1", name: "Eren" },
    { id: "test2", name: "Mikasa" },
    { id: "test3", name: "Armin" },
    { id: "test4", name: "Levi" }
  ]);

  const user = [
    { id: "test1", name: "Eren" },
    { id: "test2", name: "Mikasa" },
    { id: "test3", name: "Armin" },
    { id: "test4", name: "Levi" },
    { id: "test5", name: "Himmel" },
    { id: "test6", name: "Frieren" },
    { id: "test7", name: "Heiter" },
    { id: "test8", name: "Eisen" }
  ];

  const [request, Setrequest] = useState([])

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUser = user.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addFriend = (friend) => {
    Setrequest([...friends, friend]);
    toast.success(`คำขอเป็นเพื่อนกับ ${friend.name} ถูกส่งไปแล้ว`, {
      position: "top-center",
      autoClose: 2000,
      closeButton: false,
    });
  };

  const unrequest = (id)=> {
    setFriends((prevFriends) => prevFriends.filter((f) => f.id !== id));
  }

  const removeFriend = (id) => {
    const removedFriend = friends.find((friend) => friend.id === id);
    setFriends(friends.filter((friend) => friend.id !== id));
    toast.error(`${removedFriend.name} ถูกลบออกจากเพื่อนแล้ว!`, {
      position: "top-center",
      autoClose: 2000,
      closeButton: false,
    });
  };


  return (
    addfriendSec ? (
      <div className="friend-display">
        <div className="header-friend">
          <SlArrowLeft
            onClick={() => setCurrentPage("Diary") & setSearchTerm("")&setAddfrienSec(false)}
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
                const isRequest = request.some((f) => f.id === friend.id);
                const isFriends = friends.some((f) => f.id === friend.id);

                return (
                  <div key={friend.id} className="friend-item">
                    <div className="pic-friends"></div>
                    <span>{friend.name}</span>
                    {isFriends ? (
                       <span className="friend-emojicon" ><FaUserFriends/></span>
                    ) : (  isRequest ? (
                      <span className="friend-icon" onClick={() => unrequest(friend.id)} >Pending...</span>
                        ):(<FcPlus
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
        )}

      </div>
    ) : (
      <div className="friend-display">
        <div className="header-friend">
          <SlArrowLeft
            onClick={() => setCurrentPage("Diary") & setSearchTerm("") &setAddfrienSec(false)}
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

