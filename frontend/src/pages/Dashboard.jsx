import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [username, setUsername] = useState(
        localStorage.getItem("username") || ""
    );

    const [rooms, setRooms] = useState([]);

    const [newRoom, setNewRoom] = useState("");

    useEffect(() => {

        loadRooms();

    }, []);

    async function loadRooms() {

        try {

            const response = await api.get("/rooms");

            setRooms(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Could not load rooms.");

        }

    }

    async function createRoom() {

        if (newRoom.trim() === "") {

            alert("Enter a room name.");

            return;

        }

        try {

            await api.post(`/rooms/${newRoom}`);

            setNewRoom("");

            loadRooms();

        }

        catch (error) {

            console.log(error);

            alert("Unable to create room.");

        }

    }

    function joinRoom(roomName) {

        if (username.trim() === "") {

            alert("Please enter your username.");

            return;

        }

        localStorage.setItem("username", username);

        navigate(`/chat/${roomName}`);

    }

    function logout() {

        localStorage.clear();

        navigate("/");

    }

    return (

        <div className="dashboard">

            <h1>Chat Dashboard</h1>

            <input

                type="text"

                placeholder="Enter Username"

                value={username}

                onChange={(e) => setUsername(e.target.value)}

            />

            <h2>Available Rooms</h2>

            {

                rooms.length === 0 ?

                    <p>No rooms available.</p>

                    :

                    rooms.map((room, index) => (

                        <div

                            key={index}

                            className="room"

                            onClick={() => joinRoom(room.name)}

                        >

                            🟢 {room.name}

                        </div>

                    ))

            }

            <h2>Create New Room</h2>

            <input

                type="text"

                placeholder="Room Name"

                value={newRoom}

                onChange={(e) => setNewRoom(e.target.value)}

            />

            <button onClick={createRoom}>

                Create Room

            </button>

            <button

                className="logout"

                onClick={logout}

            >

                Logout

            </button>

        </div>

    );

}

export default Dashboard;