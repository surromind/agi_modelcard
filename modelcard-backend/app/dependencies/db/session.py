from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.config.settings import get_settings

settings = get_settings()


def get_db_uri() -> str:
    """
    Function to construct and return the database URI based on application settings.

    Returns:
    - str: The constructed database URI.

    Example:
    db_uri = get_db_uri()
    print(db_uri)  # Output: "postgresql://username:password@localhost:5432/database_name"
    ```
    """
    return (
        f"{settings.DB_TYPE}://{settings.DB_USER}:{settings.DB_PASSWORD}@"
        f"{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
    )


SQLALCHEMY_DATABASE_URL = get_db_uri()
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
