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

                    const serverMessage = message.includes("Server:");

                    const mine =
                        message.includes(`] ${username}:`) ||
                        message.startsWith(username + ":");

                    if (serverMessage) {

                        return (

                            <div
                                key={index}
                                className="server-message"
                            >

                                {message.replace("Server:", "")}

                            </div>

                        );

                    }

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