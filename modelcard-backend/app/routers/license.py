from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.db.connect import get_db
from app.schemas.license import LicenseSchema
from app.services.license import LicenseService

router = APIRouter(prefix="/licenses", tags=["[ROUND1] Licence List"])

license_service = LicenseService()


@router.get("/", response_model=List[LicenseSchema])
def get_list(db: Session = Depends(get_db)):
    return license_service.get_all(db=db)
