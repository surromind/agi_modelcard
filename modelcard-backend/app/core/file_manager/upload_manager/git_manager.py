import os
import tempfile

from app.core.file_manager.commons.docker import DockerService
from app.core.file_manager.commons.git import git_read_file
from app.core.file_manager.upload_manager.base import BaseUploadManager

# TODO: separate file name as constant
DOCKERFILE = "Dockerfile"


class GitUploadManager(BaseUploadManager):
    def __init__(self, git_url, image_name: str):
        """
        get dockerfile from gitlab/github and upload it to
        :param git_url:
        """
        super().__init__()
        self.git_url = git_url
        # TODO: add gitlab/github token
        self.git_token = ""
        self.image_name = image_name

    def upload_file(self):
        """
        0. Clone a git repository -> Path (Optional)
        1. Build a Docker image with Dockerfile -> tuple shape (image, tag)
        2. Register Docker image to harbor -> url
        3. Delete the Docker image in local storage -> None
        4. Save the Harbor image url to database -> pydantic schema
        :return: TODO: to be determined
        """

        # read Dockerfile content
        dockerfile_content = git_read_file(self.git_url, DOCKERFILE)
        # create a Dockerfile
        if dockerfile_content is None:
            return None

        with tempfile.TemporaryDirectory() as temp_dir:
            dockerfile_path = os.path.join(temp_dir, DOCKERFILE)

            with open(dockerfile_path, "w") as temp_dockerfile:
                temp_dockerfile.write(dockerfile_content)

                # 1. Build docker image
                # TODO: change tag name from raw string
                docker_service = DockerService(self.image_name, "latest")
                docker_service.docker_build(dockerfile_path)
                # 2. Push docker image
                docker_service.docker_push()
                # 3. Remove local docker image
                docker_service.docker_rmi_local()
                # 4. Save the harbor image url
                # TODO: implement pydantic schema and crudbase class
                print("Docker image uploaded")
