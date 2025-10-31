from typing import Optional

from pydantic import BaseModel, ConfigDict


class FrameworkSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: Optional[str]
    # TODO: 화면설계서 반영시 추가
    # abbreviation: Optional[str]


class FrameworkCreate(BaseModel):
    name: str
    description: Optional[str]
    # TODO: 화면설계서 반영시 추가
    # abbreviation: Optional[str]


class FrameworkUpdate(BaseModel):
    name: str
    description: Optional[str]
    # TODO: 화면설계서 반영시 추가
    # abbreviation: Optional[str]
