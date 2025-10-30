from typing import List

from sqlalchemy.orm import Session

from app.db_models.model_card import ModelType
from app.repos.base import CRUDBase
from app.schemas.model_type import ModelTypeCreate, ModelTypeUpdate


class ModelTypeRepository(CRUDBase[ModelType, ModelTypeCreate, ModelTypeUpdate]):
    def get_all(self, db: Session) -> List[ModelType]:
        return db.query(self.model).join(self.model.task).all()


model_type_repository = ModelTypeRepository(ModelType)
