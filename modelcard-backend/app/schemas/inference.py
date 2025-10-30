from typing import Optional

from pydantic import BaseModel, ConfigDict


class InferenceSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    address: str
    port: int
