from enum import Enum, Flag, IntEnum


class ModelStage(Enum):
    """
    Maintain model card's stage codes

    - PROJECT
    - STAGING
    - OPERATION

    """

    PROJECT = "MSPROJ"
    STAGING = "MSSTAG"
    OPERATION = "MSOPER"


class OrderParameter(Enum):
    """
    Maintain order parameters for model card list

    - NAME
    - CREATED_AT
    - UPDATED_AT
    """

    NAME = "name"
    CREATED_AT = "created_at"
    UPDATED_AT = "updated_at"
    # TODO: imply download count logic and add download criterion
    # DOWNLOAD = "download"


class ModelPagination(IntEnum):
    PAGE_SIZE = 10


class ProjectRequiredColumn(Flag):
    """
    Required data for model card of project state

    - NAME
    - DESCRIPTION
    - FRAMEWORK ID
    - LICENSE ID
    - TASK ID
    - GIT URL
    - STATE
    """

    NAME = "name"
    DESCRIPTION = "description"
    FRAMEWORK_ID = "framework_id"
    TASK_ID = "task_id"
    GIT_URL = "git_url"
    STATE = "state"


class StagingRequiredColumn(Flag):
    """
    Required data for model card of staging state

    - NAME
    - DESCRIPTION
    - FRAMEWORK ID
    - LICENSE ID
    - TASK ID
    - GIT URL
    - STATE
    """

    NAME = "name"
    DESCRIPTION = "description"
    FRAMEWORK_ID = "framework_id"
    TASK_ID = "task_id"
    GIT_URL = "git_url"
    STATE = "state"
    SIZE = "size"
    PERFORMANCE_METRIC = "performance_metric"
    PERFORMANCE_SCORE = "performance_score"


class OperationRequiredColumn(Flag):
    """
    Required data for model card of operation state

    - NAME
    - DESCRIPTION
    - FRAMEWORK ID
    - LICENSE ID
    - TASK ID
    - GIT URL
    - STATE
    """

    NAME = "name"
    DESCRIPTION = "description"
    FRAMEWORK_ID = "framework_id"
    LICENSE_ID = "license_id"
    TASK_ID = "task_id"
    GIT_URL = "git_url"
    STATE = "state"
    SIZE = "size"
    PERFORMANCE_METRIC = "performance_metric"
    PERFORMANCE_SCORE = "performance_score"


class RequiredColumn(Enum):
    """
    Gateway of required field's enum of each modelcard state

    - PROJECT
    - STAGING
    - OPERATION
    """

    PROJECT = ProjectRequiredColumn
    STAGING = StagingRequiredColumn
    OPERATION = OperationRequiredColumn
