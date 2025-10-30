from typing import Optional

from pydantic import BaseModel, ConfigDict


class TaskSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    description: Optional[str]
    model_type_id: int
    abbreviation: Optional[str]


class TaskCreate(BaseModel):
    name: str
    description: Optional[str]
    model_type_id: int
    abbreviation: Optional[str]


class TaskUpdate(BaseModel):
    name: str
    description: Optional[str]
    model_type_id: int
    abbreviation: Optional[str]
