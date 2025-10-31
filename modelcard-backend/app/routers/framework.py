from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.db.connect import get_db
from app.schemas.framework import FrameworkSchema
from app.services.framework import FrameworkService

router = APIRouter(prefix="/frameworks", tags=["[ROUND1] Framework List"])

framework_service = FrameworkService()


@router.get("/", response_model=List[FrameworkSchema])
def get_list(db: Session = Depends(get_db)):
    return framework_service.get_all(db=db)
