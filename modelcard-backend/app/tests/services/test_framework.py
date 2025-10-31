import pytest
from sqlalchemy.orm import Session

from app.db_models.model_card import Framework
from app.schemas.framework import FrameworkCreate, FrameworkUpdate
from app.services.framework import FrameworkService


@pytest.fixture
def mock_session(mocker):
    return mocker.MagicMock(spec=Session)


@pytest.fixture
def framework_obj():
    return Framework(id=1, name="Test Framework", description="Test Description")


@pytest.fixture
def framework_create():
    return FrameworkCreate(name="New Framework", description="New Description")


@pytest.fixture
def framework_update():
    return FrameworkUpdate(name="Updated Framework", description="Updated Description")


def test_get_framework(mock_session, framework_obj):
    mock_session.query.return_value.get.return_value = framework_obj
    result = FrameworkService.get(mock_session, pk=1)
    assert result == framework_obj


def test_get_multi_framework(mock_session, framework_obj):
    mock_session.query.return_value.offset.return_value.limit.return_value.all.return_value = [
        framework_obj
    ]
    results = FrameworkService.get_multi(mock_session)
    assert len(results) == 1
    assert results[0] == framework_obj


def test_create_framework(mock_session, framework_create, framework_obj):
    result = FrameworkService.create(mock_session, obj_in=framework_create)
    assert result.name == "New Framework"


def test_update_framework(mock_session, framework_obj, framework_update):
    mock_session.merge.return_value = None
    mock_session.commit.return_value = None
    mock_session.query.return_value.get.return_value = framework_obj
    result = FrameworkService.update(
        mock_session, db_obj=framework_obj, obj_in=framework_update
    )
    assert result == framework_obj


def test_delete_framework(mock_session, framework_obj):
    mock_session.delete.return_value = None
    mock_session.commit.return_value = None
    mock_session.query.return_value.get.return_value = framework_obj
    result = FrameworkService.delete(mock_session, pk=1)
    assert result == framework_obj
