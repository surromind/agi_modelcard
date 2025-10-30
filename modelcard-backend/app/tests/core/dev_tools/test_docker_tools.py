from unittest.mock import MagicMock

import pytest

from app.core.devops_tools.docker_tools import DockerOperations
from app.dependencies.logger import get_logger


@pytest.fixture
def docker_client_mock(mocker):
    # Mock 'docker.from_env()' to return a mocked DockerClient instance
    mock = MagicMock()
    mocker.patch("docker.from_env", return_value=mock)
    return mock


@pytest.fixture
def logger_mock(mocker):
    # Assuming 'get_logger' returns the root logger, mock the logger used in your module
    return mocker.patch.object(get_logger(), "error")


def test_login_success(docker_client_mock):
    """Test Docker login success scenario."""
    DockerOperations.login(docker_client_mock)
    docker_client_mock.login.assert_called_once()


# TODO: Add image build and push test code
