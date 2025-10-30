import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { ApiGatewayURL } from '@/constants/urls';

const useCategories = () => {
  const url = `${ApiGatewayURL}/categories/`;

  const getCategories = () => axios.get(url).then((res) => res.data);

  const fetchGetCategories = useQuery({
    queryKey: ['fetchGetCategories'],
    queryFn: () => getCategories(),
  });

  const { data: categories } = fetchGetCategories;

  return { categories };
};

export default useCategories;
