from fastapi import WebSocket
from database import db
from datetime import datetime


class ConnectionManager:

    def __init__(self):
        self.rooms = {}

        # username -> websocket
        self.connected_users = {}

        # username -> Online/Offline
        self.user_status = {}

    async def connect(self, room, username, websocket):

        await websocket.accept()

        if room not in self.rooms:
            self.rooms[room] = {}

        self.rooms[room][username] = websocket

        self.connected_users[username] = websocket

        self.user_status[username] = "🟢 Online"

        # -------------------------------
        # Send previous room messages
        # -------------------------------
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

            await websocket.send_text("")
            await websocket.send_text("===================================")
            await websocket.send_text("      PREVIOUS CHAT HISTORY")
            await websocket.send_text("===================================")

            for msg in messages:

                time = msg["timestamp"].strftime("%H:%M")

                await websocket.send_text(
                    f"[{time}] {msg['sender']}: {msg['message']}"
                )

            await websocket.send_text("===================================")
            await websocket.send_text("")

    async def disconnect(self, room, username):

        self.user_status[username] = "🔴 Offline"

        await self.send_user_status(room)

        if room in self.rooms:

            if username in self.rooms[room]:
                del self.rooms[room][username]

            if len(self.rooms[room]) == 0:
                del self.rooms[room]

        if username in self.connected_users:
            del self.connected_users[username]

    async def broadcast(self, room, sender, message):

        if room not in self.rooms:
            return

        # Don't save server messages
        if sender != "Server":

            db.messages.insert_one({

                "sender": sender,
                "receiver": None,
                "room": room,
                "message": message,
                "type": "room",
                "timestamp": datetime.utcnow()

            })

        for ws in self.rooms[room].values():
            await ws.send_text(
                f"{sender}: {message}"
            )

    async def private_message(self, sender, receiver, message):

        if receiver not in self.connected_users:
            return False

        # Save in MongoDB
        db.messages.insert_one({

            "sender": sender,
            "receiver": receiver,
            "room": None,
            "message": message,
            "type": "private",
            "timestamp": datetime.utcnow()

        })

        receiver_ws = self.connected_users[receiver]
        sender_ws = self.connected_users[sender]

        await receiver_ws.send_text(
            f"[PRIVATE] {sender}: {message}"
        )

        await sender_ws.send_text(
            f"[PRIVATE to {receiver}] {message}"
        )

        return True

    async def send_user_status(self, room):

        if room not in self.rooms:
            return

        status = ""

        # Users currently inside room
        for username in self.rooms[room]:

            state = self.user_status.get(
                username,
                "🔴 Offline"
            )

            status += f"{username}: {state}\n"

        # Users who recently disconnected
        for username, state in self.user_status.items():

            if (
                state == "🔴 Offline"
                and username not in self.rooms[room]
            ):
                status += f"{username}: {state}\n"

        for ws in self.rooms[room].values():

            await ws.send_text(
                "===== USERS =====\n" + status
            )


manager = ConnectionManager()