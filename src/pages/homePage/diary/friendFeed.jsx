import { useState, useEffect } from "react";
import { BsEmojiFrownFill, BsEmojiLaughingFill, BsEmojiNeutralFill, BsEmojiSmileFill, BsEmojiTearFill } from "react-icons/bs";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useCookies } from "react-cookie";
import imageTemplates from "../../../components/imageTemplates";
import "../../../style/Friendary.css";
import Tab from "../../Tab";

export const Friendary = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [friendsData, setFriendsData] = useState([]);
    const [friendMap, setFriendMap] = useState({});
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 4;

    const fetchAcceptedFriends = async () => {
        try {
            const res = await fetch('https://project-safezone.onrender.com/api/closefriends/getaccepted', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }

            const json = await res.json();
            const result = json.data;

            const friendsArray = Array.isArray(result)
                ? result
                : Array.isArray(result.data)
                    ? result.data
                    : [];

            const map = {};
            friendsArray.forEach(friend => {
                map[friend.id] = {
                    username: friend.username,
                    profile: friend.profile
                };
            });
            setFriendMap(map);
        } catch (error) {
            console.error('Failed to fetch accepted friends:', error);
            setFriendMap({});
        }
    };

    const fetchSharedDiaries = async () => {
        try {
            const res = await fetch("https://project-safezone.onrender.com/api/diaries/getsharediary", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Error ${res.status}`);
            }

            const json = await res.json();
            const data = json.data;
            const processed = data
                .map((entry, index) => ({
                    ...entry,
                    id: String(index),
                    username: friendMap[entry.userid]?.username || "Unknown",
                    profile: friendMap[entry.userid]?.profile || entry.profile || "Unknown",
                    isView: true
                }))
                .sort((a, b) => new Date(b.date) - new Date(a.date));

            setFriendsData(processed);
            setCurrentPage(0); // Reset to first page when data changes
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

    const uniqueFriends = Array.from(
        new Map(friendsData.map(f => [f.username, f])).values()
    );
    const filteredFriends = uniqueFriends.filter(friend =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRatingClass = (rating) => {
        switch (rating) {
            case 5:
                return "สุดยอด";
            case 4:
                return "ดี";
            case 3:
                return "ก็ดีนะ";
            case 2:
                return "ไม่ดีเลย";
            case 1:
                return "แย่มาก";
            default:
                return "กำลังประมวลผล...";
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

    const toggleView = (id) => {
        setFriendsData(prev => {
            const targetDiary = prev.find(diary => diary.id === id);
            if (!targetDiary) return prev; 

            const targetUserId = targetDiary.userid;

            return prev.map(diary =>
                diary.userid === targetUserId
                    ? { ...diary, isView: !diary.isView }
                    : diary
            );
        });
    };

    // Filter visible posts and calculate pagination
    const visiblePosts = friendsData.filter(friend => friend.isView);
    const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
    const currentPosts = visiblePosts.slice(
        currentPage * postsPerPage,
        (currentPage + 1) * postsPerPage
    );

    const goToPage = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="feed-section">
            <Tab />
            <h1 className="friendary">Friendary</h1>
            <span className="descripFeed">เรื่องราวของเพื่อนของคุณที่แบ่งปันมาให้คุณ อ่านบันทึกของเพื่อนคุณได้เลย!</span>
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
                                filteredFriends.map((friend) => {
                                    const template = imageTemplates.find(img => img.id === Number(friend.profile));
                                    const profileSrc = template?.src || "/assets/0.png";
                                    return (
                                        <div
                                            className="friend-items"
                                            key={friend.username}>
                                            <img
                                                src={profileSrc}
                                                alt={template?.name || "Unknown Cat"}
                                                className="logo-friends"
                                            />
                                            <span className="name-friends">{friend.username}</span>
                                            {friend.isView ? (
                                                <RiEyeFill
                                                    style={{ color: "#ffffff" }}
                                                    cursor="pointer"
                                                    onClick={() => toggleView(friend.id)}
                                                />
                                            ) : (
                                                <RiEyeOffFill
                                                    style={{ color: "#ffffff" }}
                                                    cursor="pointer"
                                                    onClick={() => toggleView(friend.id)}
                                                />
                                            )}
                                        </div>
                                    )
                                })
                            ) : (
                                <p>ไม่พบรายชื่อเพื่อน</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="post-Column">
                    <div className="post-Feed">
                        {currentPosts.length > 0 ? (
                            currentPosts.map((friend, index) => {
                                const template = imageTemplates.find(img => img.id === Number(friend.profile));
                                const profileSrc = template?.src || "/assets/0.png";
                                return (
                                    <div key={friend.id}>
                                        <div className="friend-Post">
                                            <img
                                                src={profileSrc}
                                                alt={template?.name || "Unknown Cat"}
                                                className="logo-friends"
                                            />
                                            <span className="name-friends">{friend.username}</span>
                                            <div className="datePost-friends">{friend.date_and_time}</div>
                                            <div></div>
                                            <div className="post-friends">{friend.story}</div>
                                            <div className="labelPost-friends">
                                                <div className="labelEmoji">{getEmojiIcon(friend.feeling)}</div>
                                                <div>{getRatingClass(friend.feeling)}</div>
                                            </div>
                                        </div>

                                        {index !== currentPosts.length - 1 && (
                                            <hr style={{ border: "1px solid rgb(180, 172, 172)", margin: "20px 0" }} />
                                        )}
                                    </div>
                                )
                            })
                        ) : (
                            <p>ไม่มีโพสต์ในขณะนี้</p>
                        )}
                    </div  >
                    {totalPages > 1 && (
                        <div className="arrowEndFeed">
                            <FaArrowAltCircleLeft 
                                onClick={() => goToPage(currentPage - 1)}
                                style={{ 
                                    cursor: currentPage > 0 ? 'pointer' : 'not-allowed', 
                                    opacity: currentPage > 0 ? 1 : 0.5 
                                }}
                            />
                            <span style={{ margin: '0 10px' }}>
                                หน้า {currentPage + 1} จาก {totalPages}
                            </span>
                            <FaArrowAltCircleRight 
                                onClick={() => goToPage(currentPage + 1)}
                                style={{ 
                                    cursor: currentPage < totalPages - 1 ? 'pointer' : 'not-allowed', 
                                    opacity: currentPage < totalPages - 1 ? 1 : 0.5 
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Friendary;