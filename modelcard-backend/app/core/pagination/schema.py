from fastapi import Query
from fastapi_pagination.bases import AbstractParams, RawParams
from fastapi_pagination.links.bases import Links
from pydantic import BaseModel

from app.consts.models import ModelPagination
from app.utils import calculate_pagination_offset


class ModelCardPageParams(BaseModel, AbstractParams):
    """
    ModelCard Page Params extracted from request
    """

    page: int = Query(1, ge=1)

    def to_raw_params(self) -> RawParams:
        """
        Convert to offest and limit for paginate queried sequence
        :return: RawParams
        """
        limit = ModelPagination.PAGE_SIZE.value
        offset = calculate_pagination_offset(page_number=self.page, page_size=limit)
        return RawParams(offset=offset, limit=limit)


class ModelCardPageMetadata(BaseModel):
    """
    ModelCard Page Metadata

    - total_page : last page number
    - page : current page number
    - page_count : current page's item count
    - total : total item count
    - links : links to first/last/next/previous pages
    """

    total_page: int
    page_count: int
    total: int
    page: int
    links: Links
