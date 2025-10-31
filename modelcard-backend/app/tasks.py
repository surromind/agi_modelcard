from app.celery_app import celery_app
from app.core.devops_tools.docker_tools import (
    deploy_image_to_harbor as original_deploy_image_to_harbor,
)


# TODO: Adding Database Transaction and Rollback Features for Asynchronous Tasks
@celery_app.task
def deploy_image_to_harbor_task(dockerfile_bytes: bytes, project_name: str) -> None:
    return original_deploy_image_to_harbor(dockerfile_bytes, project_name)
