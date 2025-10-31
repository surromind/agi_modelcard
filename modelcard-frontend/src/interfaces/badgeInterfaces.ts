import { BadgeTypes } from '@/types/badgeTypes';

export interface IBadge {
  $badgeType:BadgeTypes,
  $height?: string; // ${toRem(10)}
  $text:string,
  $isActivated:boolean,
}
