import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import "../styles/chat.css";

// ─────────────────────────────────────
// OnlineUsers
// ─────────────────────────────────────
function OnlineUsers({ users, setReceiver }) {
    return (
        <div className="online-users">
            <div className="online-users-header">
                <h3>Online — {users.length}</h3>
            </div>
            <div className="online-users-list">
                {users.map((user, i) => {
                    const online = user.includes("🟢");
                    const name = user.split(":")[0]
                        .replace("🟢", "").replace("🔴", "").trim();
                    return (
                        <div
                            key={i}
                            className="user-item"
                            onClick={() => setReceiver(name)}
                            title={`Send DM to ${name}`}
                        >
                            <div className="avatar">{name[0]?.toUpperCase()}</div>
                            <span className="user-name">{name}</span>
                            <span className={`user-status ${online ? "online" : "offline"}`} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─────────────────────────────────────
// ChatBox
// ─────────────────────────────────────
function ChatBox({ messages, username }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function parseMessage(raw) {
        const str = raw.trim();

        // Dividers
        if (str.includes("Previous Chat History") || str.includes("===========")) {
            return { type: "divider" };
        }

        // Strip [HH:MM] timestamp — backend format is exactly "[17:35] ..."
        const stripped = str.replace(/^\[\d{1,2}:\d{2}\]\s*/, "").trim();

        // Server/system
        if (stripped.startsWith("Server:")) {
            return { type: "server", text: stripped.replace("Server:", "").trim() };
        }

        // Private received: "[PRIVATE] sender: text"
        if (stripped.startsWith("[PRIVATE]")) {
            const inner = stripped.replace("[PRIVATE]", "").trim();
            const ci = inner.indexOf(":");
            const pmSender = ci !== -1 ? inner.slice(0, ci).trim() : "";
            const pmText = ci !== -1 ? inner.slice(ci + 1).trim() : inner;
            return { type: "private-received", sender: pmSender, text: pmText };
        }

        // Private sent: "[PRIVATE to receiver] text"
        if (stripped.startsWith("[PRIVATE to")) {
            const match = stripped.match(/^\[PRIVATE to (.+?)\]\s*(.+)$/);
            return { type: "private-sent", to: match?.[1] ?? "?", text: match?.[2] ?? stripped };
        }

        // Normal: "sender: text"
        const ci = stripped.indexOf(":");
        if (ci !== -1) {
            const sender = stripped.slice(0, ci).trim();
            const text = stripped.slice(ci + 1).trim();
            const isOwn = sender === username;
            return { type: "normal", sender, text, isOwn };
        }

        return { type: "server", text: stripped };
    }

    return (
        <div className="chatbox">
            {messages.map((msg, i) => {
                const p = parseMessage(msg);

                if (p.type === "divider") return (
                    <div key={i} className="history-divider">
                        <span className="divider-line" />
                        <span className="divider-label">📜 Previous Messages</span>
                        <span className="divider-line" />
                    </div>
                );

                if (p.type === "server") return (
                    <div key={i} className="server-message">{p.text}</div>
                );

                if (p.type === "private-sent") return (
                    <div key={i} className="private-message private-sent">
                        <span className="lock-icon">🔒</span>
                        <div>
                            <div className="pm-label">DM → {p.to}</div>
                            <div>{p.text}</div>
                        </div>
                    </div>
                );

                if (p.type === "private-received") return (
                    <div key={i} className="private-message private-received">
                        <span className="lock-icon">🔒</span>
                        <div>
                            <div className="pm-label">DM from {p.sender}</div>
                            <div>{p.text}</div>
                        </div>
                    </div>
                );

                // Normal
                return (
                    <div key={i} className={`message ${p.isOwn ? "own" : "other"}`}>
                        {!p.isOwn && <div className="message-sender">{p.sender}</div>}
                        <div className="message-bubble">{p.text}</div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
}

// ─────────────────────────────────────
// MessageInput
// ─────────────────────────────────────
function MessageInput({ sendMessage, receiver, clearReceiver }) {
    const [text, setText] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    function handleSend() {
        if (text.trim() === "") return;
        sendMessage(text.trim());
        setText("");
        setShowPicker(false);
    }

    function onEmojiClick(emojiData) {
        setText(prev => prev + emojiData.emoji);
        setShowPicker(false);
    }

    return (
        <div className="input-wrapper">
            {receiver && (
                <div className="dm-indicator">
                    <span>📨 DM to <strong>{receiver}</strong></span>
                    <button onClick={clearReceiver}>✕ Cancel</button>
                </div>
            )}

            {showPicker && (
                <div className="emoji-picker-wrapper">
                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        theme="dark"
                        skinTonesDisabled
                        height={380}
                        width={320}
                    />
                </div>
            )}

            <div className="message-input-area">
                <button
                    className="emoji-btn"
                    onClick={() => setShowPicker(v => !v)}
                    title="Pick emoji"
                >
                    😊
                </button>
                <input
                    value={text}
                    placeholder={receiver ? `Message @${receiver}…` : "Message the room…"}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button className="send-btn" onClick={handleSend}>➤</button>
            </div>
        </div>
    );
}

// ─────────────────────────────────────
// Chat (page)
// ─────────────────────────────────────
function Chat() {
    const navigate = useNavigate();
    const { room } = useParams();
    const username = localStorage.getItem("username");
    const socket = useRef(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [receiver, setReceiver] = useState("");

    useEffect(() => {
        socket.current = new WebSocket(`ws://127.0.0.1:8000/ws/${room}/${username}`);

        socket.current.onmessage = (event) => {
            if (event.data.startsWith("===== USERS =====")) {
                const lines = event.data
                    .replace("===== USERS =====", "")
                    .trim()
                    .split("\n")
                    .filter(Boolean);
                setUsers(lines);
            } else {
                setMessages(prev => [...prev, event.data]);
            }
        };

        return () => { socket.current?.close(); };
    }, []);

    function sendMessage(message) {
        if (!socket.current) return;
        if (receiver !== "") {
            socket.current.send(`/pm ${receiver} ${message}`);
            setReceiver("");
        } else {
            socket.current.send(message);
        }
    }

    function logout() { localStorage.clear(); navigate("/"); }

    return (
        <div className="chat-page">
            <OnlineUsers users={users} setReceiver={setReceiver} />

            <div className="chat-container">
                <div className="chat-header">
                    <h2># <span className="room-badge">{room}</span></h2>
                    <div className="header-right">
                        <div className="username-chip">
                            <div className="mini-avatar">{username?.[0]?.toUpperCase()}</div>
                            {username}
                        </div>
                        <button className="logout" onClick={logout}>Sign out</button>
                    </div>
                </div>

                <ChatBox messages={messages} username={username} />

                <MessageInput
                    sendMessage={sendMessage}
                    receiver={receiver}
                    clearReceiver={() => setReceiver("")}
                />
            </div>
        </div>
    );
}

export default Chat;