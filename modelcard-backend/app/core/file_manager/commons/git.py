from pathlib import Path


# TODO: add git access infos to env
def git_clone(repo_url: str) -> Path:
    """
    Clone the repository using gitpython
    :param repo_url: git repository url
    :return: cloned repository's root directory path
    """
    return Path.cwd().joinpath()


def git_read_file(repo_url: str, file_path: str) -> str:
    """
    Read the contents(README.md, Dockerfile) of a git repository from api
    :param repo_url: git repository url
    :param file_path: file path in repository
    :return: string type file content
    """
    content = file_path
    return content
