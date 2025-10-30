from enum import Enum


class Filepath(Enum):
    """
    Set of promised file or directory paths

    - DOCKERFILE
    - DOCUMENT
    - ASSETS_DIR
    """

    DOCKERFILE = "Dockerfile"
    DOCUMENT = "README.md"
    ASSETS_DIR = "assets"
    INFERENCE = "demo/server.json"
