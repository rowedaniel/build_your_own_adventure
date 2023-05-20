from typing import Generator

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from sqlalchemy.orm import Session

from . import models, schemas
from .crud import create_part, create_root, get_part_or_none
from .database import SessionLocal

app = FastAPI(default_response_class=ORJSONResponse)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db() -> Generator[Session, None, None]:
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/healthcheck")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/getpart", response_model=schemas.Part)
async def get_part(item_id: int, db: Session = Depends(get_db)) -> schemas.Part:
    res = get_part_or_none(db, item_id)
    if res is None:
        raise HTTPException(status_code=404, detail="item not found")
    return res


@app.post("/root", response_model=schemas.Part)
async def create_new_root(db: Session = Depends(get_db)) -> schemas.Part:
    root = create_root(db)
    if root is None:
        raise HTTPException(status_code=404, detail="root already created")
    return root


@app.post("/newpart", response_model=schemas.Part)
async def create_new_part(
    part: schemas.PartCreate, db: Session = Depends(get_db)
) -> schemas.Part:
    res = create_part(db, part)
    if res is None:
        raise HTTPException(status_code=404, detail="parent not found")
    return res
