import { useEffect, useRef } from "react";

function ChatBox({ messages, username }) {

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    return (

        <div className="chat-box">

            {

                messages.map((message, index) => {

                    // Previous Chat History Divider
                    if (
                        message.includes("Previous Chat History") ||
                        message.includes("===========")
                    ) {

                        return (

                            <div
                                key={index}
                                className="history-divider"
                            >
                                📜 Previous Messages
                            </div>

                        );

                    }

                    // Server Messages
                    if (message.includes("Server:")) {

                        return (

                            <div
                                key={index}
                                className="server-message"
                            >
                                {message.replace("Server:", "")}
                            </div>

                        );

                    }

                    // Private message sent
                    if (message.includes("[PRIVATE to")) {

                        return (

                            <div
                                key={index}
                                className="private-message private-sent"
                            >
                                🔒 {message}
                            </div>

                        );

                    }

                    // Private message received
                    if (message.includes("[PRIVATE]")) {

                        return (

                            <div
                                key={index}
                                className="private-message private-received"
                            >
                                🔒 {message}
                            </div>

                        );

                    }

                    // Normal messages
                    const mine =
                        message.includes(`] ${username}:`) ||
                        message.startsWith(username + ":");

                    return (

                        <div

                            key={index}

                            className={
                                mine
                                    ? "message my-message"
                                    : "message other-message"
                            }

                        >

                            {message}

                        </div>

                    );

                })

            }

            <div ref={bottomRef}></div>

        </div>

    );

}

export default ChatBox;