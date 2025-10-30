import pytest
from sqlalchemy.orm import Session

from app.db_models.model_card import Task
from app.schemas.task import TaskCreate, TaskUpdate
from app.services.task import TaskService


@pytest.fixture
def mock_session(mocker):
    return mocker.MagicMock(spec=Session)


@pytest.fixture
def task_obj():
    return Task(
        id=1,
        name="Test Task",
        description="Test Description",
        model_type_id=1,
        abbreviation="TT",
    )


@pytest.fixture
def task_create():
    return TaskCreate(
        name="New Task",
        description="New Description",
        model_type_id=1,
        abbreviation="NT",
    )


@pytest.fixture
def task_update():
    return TaskUpdate(
        name="Updated Task",
        description="Updated Description",
        model_type_id=1,
        abbreviation="UT",
    )


def test_get_task(mock_session, task_obj):
    mock_session.query.return_value.get.return_value = task_obj
    result = TaskService.get(mock_session, pk=1)
    assert result == task_obj


def test_get_multi_task(mock_session, task_obj):
    mock_session.query.return_value.offset.return_value.limit.return_value.all.return_value = [
        task_obj
    ]
    results = TaskService.get_multi(mock_session)
    assert len(results) == 1
    assert results[0] == task_obj


def test_create_task(mock_session, task_create):
    result = TaskService.create(mock_session, obj_in=task_create)
    assert result.name == "New Task"


def test_update_task(mock_session, task_obj, task_update):
    mock_session.merge.return_value = None
    mock_session.commit.return_value = None
    mock_session.query.return_value.get.return_value = task_obj
    result = TaskService.update(mock_session, db_obj=task_obj, obj_in=task_update)
    assert result == task_obj


def test_delete_task(mock_session, task_obj):
    mock_session.delete.return_value = None
    mock_session.commit.return_value = None
    mock_session.query.return_value.get.return_value = task_obj
    result = TaskService.delete(mock_session, pk=1)
    assert result == task_obj
