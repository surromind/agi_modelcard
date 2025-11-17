"""
pydantic schemas for modelcard
role : modelcard data transfer objects
"""

from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, ConfigDict, Field

from app.consts.models import ModelStage, OrderParameter
from app.schemas.base import BaseSchema
from app.schemas.framework import FrameworkSchema
from app.schemas.license import LicenseSchema
from app.schemas.model_type import ModelTypeSchema
from app.schemas.task import TaskSchema


class ModelCardSchema(BaseSchema):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    description: str
    state: str = Field(alias="state_code")
    state_name: str
    framework: FrameworkSchema
    license: Optional[LicenseSchema]
    model_type: ModelTypeSchema
    task: TaskSchema
    git_url: str
    size: Optional[int]
    performance_metric: Optional[str]
    performance_score: Optional[float]
    file_size: Optional[float] = None
    file_unit: Optional[str] = None


class ModelCardDetail(ModelCardSchema):
    model_config = ConfigDict(from_attributes=True)

    document: str


class ModelCardCreateRequest(BaseModel):
    name: str
    description: str
    framework_id: int
    license_id: Optional[int] = None
    model_type_id: int
    task_id: int
    git_url: str
    size: Optional[int] = None
    performance_metric: Optional[str] = None
    performance_score: Optional[float] = None


class ModelCardCreate(ModelCardCreateRequest):
    state: str
    created_by: str
    updated_by: str


class ModelCardListRequest(BaseModel):
    # in
    framework: Optional[List[int]] = None
    license: Optional[List[int]] = None
    task: Optional[List[int]] = None
    model_type: Optional[List[int]] = None
    # equal
    state: Optional[ModelStage] = None
    # contains
    title: Optional[str] = None
    # order by
    order: Optional[OrderParameter] = OrderParameter.UPDATED_AT.value
    # offset limit
    page: Optional[int] = None


class ModelCardUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    framework_id: Optional[int]
    license_id: Optional[int]
    task_id: Optional[int]
    model_type_id: Optional[int]
    git_url: Optional[str]
    state: Optional[str]
    size: Optional[int]
    performance_metric: Optional[str]
    performance_score: Optional[float]
    deleted_at: Optional[datetime] = None
    updated_by: str


class ModelCardUpdateRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    framework_id: Optional[int] = None
    license_id: Optional[int] = None
    model_type_id: Optional[int] = None
    task_id: Optional[int] = None
    git_url: Optional[str] = None
    state: Optional[str] = None
    size: Optional[int] = None
    performance_metric: Optional[str] = None
    performance_score: Optional[float] = None
