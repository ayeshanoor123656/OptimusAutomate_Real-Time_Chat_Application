from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from routes.auth import router as auth_router
from websocket import manager

app = FastAPI()

# Authentication Routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)


@app.get("/")
def home():
    return {
        "message": "Chat App Backend Running"
    }


@app.websocket("/ws/{room}/{username}")
async def websocket_endpoint(
    websocket: WebSocket,
    room: str,
    username: str
):

    # Connect user
    await manager.connect(
        room,
        username,
        websocket
    )

    # Send current online users in this room
    await manager.send_user_status(room)

    # Notify room
    await manager.broadcast(
        room,
        "Server",
        f"{username} joined {room}"
    )

    try:

        while True:

            message = await websocket.receive_text()

            # ----------------------------
            # Private Message
            # Format:
            # /pm username message
            # ----------------------------
            if message.startswith("/pm"):

                parts = message.split(" ", 2)

                if len(parts) != 3:

                    await websocket.send_text(
                        "Usage: /pm username message"
                    )

                    continue

                receiver = parts[1]
                private_message = parts[2]

                success = await manager.private_message(
                    username,
                    receiver,
                    private_message
                )

                if not success:

                    await websocket.send_text(
                        "User not found or offline."
                    )

            # ----------------------------
            # Room Message
            # ----------------------------
            else:

                await manager.broadcast(
                    room,
                    username,
                    message
                )

    except WebSocketDisconnect:

        # Disconnect user
        await manager.disconnect(
            room,
            username
        )

        # Notify remaining users
        await manager.broadcast(
            room,
            "Server",
            f"{username} left {room}"
        )