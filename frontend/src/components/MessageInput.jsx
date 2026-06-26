import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

function MessageInput({

    sendMessage,

    receiver,

    clearReceiver

}) {

    const [message, setMessage] = useState("");

    const [showPicker, setShowPicker] = useState(false);

    function send() {

        if (message.trim() === "") return;

        sendMessage(message);

        setMessage("");

        setShowPicker(false);

    }

    function onEmojiClick(emojiData) {

    setMessage(previous => previous + emojiData.emoji);

    setShowPicker(false);

}

    return (

        <div>

            {

                receiver &&

                <div
                    style={{
                        padding: "10px",
                        background: "#dbeafe"
                    }}
                >

                    Private Message to:

                    <b> {receiver} </b>

                    <button
                        onClick={clearReceiver}
                        style={{ marginLeft: "15px" }}
                    >

                        Cancel

                    </button>

                </div>

            }

            {

                showPicker &&

                <div style={{ margin: "10px" }}>

                    <EmojiPicker
                        onEmojiClick={onEmojiClick}
                    />

                </div>

            }

            <div className="input-area">

                <button

                    onClick={() => setShowPicker(!showPicker)}

                    style={{
                        marginRight: "10px",
                        fontSize: "22px"
                    }}

                >

                    😊

                </button>

                <input

                    value={message}

                    placeholder="Type message..."

                    onChange={(e) => setMessage(e.target.value)}

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            send();

                        }

                    }}

                />

                <button onClick={send}>

                    Send

                </button>

            </div>

        </div>

    );

}

export default MessageInput;