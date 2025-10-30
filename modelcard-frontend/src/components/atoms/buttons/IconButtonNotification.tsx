import React from 'react';
import styled from 'styled-components';

import { IIconButton32Props } from '@/interfaces/buttonInterfaces';
import icBell from '@/assets/images/atoms/icBell.svg';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';

const IconButtonNotification = (props: IIconButton32Props): React.ReactNode => {
  const { $onClick } = props;

  const onClickButton = () => {
    if ($onClick) {
      $onClick();
    }
  };

  return (
    <Button onClick={onClickButton} type="button" {...props}>
      <Img
        src={icBell.src}
              // src={icDelete}
        {...props}
      />
    </Button>
  );
};
export default IconButtonNotification;

const Button = styled.button`
    width: ${toRem(32)};
    height: ${toRem(32)};
    background: ${commonColors.darkBlue};
    border-radius: ${toRem(4)};
`;

const Img = styled.img`
    width: ${toRem(18)};
    height: ${toRem(18)};
`;
