from __future__ import annotations

from dataclasses import dataclass, field
from typing import Dict, Optional, Sequence

import onnxruntime as ort


@dataclass
class OnnxExportConfig:
    """
    ONNX export configuration that can be shared across conversion workflows.
    """

    opset_version: int = 17
    do_constant_folding: bool = True
    input_names: Sequence[str] = field(default_factory=lambda: ["input"])
    output_names: Sequence[str] = field(default_factory=lambda: ["output"])
    dynamic_axes: Optional[Dict[str, Dict[int, str]]] = field(
        default_factory=lambda: {
            "input": {0: "batch_size"},
            "output": {0: "batch_size"},
        }
    )


@dataclass
class OnnxRuntimeConfig:
    """
    ONNX Runtime execution configuration that can be reused across inference helpers.
    """

    providers: Sequence[str] = field(default_factory=lambda: ["CPUExecutionProvider"])
    optimization_level: ort.GraphOptimizationLevel = ort.GraphOptimizationLevel.ORT_ENABLE_EXTENDED
    input_name: str = "input"
    optimized_model_filepath: Optional[str] = None
