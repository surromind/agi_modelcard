from fastapi import FastAPI
from fastapi_pagination import add_pagination
from starlette.middleware.cors import CORSMiddleware

from app.config.settings import get_settings
from app.middlewares.requests import log_and_handle_exceptions
from app.routers.admin.framework import router as framework_router
from app.routers.admin.license import router as license_router
from app.routers.admin.model_type import router as model_type_router
from app.routers.admin.task import router as task_router
from app.routers.category import router as category_router
from app.routers.framework import router as framework_list_router
from app.routers.license import router as license_list_router
from app.routers.model_type import router as model_type_list_router
from app.routers.models import router as model_router

settings = get_settings()
app = FastAPI(title=settings.PROJECT_NAME)
app.middleware("http")(log_and_handle_exceptions)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(model_router)
app.include_router(category_router)
app.include_router(framework_list_router)
app.include_router(license_list_router)
app.include_router(model_type_list_router)
app.include_router(model_type_router)
app.include_router(license_router)
app.include_router(framework_router)
app.include_router(task_router)

add_pagination(app)
