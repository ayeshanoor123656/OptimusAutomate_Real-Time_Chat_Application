import "../styles/chat.css";

function OnlineUsers({ users, setReceiver }) {
    return (
        <div className="online-users">
            <div className="online-users-header">
                <h3>Online — {users.length}</h3>
            </div>
            <div className="online-users-list">
                {users.map((user, index) => {
                    const online = user.includes("🟢");
                    const username = user.split(":")[0].trim().replace("🟢", "").replace("🔴", "").trim();

                    return (
                        <div
                            key={index}
                            className="user-item"
                            onClick={() => {
                                console.log("Selected:", username);
                                setReceiver(username);
                            }}
                            title={`Send DM to ${username}`}
                        >
                            <div className="avatar">{username[0]?.toUpperCase()}</div>
                            <span className="user-name">{username}</span>
                            <span className={`user-status ${online ? "online" : "offline"}`} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default OnlineUsers;