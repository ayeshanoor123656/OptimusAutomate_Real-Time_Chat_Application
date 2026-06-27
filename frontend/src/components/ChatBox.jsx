import { useEffect, useRef } from "react";
import "../styles/chat.css";

function ChatBox({ messages, username }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function parseMessage(raw) {
        const str = raw.trim();

        // ── Dividers ──
        if (str.includes("Previous Chat History") || str.includes("===========")) {
            return { type: "divider" };
        }

        // Strip leading timestamp [HH:MM] — backend format is exactly "[21:44] ..."
        // Regex: opening bracket, digits, colon, digits, closing bracket, optional space
        const stripped = str.replace(/^\[\d{1,2}:\d{2}\]\s*/, "").trim();

        // ── Server/system ──
        if (stripped.startsWith("Server:")) {
            return { type: "server", text: stripped.replace("Server:", "").trim() };
        }

        // ── Private received: "[PRIVATE] sender: text" ──
        if (stripped.startsWith("[PRIVATE]")) {
            const inner = stripped.replace("[PRIVATE]", "").trim();
            return { type: "private-received", text: inner };
        }

        // ── Private sent: "[PRIVATE to receiver] text" ──
        if (stripped.startsWith("[PRIVATE to")) {
            const match = stripped.match(/^\[PRIVATE to (.+?)\]\s*(.+)$/);
            if (match) {
                return { type: "private-sent", to: match[1], text: match[2] };
            }
            return { type: "private-sent", to: "?", text: stripped };
        }

        // ── Normal: "sender: text" ──
        const colonIdx = stripped.indexOf(":");
        if (colonIdx !== -1) {
            const sender = stripped.slice(0, colonIdx).trim();
            const text = stripped.slice(colonIdx + 1).trim();
            const isOwn = sender === username;
            return { type: "normal", sender, text, isOwn };
        }

        // Fallback
        return { type: "server", text: stripped };
    }

    return (
        <div className="chatbox">
            {messages.map((message, index) => {
                const parsed = parseMessage(message);

                if (parsed.type === "skip") return null;

                if (parsed.type === "divider") {
                    return (
                        <div key={index} className="history-divider">
                            <span className="divider-line" />
                            <span className="divider-label">📜 Previous Messages</span>
                            <span className="divider-line" />
                        </div>
                    );
                }

                if (parsed.type === "server") {
                    return (
                        <div key={index} className="server-message">
                            {parsed.text}
                        </div>
                    );
                }

                if (parsed.type === "private-sent") {
                    return (
                        <div key={index} className="private-message private-sent">
                            <span className="lock-icon">🔒</span>
                            <div>
                                <div className="pm-label">DM → {parsed.to}</div>
                                <div>{parsed.text}</div>
                            </div>
                        </div>
                    );
                }

                if (parsed.type === "private-received") {
                    // inner is "sender: text"
                    const colonIdx = parsed.text.indexOf(":");
                    const pmSender = colonIdx !== -1 ? parsed.text.slice(0, colonIdx).trim() : "";
                    const pmText = colonIdx !== -1 ? parsed.text.slice(colonIdx + 1).trim() : parsed.text;
                    return (
                        <div key={index} className="private-message private-received">
                            <span className="lock-icon">🔒</span>
                            <div>
                                <div className="pm-label">DM from {pmSender}</div>
                                <div>{pmText}</div>
                            </div>
                        </div>
                    );
                }

                // Normal message
                return (
                    <div key={index} className={`message ${parsed.isOwn ? "own" : "other"}`}>
                        {!parsed.isOwn && (
                            <div className="message-sender">{parsed.sender}</div>
                        )}
                        <div className="message-bubble">{parsed.text}</div>
                    </div>
                );
            })}
            <div ref={bottomRef} />
        </div>
    );
}

export default ChatBox;