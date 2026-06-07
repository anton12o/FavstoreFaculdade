import os
import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/products", tags=["products"])

FAKE_STORE_URL = os.getenv("FAKE_STORE_API_URL", "https://fakestoreapi.com")
CATEGORY = os.getenv("FAKE_STORE_CATEGORY", "jewelery")

@router.get("/")
def list_products():
    try:
        with httpx.Client(timeout=5.0) as client:
            resp = client.get(f"{FAKE_STORE_URL}/products/category/{CATEGORY}")
            resp.raise_for_status()
            return resp.json()
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=503,
            detail="Serviço de produtos temporariamente indisponível. Tente novamente em instantes.",
        )
    except httpx.HTTPStatusError:
        raise HTTPException(
            status_code=503,
            detail="Serviço de produtos temporariamente indisponível. Tente novamente em instantes.",
        )
    except httpx.RequestError:
        raise HTTPException(
            status_code=503,
            detail="Serviço de produtos temporariamente indisponível. Tente novamente em instantes.",
        )
