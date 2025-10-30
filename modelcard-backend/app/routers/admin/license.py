from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.db.connect import get_db
from app.schemas.license import LicenseCreate, LicenseSchema, LicenseUpdate
from app.services.license import LicenseService

router = APIRouter(prefix="/admin/licenses", tags=["[Admin] Licenses"])


license_service = LicenseService()


@router.post("/", response_model=LicenseSchema)
def create(*, db: Session = Depends(get_db), license_in: LicenseCreate):
    return license_service.create(db=db, obj_in=license_in)


# TODO: Add Pagination
@router.get("/", response_model=List[LicenseSchema])
def get_multi(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return license_service.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{license_id}", response_model=LicenseSchema)
def get(license_id: int, db: Session = Depends(get_db)):
    return license_service.get(db=db, pk=license_id)


@router.put("/{license_id}", response_model=LicenseSchema)
def update(
    *, license_id: int, db: Session = Depends(get_db), license_in: LicenseUpdate
):
    db_license = license_service.get(db=db, pk=license_id)
    if db_license is None:
        raise HTTPException(status_code=404, detail="License not found")
    return license_service.update(db=db, db_obj=db_license, obj_in=license_in)


@router.delete("/{license_id}", response_model=LicenseSchema)
def delete(license_id: int, db: Session = Depends(get_db)):
    return license_service.delete(db=db, pk=license_id)
