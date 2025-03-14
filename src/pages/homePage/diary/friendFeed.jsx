import { useState, useEffect } from "react";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";


export const FriendFeed = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [hiddenPosts, setHiddenPosts] = useState(new Set());

    const friendsData = [
        { name: "Eren", text: "วันนี้ไม่แย่", date:"Wed 12 Mar 2024" },
        { name: "Eren", text: "วันนasdsd", date:"Wed 11 Mar 2024" },
        { name: "Mikasa", text: "elfkdsf;lsdkfe",date:"Wed 10 Mar 2024" },
        { name: "Armin", text: "epkrpdlfs", date:"Wed 12 Mar 2024"},
        { name: "Armin", text: "epasdsadlfs", date:"Wed 12 Mar 2024" },
        { name: "Armin", text: "epasdsadlfs", date:"Wed 12 Mar 2024" },
        { name: "Armin", text: "epasdsadlfs",date:"Wed 12 Mar 2024" },
        { name: "Levi", text: "asdkaldsa",date:"Wed 12 Mar 2024" }
    ].map((friend, index) => ({ ...friend, id: String(index) })).sort((a, b) => new Date(b.date) - new Date(a.date));

    const uniqueFriends = Array.from(new Set(friendsData.map(f => f.name))).map(name => ({
        name
    }));
    const filteredFriends = uniqueFriends.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const visiblePosts = friendsData.filter(friend =>
        (selectedFriend ? friend.name === selectedFriend : true) && !hiddenPosts.has(friend.id)
    );

    const handleSelectFriend = (name) => {
        setSelectedFriend(selectedFriend === name ? null : name);
    };

    return (
        <div className="feed-section">
            <div className="feed-colunm">
                <div className="friends-nameFeed">
                    <input
                        placeholder="Search"
                        className="search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus></input>
                    <div className="friend-content">
                        <div className="friends-list">
                            {filteredFriends.length > 0 ? (
                                filteredFriends.map((friend) => (
                                    <div
                                    key={friend.name}
                                    className={`friend-items ${selectedFriend === friend.name ? "selected" : ""}`}
                                    onClick={() => handleSelectFriend(friend.name)}
                                >
                                    <div className="logo-friends"></div>
                                    <span className="name-friends">{friend.name}</span>
                                    <div></div>
                                </div>
                                ))
                            ) : (
                                <p>No friends found.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="post-Feed">
                    {visiblePosts.length > 0 ? (
                        visiblePosts.map((friend, index) => (
                            <div key={friend.id}>
                                <div className="friend-Post">
                                    <div className="logo-friends"></div>
                                    <span className="name-friends">{friend.name}</span>
                                    <div className="datePost-friends">
                                        {new Date(friend.date).toDateString()}
                                    </div>
                                    <div></div>
                                    <div className="post-friends">{friend.text}</div>
                                    <div className="labelPost-friends">
                                        <BsEmojiLaughingFill className="labelEmoji" />
                                        <div>Awesome</div>
                                    </div>
                                </div>

                                {index !== visiblePosts.length  - 1 && (
                                    <hr style={{ border: "1px solid rgb(180, 172, 172)", margin: "20px 0" }} />
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No posts available.</p>
                    )}
                </div>

            </div>
        </div>

    )
}