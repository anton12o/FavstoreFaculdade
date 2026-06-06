from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional

class FavoriteCreate(BaseModel):
    item_name: str
    item_url:  Optional[str] = None

class FavoriteResponse(BaseModel):
    id:         int
    user_id:    int
    item_name:  str
    item_url:   Optional[str]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)