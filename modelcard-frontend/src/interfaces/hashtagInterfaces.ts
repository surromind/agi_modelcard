import { HashtagIcontypes } from '@/types/hashtagTypes';

export interface IHashtag {
  $isShowIcon?: boolean;
  $iconType?: HashtagIcontypes;
  $text: string;
  $fontColor?: string;
  $backgroundColor?: string;
  $type: 'task' | 'framework' | 'license';
}
