"""
To avoid confusion between database models and deep learning/machine learning models,
database-related models are referred to as 'db_model' in this project.
Any usage of the term 'models' within this project context refers to deep learning/machine learning models.
"""
from app.db_models.base import Base
from app.db_models.model_card import (
    DockerRegistry,
    Framework,
    InferencePreviewFile,
    InferenceSampleInputFile,
    License,
    Model,
    ModelDockerFile,
    ModelDocumentationFile,
    ModelRegistry,
    ModelType,
    Task,
)
