from abc import ABC, abstractmethod


class BaseUploadManager(ABC):
    """
    Abstract base class for all upload
    """

    @abstractmethod
    def upload_file(self):
        """
        This method invokes common methods for users to upload all files related to the model card.

        1. Save the file to the proper location
        2. Save metadata of the file to the database
        """
        pass
