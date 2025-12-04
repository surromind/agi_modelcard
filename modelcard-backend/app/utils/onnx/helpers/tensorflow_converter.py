from __future__ import annotations

import warnings
from dataclasses import replace
from importlib import import_module
from pathlib import Path
from typing import TYPE_CHECKING, Optional, Sequence, Union

import numpy as np
from app.utils.onnx.config import OnnxExportConfig

if TYPE_CHECKING:
    import tensorflow as tf  # pragma: no cover


def _ensure_numpy_object_alias() -> None:
    if not hasattr(np, "object"):  # pragma: no cover
        np.object = object
    if not hasattr(np, "cast"):  # pragma: no cover
        np.cast = np.asarray


def _coerce_tf_opset(export_config: OnnxExportConfig, tf2onnx_module) -> OnnxExportConfig:
    opset_map = getattr(tf2onnx_module.constants, "OPSET_TO_IR_VERSION", None)
    if opset_map:
        max_supported = max(opset_map.keys())
        if export_config.opset_version > max_supported:
            warnings.warn(
                f"Requested ONNX opset {export_config.opset_version} exceeds tf2onnx "
                f"support (max {max_supported}); falling back to {max_supported}.",
                UserWarning,
            )
            return replace(export_config, opset_version=max_supported)
    return export_config


def convert_tensorflow_model_to_onnx(
    model: "tf.Module",
    file_path: Union[str, Path],
    *,
    input_signature: Optional[Sequence["tf.TensorSpec"]] = None,
    export_config: Optional[OnnxExportConfig] = None,
) -> Path:
    """
    TensorFlow 모델을 ONNX로 변환합니다.
    """

    _ensure_numpy_object_alias()
    tf = import_module("tensorflow")
    tf2onnx = import_module("tf2onnx")

    export_config = export_config or OnnxExportConfig()
    export_config = _coerce_tf_opset(export_config, tf2onnx)
    target_path = Path(file_path)
    target_path.parent.mkdir(parents=True, exist_ok=True)

    if input_signature is None:
        if hasattr(model, "inputs") and model.inputs:
            input_signature = tuple(
                tf.TensorSpec(shape=input_tensor.shape, dtype=input_tensor.dtype) for input_tensor in model.inputs
            )
        else:
            raise ValueError("Input signature must be provided for TensorFlow models.")

    if hasattr(model, "get_concrete_function"):
        function = model
    elif hasattr(model, "__call__") and hasattr(model.__call__, "get_concrete_function"):
        function = model.__call__
    else:
        raise ValueError("TensorFlow model must expose a tf.function for conversion.")

    onnx_model, _ = tf2onnx.convert.from_function(
        function,
        input_signature=input_signature,
        opset=export_config.opset_version,
        output_path=str(target_path),
    )

    del onnx_model
    return target_path
