import { create } from 'zustand';

import { FilterType } from '@/types/filterTypes';

interface IFilter {
  filterListCategory: FilterType;
  getFilterListCategory: () => FilterType;
  setFilterListCategory: (category: FilterType) => void;
}

export const useFilterStore = create<IFilter>((set, get) => ({
  filterListCategory: 'model-types',
  getFilterListCategory: () => get().filterListCategory,
  setFilterListCategory: (category:FilterType) => set({ filterListCategory: category }),
}));
