from app.core.file_manager.commons.git import git_read_file
from app.core.file_manager.download_manager.base import BaseDownloadManager


class GitDownloadManager(BaseDownloadManager):
    def __init__(self, git_url: str, file_path: str):
        super().__init__()
        self.git_url = git_url
        self.file_path = file_path

    def download_file(self):
        """
        Read file content from GitLab and return it as a string
        :return:
        """
        content = git_read_file(self.git_url, self.file_path)
        return content
