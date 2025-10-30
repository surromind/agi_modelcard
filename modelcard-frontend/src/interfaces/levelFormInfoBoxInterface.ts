import { LevelFormInfoBoxTypes } from '@/types/levelFormInfoBoxTypes';

export interface ILevelFormInfoItem {
  id: number,
  description: string
}

export interface ILevelFormInfoBoxProps {
  $infoType: LevelFormInfoBoxTypes | string
}
