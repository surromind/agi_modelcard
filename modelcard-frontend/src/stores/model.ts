import { create } from 'zustand';

import { IModelCard } from '@/interfaces/modelCardInterfaces';
import { IPageInfoInterface } from '@/interfaces/pageInfoInterface';

interface IModel {
  models: IModelCard[];
  setModels: (models: IModelCard[]) => void;
  params: IModelParams;
  getParams: () => IModelParams;
  setParams: (params: IModelParams) => void;
  resetParams: () => void;
}

export interface IModelParams extends IPageInfoInterface {
  state: string;
  title: string;
}

export const useModelStore = create<IModel>((set, get) => ({
  models: [],

  params: {
    page: 1,
    total_page: 0,
    page_count: 0,
    total: 0,
    links: {},
    state: '',
    title: '',
    order: 'updated_at',
    task: [],
    framework: [],
    license: [],
  },
  getParams: () => get().params,
  setParams: (params: IModelParams) => set({ params }),
  setModels: (models: IModelCard[]) => set({ models }),
  resetParams: () => set({
    params: {
      page: 1,
      total_page: 0,
      page_count: 0,
      total: 0,
      links: {},
      state: '',
      title: '',
      order: 'updated_at',
      task: [],
      framework: [],
      license: [],
    },
  }),
}));
