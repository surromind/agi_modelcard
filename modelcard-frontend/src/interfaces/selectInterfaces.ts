import { SelectOption } from '@/types/selectboxTypes';
import { IModelListSelectOption } from '@/interfaces/filterInterfaces';

export interface ISelectBoxProps {
  options:
  SelectOption[] | IModelTypeSelectOption[] | ITaskSelectOption[] | IFrameworkOption[] | IModelListSelectOption[];
  $isError?: boolean
  $labelName?: string
}
export interface IModelTypeSelectOption {
  id: number,
  name: string,
  description?: string,
  abbreviation?: string,
  task?: ITaskSelectOption[]
}

export interface ITaskSelectOption {
  id: number,
  name: string,
  description?: string,
  model_type_id?: number
}

export interface IFrameworkOption {
  id: number,
  name: string,
  description?: string
}

export interface ILicensesOption {
  id: number,
  name: string,
  description?: string
}

export interface ICategoriesOption {
  model: IModelTypeSelectOption,
  framework: IFrameworkOption,
  licenses: ILicensesOption
}
