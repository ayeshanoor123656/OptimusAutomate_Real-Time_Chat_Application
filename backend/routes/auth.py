from fastapi import APIRouter, HTTPException
from models.user import UserRegister, UserLogin
from database import db
from utils.auth import hash_password, verify_password, create_access_token

router = APIRouter()


@router.post("/register")
def register(user: UserRegister):

    existing = db.users.find_one({"email": user.email})

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    db.users.insert_one({
        "username": user.username,
        "email": user.email,
        "password": hash_password(user.password),
        "status": "offline"
    })

    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: UserLogin):

    existing = db.users.find_one({"email": user.email})

    if not existing:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, existing["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_access_token({
        "id": str(existing["_id"]),
        "email": existing["email"]
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }