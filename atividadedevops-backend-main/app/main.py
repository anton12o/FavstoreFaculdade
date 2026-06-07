import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.api.v1 import users
from app.api.v1 import favorites
from app.api.v1 import products

# Cria as tabelas no banco na inicialização
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API de Usuários", version="1.0.0")

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/api/v1")
app.include_router(favorites.router, prefix="/api/v1")
app.include_router(products.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"status": "ok"}