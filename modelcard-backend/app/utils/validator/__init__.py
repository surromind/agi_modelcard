from enum import Flag

from sqlalchemy.orm import Session

from app.consts.models import ModelStage, RequiredColumn
from app.db_models import Model
from app.schemas.models import ModelCardUpdate, ModelCardUpdateRequest
from app.services.task import TaskService

# TODO: remove hardcoded username after user authorization applied
ADMIN_USER = "admin"


def validate_model_type(db: Session, model_type_id: int, task_id: int):
    """
    Validate model type id by given task id
    :param db: sqlalchemy db session
    :param model_type_id: model_type_id of requested data
    :param task_id: task_id of model data
    :return: None
    :raises ValueError: Invalid model type or task
    """

    task = TaskService.get(db=db, pk=task_id)
    if not task:
        raise ValueError("Invalid task")
    if task.model_type_id != model_type_id:
        raise ValueError("The model type and task do not match")


# TODO: If Merge Request 60 merged, Remove this class
# TODO: remove or deprecate this validator and use pydantic validator
class ModelCardUpdateValidator:
    def __init__(self, db_model: Model, model_in: ModelCardUpdateRequest):
        """
        make new model card data to be simulate after update for validate data in database

        :param db_model: update target model data from database
        :param model_in: user input data for replace data in db_model
        """

        self.db_model = db_model
        self.model_in = model_in
        self.check_model = ModelCardUpdate(
            name=model_in.name or db_model.name,
            description=model_in.description or db_model.description,
            framework_id=model_in.framework_id or db_model.framework_id,
            license_id=model_in.license_id or db_model.license_id,
            model_type_id=model_in.model_type_id or db_model.model_type_id,
            task_id=model_in.task_id or db_model.task_id,
            git_url=model_in.git_url or db_model.git_url,
            state=model_in.state or db_model.state,
            size=model_in.size or db_model.size,
            performance_metric=model_in.performance_metric
            or db_model.performance_metric,
            performance_score=model_in.performance_score or db_model.performance_score,
            updated_by=ADMIN_USER,
        )

    def _validate_column_exists(self, required_column: Flag) -> bool:
        """
        Checks if the column exists in the updated model card data
        :param required_column: Enumerated value for the required column of the updated model card data
        :return: True if the column exists in the updated model card
        :raises ValueError: If the column does not exist in the updated model
        """

        keys = self.check_model.model_dump(exclude_none=True).keys()

        missing_column = [
            required.value for required in required_column if required.value not in keys
        ]

        if missing_column:
            raise ValueError(f"Missing required columns: {missing_column}")

        return True

    @property
    def valid_data(self) -> ModelCardUpdate:
        """
        Checks if the updated model card data is valid to each model card state
        :return: validated model card data to update database
        :raises ValueError: cannot change from project state
        """

        # project
        if self.check_model.state == ModelStage.PROJECT.value:
            self._validate_column_exists(required_column=RequiredColumn.PROJECT.value)
        # staging
        elif self.check_model.state == ModelStage.STAGING.value:
            self._validate_column_exists(required_column=RequiredColumn.STAGING.value)
        # operation
        elif self.check_model.state == ModelStage.OPERATION.value:
            # cannot change from project state
            if self.db_model.state == ModelStage.PROJECT.value:
                raise ValueError(
                    f"Cannot change state from {ModelStage.PROJECT.value} to {ModelStage.OPERATION.value}"
                )
            self._validate_column_exists(required_column=RequiredColumn.OPERATION.value)
        return self.check_model
