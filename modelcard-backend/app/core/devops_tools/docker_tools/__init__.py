import os
import tempfile
from contextlib import contextmanager
from typing import Dict

import docker
from docker import DockerClient
from docker.errors import APIError, BuildError

from app.config.settings import get_settings
from app.dependencies.logger import get_logger
from app.exceptions.custom_exceptions import DockerBuildException

settings = get_settings()
logger = get_logger()


@contextmanager
def docker_client_context() -> DockerClient:
    """
    A context manager that yields a Docker client configured from the environment.
    Ensures that any setup or teardown logic is encapsulated here.
    """
    client = docker.from_env()
    try:
        yield client
    finally:
        pass


class DockerOperations:
    @staticmethod
    def login(client: DockerClient) -> None:
        """
        Logs into the Docker registry using credentials from the application settings.

        Args:
            client (DockerClient): The Docker client instance.

        Raises:
            Logs error if Docker API login fails.
        """
        try:
            client.login(
                username=settings.HARBOR_USER_NAME,
                password=settings.HARBOR_PASSWORD,
                registry=settings.HARBOR_URL,
            )
        except APIError as e:
            logger.error(f"Docker login Error! {e}")

    @staticmethod
    def build_image(
        client: DockerClient, dockerfile_bytes: bytes, image_name: str, temp_dir: str
    ) -> None:
        """
        Builds a Docker image from provided Dockerfile bytes and tags it.

        Args:
            client (DockerClient): The Docker client instance.
            dockerfile_bytes (bytes): The binary content of the Dockerfile.
            image_name (str): The name to tag the built image with.
            temp_dir (str): A temporary directory to write the Dockerfile to before building.

        Raises:
            Logs error if Docker image build fails.
        """
        dockerfile_path = os.path.join(temp_dir, "Dockerfile")
        with open(dockerfile_path, "wb") as dockerfile:
            dockerfile.write(dockerfile_bytes)
        try:
            build_args: Dict[str, str] = {
                "AWS_ACCESS_KEY": settings.S3_ACCESS_KEY,
                "AWS_SECRET_ACCESS_KEY": settings.S3_SECRET_ACCESS_KEY,
                "AWS_DEFAULT_REGION": settings.S3_DEFAULT_REGION,
            }
            _, build_logs = client.images.build(
                path=temp_dir, tag=image_name, buildargs=build_args
            )
            for log in build_logs:
                if "stream" in log:
                    logger.info(log["stream"].strip())
        except BuildError as e:
            logger.error(f"Docker Build error: {e}")
            raise DockerBuildException() from e

    @staticmethod
    def push_image(client: DockerClient, image_name: str) -> None:
        """
        Pushes a Docker image to a registry.

        Args:
            client (DockerClient): The Docker client instance.
            image_name (str): The name of the image to push, including tag.

        Raises:
            Logs error if Docker image push fails.
        """
        try:
            push_logs = client.images.push(image_name, stream=True, decode=True)
            for log in push_logs:
                logger.info(log)
        except (APIError, Exception) as e:
            logger.error(f"Error pushing image to Harbor: {e}")
            raise DockerBuildException() from e

    @staticmethod
    def remove_local_image(client: DockerClient, image_name: str) -> None:
        """
        Removes a local Docker image.

        Args:
            client (DockerClient): The Docker client instance.
            image_name (str): The full name of the image to remove, including tag.

        Raises:
            Logs error if the Docker image removal fails.
        """
        try:
            client.images.remove(image=image_name)
            logger.info(f"Successfully removed local image: {image_name}")
        except docker.errors.ImageNotFound:
            logger.warning(f"Image not found: {image_name}")
        except docker.errors.APIError as e:
            logger.error(f"Error removing local image: {e}")


class ImageDeployment:
    """
    Manages image deployment details including image name, tag, and Harbor project.

    Args:
        image_name (str): The base name of the image.
        tag (str): The tag for the image. Defaults to 'latest'.
        harbor_project (str): The Harbor project name where the image will be pushed.

    Properties:
        image_name (str): Returns the image name.
        tag (str): Returns the image tag.
        harbor_project (str): Returns the Harbor project name.
        harbor_image_name (str): Constructs and returns the full image name for Harbor.
    """

    def __init__(
        self, image_name: str, tag: str = "latest", harbor_project: str = "modelcard"
    ):
        self._image_name = image_name
        self._tag = tag
        self._harbor_project = harbor_project

    @property
    def image_name(self) -> str:
        return self._image_name

    @property
    def tag(self) -> str:
        return self._tag

    @property
    def harbor_project(self) -> str:
        return self._harbor_project

    @property
    def harbor_image_name(self) -> str:
        return (
            f"{settings.HARBOR_URL}/{self.harbor_project}/{self.image_name}:{self.tag}"
        )


def deploy_image_to_harbor(dockerfile_bytes: bytes, project_name: str) -> None:
    """
    Deploys an image to Harbor by building it from Dockerfile bytes and pushing it.
    Then, it removes the image locally.

    Args:
        dockerfile_bytes (bytes): The binary content of the Dockerfile.
        project_name (str): The project name to tag and push the image under in Harbor.

    Uses DockerOperations to perform login, build, and push operations.
    """
    try:
        image_name: str = ImageDeployment(image_name=project_name).harbor_image_name
        with tempfile.TemporaryDirectory() as temp_dir, docker_client_context() as client:
            DockerOperations.login(client)
            DockerOperations.build_image(client, dockerfile_bytes, image_name, temp_dir)
            DockerOperations.push_image(client, image_name)
            DockerOperations.remove_local_image(client, image_name)
    except Exception as e:
        logger.error(e)
        raise DockerBuildException()
