import numpy as np
import torch
import torch.nn as nn
from app.utils.onnx import OnnxExportConfig, OnnxRuntimeConfig, convert_model_to_onnx, run_onnx_inference


def test_torch_converter_roundtrip(tmp_path):
    torch.manual_seed(0)
    model = nn.Sequential(nn.Linear(8, 4), nn.ReLU())
    dummy_input = torch.randn(2, 8)

    export_config = OnnxExportConfig(input_names=["input"], output_names=["output"])

    onnx_path = convert_model_to_onnx(
        model,
        tmp_path / "torch_model.onnx",
        dummy_input=dummy_input,
        device="cpu",
        export_config=export_config,
    )

    assert onnx_path.exists()

    runtime_config = OnnxRuntimeConfig(input_name="input")
    ort_output = run_onnx_inference(onnx_path, dummy_input, config=runtime_config)
    expected_output = model(dummy_input).detach().numpy()

    np.testing.assert_allclose(ort_output, expected_output, atol=1e-5, rtol=1e-5)
