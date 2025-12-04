from __future__ import annotations

from pathlib import Path
from typing import Optional, Sequence, Union

import torch
from app.utils.onnx.config import OnnxExportConfig


def convert_torch_model_to_onnx(
    model: torch.nn.Module,
    file_path: Union[str, Path],
    *,
    dummy_input: Optional[torch.Tensor] = None,
    input_shape: Sequence[int] = (1, 3, 448, 448),
    device: Union[str, torch.device] = "cpu",
    export_config: Optional[OnnxExportConfig] = None,
) -> Path:
    """
    PyTorch 모델을 ONNX로 변환하는 헬퍼입니다.
    """

    export_config = export_config or OnnxExportConfig()

    model = model.to(device)
    model.eval()

    if dummy_input is None:
        dummy_input = torch.randn(*input_shape, device=device)
    else:
        dummy_input = dummy_input.to(device)

    target_path = Path(file_path)
    target_path.parent.mkdir(parents=True, exist_ok=True)

    torch.onnx.export(
        model=model,
        args=dummy_input,
        f=str(target_path),
        export_params=True,
        opset_version=export_config.opset_version,
        do_constant_folding=export_config.do_constant_folding,
        input_names=list(export_config.input_names),
        output_names=list(export_config.output_names),
        dynamic_axes=export_config.dynamic_axes,
    )

    return target_path
