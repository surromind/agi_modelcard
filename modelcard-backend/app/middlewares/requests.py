import time
import traceback
from collections.abc import Callable

from fastapi import Request
from starlette.responses import JSONResponse

from app.dependencies.logger import get_logger
from app.exceptions.custom_exceptions import BaseCustomException


async def log_and_handle_exceptions(request: Request, call_next: Callable):
    """
    A middleware function that logs API requests, handles custom exceptions, and logs other exceptions.

    Args:
        request (fastapi.Request): The incoming API request.
        call_next (Callable): The next middleware or handler in the chain.

    Returns:
        JSONResponse: The API response with appropriate status and content.
    """
    logger = get_logger()
    start_time = time.time()

    logger.info(f"Request: {request.method} {request.url}")

    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(
            f"Response: {response.status_code} | Time: {process_time:.2f}s for {request.method} {request.url}"
        )

        return response
    except BaseCustomException as custom_exc:
        logger.error(
            f"Custom exception during {request.method} {request.url}: {custom_exc}"
        )

        return JSONResponse(
            status_code=custom_exc.status_code,  # Assume your custom exception has a status code
            content={"detail": str(custom_exc)},
        )
    except Exception as e:
        process_time = time.time() - start_time
        logger.error(
            f"Exception during {request.method} {request.url} after {process_time:.2f}s: {e}"
        )
        logger.error(traceback.format_exc())
        error_response = {"detail": "An internal server error occurred"}

        return JSONResponse(status_code=500, content=error_response)
