# TODO: Just an Example!!! Remove After Define real schemas
from pydantic import BaseModel


class ItemCreate(BaseModel):
    """
    Pydantic schema for creating an item.
    """

    column2: str


class ItemUpdate(BaseModel):
    """
    Pydantic schema for updating an item.
    """

    column2: str


class Item(BaseModel):
    """
    Pydantic schema for retrieving an item.
    """

    column1: int
    column2: str
