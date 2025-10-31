from typing import List, Optional

from pydantic import BaseModel, ConfigDict

from app.schemas.task import TaskSchema


class ModelTypeSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: Optional[str]
    abbreviation: Optional[str]


class ModelTypeCreate(BaseModel):
    name: str
    description: Optional[str]
    abbreviation: Optional[str]


class ModelTypeUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    abbreviation: Optional[str]


class ModelTypeWithTaskSchema(ModelTypeSchema):
    task: List[TaskSchema]
