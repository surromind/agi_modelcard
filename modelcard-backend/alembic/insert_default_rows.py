#!/usr/bin/env python3
"""
BasicInfo, ModelType, Task, Framework, License 테이블에 필요한 기본 데이터를 삽입하는 스크립트
"""
import os
import sys
from typing import Dict
from fastapi import Depends
from sqlalchemy.orm import Session

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db_models.base import BaseModel
from app.db_models.model_card import BasicInfo, ModelType, Task, Framework, License
from app.consts.db import AlembicScriptPath
from app.dependencies.db.session import SessionLocal


def create_basic_info_entry(
    codelevel1_id: str, codelevel2_id: str, codelevel2_nm: str, description: str
) -> Dict[str, str]:
    """basic info 테이블 엔트리 생성 헬퍼 함수"""
    return {
        "codelevel1_id": codelevel1_id,
        "codelevel1_nm": AlembicScriptPath.CODE_LEVEL_1_NAMES.value[codelevel1_id],
        "codelevel2_id": codelevel2_id,
        "codelevel2_nm": codelevel2_nm,
        "description": description,
        "deleted_at": None,
    }


def create_table_entry(
    name: str, description: str, abbreviation: str
) -> Dict[str, str]:
    """테이블 엔트리 생성 헬퍼 함수"""
    return {
        "name": name,
        "description": description,
        "abbreviation": abbreviation,
    }


def get_bulk_rows(data_list: list[dict]):
    return [
        create_table_entry(
            data["codelevel2_nm"], data["description"], data["codelevel2_id"]
        )
        for data in data_list
    ]


def get_insert_default_rows():
    # 1. 모델 상태 데이터
    MODEL_STAGES = [
        create_basic_info_entry("MS", "MSPROJ", "Project", "프로젝트 단계의 모델"),
        create_basic_info_entry("MS", "MSSTAG", "Staging", "스테이징 단계의 모델"),
        create_basic_info_entry("MS", "MSOPER", "Operation", "운영 단계의 모델"),
    ]

    # 2. 사용자 타입 데이터
    USER_TYPES = [
        create_basic_info_entry("US", "USADMI", "Admin", "관리자 사용자"),
        create_basic_info_entry("US", "USINTE", "Internal User", "내부 사용자"),
        create_basic_info_entry("US", "USEXTE", "External User", "외부 사용자"),
    ]

    # 3. 필터 타입 데이터
    FILTER_TYPES = [
        create_basic_info_entry(
            "FI", "FIFRAM", "Filtered by Framework", "프레임워크로 필터링"
        ),
        create_basic_info_entry(
            "FI", "FILICE", "Filtered by License", "라이선스로 필터링"
        ),
        create_basic_info_entry("FI", "FITASK", "Filtered by Task", "태스크로 필터링"),
        create_basic_info_entry(
            "FI", "FIMOST", "Filtered by Model State", "모델 상태로 필터링"
        ),
    ]

    # 4. 정렬 타입 데이터
    ORDER_TYPES = [
        create_basic_info_entry("OR", "ORNAME", "Order by Name", "이름으로 정렬"),
        create_basic_info_entry("OR", "ORCRAT", "Order by Created At", "생성일로 정렬"),
        create_basic_info_entry("OR", "ORUPAT", "Order by Updated At", "수정일로 정렬"),
        create_basic_info_entry("OR", "ORDOLO", "Order by Download", "다운로드로 정렬"),
    ]
    # 5. 모델 타입 데이터
    MODEL_TYPES = [
        create_basic_info_entry("MT", "MTCOVI", "Computer Vision", "컴퓨터 비전"),
        create_basic_info_entry("MT", "MTTISE", "Time Series", "시계열"),
        create_basic_info_entry("MT", "MTAUDI", "Audio", "오디오"),
        create_basic_info_entry("MT", "MTTEXT", "Text", "텍스트"),
        create_basic_info_entry("MT", "MTMUMO", "Multi Modal", "멀티모달"),
        create_basic_info_entry("MT", "MTLANG", "Language", "언어"),
    ]
    # 6. 태스크 타입 데이터 (카테고리별로 그룹화)
    TASKS = [
        create_basic_info_entry(
            "TA", "TACVAR", "Action Recognition", "컴퓨터 비전 - 동작 인식"
        ),
        create_basic_info_entry("TA", "TACVCL", "Classification", "컴퓨터 비전 - 분류"),
        create_basic_info_entry(
            "TA", "TACVFR", "Face Recognition", "컴퓨터 비전 - 얼굴 인식"
        ),
        create_basic_info_entry(
            "TA", "TACVHP", "Hand Pose Estimation", "컴퓨터 비전 - 손 포즈 추정"
        ),
        create_basic_info_entry(
            "TA", "TACVIE", "Image Encoder", "컴퓨터 비전 - 이미지 인코더"
        ),
        create_basic_info_entry(
            "TA",
            "TACVIS",
            "Instance Segmentation",
            "컴퓨터 비전 - 인스턴스 세그멘테이션",
        ),
        create_basic_info_entry(
            "TA", "TACVKD", "Keypoint Detection", "컴퓨터 비전 - 키포인트 감지"
        ),
        create_basic_info_entry(
            "TA", "TACVLD", "Lane Detection", "컴퓨터 비전 - 차선 감지"
        ),
        create_basic_info_entry(
            "TA", "TACVOD", "Object Detection", "컴퓨터 비전 - 객체 탐지"
        ),
        create_basic_info_entry(
            "TA", "TACVPE", "Pose Estimation", "컴퓨터 비전 - 포즈 추정"
        ),
        create_basic_info_entry(
            "TA", "TACVPS", "Panoptic Segmentation", "컴퓨터 비전 - 판토픽 세그멘테이션"
        ),
        create_basic_info_entry(
            "TA", "TACVSS", "Semantic Segmentation", "컴퓨터 비전 - 시멘틱 세그멘테이션"
        ),
        create_basic_info_entry(
            "TA",
            "TACVSA",
            "Skeleton Based Action Recognition",
            "컴퓨터 비전 - 스켈레톤 기반 동작 인식",
        ),
        create_basic_info_entry(
            "TA", "TATSAD", "Anomaly Detection", "시계열 - 이상 감지"
        ),
        create_basic_info_entry(
            "TA", "TATSTD", "Time-series Detection", "시계열 - 시계열 감지"
        ),
        create_basic_info_entry("TA", "TATSRE", "Regression", "시계열 - 회귀"),
        create_basic_info_entry(
            "TA", "TAAUMI", "Music Information Retrieval", "오디오 - 음악 정보 검색"
        ),
        create_basic_info_entry(
            "TA", "TAAUMS", "Music Similarity Search", "오디오 - 음악 유사도 검색"
        ),
        create_basic_info_entry("TA", "TATECL", "Classification", "텍스트 - 분류"),
        create_basic_info_entry("TA", "TAMMVQ", "VQA", "멀티모달 - VQA"),
        create_basic_info_entry(
            "TA", "TALGLM", "Large Language Model", "언어 - 대규모언어모델"
        ),
        create_basic_info_entry(
            "TA", "TALGVM", "Vision Language Model", "언어 - 비전언어모델"
        ),
    ]

    # 7. 프레임워크 데이터
    FRAMEWORKS = [
        create_basic_info_entry("FW", "FWPYTO", "PyTorch", "PyTorch 프레임워크"),
        create_basic_info_entry("FW", "FWTENS", "TensorFlow", "TensorFlow 프레임워크"),
    ]

    # 8. 라이선스 데이터
    LICENSES = [
        create_basic_info_entry("LI", "LIMITL", "MIT", "MIT 라이선스"),
        create_basic_info_entry(
            "LI", "LIAL20", "Apache License 2.0", "Apache License 2.0"
        ),
        create_basic_info_entry(
            "LI", "LSBSD3", "BSD 3-Clause", "BSD 3-Clause 라이선스"
        ),
    ]

    # 기본 정보 테이블에 삽입할 행 생
    BASIC_INFO_DATA = (
        MODEL_STAGES
        + USER_TYPES
        + FILTER_TYPES
        + ORDER_TYPES
        + MODEL_TYPES
        + TASKS
        + FRAMEWORKS
        + LICENSES
    )

    # 나머지 테이블별 데이터 생성
    FRAMEWORK_DATA = get_bulk_rows(FRAMEWORKS)
    LICENSE_DATA = get_bulk_rows(LICENSES)
    MODEL_TYPE_DATA = get_bulk_rows(MODEL_TYPES)
    TASK_DATA = get_bulk_rows(TASKS)

    # 모델 타입 인덱스 매핑 생성
    MODEL_TYPE_TO_INDEX = {
        item["codelevel2_nm"]: idx for idx, item in enumerate(MODEL_TYPES)
    }

    # 태스크에 모델 타입 ID 추가
    for row in TASK_DATA:
        abbreviation = row["abbreviation"][2:4]
        model_type = AlembicScriptPath.ABBREVIATION_TO_MODEL_TYPE.value[abbreviation]
        index = MODEL_TYPE_TO_INDEX[model_type]
        row["model_type_id"] = index + 1  # 1-based index for database

    default_rows = {
        "basic_info": BASIC_INFO_DATA,
        "framework": FRAMEWORK_DATA,
        "license": LICENSE_DATA,
        "model_type": MODEL_TYPE_DATA,
        "task": TASK_DATA,
    }
    return default_rows


def insert_default_rows(table: BaseModel, rows: list[dict[str, str]], db: Session):
    """테이블에 필요한 데이터를 삽입합니다."""
    try:
        # 기존 데이터 확인
        existing_count = db.query(table).count()
        print(f"기존 {table.__tablename__} 테이블 레코드 수: {existing_count}")

        if existing_count > 0:
            print(f"{table.__tablename__} 테이블에 이미 데이터가 있습니다. 스킵합니다.")
            return

        # 데이터 삽입
        for row in rows:
            inserted_table = table(**row)
            db.add(inserted_table)

        db.commit()
        print(f"✅ {len(rows)}개의 BasicInfo 레코드를 성공적으로 삽입했습니다.")

        # 삽입된 데이터 확인
        inserted_count = db.query(table).count()
        print(f"현재 {table.__tablename__} 레코드 수: {inserted_count}")

    except Exception as e:
        print(f"❌ 에러 발생: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    db = SessionLocal()
    tables = [BasicInfo, ModelType, Task, License, Framework]
    default_rows = get_insert_default_rows()
    for table in tables:
        table_name = table.__tablename__
        rows = default_rows[table_name]
        insert_default_rows(table, rows, db)
