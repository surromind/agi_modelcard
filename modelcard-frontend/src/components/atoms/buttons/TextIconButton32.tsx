import React from 'react';
import styled from 'styled-components';

import { ITextIconButton32 } from '@/interfaces/buttonInterfaces';
import { toRem } from '@/utils/styleUtil';
import icNextArrowWhite from '@/assets/images/atoms/icNextArrowWhite.svg';
import icPrevArrowWhite from '@/assets/images/atoms/icPrevArrowWhite.svg';
import icTrashWhite from '@/assets/images/atoms/icTrashWhite.svg';
import icPencilWhite from '@/assets/images/atoms/icPencilWhite.svg';
import commonColors from '@/constants/colors';

const TextIconButton32 = (props: ITextIconButton32): React.ReactNode => {
  const {
    $text, $onClick, $iconType,
  } = props;

  const icon = {
    next: icNextArrowWhite,
    prev: icPrevArrowWhite,
    pencil: icPencilWhite,
    delete: icTrashWhite,
  };

  const onClickButton = () => {
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
export default TextIconButton32;

const Button = styled.button<ITextIconButton32>`
	display: flex;
    align-items: center;
    height: ${toRem(32)};
	font-weight: bold;
	font-size: ${toRem(14)};
	color: ${commonColors.neutral50};
	border-radius: ${toRem(3)};
	padding: 0 ${toRem(12)};
    background: ${({ $buttonType }) => {
    switch ($buttonType) {
      case 'project':
        return commonColors.orange500;
      case 'staging':
        return commonColors.teal500;
      case 'operation':
        return commonColors.violet500;
      case 'edit':
        return commonColors.blue500;
      case 'delete':
        return commonColors.red500;
      default:
        return commonColors.orange500;
    }
  }};
  
  
	img{
		margin-left: ${toRem(8)};
	}
`;
