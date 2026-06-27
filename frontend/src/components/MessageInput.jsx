import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "../styles/chat.css";

function MessageInput({ sendMessage, receiver, clearReceiver }) {
    const [message, setMessage] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    function send() {
        if (message.trim() === "") return;
        sendMessage(message);
        setMessage("");
        setShowPicker(false);
    }

    function onEmojiClick(emojiData) {
        setMessage(prev => prev + emojiData.emoji);
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
                    onClick={() => setShowPicker(!showPicker)}
                    title="Pick emoji"
                >
                    😊
                </button>

                <input
                    value={message}
                    placeholder={receiver ? `Message @${receiver}…` : "Message the room…"}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                />

                <button className="send-btn" onClick={send}>➤</button>
            </div>
        </div>
    );
}

export default MessageInput;