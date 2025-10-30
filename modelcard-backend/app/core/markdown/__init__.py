from marko import Markdown, MarkoExtension
from marko.ext.gfm import GFM

from app.core.devops_tools.gitlab_tools import GitLabFileReader
from app.core.markdown.marko_extension import create_asset_img_mixin


def markdown_asset_img_encoder(
    markdown_file: bytes, gitlab_file_reader: GitLabFileReader
) -> str:
    """
    encode image files in markdown document which img src are relative path ( ex. ![](assets/img.png) )
    :param markdown_file: retrived markdown file from the gitlab repository
    :param gitlab_file_reader: GitLabFileReader instance of the repository
    :return: markdown text which asset img src encoded with base64
    """

    # prepare marko markdown instant
    md = Markdown()  # the default renderer is HTML renderer
    md.use(GFM)

    # add extension in marko instant
    renderer_mixin = create_asset_img_mixin(gitlab_file_reader=gitlab_file_reader)
    asset_img_encoding_extension = MarkoExtension(renderer_mixins=[renderer_mixin])
    md.use(asset_img_encoding_extension)

    # parse markdown content
    parsed_document = md.parse(markdown_file.decode("utf-8"))

    # render parsed document to Markdown text
    rendered_document = md.render(parsed_document)

    # return Markdown text
    return rendered_document
