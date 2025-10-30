import { ModalTypes } from '@/types/modalTypes';
import { ModelStep } from '@/types/commonTypes';

export interface IMoveToStepFunc {
  $setMoveToStep?: (step: ModelStep) => void;
}
export interface IModalProps extends IMoveToStepFunc {
  $contentType: ModalTypes;
  $confirmAction: () => void;
  $cancelAction: () => void;
}
