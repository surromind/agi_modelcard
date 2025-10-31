import { BadgeTypeCodes } from '@/types/badgeTypes';

export interface IModelInfoFormProps {
  $contentType: BadgeTypeCodes | string,
  $isEdit?: boolean
  $isEditStep?: boolean
  $toStep?:string
  $modelId?:string
  $modelInfo?: IModelInfo
}

export interface IModelInfo {
  id: number,
  created_at: string,
  created_by: string,
  updated_at: string,
  updated_by: string,
  name: string,
  description: string,
  state_code: string,
  state_name: string,
  framework: {
    id: number,
    name: string,
    description: string
  },
  license: {
    id: number,
    name: string,
    description: string
  },
  model_type: {
    id: number,
    name: string,
    description: string,
    abbreviation: string
  },
  task: {
    id: number,
    name: string,
    description: string,
    model_type_id: number
  },
  inference: {
    id: number,
    address: string,
    port: number
  },
  git_url: string,
  size: number,
  performance_metric: string,
  performance_score: number,
  document: string
}

export interface IModelInfoForm {
  name: string,
  description:string,
  size: number | string,
  task_id: number,
  model_type_id: number,
  framework_id: number,
  license_id: number,
  performance_metric: string,
  performance_score: number | string,
  git_url: string
  state?: BadgeTypeCodes | string
}

export interface IModelTypeTaskOptions {
  id: number,
  name: string,
  description: string,
  model_type_id: number
}
