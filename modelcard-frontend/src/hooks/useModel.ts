import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import { ApiGatewayURL } from '@/constants/urls';

const useModel = () => {
  const searchParams = useSearchParams();
  const modelId = searchParams.get('modelId');

  const url = `${ApiGatewayURL}/models/${modelId}`;

  const getModelEditData = () => axios.get(url).then((res) => res.data);

  const fetchGetModelEditData = useQuery({
    queryKey: ['fetchGetModelEditData'],
    queryFn: () => getModelEditData(),
    enabled: !!modelId,
  });

  const { data: modelInfo, isLoading, isFetching } = fetchGetModelEditData;

  return { modelInfo, isLoading, isFetching };
};

export default useModel;
