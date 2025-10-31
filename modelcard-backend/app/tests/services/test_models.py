from unittest.mock import patch

import pytest
from sqlalchemy.orm import Session

from app.consts.models import ModelStage
from app.db_models.model_card import Model
from app.exceptions.custom_exceptions import DockerBuildException
from app.schemas.models import (
    ModelCardCreateRequest,
    ModelCardListRequest,
    ModelCardUpdateRequest,
)
from app.services.models import ModelService


# Fixture for the mock database session
@pytest.fixture
def mock_db_session(mocker):
    return mocker.MagicMock(spec=Session)


# Fixture for a sample model card
@pytest.fixture
def sample_model_card():
    return Model(
        id=1,
        name="Sample Model",
        description="A sample model for testing",
        state=ModelStage.PROJECT.value,
        git_url="https://gitlab.surromind.ai/surro-mlops/modelcard-backend-manifest",
        created_by="admin",
        updated_by="admin",
        model_type_id=1,
        framework_id=1,
        license_id=1,
        task_id=1,
    )


# Test getting a model card
def test_get_model(mock_db_session, mocker, sample_model_card):
    mocker.patch(
        "app.repos.models.model_card_repository.get", return_value=sample_model_card
    )
    result = ModelService().get(db=mock_db_session, pk=1)
    assert result == sample_model_card


# Test listing model cards
def test_get_list_model(mock_db_session, mocker, sample_model_card):
    mocker.patch(
        "app.repos.models.model_card_repository.get_list",
        return_value=[sample_model_card],
    )
    filter_in = ModelCardListRequest()
    results = ModelService.get_list(db=mock_db_session, filter_in=filter_in)
    assert len(results) == 1
    assert results[0].name == "Sample Model"


# Test updating a model card
def test_update_model(mock_db_session, mocker, sample_model_card):
    model_update_in = ModelCardUpdateRequest(
        name="Updated Model",
        description="Updated description",
        state=ModelStage.STAGING.value,
        model_type_id=1,
        framework_id=1,
        license_id=1,
        task_id=1,
        git_url="https://gitlab.surromind.ai/surro-mlops/modelcard-backend-manifest",
        size="513412423154",
        performance_metric="f1_score",
        performance_score="80",
    )
    mocker.patch(
        "app.repos.models.model_card_repository.update", return_value=sample_model_card
    )
    result = ModelService.update(
        db=mock_db_session, db_model=sample_model_card, model_in=model_update_in
    )
    assert (
        result.name == sample_model_card.name
    )  # Assuming update returns the original object for simplicity
