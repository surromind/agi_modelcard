from unittest.mock import MagicMock

import pytest

from app.core.devops_tools.gitlab_tools import (
    GitLabClient,
    GitLabFileReader,
    extract_group_project_from_gitlab_url,
)


@pytest.fixture
def mock_gitlab_client(mocker):
    """
    Fixture to mock the GitLabClient's get_instance method.
    """
    mock = mocker.patch("app.core.devops_tools.gitlab_tools.GitLabClient.get_instance")
    mock.return_value = MagicMock()
    return mock.return_value


@pytest.fixture
def mock_project(mock_gitlab_client):
    """
    Fixture to mock a GitLab project.
    """
    project = MagicMock()
    mock_gitlab_client.projects.get.return_value = project
    return project


def test_get_instance_singleton(mocker):
    """
    Test that GitLabClient.get_instance always returns the same instance.
    """
    first_instance = GitLabClient.get_instance()
    second_instance = GitLabClient.get_instance()
    assert first_instance is second_instance


def test_fetch_project_success(mock_gitlab_client, mock_project):
    """
    Test successful fetch of a GitLab project.
    """
    project = GitLabFileReader(group="test_group", project="test_project").project
    assert project is mock_project
    mock_gitlab_client.projects.get.assert_called_once()


def test_fetch_file_content_success(mock_project):
    """
    Test successful retrieval of file content from a GitLab project.
    """
    mock_file = MagicMock()
    mock_file.decode.return_value = b"file content"
    mock_project.files.get.return_value = mock_file

    reader = GitLabFileReader(group="test_group", project="test_project")
    content = reader.fetch_file_content("Dockerfile")

    assert content == b"file content"
    mock_project.files.get.assert_called_once_with(file_path="Dockerfile", ref="master")


def test_fetch_file_content_failure(mock_project):
    """
    Test handling of an exception when file content cannot be retrieved.
    """
    mock_project.files.get.side_effect = Exception("File not found")

    reader = GitLabFileReader(group="test_group", project="test_project")
    content = reader.fetch_file_content("nonexistent_file")

    assert content is None
    mock_project.files.get.assert_called_once_with(
        file_path="nonexistent_file", ref="master"
    )


def test_extract_group_project_from_gitlab_url_invalid_base():
    # Test with an invalid base URL
    url = "https://github.com/surro-mlops/modelcard-backend-manifest"
    try:
        extract_group_project_from_gitlab_url(url)
        assert False, "Function did not raise ValueError for an invalid base URL"
    except ValueError as e:
        assert "Provided URL is not a valid GitLab URL." in str(
            e
        ), f"Unexpected error message: {e}"


def test_extract_group_project_from_gitlab_url_empty():
    # Test with an empty string
    url = ""
    try:
        extract_group_project_from_gitlab_url(url)
        assert False, "Function did not raise ValueError for an empty URL"
    except ValueError as e:
        assert "Provided URL is not a valid GitLab URL." in str(
            e
        ), f"Unexpected error message: {e}"
