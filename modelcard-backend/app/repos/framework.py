from typing import List

from sqlalchemy.orm import Session

from app.db_models.model_card import Framework
from app.repos.base import CRUDBase
from app.schemas.framework import FrameworkCreate, FrameworkUpdate


class FrameworkRepository(CRUDBase[Framework, FrameworkCreate, FrameworkUpdate]):
    def get_all(self, db: Session) -> List[Framework]:
        return db.query(self.model).all()


framework_repository = FrameworkRepository(Framework)
