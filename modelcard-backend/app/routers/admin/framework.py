from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.db.connect import get_db
from app.schemas.framework import FrameworkCreate, FrameworkSchema, FrameworkUpdate
from app.services.framework import FrameworkService

router = APIRouter(prefix="/admin/frameworks", tags=["[Admin] Frameworks"])


framework_service = FrameworkService()


@router.post("/", response_model=FrameworkSchema)
def create(*, db: Session = Depends(get_db), framework_in: FrameworkCreate):
    return framework_service.create(db=db, obj_in=framework_in)


# TODO: Add Pagination
@router.get("/", response_model=List[FrameworkSchema])
def get_multi(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return framework_service.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{framework_id}", response_model=FrameworkSchema)
def get(framework_id: int, db: Session = Depends(get_db)):
    return framework_service.get(db=db, pk=framework_id)


@router.put("/{framework_id}", response_model=FrameworkSchema)
def update(
    *, framework_id: int, db: Session = Depends(get_db), framework_in: FrameworkUpdate
):
    db_framework = framework_service.get(db=db, pk=framework_id)
    if db_framework is None:
        raise HTTPException(status_code=404, detail="License not found")
    return framework_service.update(db=db, db_obj=db_framework, obj_in=framework_in)


@router.delete("/{framework_id}", response_model=FrameworkSchema)
def delete(framework_id: int, db: Session = Depends(get_db)):
    return framework_service.delete(db=db, pk=framework_id)
