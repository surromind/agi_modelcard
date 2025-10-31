"""
Common in modelcard & file schemas: [id, created_at, created_by, updated_at, updated_by].
Utilize BaseSchema to manage these shared columns.
"""

from datetime import datetime

from pydantic import BaseModel, Field


class BaseSchema(BaseModel):
    id: int
    created_at: datetime
    created_by: str
    updated_at: datetime = Field(default_factory=datetime.now)
    updated_by: str
