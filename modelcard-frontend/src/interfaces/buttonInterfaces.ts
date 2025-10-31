import { TCommonColors } from '@/types/commonTypes';
import { ButtonIcon, IconTextButton32Icon, TextIconButton40Icon } from '@/types/buttonTypes';
import { FilterType } from '@/types/filterTypes';

/**
 * @description Default Button Interface
 */
export interface IButton {
  $onClick?: () => void;
  $bgColor?: TCommonColors;
  $width?: string; // {toRem(100)}, 50% string으로 넘겨줘야 함
  $height?: string;
}
/**
 * IconButton20
 * */
export interface IIconButton20Props extends IButton {
  $iconType: ButtonIcon;
}

export interface IIconButton32Props extends IButton {
  $iconLetter?: string;
}

/**
 * @description Text 들어가는 버튼 인터페이스, 기본값은 IButton 인터페이스에서 상속받는다.
 */
export interface ITextButton extends IButton {
  $text: string;
}

/**
 * TextIconButton32
 * */
export interface ITextIconButton32 extends ITextButton {
  $iconType: ButtonIcon;
  $buttonType: 'project' | 'staging' | 'operation' | 'edit' | 'delete';
}

/**
 * IconTextButton32
 * */

export interface IIconTextButton32 extends ITextButton {
  $iconType: IconTextButton32Icon;
}

/**
 * TextIconButton40
 * */
export interface ITextIconButton40 extends ITextButton {
  $iconType: TextIconButton40Icon;
  $isDisabled?: boolean;
}

export interface IIconTextButton42 extends ITextButton {

}

/*
* TabButton
* */

export interface ITabButtonProps {
  $text?: string;
  $tabValue?: FilterType;
  $currentActiveTab: string;
  $onClick: () => void;
}
