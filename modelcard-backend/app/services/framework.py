from typing import List, Optional

from sqlalchemy.orm import Session

from app.db_models.model_card import Framework
from app.repos.framework import framework_repository
from app.schemas.framework import FrameworkCreate, FrameworkUpdate


class FrameworkService:
    @staticmethod
    def get(db: Session, pk: int) -> Optional[Framework]:
        return framework_repository.get(db, pk)

    @staticmethod
    def get_multi(db: Session, skip: int = 0, limit: int = 10) -> List[Framework]:
        return framework_repository.get_multi(db, skip=skip, limit=limit)

    @staticmethod
    def get_all(db: Session) -> List[Framework]:
        return framework_repository.get_all(db)

    @staticmethod
    def create(db: Session, *, obj_in: FrameworkCreate) -> Framework:
        return framework_repository.create(db, obj_in=obj_in)

    @staticmethod
    def update(db: Session, *, db_obj: Framework, obj_in: FrameworkUpdate) -> Framework:
        return framework_repository.update(db, db_obj=db_obj, obj_in=obj_in)

    @staticmethod
    def delete(db: Session, *, pk: int) -> Framework:
        return framework_repository.delete(db, pk=pk)
