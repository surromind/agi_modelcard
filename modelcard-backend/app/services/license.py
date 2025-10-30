from typing import List, Optional

from sqlalchemy.orm import Session

from app.db_models.model_card import License
from app.repos.license import license_repository
from app.schemas.license import LicenseCreate, LicenseUpdate


class LicenseService:
    @staticmethod
    def get(db: Session, pk: int) -> Optional[License]:
        return license_repository.get(db, pk)

    @staticmethod
    def get_multi(db: Session, skip: int = 0, limit: int = 10) -> List[License]:
        return license_repository.get_multi(db, skip=skip, limit=limit)

    @staticmethod
    def get_all(db: Session) -> List[License]:
        return license_repository.get_all(db)

    @staticmethod
    def create(db: Session, *, obj_in: LicenseCreate) -> License:
        return license_repository.create(db, obj_in=obj_in)

    @staticmethod
    def update(db: Session, *, db_obj: License, obj_in: LicenseUpdate) -> License:
        return license_repository.update(db, db_obj=db_obj, obj_in=obj_in)

    @staticmethod
    def delete(db: Session, *, pk: int) -> License:
        return license_repository.delete(db, pk=pk)
