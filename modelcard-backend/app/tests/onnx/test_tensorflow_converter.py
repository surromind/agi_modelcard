import pytest
from app.utils.onnx import convert_model_to_onnx
from app.utils.onnx.converter import Framework


def test_tensorflow_converter_with_signature(tmp_path):
    tf = pytest.importorskip("tensorflow")
    np = pytest.importorskip("numpy")
    if not hasattr(np, "object"):  # pragma: no cover
        np.object = object
    pytest.importorskip("tf2onnx")

    class IdentityModel(tf.Module):
        @tf.function(input_signature=[tf.TensorSpec(shape=[None, 3], dtype=tf.float32)])
        def __call__(self, x):
            return x

    module = IdentityModel()
    signature = (tf.TensorSpec(shape=[None, 3], dtype=tf.float32),)

    onnx_path = tmp_path / "tf_model.onnx"
    convert_model_to_onnx(
        module,
        onnx_path,
        framework=Framework.TENSORFLOW,
        input_signature=signature,
    )

    assert onnx_path.exists()
