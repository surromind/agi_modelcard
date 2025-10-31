import pytest

from app.utils import calculate_pagination_offset, pascal_to_snake


@pytest.mark.parametrize(
    "input_string, expected",
    [
        ("TestString", "test_string"),
        ("ThisIsATestString", "this_is_a_test_string"),
        ("This", "this"),
        ("", ""),
    ],
)
def test_pascal_to_snake(input_string, expected):
    """
    Test the pascal_to_snake function to ensure it correctly converts PascalCase strings to snake_case.
    """
    assert pascal_to_snake(input_string) == expected


@pytest.mark.parametrize(
    "page_number, page_size, expected_offset", [(1, 10, 0), (2, 10, 10), (3, 15, 30)]
)
def test_calculate_pagination_offset(page_number, page_size, expected_offset):
    """
    Test the calculate_pagination_offset function to ensure it calculates the correct offset for pagination.
    """
    assert (
        calculate_pagination_offset(page_number=page_number, page_size=page_size)
        == expected_offset
    )


def test_calculate_pagination_offset_with_invalid_page_number():
    """
    Test the calculate_pagination_offset function with an invalid page number to ensure it raises a ValueError.
    """
    with pytest.raises(ValueError) as e:
        calculate_pagination_offset(page_number=0, page_size=10)
    assert str(e.value) == "Page number should be greater than or equal to 1."


def test_calculate_pagination_offset_with_invalid_page_size():
    """
    Test the calculate_pagination_offset function with an invalid page size to ensure it raises a ValueError.
    """
    with pytest.raises(ValueError) as e:
        calculate_pagination_offset(page_number=1, page_size=0)
    assert str(e.value) == "Page size should be greater than or equal to 1."
