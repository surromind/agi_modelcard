from __future__ import annotations

from typing import Optional, Sequence, Union

import numpy as np
import onnxruntime as ort
import torch
from app.utils.onnx.config import OnnxRuntimeConfig


def _prepare_numpy_input(input_data: Union[torch.Tensor, np.ndarray]) -> np.ndarray:
    if isinstance(input_data, torch.Tensor):
        return input_data.detach().cpu().numpy().astype(np.float32)
    if isinstance(input_data, np.ndarray):
        return input_data.astype(np.float32)
    raise TypeError("Input data must be a torch.Tensor or numpy.ndarray, " f"got {type(input_data).__name__} instead.")


def run_onnx_inference(
    session_path: Union[str, Sequence[str]],
    input_data: Union[torch.Tensor, np.ndarray],
    *,
    config: Optional[OnnxRuntimeConfig] = None,
) -> np.ndarray | Sequence[np.ndarray]:
    """
    Execute an ONNX Runtime session using the provided input.

    Args:
        session_path: Path to the exported ONNX model.
        input_data: Tensor or array shaped for the model input.
        config: Optional runtime configuration for ONNX Runtime.
    """
    config = config or OnnxRuntimeConfig()
    session_options = ort.SessionOptions()
    session_options.graph_optimization_level = config.optimization_level
    if config.optimized_model_filepath:
        session_options.optimized_model_filepath = config.optimized_model_filepath

    session = ort.InferenceSession(
        str(session_path),
        session_options,
        providers=list(config.providers),
    )
    prepared_input = _prepare_numpy_input(input_data)
    outputs = session.run(None, {config.input_name: prepared_input})
    return outputs[0] if len(outputs) == 1 else outputs
