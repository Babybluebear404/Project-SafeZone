import { useState, useEffect } from "react";
import { BsEmojiFrownFill, BsEmojiLaughingFill, BsEmojiNeutralFill, BsEmojiSmileFill, BsEmojiTearFill } from "react-icons/bs";
import { useCookies } from "react-cookie";

export const FriendFeed = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [friendsData, setFriendsData] = useState([]);
    const [friendMap, setFriendMap] = useState({}); // userid → username
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const fetchAcceptedFriends = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/closefriends/getaccepted', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }

            const data = await res.json();

            // Map userid → username
            const map = {};
            data.forEach(friend => {
                map[friend.id] = friend.username; // friend.id = userid
            });
            setFriendMap(map);
        } catch (error) {
            console.error('Failed to fetch accepted friends:', error);
        }
    };

    const fetchSharedDiaries = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/diaries/getsharediary", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }

            const data = await res.json();

            const processed = data
                .map((entry, index) => ({
                    ...entry,
                    id: String(index),
                    username: friendMap[entry.userid] || "Unknown"

                }))
                .sort((a, b) => new Date(b.date) - new Date(a.date));

            setFriendsData(processed);
        } catch (err) {
            console.error("Can't load Diary:", err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAcceptedFriends();
        }
    }, [token]);

    useEffect(() => {
        if (token && Object.keys(friendMap).length > 0) {
            fetchSharedDiaries();
        }
    }, [token, friendMap]);

    const uniqueFriends = Array.from(new Set(friendsData.map(f => f.username))).map(username => ({ username }));
    const filteredFriends = uniqueFriends.filter(friend =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRatingClass = (rating) => {
        switch (rating) {
            case 5:
                return "Awesome";
            case 4:
                return "Good";
            case 3:
                return "Alright";
            case 2:
                return "Bad";
            case 1:
                return "Awful";
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

    return (
        <div className="feed-section">
            <h1 className="friendary">Friendary</h1>
            <div className="feed-colunm">
                <div className="friends-nameFeed">
                    <input
                        placeholder="Search"
                        className="search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                    <div className="friend-content">
                        <div className="friends-list">
                            {filteredFriends.length > 0 ? (
                                filteredFriends.map((friend) => (
                                    <div
                                        className="friend-items"
                                        key={friend.username}>
                                        <div className="logo-friends"></div>
                                        <span className="name-friends">{friend.username}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No friends found.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="post-Feed">
                    {friendsData.length > 0 ? (
                        friendsData.map((friend, index) => (
                            <div key={friend.id}>
                                <div className="friend-Post">
                                    <div className="logo-friends"></div>
                                    <span className="name-friends">{friend.username}</span>
                                    <div className="datePost-friends">
                                    </div>
                                    <div></div>
                                    <div className="post-friends">{friend.story}</div>
                                    <div className="labelPost-friends">
                                        <div className="labelEmoji">{getEmojiIcon(friend.feeling)}</div>
                                        <div>{getRatingClass(friend.feeling)}</div>
                                    </div>
                                </div>

                                {index !== friendsData.length.length - 1 && (
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
    );
};
