import base64
import re
from enum import Enum
from typing import Any, Tuple, Union


def pascal_to_snake(name):
    return re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower()


def calculate_pagination_offset(*, page_number: int, page_size: int) -> int:
    """
    Determine the offset value used in SQL for the pagination feature.

    :param page_number: a page number parameter in request
    :param page_size: a page size value
    :return: a offset value for pagination feature
    """
    if page_number < 1:
        raise ValueError("Page number should be greater than or equal to 1.")
    if page_size < 1:
        raise ValueError("Page size should be greater than or equal to 1.")

    offset = (page_number - 1) * page_size

    return offset


def base64encode(string: str) -> str:
    """
    Encode a string by base64 and decode it into a string using `utf-8` encoding
    :param string: string to encode
    :return: base64 encoded string
    """
    return base64.b64encode(string).decode("utf-8")


class FileSizeUnit(Enum):
    B = 1
    KB = 1024
    MB = 1024**2
    GB = 1024**3
    TB = 1024**4
    PB = 1024**5


def transform_size_with_unit(filesize_bytes: Union[int, Any]) -> Tuple[float, str]:
    """
    Converts the file size from bytes to the most appropriate unit, rounding to one decimal place, and returns it.

    Parameters:
    filesize_bytes (int): The size of the file in bytes.

    Returns:
    tuple: The rounded file size (float) and its unit (string) as a tuple.
    """
    for unit in reversed(FileSizeUnit):
        if filesize_bytes >= unit.value:
            return round(filesize_bytes / unit.value, 1), unit.name

    return filesize_bytes, FileSizeUnit.B.name


def convert_to_raw_url(git_url):
    """
    GitHub 저장소 URL을 raw README URL로 변환합니다.

    Args:
        git_url (str): GitHub 저장소 URL

    Returns:
        str: raw README URL
    """
    # https://github.com/user/repo -> https://raw.githubusercontent.com/user/repo/main/README.md
    # https://github.com/user/repo.git -> https://raw.githubusercontent.com/user/repo/main/README.md

    git_url = git_url.rstrip("/")
    git_url = git_url.replace(".git", "")

    if "github.com" in git_url:
        parts = git_url.replace("https://github.com/", "").split("/")
        if len(parts) >= 2:
            user, repo = parts[0], parts[1]
            # main 브랜치 시도, 실패하면 master 시도
            raw_url = f"https://raw.githubusercontent.com/{user}/{repo}/main/README.md"

            # main 브랜치 확인
            try:
                response = requests.head(raw_url, timeout=5)
                if response.status_code == 200:
                    return raw_url
            except:
                pass

            # master 브랜치 시도
            raw_url = (
                f"https://raw.githubusercontent.com/{user}/{repo}/master/README.md"
            )
            return raw_url

    return git_url
