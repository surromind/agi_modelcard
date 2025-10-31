import { TaskIcon } from '@/types/modelCardTypes';
import icEyes from '@/assets/images/atoms/icComputerVisionBlack.svg';
import icTime from '@/assets/images/atoms/icTimeSeriesBlack.svg';
import icText from '@/assets/images/atoms/icTextBlack.svg';
import icAudio from '@/assets/images/atoms/icAudioBlack.svg';
import icMultiModal from '@/assets/images/atoms/icMultiModalBlack.svg';
import icLanguage from '@/assets/images/atoms/icLanguage.svg';

export const toRem = (size: number) => `${size / 16}rem`;

export const modelCategoryIcon = (iconType: TaskIcon) => {
  switch (iconType) {
    case 'Computer Vision':
      return icEyes.src;
    case 'Time Series':
      return icTime.src;
    case 'Text':
      return icText.src;
    case 'Audio':
      return icAudio.src;
    case 'Multi modal':
      return icMultiModal.src;
    case 'Language':
      return icLanguage.src;
    default:
      return '';
  }
};
