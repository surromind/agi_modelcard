from typing import Tuple


# TODO: add registry access infos to env
class DockerService:
    def __init__(self, image_name: str, tag: str):
        self._image_name = image_name
        self._tag = tag

    def docker_build(self, dockerfile_path: str) -> Tuple[str, str]:
        """
        Build the docker image using docker sdk
        :param dockerfile_path:
        :return: image name and tag
        """
        return self._image_name, self._tag

    def docker_push(self) -> Tuple[str, str]:
        """
        Push the docker image using docker sdk
        :param image_name:
        :param tag:
        :return: image name and tag
        """
        return self._image_name, self._tag

    def docker_rmi_local(self) -> Tuple[str, str]:
        """
        Remove the docker image of api server using docker sdk
        :param image_name:
        :param tag:
        :return:
        """
