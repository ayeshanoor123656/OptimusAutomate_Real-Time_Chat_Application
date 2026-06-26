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

                   const mine = message.startsWith(username + ":");

                   const serverMessage = message.startsWith("Server:");

                    return (

                        <div
                            key={index}
                            className={
                                serverMessage
                                    ? "server-message"
                                    : mine
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