function ChatBox({ messages, username }) {

    return (

        <div className="chat-box">

            {

                messages.map((message, index) => {

                    const mine = message.startsWith(username + ":");

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

        </div>

    );

}

export default ChatBox;