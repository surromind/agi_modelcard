from typing import Any, List, Optional, Union

from sqlalchemy import ScalarSelect, Subquery, select
from sqlalchemy.orm import Query, Session, column_property
from sqlalchemy.sql.expression import Null

from app.consts.models import OrderParameter
from app.db_models.model_card import BasicInfo, Framework, License, Model, Task
from app.repos.base import CRUDBase
from app.schemas.models import ModelCardCreate, ModelCardListRequest, ModelCardUpdate

NULL = Null()


class ModelCardRepository(CRUDBase[Model, ModelCardCreate, ModelCardUpdate]):
    def __init__(self, model: type[Model]):
        """
        class for db transaction of model data

        :param model: The SQLAlchemy model class.
        """
        super().__init__(model)

        self.model.state_name = column_property(
            select(BasicInfo.codelevel2_nm)
            .where(BasicInfo.codelevel2_id == self.model.state)
            .scalar_subquery()
        )

    def get(
        self, db: Session, pk: Union[int, Any], filter_deleted: bool = True
    ) -> Optional[Model]:
        query: Query = db.query(self.model)

        if filter_deleted:
            query = query.filter(self.model.deleted_at.is_(NULL))
        return query.filter(self.model.id == pk).first()

    def apply_filter(
        self,
        *,
        query: Query,
        filter_in: ModelCardListRequest,
        filter_deleted: bool = True
    ) -> Query:
        # id in list
        if filter_in.framework:
            query = query.join(self.model.framework).filter(
                Framework.id.in_(filter_in.framework)
            )
        if filter_in.license:
            query = query.join(self.model.license).filter(
                License.id.in_(filter_in.license)
            )
        if filter_in.task:
            query = query.join(self.model.task).filter(Task.id.in_(filter_in.task))
        # string match
        if filter_in.state:
            query: Query = query.filter(self.model.state == filter_in.state.value)
        # string contains
        if filter_in.title:
            query = query.filter(self.model.name.icontains(filter_in.title))

        # filter deleted rows
        if filter_deleted:
            query = query.filter(self.model.deleted_at.is_(NULL))

        return query

    def get_count(
        self, db: Session, filter_in: ModelCardListRequest, filter_deleted: bool = True
    ) -> int:
        query: Query = db.query(self.model)

        filtered_query: Query = self.apply_filter(
            query=query, filter_in=filter_in, filter_deleted=filter_deleted
        )

        return filtered_query.count()

    def get_list(
        self,
        db: Session,
        filter_in: ModelCardListRequest,
        filter_deleted: bool = True,
    ) -> List[Model]:
        query: Query = db.query(self.model)

        filtered_query: Query = self.apply_filter(
            query=query, filter_in=filter_in, filter_deleted=filter_deleted
        )

        # order by
        if filter_in.order is OrderParameter.NAME:
            filtered_query = filtered_query.order_by(
                getattr(self.model, filter_in.order.value).collate("C").asc()
            )
        else:
            filtered_query = filtered_query.order_by(
                getattr(self.model, filter_in.order.value).desc()
            )

        return filtered_query.all()


model_card_repository = ModelCardRepository(Model)
