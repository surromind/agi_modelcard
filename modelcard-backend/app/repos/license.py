from typing import List

from sqlalchemy.orm import Session

from app.db_models.model_card import License
from app.repos.base import CRUDBase
from app.schemas.license import LicenseCreate, LicenseUpdate


class LicenseRepository(CRUDBase[License, LicenseCreate, LicenseUpdate]):
    def get_all(self, db: Session) -> List[License]:
        return db.query(self.model).all()


license_repository = LicenseRepository(License)
