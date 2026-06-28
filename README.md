# 💬 NexTalk — Real-Time Chat Application

A full-stack real-time chat application built with **React**, **FastAPI**, and **WebSockets**. Create rooms, chat instantly, send private messages, and see who's online — all in a clean dark UI.

---

## ✨ Features

- 🔴🟢 **Live presence** — see who's online in any room, updated in real time
- 💬 **Named rooms** — create topic-based rooms from the dashboard and join with one click
- 🔒 **Private messaging** — send direct messages to any online user with `/pm username message`
- 📜 **Message history** — last 20 messages load when you join a room so you never lose context
- 😊 **Emoji picker** — built-in emoji support in the message input
- 🔐 **Auth** — secure register and login with JWT tokens
- ⚡ **Zero-lag delivery** — WebSocket connections mean messages appear instantly, no polling

---

## 🛠 Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, React Router, Vite        |
| Backend   | FastAPI, Python 3.11+               |
| Realtime  | WebSockets (native FastAPI support) |
| Database  | MongoDB (via PyMongo)               |
| Auth      | JWT (JSON Web Tokens)               |
| Styling   | Custom CSS, Inter font              |

---

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx        # Message rendering + parser
│   │   │   ├── MessageInput.jsx   # Input bar with emoji picker
│   │   │   └── OnlineUsers.jsx    # Sidebar user list
│   │   ├── pages/
│   │   │   ├── Landing.jsx        # Homepage
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx      # Room list + create room
│   │   │   └── Chat.jsx           # Main chat page
│   │   ├── services/
│   │   │   └── api.js             # Axios instance
│   │   └── styles/
│   │       ├── login.css
│   │       ├── dashboard.css
│   │       └── chat.css
│   └── package.json
│
├── backend/
│   ├── main.py                    # FastAPI app + WebSocket endpoint
│   ├── websocket.py               # ConnectionManager (rooms, DMs, presence)
│   ├── database.py                # MongoDB connection
│   └── routes/
│       ├── auth.py                # /auth/register, /auth/login
│       └── rooms.py               # /rooms GET, POST
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- MongoDB running locally (or a MongoDB Atlas URI)

---

### Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn pymongo python-jose[cryptography] passlib python-dotenv

# Start the server
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

---

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Install emoji picker
npm install emoji-picker-react

# Start the dev server
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## 🔌 WebSocket Protocol

Connect via: `ws://127.0.0.1:8000/ws/{room}/{username}`

| Message format              | Meaning                        |
|-----------------------------|--------------------------------|
| `[HH:MM] sender: text`      | Regular room message           |
| `[HH:MM] [PRIVATE] sender: text` | Private message received  |
| `[HH:MM] [PRIVATE to user] text` | Private message you sent  |
| `[HH:MM] Server: text`      | System notification            |
| `===== USERS =====\n...`    | Online user list update        |

### Sending messages

| Command                   | Action                       |
|---------------------------|------------------------------|
| `Hello everyone`          | Send message to the room     |
| `/pm username message`    | Send a private message       |

---

## 🔐 API Endpoints

### Auth
| Method | Endpoint          | Body                              | Description     |
|--------|-------------------|-----------------------------------|-----------------|
| POST   | `/auth/register`  | `{username, email, password}`     | Create account  |
| POST   | `/auth/login`     | `{email, password}`               | Login, get JWT  |

### Rooms
| Method | Endpoint        | Description          |
|--------|-----------------|----------------------|
| GET    | `/rooms`        | List all rooms       |
| POST   | `/rooms/{name}` | Create a new room    |

---

## 🖥 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=nextalk
SECRET_KEY=your_jwt_secret_key_here
```

---

## 📸 Pages

| Page       | Route           | Description                              |
|------------|-----------------|------------------------------------------|
| Landing    | `/`             | Homepage with live chat demo             |
| Register   | `/register`     | Create a new account                     |
| Login      | `/login`        | Sign in to existing account              |
| Dashboard  | `/dashboard`    | View/create rooms, set display name      |
| Chat       | `/chat/:room`   | Real-time chat with sidebar + DM support |

---

## 👩‍💻 Author

Built by **Ayesha Noor** — [github.com/ayeshanoor123456](https://github.com/ayeshanoor123456)
