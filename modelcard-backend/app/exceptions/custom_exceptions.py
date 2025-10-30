from fastapi import HTTPException, status


class BaseCustomException(HTTPException):
    """
    Base custom exception class that extends FastAPI's HTTPException.

    Attributes:
        status_code (int): The HTTP status code for the exception.
        detail (str): The detail message for the exception.

    Usage:
    To create a custom exception, inherit from this base class and specify the `status_code`
    and `detail` attributes for your specific exception. Then, you can raise your custom
    exception within your application.

    Example:
    class MyCustomException(BaseCustomException):
        status_code = 400
        detail = "My custom exception message"
    """

    status_code: int
    detail: str

    def __init__(self):
        super().__init__(status_code=self.status_code, detail=self.detail)


class ItemNotFoundException(BaseCustomException):
    status_code = status.HTTP_404_NOT_FOUND
    detail = "Item NotFound"


class DockerBuildException(BaseCustomException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    detail = "Can't build and push Docker Image"
