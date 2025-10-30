from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.db.connect import get_db
from app.schemas.task import TaskCreate, TaskSchema, TaskUpdate
from app.services.task import TaskService

router = APIRouter(prefix="/admin/tasks", tags=["[Admin] Tasks"])


task_service = TaskService()


@router.post("/", response_model=TaskSchema)
def create(*, db: Session = Depends(get_db), task_in: TaskCreate):
    return task_service.create(db=db, obj_in=task_in)


# TODO: Add Pagination
@router.get("/", response_model=List[TaskSchema])
def get_multi(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return task_service.get_multi(db=db, skip=skip, limit=limit)


@router.get("/{task_id}", response_model=TaskSchema)
def get(task_id: int, db: Session = Depends(get_db)):
    return task_service.get(db=db, pk=task_id)


@router.put("/{task_id}", response_model=TaskSchema)
def update(*, task_id: int, db: Session = Depends(get_db), task_in: TaskUpdate):
    db_task = task_service.get(db=db, pk=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task_service.update(db=db, db_obj=db_task, obj_in=task_in)


@router.delete("/{task_id}", response_model=TaskSchema)
def delete(task_id: int, db: Session = Depends(get_db)):
    return task_service.delete(db=db, pk=task_id)
