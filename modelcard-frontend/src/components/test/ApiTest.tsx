import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { ApiGatewayURL } from '@/constants/urls';

interface Model {
  id: string;
  name: string;
  description: string;

}
const getModels = async () => axios
  .get(`${ApiGatewayURL}/models`, { })
  .then((response) => response.data);

const ApiTest = (): React.ReactNode => {
  const { data, isLoading } = useQuery({
    queryKey: ['models'],
    queryFn: getModels,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.data?.map((model: Model) => (
        <div key={model.id}>
          <h2>{`${model.id}. ${model.name}`}</h2>
          <p>{model.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ApiTest;
