import React from 'react';
import styled from 'styled-components';

import { ITextIconButton40 } from '@/interfaces/buttonInterfaces';
import { toRem } from '@/utils/styleUtil';
import icResetWhite from '@/assets/images/atoms/icResetWhite.svg';
import icConfirmWhite from '@/assets/images/atoms/icConfirmWhite.svg';
import icCancelWhite from '@/assets/images/atoms/icCancelWhite.svg';
import icAddWhite from '@/assets/images/atoms/icAddWhite.svg';
import commonColors from '@/constants/colors';

const TextIconButton40 = (props: ITextIconButton40): React.ReactNode => {
  const {
    $text, $onClick, $iconType, $isDisabled,
  } = props;

  const icon = {
    reset: icResetWhite,
    cancel: icCancelWhite,
    confirm: icConfirmWhite,
    add: icAddWhite,
  };

  const onClickButton = () => {
    if ($isDisabled) return;

    if ($onClick) {
      $onClick();
    }
  };
  return (
    <Button onClick={onClickButton} type="button" {...props}>
      {$text}
      <img src={icon[$iconType].src} alt="" />
    </Button>
  );
};
export default TextIconButton40;

const Button = styled.button<ITextIconButton40>`
	display: flex;
    align-items: center;
    height: ${toRem(40)};
	font-weight: bold;
	font-size: ${toRem(15)};
	color: ${commonColors.neutral50};
	border-radius: ${toRem(5)};
	background-color: ${({ $iconType, $isDisabled }) => {
    if ($isDisabled) {
      return commonColors.neutral400;
    }

    switch ($iconType) {
      case 'reset':
        return commonColors.navy600;
      case 'cancel':
        return commonColors.neutral500;
      case 'confirm':
        return commonColors.navy900;
      case 'add':
        return commonColors.orange500;
      default:
        return commonColors.navy50;
    }
  }};
	padding: 0 ${toRem(15)};
  
	img{
		margin-left: ${toRem(10)};
	}
`;
