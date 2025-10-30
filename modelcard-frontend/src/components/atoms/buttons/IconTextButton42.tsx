import React, { useState } from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import icCheckCircle from '@/assets/images/atoms/icCheckCircle.svg';
import icCheckCircleActive from '@/assets/images/atoms/icCheckCircleActive.svg';
import { IIconTextButton42 } from '@/interfaces/buttonInterfaces';

const IconTextButton42 = (props: IIconTextButton42): React.ReactNode => {
  const {
    $text = '내가 등록한 모델만 보기',
    $onClick,
  } = props;

  const [isChecked, setIsChecked] = useState(false);
  const onClickButton = () => {
    setIsChecked(!isChecked);
    if ($onClick) {
      $onClick();
    }
  };
  return (
    <Button onClick={onClickButton} type="button" $isChecked={isChecked} {...props}>
      <Checkbox type="checkbox" defaultChecked={isChecked} />
      <img src={isChecked ? icCheckCircleActive.src : icCheckCircle.src} alt="" />
      {$text}
    </Button>
  );
};
export default IconTextButton42;

const Button = styled.button<IIconTextButton42 & { $isChecked: boolean }>`
    display: flex;
    align-items: center;
    
    height: ${toRem(42)};

    font-weight: 400;
    font-size: ${toRem(14)};
    color: ${({ $isChecked }) => ($isChecked ? 'rgba(41, 88, 162, 1)' : 'rgba(122, 131, 149, 1)')};

    border-radius: ${toRem(3)};
    border: ${({ $isChecked }) => `1px solid ${$isChecked ? 'rgba(41, 88, 162, 1)' : 'rgba(122, 131, 149, 1)'}`};

    background: rgba(255, 255, 255, 1);
    padding: 0 ${toRem(12)};

    img {
        margin-right: ${toRem(8)};
    }
`;

const Checkbox = styled.input`
    display: none;
`;
