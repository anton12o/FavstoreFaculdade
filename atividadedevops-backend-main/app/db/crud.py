from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.db import models
from app.schemas.user import UserCreate, UserUpdate
from app.schemas.favorite import FavoriteCreate

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(
        models.User.id == user_id
    ).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(
        models.User.email == email
    ).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: UserCreate):
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, data: UserUpdate):
    db_user = get_user(db, user_id)
    if not db_user:
        return None
    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if not db_user:
        return False
    db.delete(db_user)
    db.commit()
    return True


# ── favoritos ───────────────────────────────────────
def get_favorites(db: Session, user_id: int):
    return (
        db.query(models.Favorite)
        .filter(models.Favorite.user_id == user_id)
        .all()
    )

def create_favorite(db: Session, user_id: int, data: FavoriteCreate):
    # valida que o usuário existe antes de qualquer coisa
    user = get_user(db, user_id)
    if not user:
        return None
    fav = models.Favorite(
        user_id=user_id,
        item_name=data.item_name,
        item_url=data.item_url,
    )
    db.add(fav)
    try:
        db.commit()
        db.refresh(fav)
        return fav
    except IntegrityError:
        db.rollback()
        raise ValueError("Item já está nos favoritos deste usuário.")

def delete_favorite(db: Session, user_id: int, favorite_id: int):
    fav = (
        db.query(models.Favorite)
        .filter(
            models.Favorite.id == favorite_id,
            models.Favorite.user_id == user_id,
        )
        .first()
    )
    if not fav:
        return False
    db.delete(fav)
    db.commit()
    return True