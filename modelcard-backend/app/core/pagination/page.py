from math import ceil
from typing import Generic, Optional, Sequence, TypeVar

from fastapi_pagination.bases import AbstractPage, AbstractParams
from fastapi_pagination.links.bases import create_links
from fastapi_pagination.utils import create_pydantic_model
from sqlalchemy import Row
from typing_extensions import Self

from app.consts.models import ModelPagination
from app.core.pagination.schema import ModelCardPageMetadata, ModelCardPageParams
from app.schemas.models import ModelCardSchema

T = TypeVar("T")


class ModelCardPage(AbstractPage[T], Generic[T]):
    """
    custom fastapi-pagination Page class for modelcard
    """

    data: Sequence[T]
    metadata: ModelCardPageMetadata

    __params_type__ = ModelCardPageParams

    @classmethod
    def create(
        cls,
        data: Sequence[T],
        params: AbstractParams,
        *,
        total: Optional[int] = 0,
    ) -> Self:
        """
        Overriding abstract method
        create Page which is descendant of pydantic BaseModel

        :param data: sequence of data from database(queried rows)
        :param params: http request params for pagination, defined in schema.py in same directory
        :param total: total count of query rows
        :return: Page with data and metadata
        """

        limit: int = ModelPagination.PAGE_SIZE.value
        size = limit if total > limit else total
        page = params.page if params.page is not None else 1

        if not size:
            total_page = 0
        elif total is not None:
            total_page = ceil(total / size)
        else:
            total_page = None

        page_key = "page"
        first_page_mapping = {page_key: 1}
        last_page_mapping = {page_key: total_page or 1}
        next_page_mapping = {page_key: page + 1} if page * size < total else None
        previous_page_mapping = {page_key: page - 1} if page - 1 >= 1 else None

        metadata = ModelCardPageMetadata(
            total_page=total_page,
            page_count=len(data),
            total=total,
            page=page,
            links=create_links(
                first=first_page_mapping,
                last=last_page_mapping,
                next=next_page_mapping,
                prev=previous_page_mapping,
            ),
        )

        return create_pydantic_model(
            cls,
            metadata=metadata.model_dump(),
            data=data,
        )
