import { BadgeTypes } from '@/types/badgeTypes';
import { TaskIcon } from '@/types/modelCardTypes';

export interface IModelCardProps {
  $initial: string;
  $id: number;
  $title: string;
  $description: string;
  $performance: string;
  $performanceMetric: string;
  $fileSize: string;
  $fileUnit:string;
  $task: string;
  $taskIcon: TaskIcon;
  $hashtag: {
    framework: string;
    license?: string;
  };
  $currentStep: BadgeTypes;
  $date: string;
}

export interface IModelCard {
  id: number,
  model_type: {
    abbreviation: string,
    description: string,
    id: number,
    name: string
  },
  created_at: string,
  created_by: string,
  updated_at: string,
  updated_by: string,
  name: string,
  description: string,
  state_code: string,
  state_name: BadgeTypes,
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
  task: {
    id: number,
    name: string,
    description: string,
    model_type_id: number,
    abbreviation: string,
  },
  inference: {
    id: number,
    address: string,
    port: number
  },
  git_url: string,
  size: number,
  file_size: number,
  file_unit: string,
  performance_metric: string,
  performance_score: number
}
