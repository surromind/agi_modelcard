from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.db.connect import get_db
from app.schemas.category import CategoryResponse
from app.services.framework import FrameworkService
from app.services.license import LicenseService
from app.services.model_type import ModelTypeService

router = APIRouter(
    prefix="/categories",
    tags=["[ROUND1] Categories List: Framework / License / ModelType(Task)"],
)

model_type_service = ModelTypeService()
license_service = LicenseService()
framework_service = FrameworkService()


@router.get("/", response_model=CategoryResponse)
def get_list(db: Session = Depends(get_db)):
    return CategoryResponse(
        model=model_type_service.get_all(db=db),
        framework=framework_service.get_all(db=db),
        licenses=license_service.get_all(db=db),
    )
