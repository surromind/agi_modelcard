import React from 'react';
import styled from 'styled-components';

import { IIconButton32Props } from '@/interfaces/buttonInterfaces';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';

const IconButtonNotification = (props: IIconButton32Props): React.ReactNode => {
  const { $iconLetter, $onClick } = props;

  const onClickButton = () => {
    if ($onClick) {
      $onClick();
    }
  };

  return (
    <Button onClick={onClickButton} type="button" {...props}>
      <span>
        {$iconLetter}
      </span>
    </Button>
  );
};
export default IconButtonNotification;

const Button = styled.button`
    width: ${toRem(32)};
    height: ${toRem(32)};
    border-radius: 100%;
    background: ${commonColors.navy100};
    color: ${commonColors.navy900};
    
    > span {
        font-size: ${toRem(18)};
        font-weight: 600;
        line-height: ${toRem(25)};
        letter-spacing: 0.003em;
        text-align: center;
    }
`;
