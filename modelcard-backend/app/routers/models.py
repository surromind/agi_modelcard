from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi_pagination import paginate
from sqlalchemy.orm import Session

from app.consts.models import ModelStage
from app.core.pagination.page import ModelCardPage
from app.db_models import Model
from app.dependencies.db.connect import get_db
from app.schemas.models import (
    ModelCardCreateRequest,
    ModelCardListRequest,
    ModelCardSchema,
    ModelCardDetail,
    ModelCardUpdateRequest,
)
from app.services.models import ModelService
from app.utils.parser import param_parser
from app.utils.validator import validate_model_type

router = APIRouter(prefix="/models", tags=["[ROUND1] Model Card RestfulAPI"])

model_service = ModelService()


@router.post("/", response_model=ModelCardSchema)
def create_model(*, db=Depends(get_db), model_in: ModelCardCreateRequest):
    db_model = model_service.create(db=db, model_in=model_in)

    try:
        validate_model_type(
            db=db, model_type_id=model_in.model_type_id, task_id=model_in.task_id
        )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

    # TODO: consider possibility of other state values. default state is project.
    if db_model.state == ModelStage.PROJECT.value:
        db_model.state_name = "project"

    return db_model


@router.get("/", response_model=ModelCardPage[ModelCardSchema])
def get_models(
    *,
    db: Session = Depends(get_db),
    filter_in: ModelCardListRequest = Depends(param_parser)
):
    model_items: List[Model] = model_service.get_list(db=db, filter_in=filter_in)
    return paginate(model_items)


@router.get("/{model_id}", response_model=ModelCardDetail)
def get_model(*, db: Session = Depends(get_db), model_id: int):
    return model_service.get(db=db, pk=model_id, filter_deleted=True)


@router.put("/{model_id}", response_model=ModelCardSchema)
def update_model(
    *, db: Session = Depends(get_db), model_id: int, model_in: ModelCardUpdateRequest
):
    db_model: Model = model_service.get(db=db, pk=model_id)
    if db_model is None:
        raise HTTPException(status_code=404, detail="Model not found")
    try:
        task_id = model_in.task_id or db_model.task_id
        model_type_id = model_in.model_type_id or db_model.model_type_id
        validate_model_type(db=db, model_type_id=model_type_id, task_id=task_id)
        return model_service.update(db=db, db_model=db_model, model_in=model_in)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))


@router.delete("/{model_id}")
def delete_model(*, db: Session = Depends(get_db), model_id: int):
    db_model: Model = model_service.get(db=db, pk=model_id)
    if db_model is None:
        raise HTTPException(status_code=404, detail="Model not found")
    return model_service.delete(db=db, db_model=db_model)
