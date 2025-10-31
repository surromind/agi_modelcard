from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.db.connect import get_db
from app.schemas.model_type import ModelTypeWithTaskSchema
from app.services.model_type import ModelTypeService

router = APIRouter(prefix="/model-types", tags=["[ROUND1] ModelType(Task) List"])

model_type_service = ModelTypeService()


@router.get("/", response_model=List[ModelTypeWithTaskSchema])
def get_list(db: Session = Depends(get_db)):
    return model_type_service.get_all(db=db)
