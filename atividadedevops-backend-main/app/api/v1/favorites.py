from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db
from app.db import crud
from app.schemas.favorite import FavoriteCreate, FavoriteResponse

router = APIRouter(
    prefix="/customers/{user_id}/favorites",
    tags=["favorites"],
)

@router.post("/", response_model=FavoriteResponse, status_code=201)
def add_favorite(
    user_id: int,
    data: FavoriteCreate,
    db: Session = Depends(get_db),
):
    try:
        fav = crud.create_favorite(db, user_id, data)
    except ValueError as e:
        raise HTTPException(status_code=409, detail=str(e))

    if fav is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return fav

@router.get("/", response_model=List[FavoriteResponse])
def list_favorites(user_id: int, db: Session = Depends(get_db)):
    if not crud.get_user(db, user_id):
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return crud.get_favorites(db, user_id)

@router.delete("/{favorite_id}", status_code=204)
def remove_favorite(user_id: int, favorite_id: int, db: Session = Depends(get_db)):
    ok = crud.delete_favorite(db, user_id, favorite_id)
    if not ok:
        raise HTTPException(status_code=404, detail="Favorito não encontrado.")