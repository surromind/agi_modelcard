"""
This module defines the business logic related to Model Cards.

Model Cards are used to document important information about machine learning db_models,
such as their performance, limitations, and potential biases. This module provides
the necessary data structures and functions to work with Model Cards.

Business Logic:
- Functions to create, update, and retrieve Model Cards.
- Functions to add, edit, and remove sections within a Model Card.
- Functions to validate and generate Model Card reports.

Usage:
1. Import the necessary functions from this module.
2. Create and manipulate Model Cards and their sections using the provided functions.
3. Generate reports and documentation related to Model Cards using the business logic
    defined in this module.
"""
from datetime import datetime
from typing import List, Optional

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.consts.git import Filepath
from app.consts.models import ModelStage
from app.core.devops_tools.gitlab_tools import GitLabFileReader
from app.core.devops_tools.gitlab_tools.util import (
    extract_group_project_from_gitlab_url,
)
from app.core.markdown import markdown_asset_img_encoder
from app.db_models.model_card import Model
from app.repos.models import model_card_repository
from app.schemas.models import (
    ModelCardCreate,
    ModelCardCreateRequest,
    ModelCardListRequest,
    ModelCardUpdate,
    ModelCardUpdateRequest,
)
from app.tasks import deploy_image_to_harbor_task

# TODO: remove hardcoded username after user authorization applied
ADMIN_USER = "admin"


class ModelService:
    def get(self, db: Session, pk: int, filter_deleted: bool = True) -> Optional[Model]:
        db_model = model_card_repository.get(db, pk, filter_deleted=filter_deleted)
        if db_model is None:
            raise HTTPException(status_code=404, detail="Model not found")
        db_model = self._add_gitlab_data(db_model)
        return db_model

    def _add_gitlab_data(self, db_model: Model) -> Model:
        group, project = extract_group_project_from_gitlab_url(db_model.git_url)
        gitlab_file_reader = GitLabFileReader(group=group, project=project)
        db_model = self._add_inference_config(db_model, gitlab_file_reader)
        db_model = self._add_readme(db_model, gitlab_file_reader)
        return db_model

    @staticmethod
    def _add_inference_config(
        db_model: Model, gitlab_file_reader: GitLabFileReader
    ) -> Model:
        inference_config = gitlab_file_reader.fetch_json_file(Filepath.INFERENCE.value)
        db_model.inference = {
            "address": inference_config.get("ip") if inference_config else None,
            "port": inference_config.get("port") if inference_config else None,
        }
        return db_model

    @staticmethod
    def _add_readme(db_model: Model, gitlab_file_reader: GitLabFileReader) -> Model:
        document = gitlab_file_reader.fetch_file_content(Filepath.DOCUMENT.value)
        db_model.document = (
            markdown_asset_img_encoder(
                markdown_file=document, gitlab_file_reader=gitlab_file_reader
            )
            if document
            else "Please add README.md"
        )
        return db_model

    @staticmethod
    def get_list(*, db: Session, filter_in: ModelCardListRequest) -> List[Model]:
        """
        :return type: List[Model]
        """

        return model_card_repository.get_list(db=db, filter_in=filter_in)

    @staticmethod
    def count(*, db: Session, filter_in: ModelCardListRequest) -> int:
        return model_card_repository.get_count(db=db, filter_in=filter_in)

    # TODO: Adding Database Transaction and Rollback Features for Asynchronous Tasks
    @staticmethod
    def create(*, db: Session, model_in: ModelCardCreateRequest) -> Model:
        model_card = ModelCardCreate(
            **model_in.model_dump(),
            state=ModelStage.PROJECT.value,
            created_by=ADMIN_USER,
            updated_by=ADMIN_USER,
        )
        result: Model = model_card_repository.create(db, obj_in=model_card)
        return result

    @staticmethod
    def update(*, db: Session, db_model: Model, model_in: ModelCardUpdateRequest):
        # TODO: ROUND1 이후 재 활성화 (미사 용 기능으로 주석 처리)
        # if db_model.state == ModelStage.PROJECT.value and model_in.state == ModelStage.STAGING:
        #     group, project = extract_group_project_from_gitlab_url(model_in.git_url)
        #     dockerfile_content = GitLabFileReader(group=group, project=project).fetch_file_content(
        #         Filepath.DOCKERFILE.value
        #     )
        #     deploy_image_to_harbor_task.delay(dockerfile_content, project)

        return model_card_repository.update(db=db, db_obj=db_model, obj_in=model_in)

    @staticmethod
    def delete(*, db: Session, db_model: Model) -> None:
        model_card_update = ModelCardUpdate.model_validate(
            obj=db_model, from_attributes=True
        )
        model_card_update.updated_by = ADMIN_USER
        model_card_update.deleted_at = datetime.now()
        return model_card_repository.update(
            db=db, db_obj=db_model, obj_in=model_card_update
        )
