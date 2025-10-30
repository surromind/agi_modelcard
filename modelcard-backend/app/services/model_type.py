from typing import List, Optional

from sqlalchemy.orm import Session

from app.db_models.model_card import ModelType
from app.repos.model_type import model_type_repository
from app.schemas.model_type import ModelTypeCreate, ModelTypeUpdate


class ModelTypeService:
    @staticmethod
    def get(db: Session, pk: int) -> Optional[ModelType]:
        return model_type_repository.get(db, pk)

    @staticmethod
    def get_multi(db: Session, skip: int = 0, limit: int = 10) -> List[ModelType]:
        return model_type_repository.get_multi(db, skip=skip, limit=limit)

    @staticmethod
    def get_all(db: Session) -> List[ModelType]:
        return model_type_repository.get_all(db)

    @staticmethod
    def create(db: Session, *, obj_in: ModelTypeCreate) -> ModelType:
        return model_type_repository.create(db, obj_in=obj_in)

    @staticmethod
    def update(db: Session, *, db_obj: ModelType, obj_in: ModelTypeUpdate) -> ModelType:
        return model_type_repository.update(db, db_obj=db_obj, obj_in=obj_in)

    @staticmethod
    def delete(db: Session, *, pk: int) -> ModelType:
        return model_type_repository.delete(db, pk=pk)
