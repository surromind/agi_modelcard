import { TaskIcon } from '@/types/modelCardTypes';

export interface IFilterListItem {
  id: number,
  name: string,
  description: string,
  model_type_id: number,
}
export interface IFilterListToggleData {
  id: number,
  name: TaskIcon,
  description: string,
  abbreviation: string,
  task: IFilterListItem[],
}

export interface IFilterCheckedBoxListToggle {
  $data: IFilterListToggleData[];
  $taskItems: number[];
  $setTaskItems: (items: number[]) => void;
}

export interface IFilterListData {
  id: number;
  name: string;
  description: string;
}
export interface IFilterCheckedBoxList {
  $data: IFilterListData[];
  $taskItems: number[];
  $setTaskItems: (items: number[]) => void;
}

export interface IModelListSelectOption {
  id: number,
  name: string,
  value: string,
}
