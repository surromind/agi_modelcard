import React from 'react';
import styled from 'styled-components';

import { IIconTextButton32 } from '@/interfaces/buttonInterfaces';
import { toRem } from '@/utils/styleUtil';
import icDoc from '@/assets/images/atoms/icDoc.svg';
import commonColors from '@/constants/colors';

const IconTextButton32 = (props: IIconTextButton32): React.ReactNode => {
  const {
    $text = 'Download Manual',
    $onClick,
    $iconType = 'doc',
  } = props;

  const icon = {
    doc: icDoc,
  };

  const onClickButton = () => {
    if ($onClick) {
      $onClick();
    }
  };
  return (
    <Button onClick={onClickButton} type="button" {...props}>
      <img src={icon[$iconType].src} alt="" />
      {$text}
    </Button>
  );
};
export default IconTextButton32;

const Button = styled.button<IIconTextButton32>`
	display: flex;
    align-items: center;
    height: ${toRem(32)};
	font-weight: 400;
	font-size: ${toRem(12)};
	color: ${commonColors.navy900};
	border-radius: ${toRem(3)};
    background-color: ${commonColors.neutral50};
	padding: 0 ${toRem(12)};
	
	img{
		margin-right: ${toRem(8)};
	}
`;
