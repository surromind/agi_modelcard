from datetime import datetime
from typing import Optional

from sqlalchemy import TIMESTAMP, BigInteger
from sqlalchemy.orm import DeclarativeBase, Mapped, declared_attr, mapped_column

from app.utils import pascal_to_snake


class Base(DeclarativeBase):
    @declared_attr
    def __tablename__(cls) -> str:
        return pascal_to_snake(cls.__name__)


class BaseModel(Base):
    __abstract__ = True
    __mapper_args__ = {"polymorphic_identity": ""}

    def __repr__(self):
        items = [
            f"{column.key}={getattr(self, column.key)!r}"
            for column in self.__table__.columns
        ]
        return f"<{self.__class__.__name__}({', '.join(items)})>"


class BaseFile(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    file_name: Mapped[str]
    path: Mapped[str]
    size: Mapped[int] = mapped_column(type_=BigInteger)
    extension: Mapped[str]
    deleted_at: Mapped[Optional[datetime]] = mapped_column(type_=TIMESTAMP)
    created_at: Mapped[datetime] = mapped_column(type_=TIMESTAMP)
    created_by: Mapped[str]
    updated_at: Mapped[datetime] = mapped_column(type_=TIMESTAMP)
    updated_by: Mapped[str]
