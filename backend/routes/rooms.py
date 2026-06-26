from fastapi import APIRouter
from database import db

router = APIRouter()


@router.get("/")
def get_rooms():

    rooms = list(db.rooms.find({}, {"_id": 0}))

    return rooms


@router.post("/{room_name}")
def create_room(room_name: str):

    room = db.rooms.find_one({"name": room_name})

    if room:

        return {"message": "Room already exists"}

    db.rooms.insert_one({
        "name": room_name
    })

    return {"message": "Room Created"}