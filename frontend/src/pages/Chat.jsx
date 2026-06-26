import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import OnlineUsers from "../components/OnlineUsers";

import "../styles/chat.css";

function Chat(){

    const navigate=useNavigate();

    const {room}=useParams();

    const username=localStorage.getItem("username");

    const socket=useRef(null);

    const [messages,setMessages]=useState([]);

    const [users,setUsers]=useState([]);

    useEffect(()=>{

        socket.current=new WebSocket(

            `ws://127.0.0.1:8000/ws/${room}/${username}`

        );

        socket.current.onmessage=(event)=>{

            // User status block
            if(event.data.startsWith("===== USERS =====")){

                const lines=event.data
                    .replace("===== USERS =====","")
                    .trim()
                    .split("\n");

                setUsers(lines);

            }

            else{

                setMessages(previous=>[

                    ...previous,

                    event.data

                ]);

            }

        };

        return ()=>{

            socket.current.close();

        };

    },[]);

    function sendMessage(message){

        socket.current.send(message);

    }

    function logout(){

        localStorage.clear();

        navigate("/");

    }

    return(

        <div className="chat-page">

            <OnlineUsers users={users}/>

            <div className="chat-container">

                <div className="chat-header">

                    <h2>

                        Room : {room}

                    </h2>

                    <div>

                        {username}

                        <button
                            className="logout"
                            onClick={logout}
                            style={{marginLeft:"20px"}}
                        >

                            Logout

                        </button>

                    </div>

                </div>

                <ChatBox

                    messages={messages}

                    username={username}

                />

                <MessageInput sendMessage={sendMessage}/>

            </div>

        </div>

    );

}

export default Chat;