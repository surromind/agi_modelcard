import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { useFilterStore } from '@/stores/filter';
import { FilterType } from '@/types/filterTypes';
import { ApiGatewayURL } from '@/constants/urls';

export const useFilterList = () => {
  const {
    filterListCategory,
  } = useFilterStore();

  const getFilterList = async (params: FilterType) => axios
    .get(`${ApiGatewayURL}/${params}/`)
    .then((res) => res.data);

  const { data: filterListData, isLoading, isError } = useQuery({
    queryKey: ['filterList', filterListCategory],
    queryFn: () => getFilterList(filterListCategory),
  });

  return { filterListData, isLoading, isError };
};

export const useFilterAllList = () => {
  const getFilterAllList = async () => axios
    .get(`${ApiGatewayURL}/categories/`)
    .then((res) => res.data);

  const { data: filterListAllData, isLoading, isError } = useQuery({
    queryKey: ['filterAllList'],
    queryFn: () => getFilterAllList(),
  });

  return { filterListAllData, isLoading, isError };
};
