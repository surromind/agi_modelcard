import json
from typing import List, Optional

from fastapi import HTTPException, Query
from pydantic import ValidationError

from app.consts.models import ModelStage, OrderParameter
from app.schemas.models import ModelCardListRequest


def parse_list_int(json_str: str) -> List[int]:
    try:
        return json.loads(json_str)
    except json.decoder.JSONDecodeError:
        return []


def param_parser(
    # in
    framework: Optional[str] = Query(
        "[]", description="PK(Integer): array of framework id"
    ),
    license: Optional[str] = Query(
        "[]", description="PK(Integer): array of license id"
    ),
    task: Optional[str] = Query("[]", description="PK(Integer): array of task id"),
    # equal
    state: Optional[ModelStage] = Query(None, description="MSPROJ / MSSTAG / MSOPER"),
    # contains
    title: Optional[str] = Query(None),
    # order by
    order: Optional[OrderParameter] = Query(
        OrderParameter.UPDATED_AT.value, description="name / created_at / updated_at"
    ),
):
    try:
        framework_ids = parse_list_int(framework)
        license_ids = parse_list_int(license)
        task_ids = parse_list_int(task)
        return ModelCardListRequest(
            framework=framework_ids,
            license=license_ids,
            task=task_ids,
            state=state,
            title=title,
            order=order,
        )
    except ValidationError:
        raise HTTPException(status_code=400, detail="Invalid filter format.")
