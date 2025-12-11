from datetime import datetime
from typing import List, Optional

from sqlalchemy import TIMESTAMP, BigInteger, Float, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db_models.base import BaseFile, BaseModel
from app.utils import transform_size_with_unit


class ModelType(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[Optional[str]]
    abbreviation: Mapped[Optional[str]]
    task: Mapped[List["Task"]] = relationship(back_populates="model_type")
    model: Mapped["Model"] = relationship(back_populates="model_type")


class Task(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[Optional[str]]
    # TODO: 화면설계서에 명시되어 있지 않으나, 향후 약어 적용 가능성 있기에 Optional로 추가
    abbreviation: Mapped[Optional[str]]
    model_type_id: Mapped[int] = mapped_column(ForeignKey("model_type.id"))
    model_type: Mapped["ModelType"] = relationship(back_populates="task")
    model: Mapped["Model"] = relationship(back_populates="task")


class Framework(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[Optional[str]]
    # TODO: 화면설계서에 명시되어 있지 않으나, 향후 약어 적용 가능성 있기에 Optional로 추가
    abbreviation: Mapped[Optional[str]]
    model: Mapped["Model"] = relationship(back_populates="framework")


class License(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[Optional[str]]
    # TODO: 화면설계서에 명시되어 있지 않으나, 향후 약어 적용 가능성 있기에 Optional로 추가
    abbreviation: Mapped[Optional[str]]
    model: Mapped["Model"] = relationship(back_populates="license")


class BasicInfo(BaseModel):
    """
    Use English uppercase letters or numbers.
    Use initials for multiple words.
    Write from the beginning, but if there are 1 to 2 digits of numbers included, replace with a number.
    In case of duplication, choose a different letter or replace with a number to distinguish.

    lv1 : 2 characters
        lv2 : 6 characters

    MS : model state
        MSPROJ : Project
        MSSTAG : Staging
        MSOPER : Operation
    US : user
        USADMI : Admin
        USINTE : Internal user
        USEXTE : External user
    FI : filter
        FIFRAM : filtered by framework
        FILICE : filtered by license
        FITASK : filtered by task
        FIMOST : filtered by model state
    OR : order
        ORNAME : order by name
        ORCRAT : order by created_at
        ORUPAT : order by updated_at
        ORDOLO : order by download
    MT : model type
        MTCOVI : Computer Vision
        MTTISE : Time Series
        MTAUDI : Audio
        MTTEXT : Text
        MTMUMO : Multi Modal
    TA : task - insert model type in middle to avoid duplicate
        TACVAR : Computer Vision - Action Recognition
        TACVCL : Computer Vision - Classfication
        TACVFR : Computer Vision - Face Recognition
        TACVHP : Computer Vision - Hand Pose Estimation
        TACVIE : Computer Vision - Image Encoder
        TACVIS : Computer Vision - Instance Segmentation
        TACVKD : Computer Vision - Keypoint Detection
        TACVLD : Computer Vision - Lane Detection
        TACVOD : Computer Vision - Object Detection
        TACVPE : Computer Vision - Pose Estimation
        TACVPS : Computer Vision - Panoptic Segmentation
        TACVSS : Computer Vision - Sementic Segmentation
        TACVSA : Computer Vision - Skeleton Based Action Recognition
        TATSAD : Time Series - Anomaly Detection
        TATSTD : Time Series - Time-series Detection
        TATSRE : Time Series - Regression
        TATECL : Text - Classfication
        TAMMVQ : Multi Modal - VQA
    FW : framework
        FWPYTO : pytorch
        FWTENS : tensorflow
    LI : license
        LIMITL : mit
        LIAL20 : Apache license 2.0
        LSBSD3 : BSD 3-Clause
    """

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    codelevel1_id: Mapped[str]
    codelevel1_nm: Mapped[str]
    codelevel2_id: Mapped[str]
    codelevel2_nm: Mapped[str]
    description: Mapped[Optional[str]]
    deleted_at: Mapped[Optional[datetime]] = mapped_column(type_=TIMESTAMP)


class Model(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    description: Mapped[str]
    state: Mapped[str]
    git_url: Mapped[Optional[str]]
    size: Mapped[Optional[int]] = mapped_column(type_=BigInteger)
    performance_metric: Mapped[Optional[str]]
    performance_score: Mapped[Optional[float]] = mapped_column(type_=Float)
    documentation_markdown: Mapped[Optional[str]] = mapped_column(type_=Text)
    created_at: Mapped[datetime] = mapped_column(
        type_=TIMESTAMP, insert_default=datetime.now
    )
    created_by: Mapped[str]
    updated_at: Mapped[datetime] = mapped_column(
        type_=TIMESTAMP, default=datetime.now, onupdate=datetime.now
    )
    updated_by: Mapped[str]
    deleted_at: Mapped[Optional[datetime]] = mapped_column(type_=TIMESTAMP)
    framework_id: Mapped[int] = mapped_column(ForeignKey("framework.id"))
    license_id: Mapped[Optional[int]] = mapped_column(ForeignKey("license.id"))
    task_id: Mapped[int] = mapped_column(ForeignKey("task.id"))
    model_type_id: Mapped[Optional[int]] = mapped_column(ForeignKey("model_type.id"))
    framework: Mapped["Framework"] = relationship(back_populates="model")
    license: Mapped["License"] = relationship(back_populates="model")
    task: Mapped["Task"] = relationship(back_populates="model")
    model_type: Mapped["ModelType"] = relationship(back_populates="model")
    model_documentation_file: Mapped[List["ModelDocumentationFile"]] = relationship(
        back_populates="model"
    )
    model_docker_file: Mapped[List["ModelDockerFile"]] = relationship(
        back_populates="model"
    )
    inference_preview_file: Mapped[List["InferencePreviewFile"]] = relationship(
        back_populates="model"
    )
    inference_sample_input_file: Mapped[
        List["InferenceSampleInputFile"]
    ] = relationship(back_populates="model")
    docker_registry: Mapped[List["DockerRegistry"]] = relationship(
        back_populates="model"
    )
    model_repository: Mapped[List["ModelRegistry"]] = relationship(
        back_populates="model"
    )

    @property
    def file_size(self) -> Optional[float]:
        return transform_size_with_unit(self.size)[0] if self.size is not None else None

    @property
    def file_unit(self) -> Optional[str]:
        return transform_size_with_unit(self.size)[1] if self.size is not None else None


class ModelDocumentationFile(BaseFile):
    id: Mapped[int] = mapped_column(ForeignKey("base_file.id"), primary_key=True)
    model_id: Mapped[int] = mapped_column(ForeignKey("model.id"))
    model: Mapped["Model"] = relationship(back_populates="model_documentation_file")


class ModelDockerFile(BaseFile):
    id: Mapped[int] = mapped_column(ForeignKey("base_file.id"), primary_key=True)
    model_id: Mapped[int] = mapped_column(ForeignKey("model.id"))
    model: Mapped["Model"] = relationship(back_populates="model_docker_file")


class InferencePreviewFile(BaseFile):
    id: Mapped[int] = mapped_column(ForeignKey("base_file.id"), primary_key=True)
    model_id: Mapped[int] = mapped_column(ForeignKey("model.id"))
    model: Mapped["Model"] = relationship(back_populates="inference_preview_file")


# TODO: Upload 관련 정책 결정 후 수정 필요(2024.01.30 한)
class InferenceSampleInputFile(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    size: Mapped[int]
    extension: Mapped[str]
    s3_path: Mapped[str]
    model_id: Mapped[int] = mapped_column(ForeignKey("model.id"))
    model: Mapped["Model"] = relationship(back_populates="inference_sample_input_file")


# TODO: Harbor Docker Registry 구조 파악 후 수정 필요
# TODO: Upload 관련 정책 결정 후 수정 필요(2024.01.30 한)
class DockerRegistry(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    image_name: Mapped[str]
    tag_name: Mapped[str]
    size: Mapped[int]
    model_id: Mapped[int] = mapped_column(ForeignKey("model.id"))
    model: Mapped["Model"] = relationship(back_populates="docker_registry")


# TODO: MLFlow Model Registry 구조 파악 후 수정 필요
# TODO: Upload 관련 정책 결정 후 수정 필요(2024.01.30 한)
class ModelRegistry(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    run_id: Mapped[str]
    path: Mapped[str]
    model_id: Mapped[int] = mapped_column(ForeignKey("model.id"))
    model: Mapped["Model"] = relationship(back_populates="model_repository")


# TODO: InferenceServer 구성(Round2)에서 재 작업 필요.
# TODO: InferenceServer 구성 Gitlab url로 부터 받아오도록 수정됨
# class Inference(BaseModel):
#     id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
#     address: Mapped[str]
#     port: Mapped[int]
#     model: Mapped["Model"] = relationship(back_populates="inference")
