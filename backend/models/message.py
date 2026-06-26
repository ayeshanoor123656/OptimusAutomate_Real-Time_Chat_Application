from pydantic import BaseModel
from typing import Optional

class Message(BaseModel):
    sender: str
    receiver: Optional[str] = None
    room: Optional[str] = None
    message: str
    type: str