import pytest
from sqlalchemy.orm import Session

from app.db_models.model_card import License
from app.schemas.license import LicenseCreate, LicenseUpdate
from app.services.license import LicenseService


@pytest.fixture
def mock_session(mocker):
    return mocker.MagicMock(spec=Session)


@pytest.fixture
def license_obj():
    return License(id=1, name="Test License", description="Test Description")


@pytest.fixture
def license_create():
    return LicenseCreate(name="New License", description="New Description")


@pytest.fixture
def license_update():
    return LicenseUpdate(name="Updated License", description="Updated Description")


def test_get_license(mock_session, license_obj):
    mock_session.query.return_value.get.return_value = license_obj
    result = LicenseService.get(mock_session, pk=1)
    assert result == license_obj


def test_get_multi_license(mock_session, license_obj):
    mock_session.query.return_value.offset.return_value.limit.return_value.all.return_value = [
        license_obj
    ]
    results = LicenseService.get_multi(mock_session)
    assert len(results) == 1
    assert results[0] == license_obj


def test_create_license(mock_session, license_create):
    result = LicenseService.create(mock_session, obj_in=license_create)
    assert result.name == "New License"
    assert result.description == "New Description"


def test_update_license(mock_session, license_obj, license_update):
    mock_session.merge.return_value = None
    mock_session.commit.return_value = None
    mock_session.query.return_value.get.return_value = license_obj
    result = LicenseService.update(
        mock_session, db_obj=license_obj, obj_in=license_update
    )
    assert result == license_obj


def test_delete_license(mock_session, license_obj):
    mock_session.delete.return_value = None
    mock_session.commit.return_value = None
    mock_session.query.return_value.get.return_value = license_obj
    result = LicenseService.delete(mock_session, pk=1)
    assert result == license_obj
