import { StaticImageData } from 'next/image';

export interface ITestViewProps {
  $isLoading: boolean;
  $originImg: StaticImageData;
  $resultImg: StaticImageData;
}
