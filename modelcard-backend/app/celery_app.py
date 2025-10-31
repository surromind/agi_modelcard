from celery import Celery

from app.config.settings import get_settings

settings = get_settings()


celery_app = Celery(
    "worker",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND_URL,
)

celery_app.autodiscover_tasks(["app"])
