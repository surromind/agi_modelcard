from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.db.connect import get_db
from app.schemas.model_type import ModelTypeCreate, ModelTypeSchema, ModelTypeUpdate
from app.services.model_type import ModelTypeService

router = APIRouter(prefix="/admin/model-types", tags=["[Admin] Model-Types"])


model_type_service = ModelTypeService()


@router.post("/", response_model=ModelTypeSchema)
def create(*, db: Session = Depends(get_db), model_type_in: ModelTypeCreate):
    return model_type_service.create(db=db, obj_in=model_type_in)


# TODO: Add Pagination
@router.get("/", response_model=List[ModelTypeSchema])
def get_multi(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return model_type_service.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{model_type_id}", response_model=ModelTypeSchema)
def get(model_type_id: int, db: Session = Depends(get_db)):
    return model_type_service.get(db=db, pk=model_type_id)


@router.put("/{model_type_id}", response_model=ModelTypeSchema)
def update(
    *, model_type_id: int, db: Session = Depends(get_db), model_type_in: ModelTypeUpdate
):
    db_model_type = model_type_service.get(db=db, pk=model_type_id)
    if db_model_type is None:
        raise HTTPException(status_code=404, detail="ModelType not found")
    return model_type_service.update(db=db, db_obj=db_model_type, obj_in=model_type_in)


@router.delete("/{model_type_id}", response_model=ModelTypeSchema)
def delete(model_type_id: int, db: Session = Depends(get_db)):
    return model_type_service.delete(db=db, pk=model_type_id)
