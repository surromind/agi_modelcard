from typing import List, Optional

from sqlalchemy.orm import Session

from app.db_models.model_card import Task
from app.repos.task import task_repository
from app.schemas.task import TaskCreate, TaskUpdate


class TaskService:
    @staticmethod
    def get(db: Session, pk: int) -> Optional[Task]:
        return task_repository.get(db, pk)

    @staticmethod
    def get_multi(db: Session, skip: int = 0, limit: int = 10) -> List[Task]:
        return task_repository.get_multi(db, skip=skip, limit=limit)

    @staticmethod
    def create(db: Session, *, obj_in: TaskCreate) -> Task:
        return task_repository.create(db, obj_in=obj_in)

    @staticmethod
    def update(db: Session, *, db_obj: Task, obj_in: TaskUpdate) -> Task:
        return task_repository.update(db, db_obj=db_obj, obj_in=obj_in)

    @staticmethod
    def delete(db: Session, *, pk: int) -> Task:
        return task_repository.delete(db, pk=pk)
