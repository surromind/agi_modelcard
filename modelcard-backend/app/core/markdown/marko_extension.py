from bs4 import BeautifulSoup
from marko import block, inline

from app.consts.git import Filepath
from app.core.devops_tools.gitlab_tools import GitLabFileReader
from app.utils import base64encode


class BaseImageEncoder:
    def _img_tag_filter(self, body: str) -> str:
        """
        parse html tag with beautiful soup and use find_all method to find all img tags
        than replace its src value with an base64 encoded image by calling img_src_replace method
        :param body: Marko HTMLBlock element's body
        :return:
        """

        soup = BeautifulSoup(body, "html.parser")
        images = soup.find_all("img")
        replaced = False
        for img in images:
            src = img.get("src")
            if src and src.startswith(Filepath.ASSETS_DIR.value):
                replaced = True
                img["src"] = self._img_src_encode(src)
        return soup.prettify() if replaced else body

    def _img_src_encode(self, path: str) -> str:
        """
        this method get image file by relative path from gitlab repository and encode image to base64
        :param path: relative path of image file (ex. assets/img.png)
        :return: base64 encoded img src value (ex. "data:image/png;base64,...")
        :raise AttributeError: if gitlab_file_reader is not set (by mixin create function)
        """

        if not self.gitlab_file_reader:
            raise AttributeError("A gitlab file reader is not set")

        image = self.gitlab_file_reader.fetch_file_content(file_path=path)
        extension = path.split(".")[-1].lower()

        src = f"data:image/{extension};base64,{base64encode(image)}"
        return src


class BaseAssetImageMarkdownRendererMixin:
    """
    Base of mixin class for display repository's asset
    `render_image` and `render_html_block` methods are originally in marko internal parser
    two modified method and two custom method with double under bar
    XXX this mixin targets only for MarkdownRenderer. if the result file format changed, this won't be useful
    XXX Unused for now
    """

    def render_image(self, element: inline.Image) -> str:
        """
        check image src if using relative path and render image in markdown format
        :param element:
        :return:
        """

        url = element.dest
        if element.dest.startswith(Filepath.ASSETS_DIR.value):
            url = self._img_src_encode(url)

        original_quotation = '"'
        target_quotation = '\\"'

        title = (
            f' "{element.title.replace(original_quotation, target_quotation)}"'
            if element.title
            else ""
        )

        return f"![{self.render_children(element)}]({url}{title})"

    def render_html_block(self, element: block.HTMLBlock) -> str:
        """
        this method will check image source
        if the src value was relative path, this function would replace src with base64 encoded image
        :param element: HTMLBlock element of marko
        :return: Markdown rendered html block
        """

        body = self._img_tag_filter(element.body)
        result = self._prefix + body + "\n"  # type: ignore[attr-defined]
        self._prefix = self._second_prefix
        return result


class BaseAssetImageHtmlRendererMixin:
    """
    Base of mixin class for display repository's asset
    `render_image` and `render_html_block` methods are originally in marko internal parser
    two modified method and two custom method with double under bar
    XXX this mixin targets only for HtmlRenderer. if the result file format changed, this won't be useful
    """

    def render_image(self, element: inline.Image) -> str:
        """
        check image src if using relative path and render image in html format
        :param element:
        :return:
        """

        url = element.dest
        if url.startswith(Filepath.ASSETS_DIR.value):
            url = self._img_src_encode(url)
        else:
            url = self.escape_url(url)

        render_func = self.render
        self.render = self.render_plain_text
        body = self.render_children(element)
        self.render = render_func

        title = f' title="{self.escape_html(element.title)}"' if element.title else ""

        return f'<img src="{url}" alt="{body}"{title} />'

    def render_html_block(self, element: block.HTMLBlock) -> str:
        """
        originally, this method returns element.body
        Now this method will check image source
        if the src value was relative path, this function would replace src with base64 encoded image
        :param element: HTMLBlock element of marko
        :return: Markdown rendered html block
        """

        body = self._img_tag_filter(element.body)
        return body


def create_asset_img_mixin(gitlab_file_reader: GitLabFileReader) -> type:
    """
    this function is used to create an AssetImageMarkdownRendererMixin used in marko extension
    and insert gitlab_file_reader to this mixin class

    TODO: improve current code format(class wrapping function, type constructor, ...)
    :param gitlab_file_reader: gitlab file reader connected to gitlab repository
    :return: AssetImageHtmlRendererMixin class type using gitlab_file_reader
    """

    file_reader_parameter = {"gitlab_file_reader": gitlab_file_reader}

    asset_image_renderer_mixin = type(
        "AssetImageHtmlRendererMixin",
        (BaseAssetImageHtmlRendererMixin, BaseImageEncoder),
        file_reader_parameter,
    )

    return asset_image_renderer_mixin
