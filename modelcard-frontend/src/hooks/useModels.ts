import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { ApiGatewayURL } from '@/constants/urls';
import { IModelParams, useModelStore } from '@/stores/model';

const useModels = () => {
  const {
    models,
    setModels,
    params: listQuery,
    getParams,
    setParams,
  } = useModelStore();

  const getQueryString = (params: IModelParams) => {
    const url = `${ApiGatewayURL}/models/`;
    let queryString = `${url}?page=${params?.page || 1}`;

    if (params.state) {
      queryString += `&state=${params.state}`;
    }
    if (params.title) {
      queryString += `&title=${params.title}`;
    }
    if (params.order) {
      queryString += `&order=${params.order}`;
    }
    if (params.task.length !== 0) {
      queryString += `&task=[${params.task}]`;
    }
    if (params.framework.length !== 0) {
      queryString += `&framework=[${params.framework}]`;
    }
    if (params.license.length !== 0) {
      queryString += `&license=[${params.license}]`;
    }
    return queryString;
  };

  const getModelsList = async (params:IModelParams) => axios
    .get(`${getQueryString(params)}`)
    .then((res) => {
      setModels(res.data.data);
      setParams({ ...getParams(), ...res.data.metadata });
      return res.data.data;
    });

  const {
    data: modelsData, isLoading, isError, refetch: refetchModels,
  } = useQuery({
    queryKey: ['models', listQuery.page, listQuery.state, listQuery.title, listQuery.order, listQuery.task, listQuery.framework, listQuery.license],
    queryFn: () => getModelsList(listQuery),
  });

  return {
    modelList: modelsData || models, isLoading, isError, refetchModels,
  };
};

export default useModels;
