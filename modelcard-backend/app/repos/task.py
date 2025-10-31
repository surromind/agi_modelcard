from app.db_models.model_card import Task
from app.repos.base import CRUDBase
from app.schemas.task import TaskCreate, TaskUpdate


class TaskRepository(CRUDBase[Task, TaskCreate, TaskUpdate]):
    pass


task_repository = TaskRepository(Task)
