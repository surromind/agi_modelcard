import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

import { ApiGatewayURL } from '@/constants/urls';
import { IModelInfoForm } from '@/interfaces/modelInfoFormInterfaces';
import useModel from '@/hooks/useModel';
import { useModelStore } from '@/stores/model';

const useModelEdit = () => {
  const { resetParams } = useModelStore();

  const url = `${ApiGatewayURL}/models`;

  const searchParams = useSearchParams();
  const modelId = searchParams.get('modelId');
  const router = useRouter();
  
  /**
   * @description 생성 / 수정용 params
   * @param formData
   */
  const getParams = (formData: IModelInfoForm) => ({
    name: formData.name,
    description: formData.description,
    size: formData.size === '' ? null : Number(formData.size),
    task_id: Number(formData.task_id) === 0 ? null : Number(formData.task_id),
    model_type_id: Number(formData.model_type_id) === 0 ? null : Number(formData.model_type_id),
    framework_id: Number(formData.framework_id) === 0 ? null : Number(formData.framework_id),
    license_id: Number(formData.license_id) === 0 ? null : Number(formData.license_id),
    performance_metric: formData.performance_metric,
    performance_score: formData.performance_score === '' ? null : Number(formData.performance_score),
    git_url: formData.git_url,
    documentation_markdown: formData.documentation_markdown || null,
  });

  const createModel = async (formData: IModelInfoForm) => {
    const params = getParams(formData);

    try {
      await axios.post(`${url}/`, params);
      resetParams();
      router.push('/home');
    } catch (error) {
      console.error('모델 생성 실패:', error);
      throw error;
    }
  };

  const updateModel = async (formData: IModelInfoForm, newModelState: string) => {
    const params = {
      ...getParams(formData),
      state: newModelState,
    };

    try {
      await axios.put(`${url}/${modelId}`, params);
      resetParams();
      router.push('/home');
    } catch (error) {
      console.error('모델 수정 실패:', error);
      throw error;
    }
  };

  return { createModel, updateModel };
};

export default useModelEdit;
