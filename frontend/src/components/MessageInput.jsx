import { useState } from "react";

function MessageInput({sendMessage}){

    const [message,setMessage]=useState("");

    function send(){

        if(message.trim()==="") return;

        sendMessage(message);

        setMessage("");

    }

    return(

        <div className="input-area">

            <input

                placeholder="Type your message..."

                value={message}

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

    );

}

export default MessageInput;