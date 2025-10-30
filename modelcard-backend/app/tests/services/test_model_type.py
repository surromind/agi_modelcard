import pytest
from sqlalchemy.orm import Session

from app.db_models.model_card import ModelType
from app.schemas.model_type import ModelTypeCreate, ModelTypeUpdate
from app.services.model_type import ModelTypeService


@pytest.fixture
def mock_session(mocker):
    return mocker.MagicMock(spec=Session)


@pytest.fixture
def model_type_obj():
    return ModelType(
        id=1, name="Test ModelType", description="Test Description", abbreviation="TM"
    )


@pytest.fixture
def model_type_create():
    return ModelTypeCreate(
        name="New ModelType", description="New Description", abbreviation="NM"
    )


@pytest.fixture
def model_type_update():
    return ModelTypeUpdate(
        name="Updated ModelType", description="Updated Description", abbreviation="UM"
    )


def test_get_model_type(mock_session, model_type_obj):
    mock_session.query.return_value.get.return_value = model_type_obj
    result = ModelTypeService.get(mock_session, pk=1)
    assert result == model_type_obj


def test_get_multi_model_type(mock_session, model_type_obj):
    mock_session.query.return_value.offset.return_value.limit.return_value.all.return_value = [
        model_type_obj
    ]
    results = ModelTypeService.get_multi(mock_session)
    assert len(results) == 1
    assert results[0] == model_type_obj


def test_create_model_type(mock_session, model_type_create):
    result = ModelTypeService.create(mock_session, obj_in=model_type_create)
    assert result.name == "New ModelType"


def test_update_model_type(mock_session, model_type_obj, model_type_update):
    mock_session.merge.return_value = None
    mock_session.commit.return_value = None
    mock_session.query.return_value.get.return_value = model_type_obj
    result = ModelTypeService.update(
        mock_session, db_obj=model_type_obj, obj_in=model_type_update
    )
    assert result == model_type_obj


def test_delete_model_type(mock_session, model_type_obj):
    mock_session.delete.return_value = None
    mock_session.commit.return_value = None
    mock_session.query.return_value.get.return_value = model_type_obj
    result = ModelTypeService.delete(mock_session, pk=1)
    assert result == model_type_obj
