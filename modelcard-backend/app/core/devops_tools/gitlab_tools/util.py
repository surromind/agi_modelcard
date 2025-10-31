def extract_group_project_from_gitlab_url(gitlab_url: str) -> tuple[str, str]:
    """
    Extracts and returns the group and project name from a GitLab URL by using the last two segments.

    Args:
        gitlab_url (str): The full URL to a GitLab project.

    Returns:
        tuple[str, str]: A tuple containing the group and project name.

    Example:
        Input: "https://gitlab.surromind.ai/surro-mlops/modelcard-backend-manifest"
        Output: ("surro-mlops", "modelcard-backend-manifest")

    Raises:
        ValueError: If the URL is not a valid GitLab project URL format.
    """
    # Ensure the URL is not empty and has the expected base
    if not gitlab_url or "gitlab.surromind.ai" not in gitlab_url:
        raise ValueError("Provided URL is not a valid GitLab URL.")

    # Split the URL and extract the last two segments as group and project
    parts = gitlab_url.rstrip("/").split("/")
    if len(parts) < 2:
        raise ValueError(
            "URL does not contain enough segments to extract group and project."
        )

    group = parts[-2]
    project = parts[-1]

    return group, project
