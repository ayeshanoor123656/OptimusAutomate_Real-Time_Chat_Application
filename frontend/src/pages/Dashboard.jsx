import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState("");

    useEffect(() => { loadRooms(); }, []);

    async function loadRooms() {
        try {
            const response = await api.get("/rooms");
            setRooms(response.data);
        } catch (error) {
            console.log(error);
            alert("Could not load rooms.");
        }
    }

    async function createRoom() {
        if (newRoom.trim() === "") { alert("Enter a room name."); return; }
        try {
            await api.post(`/rooms/${newRoom}`);
            setNewRoom("");
            loadRooms();
        } catch (error) {
            console.log(error);
            alert("Unable to create room.");
        }
    }

    function joinRoom(roomName) {
        if (username.trim() === "") { alert("Please enter your username."); return; }
        localStorage.setItem("username", username);
        navigate(`/chat/${roomName}`);
    }

    function logout() { localStorage.clear(); navigate("/"); }

    return (
        <div className="dashboard">
            {/* Header */}
            <div className="dashboard-header">
                <div className="dashboard-brand">
                    <div className="logo">💬</div>
                    <h1>ChatRooms</h1>
                </div>
                <button className="logout" onClick={logout}>Sign out</button>
            </div>

            {/* Username */}
            <input
                className="username-input"
                type="text"
                placeholder="Your display name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {/* Rooms */}
            <h2>Active rooms</h2>
            <div className="rooms-list">
                {rooms.length === 0 ? (
                    <p className="no-rooms">No rooms yet — create the first one below.</p>
                ) : (
                    rooms.map((room, index) => (
                        <div key={index} className="room" onClick={() => joinRoom(room.name)}>
                            <span className="status-dot" />
                            {room.name}
                            <span className="room-arrow">›</span>
                        </div>
                    ))
                )}
            </div>

            {/* Create room */}
            <h2>New room</h2>
            <div className="create-room-row">
                <input
                    type="text"
                    placeholder="Room name"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && createRoom()}
                />
                <button onClick={createRoom}>Create</button>
            </div>
        </div>
    );
}

export default Dashboard;