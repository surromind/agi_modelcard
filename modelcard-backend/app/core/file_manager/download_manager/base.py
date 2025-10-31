from abc import ABC, abstractmethod


class BaseDownloadManager(ABC):
    """
    Abstract base class for download
    """

    @abstractmethod
    def download_file(self, file_url: str) -> str:
        """
        This method call common methods for user to download the certain file related to model card
        :return:
        """
        pass
