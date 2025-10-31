import React from 'react';
import styled from 'styled-components';

import { IIconButton20Props } from '@/interfaces/buttonInterfaces';
import icPencil from '@/assets/images/atoms/icPencil.svg';
import icNextArrow from '@/assets/images/atoms/icNextArrow.svg';
import icPrevArrow from '@/assets/images/atoms/icPrevArrow.svg';
import icDelete from '@/assets/images/atoms/icTrash.svg';
import { toRem } from '@/utils/styleUtil';

const IconButton22 = (props: IIconButton20Props): React.ReactNode => {
  const { $iconType, $onClick } = props;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'prev':
        return icPrevArrow.src;
      case 'next':
        return icNextArrow.src;
      case 'pencil':
        return icPencil.src;
      case 'delete':
        return icDelete.src;
      default:
        return '';
    }
  };
  const onClickButton = () => {
    if ($onClick) {
      $onClick();
    }
  };

  return (
    <Button onClick={onClickButton} type="button" {...props}>
      <Img
        src={getIcon($iconType)}
        // src={icDelete}
        {...props}
      />
    </Button>
  );
};
export default IconButton22;

const Button = styled.button`
    width: ${toRem(22)};
    height: ${toRem(22)};
`;

const Img = styled.img`
    width: ${toRem(22)};
    height: ${toRem(22)};
`;
