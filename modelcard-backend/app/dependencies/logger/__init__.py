import logging
from datetime import datetime

from app.config.settings import get_settings, root_directory

LOGGER_NAME: str = "model_card"
settings = get_settings()


class Handler:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Handler, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        self.logs_directory = root_directory / "logs"
        self.logs_directory.mkdir(parents=True, exist_ok=True)
        self.formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s \n %(message)s"
        )

    @property
    def console_handler(self):
        handler = logging.StreamHandler()
        handler.setLevel(logging.DEBUG)
        handler.setFormatter(self.formatter)
        return handler

    @property
    def file_handler(self):
        today = datetime.now().strftime("%Y-%m-%d")
        log_file = self.logs_directory / f"{today}.log"
        handler = logging.FileHandler(filename=str(log_file))
        handler.setFormatter(self.formatter)
        return handler


def set_logger() -> None:
    logger = logging.getLogger("model_card")
    logger.setLevel(logging.DEBUG if settings.DEBUG else logging.INFO)
    handler = Handler()
    logger.addHandler(handler.file_handler)
    logger.addHandler(handler.console_handler)


set_logger()


def get_logger():
    return logging.getLogger(LOGGER_NAME)
