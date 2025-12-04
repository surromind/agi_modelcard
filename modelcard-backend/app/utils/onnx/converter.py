from __future__ import annotations

from enum import Enum
from importlib import import_module
from pathlib import Path
from typing import Optional, Sequence, Union

from .config import OnnxExportConfig


class Framework(str, Enum):
    PYTORCH = "pytorch"
    TENSORFLOW = "tensorflow"


def _infer_framework(model: object) -> Framework:
    try:
        import torch

        if isinstance(model, torch.nn.Module):
            return Framework.PYTORCH
    except ImportError:
        pass

    try:
        import tensorflow as tf  # type: ignore[import]

        if isinstance(model, tf.Module):
            return Framework.TENSORFLOW
    except ImportError:
        pass

    raise ValueError("Unsupported model type: unable to detect framework.")


def convert_model_to_onnx(
    model: object,
    file_path: Union[str, Path],
    *,
    dummy_input: Optional[object] = None,
    input_shape: Sequence[int] = (1, 3, 448, 448),
    device: Union[str, None] = "cpu",
    export_config: Optional[OnnxExportConfig] = None,
    framework: Optional[Framework] = None,
    input_signature: Optional[Sequence[object]] = None,
) -> Path:
    """
    ONNX로의 변환을 프레임워크 별 helper에 위임하는 공통 인터페이스입니다.
    """

    framework = framework or _infer_framework(model)

    if framework == Framework.PYTORCH:
        export_config = export_config or OnnxExportConfig()
        torch_converter = import_module("app.utils.onnx.helpers.torch_converter").convert_torch_model_to_onnx
        return torch_converter(
            model=model,  # type: ignore[arg-type]
            file_path=file_path,
            dummy_input=dummy_input,  # type: ignore[arg-type]
            input_shape=input_shape,
            device=device,  # type: ignore[arg-type]
            export_config=export_config,
        )

    if framework == Framework.TENSORFLOW:
        from collections.abc import Sequence as _Sequence

        export_config = export_config or OnnxExportConfig(opset_version=15)
        signature = input_signature
        if signature is None and dummy_input is not None and isinstance(dummy_input, _Sequence):
            signature = dummy_input  # type: ignore[assignment]
        tf_converter = import_module("app.utils.onnx.helpers.tensorflow_converter").convert_tensorflow_model_to_onnx
        return tf_converter(
            model=model,  # type: ignore[arg-type]
            file_path=file_path,
            input_signature=signature,  # type: ignore[arg-type]
            export_config=export_config,
        )

    raise ValueError(f"Framework {framework} is not supported.")
