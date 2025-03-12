import { useState, useEffect } from "react";
import { BsEmojiLaughingFill, BsEmojiSmileFill, BsEmojiNeutralFill, BsEmojiFrownFill, BsEmojiTearFill } from "react-icons/bs";
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";


export const FriendFeed = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isView, setIsView] = useState(true);

    const [friends, setFriends] = useState([
        { id: "test1", name: "Eren" },
        { id: "test2", name: "Mikasa" },
        { id: "test3", name: "Armin" },
        { id: "test4", name: "Levi" }
    ]);

    const filteredFriends = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="feed-section">
            <div className="feed-colunm">
                <div className="friends-nameFeed">
                    <input
                        placeholder="Search..."
                        className="search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus></input>
                    <div className="friend-content">
                        <div className="friends-list">
                            {filteredFriends.length > 0 ? (
                                filteredFriends.map((friend) => (
                                    <div key={friend.id} className="friend-items">
                                        <div className="logo-friends"></div>
                                        <span className="name-friends">{friend.name}</span>
                                        <div className="isView">
                                            {isView ? (
                                                <FaRegEye onClick={() => setIsView(false)} />
                                            ) : (
                                                <FaEyeSlash onClick={() => setIsView(true)} />
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No friends found.</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="post-Feed">
                    <div className="friend-Post">
                        <div className="logo-friends"></div>
                        <span className="name-friends">friend Name</span>
                        <div className="datePost-friends">Wed 12 Mar 2025</div>
                        <div></div>
                        <div className="post-friends">วันนี้หกดสหากดสหใทดำรายฟสวาดกืหาก่ญฏฆซนขไบนำขยาดกื่เืฟจยนๆ
                            ฐ"ฯฎษโ๋?ษฏฆ์ฆฯฤโ๋ฤฆญฯโซศษฏฤฐญฎฯ"๐ญฐฑณษฎ"ฯญโ?ษฆฌ์ฆษศโฤ."ญฎฑษ
                            ๋โศฤฎ๋"โญฯ๋ฑ์"
                        </div>
                        <div className="labelPost-friends">
                            <BsEmojiLaughingFill className="labelEmoji" />
                            <div>Awesome</div>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid rgb(180, 172, 172)", margin: "20px 0" }} />
                </div>
            </div>
        </div>

    )
}