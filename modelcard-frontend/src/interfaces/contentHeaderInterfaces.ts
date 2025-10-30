import { NavigationType } from '@/types/navigationTypes';
import { HashtagIcontypes } from '@/types/hashtagTypes';

export interface IModelAddHeaderProps {
  $navigations: NavigationType[];
  $className?: string;
  $step: string;
  $isEdit:boolean;
  $isEditStep:boolean;
}

export interface IDetailHashtag {
  task: string;
  framework: string;
  license?: string;
}
export interface IModelDetailHeaderProps {
  $navigations: NavigationType[];
  $className?: string;
  $initial: string;
  $title: string;
  $description: string;
  $created: string;
  $updated?: string;
  $onClick: () => void;
  $btnInference: {
    address?: string;
    port?: number;
  };
  $currentStep: 'project' | 'staging' | 'operation';
  $hashtag: {
    task: string;
    framework: string;
    license?: string;
  },
  $hashtagIcon: 'computerVision' | 'timeSeries' | 'text';
}
export interface IDetailHashtagProps {
  $content: IDetailHashtag,
  $taskIcon: HashtagIcontypes,
}

export interface IModelTestHeaderProps {
  $navigations: NavigationType[];
  $initial: string;
  $title: string;
  $description: string;
  $className?: string;
}
