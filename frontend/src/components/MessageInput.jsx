import { useState } from "react";

function MessageInput({

    sendMessage,

    receiver,

    clearReceiver

}){

    const [message,setMessage]=useState("");

    function send(){

        if(message.trim()==="") return;

        sendMessage(message);

        setMessage("");

    }

    return(

        <div>

            {

                receiver &&

                <div
                    style={{
                        padding:"10px",
                        background:"#dbeafe"
                    }}
                >

                    Private Message to:

                    <b>

                        {receiver}

                    </b>

                    <button
                        onClick={clearReceiver}
                        style={{
                            marginLeft:"15px"
                        }}
                    >

                        Cancel

                    </button>

                </div>

            }

            <div className="input-area">

                <input

                    value={message}

                    placeholder="Type message..."

                    onChange={(e)=>setMessage(e.target.value)}

                    onKeyDown={(e)=>{

                        if(e.key==="Enter"){

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