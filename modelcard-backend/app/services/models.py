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
import requests
import markdown

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.consts.models import ModelStage
from app.db_models.model_card import Model
from app.repos.models import model_card_repository
from app.schemas.models import (
    ModelCardCreate,
    ModelCardCreateRequest,
    ModelCardListRequest,
    ModelCardUpdate,
    ModelCardUpdateRequest,
)

# from app.tasks import deploy_image_to_harbor_task
from app.utils import convert_to_raw_url

# TODO: remove hardcoded username after user authorization applied
ADMIN_USER = "admin"


class ModelService:
    def get(self, db: Session, pk: int, filter_deleted: bool = True) -> Optional[Model]:
        db_model = model_card_repository.get(db, pk, filter_deleted=filter_deleted)
        if db_model is None:
            raise HTTPException(status_code=404, detail="Model not found")
        db_model = self._add_readme(db_model)
        return db_model

    @staticmethod
    def _add_readme(db_model: Model):
        """
        GitHub URL에서 README를 가져와 HTML로 변환합니다.

        Args:
            git_url (str): GitHub 저장소 URL (예: https://github.com/surromind/leap)

        Returns:
            str: 변환된 HTML 문자열 (프론트엔드의 dangerouslySetInnerHTML에 사용)
        """
        try:
            # GitHub URL을 raw URL로 변환
            raw_url = convert_to_raw_url(db_model.git_url)

            # README 파일 가져오기
            response = requests.get(raw_url, timeout=10)
            response.raise_for_status()
            markdown_text = response.text

            # Markdown을 HTML로 변환
            html = markdown.markdown(
                markdown_text,
                extensions=[
                    "extra",  # 테이블, 각주 등
                    "codehilite",  # 코드 하이라이팅
                    "toc",  # 목차
                    "nl2br",  # 줄바꿈
                    "sane_lists",  # 리스트 처리
                ],
            )
            db_model.document = html
        except Exception as e:
            db_model.document = f"README 변환 실패: {e}"
        finally:
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
        # TODO: ROUND1 이후 재활성화 (미사용 기능으로 주석 처리)
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
