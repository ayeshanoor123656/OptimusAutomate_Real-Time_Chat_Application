from fastapi import WebSocket
from database import db
from datetime import datetime


class ConnectionManager:

    def __init__(self):

        self.rooms = {}

        # username -> websocket
        self.connected_users = {}

        # username -> status
        self.user_status = {}

    async def connect(self, room, username, websocket):
        # Remove old connection if the same user reconnects
        if username in self.connected_users:

            try:
                await self.connected_users[username].close()
            except:
                pass

            del self.connected_users[username]

        await websocket.accept()

        if room not in self.rooms:
            self.rooms[room] = {}

        self.rooms[room][username] = websocket

        self.connected_users[username] = websocket

        self.user_status[username] = "🟢 Online"

        # -----------------------------
        # Send Previous Chat History
        # -----------------------------

        messages = list(

            db.messages.find(

                {
                    "room": room,
                    "type": "room"
                }

            ).sort("timestamp", -1).limit(20)

        )

        messages.reverse()

        if len(messages) > 0:

            try:

                await websocket.send_text(
                    "=========== Previous Chat History ==========="
                )

                for msg in messages:

                    try:

                        time = ""

                        if "timestamp" in msg:

                            time = msg["timestamp"].strftime("%H:%M")

                        await websocket.send_text(
                            f"[{time}] {msg['sender']}: {msg['message']}"
                        )

                    except Exception:

                        await websocket.send_text(
                            f"{msg['sender']}: {msg['message']}"
                        )

                await websocket.send_text(
                    "============================================="
                )

            except Exception:

                pass

    async def disconnect(self, room, username):

        if username in self.connected_users:
          del self.connected_users[username]

        self.user_status[username] = "🔴 Offline"

        if room in self.rooms:

            if username in self.rooms[room]:

                del self.rooms[room][username]

            if len(self.rooms[room]) == 0:

                del self.rooms[room]

    async def broadcast(self, room, sender, message):

        if room not in self.rooms:
            return

        # Save room messages

        if sender != "Server":

            db.messages.insert_one(

                {

                    "sender": sender,

                    "receiver": None,

                    "room": room,

                    "message": message,

                    "type": "room",

                    "timestamp": datetime.utcnow()

                }

            )

        disconnected = []

        for username, ws in self.rooms[room].items():

            try:

                current_time = datetime.now().strftime("%H:%M")

                await ws.send_text(
                    f"[{current_time}] {sender}: {message}"
                )

            except Exception:

                disconnected.append(username)

        for username in disconnected:

            if username in self.rooms[room]:

                del self.rooms[room][username]

            if username in self.connected_users:

                del self.connected_users[username]

    async def private_message(self, sender, receiver, message):
            
        print("Sender:", sender)
        print("Receiver:", receiver)
        print("Connected Users:", list(self.connected_users.keys()))
        if receiver not in self.connected_users:

            return False

        db.messages.insert_one(

            {

                "sender": sender,

                "receiver": receiver,

                "room": None,

                "message": message,

                "type": "private",

                "timestamp": datetime.utcnow()

            }

        )

        try:

            receiver_ws = self.connected_users[receiver]

            current_time = datetime.now().strftime("%H:%M")

            await receiver_ws.send_text(
                f"[{current_time}] [PRIVATE] {sender}: {message}"
            )

        except Exception:

            return False

        try:

            sender_ws = self.connected_users[sender]

            await sender_ws.send_text(
                f"[{current_time}] [PRIVATE to {receiver}] {message}"
            )

        except Exception:

            pass

        return True
    async def send_user_status(self, room):

        if room not in self.rooms:
            return

        status = ""

        # Current users in room
        for username in self.rooms[room]:

            if username in self.connected_users:
                state = "🟢 Online"
            else:
                state = "🔴 Offline"
            status += f"{username}: {state}\n"

        disconnected = []

        # Send status safely
        for username, ws in self.rooms[room].items():

            try:

                await ws.send_text(
                    "===== USERS =====\n" + status
                )

            except Exception:

                disconnected.append(username)

        # Remove broken sockets
        for username in disconnected:

            if username in self.rooms[room]:

                del self.rooms[room][username]

            if username in self.connected_users:

                del self.connected_users[username]

            self.user_status[username] = "🔴 Offline"


manager = ConnectionManager()