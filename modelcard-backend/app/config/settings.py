import os
from functools import lru_cache
from pathlib import Path
from typing import List

import dotenv
from pydantic_settings import BaseSettings

current_directory = Path(__file__).parent
root_directory = current_directory.parent
dotenv_path = current_directory / ".env"
dotenv.load_dotenv(dotenv_path=dotenv_path)


class Settings(BaseSettings):
    """
    Application settings class that defines configuration options for the project.

    Attributes:
    - PROJECT_NAME (str): The name of the project.
    - BACKEND_CORS_ORIGINS (List[AnyHttpUrl]): List of allowed CORS origins for the backend.
    - DB_TYPE (str): The type of the database (e.g., PostgreSQL, MySQL).
    - DB_NAME (str): The name of the database.
    - DB_USER (str): The username for database authentication.
    - DB_PASSWORD (str): The password for database authentication.
    - DB_HOST (str): The hostname or IP address of the database server.
    - DB_PORT (str): The port number for database connection.

    Note:
    - These attributes are loaded from environment variables using dotenv.
    - Modify the .env file to change the configuration values.
    """

    PROJECT_NAME: str = os.getenv("PROJECT_NAME")

    # TODO: seperate dev and prod
    BACKEND_CORS_ORIGINS: List[str] = (
        "http://localhost",
        "http://localhost/",
        "http://localhost:8000",
        "http://localhost:8000/",
        "http://localhost:3000",
        "http://localhost:3000/",
        "https://dev-modelcard.surromind.ai",
        "https://dev-modelcard.surromind.ai/",
        "*",
    )

    DB_TYPE: str = os.getenv("DB_TYPE")
    DB_NAME: str = os.getenv("DB_NAME")
    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = os.getenv("DB_PORT")

    GITLAB_URL: str = os.getenv("GITLAB_URL")
    GITLAB_PRIVATE_TOKEN: str = os.getenv("GITLAB_PRIVATE_TOKEN")

    HARBOR_URL: str = os.getenv("HARBOR_URL")
    HARBOR_USER_NAME: str = os.getenv("HARBOR_USER_NAME")
    HARBOR_PASSWORD: str = os.getenv("HARBOR_PASSWORD")

    S3_ACCESS_KEY: str = os.getenv("S3_ACCESS_KEY")
    S3_SECRET_ACCESS_KEY: str = os.getenv("S3_SECRET_ACCESS_KEY")
    S3_DEFAULT_REGION: str = os.getenv("S3_DEFAULT_REGION")

    CELERY_BROKER_URL: str = os.getenv("CELERY_BROKER_URL")
    CELERY_RESULT_BACKEND_URL: str = os.getenv("CELERY_RESULT_BACKEND_URL")

    DEBUG: bool = os.getenv("DEBUG")


@lru_cache
def get_settings() -> Settings:
    """
    Function to retrieve application settings.
    This is useful when reading configuration information once and when it remains constant;
    it is suitable for cases where it doesn't change frequently.

    Returns:
    - Settings: An instance of the Settings class containing configuration options.

    Example:
    settings = get_settings()
    project_name = settings.PROJECT_NAME
    cors_origins = settings.BACKEND_CORS_ORIGINS
    db_type = settings.DB_TYPE
    """
    return Settings()
