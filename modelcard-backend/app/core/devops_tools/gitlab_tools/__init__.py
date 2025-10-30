import json
from functools import cached_property
from typing import Any, Dict, Optional, TypeVar

import gitlab
from gitlab import GitlabGetError
from gitlab.v4.objects.projects import Project

from app.config.settings import get_settings
from app.core.devops_tools.gitlab_tools.util import (
    extract_group_project_from_gitlab_url,
)
from app.dependencies.logger import get_logger

GitlabProjectType = TypeVar("GitlabProjectType", bound=Project)
GitLabClientType = TypeVar("GitLabClientType", bound=gitlab.Gitlab)

logger = get_logger()


class GitLabClient:
    _instance = None

    @classmethod
    def get_instance(cls) -> GitLabClientType:
        """
        Retrieves a singleton instance of the GitLabClient. If the instance does not already exist,
        it initializes it with the GitLab URL and private token from the settings.

        Returns:
            GitLabClientType: The singleton instance of the GitLab client.
        """
        if cls._instance is None:
            settings = get_settings()
            cls._instance = gitlab.Gitlab(
                settings.GITLAB_URL, private_token=settings.GITLAB_PRIVATE_TOKEN
            )
        return cls._instance


class GitLabFileReader:
    def __init__(
        self,
        *,
        group: str,
        project: str,
        ref: str = "master",
    ) -> None:
        """
        Initializes the GitLabFileReader with the specified project, group, and reference.

        Args:
            project (str): The name of the project.
            group (str): The name of the group the project belongs to.
            ref (str, optional): The branch or tag to fetch the file from. Defaults to "master".
        """
        self._project_path: str = f"{group}/{project}"
        self._ref: str = ref
        self._cached_project: Optional[GitlabProjectType] = None

    @cached_property
    def project(self) -> GitlabProjectType:
        """
        Fetches the GitLab project instance based on the project path.

        return:
            GitlabProjectType: The GitLab project instance.
        """
        if self._cached_project is None:
            gl: GitLabClientType = GitLabClient.get_instance()
            self._cached_project = gl.projects.get(self._project_path)
        return self._cached_project

    def fetch_file_content(self, file_path: str) -> Optional[bytes]:
        """
        Fetches the content of a specified file from the project.

        Args:
            file_path (str): The path of the file to fetch the content for.

        Returns:
            Optional[bytes]: The content of the file if found, otherwise None.
        """
        try:
            return self.project.files.get(file_path=file_path, ref=self._ref).decode()
        except GitlabGetError as e:
            logger.error(f"Could not fetch Error : {e}")
            return None
        except Exception as e:
            logger.error(f"Could not fetch Error : {e}")
            return None

    def fetch_json_file(self, file_path: str) -> Optional[Dict[str, Any]]:
        """
        Fetches and parses a JSON file from the project.

        Args:
            file_path (str): The path of the JSON file to fetch and parse.

        Returns:
            Optional[Dict[str, Any]]: The parsed content of the JSON file as a dictionary, or None if an error occurs.
        """
        content_bytes = self.fetch_file_content(file_path)
        if content_bytes is None:
            return None

        try:
            # 파일 내용을 문자열로 디코딩 후 JSON으로 파싱합니다.
            content_dict = json.loads(content_bytes)
            return content_dict
        except json.JSONDecodeError as e:
            logger.error(f"Could not parse {file_path} as JSON. Error: {e}")
            return None
