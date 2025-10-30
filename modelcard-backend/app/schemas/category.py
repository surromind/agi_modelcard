from typing import List, Optional

from pydantic import BaseModel

from app.schemas.framework import FrameworkSchema
from app.schemas.license import LicenseSchema
from app.schemas.model_type import ModelTypeWithTaskSchema


class CategoryResponse(BaseModel):
    model: List[ModelTypeWithTaskSchema]
    framework: List[FrameworkSchema]
    licenses: List[LicenseSchema]
