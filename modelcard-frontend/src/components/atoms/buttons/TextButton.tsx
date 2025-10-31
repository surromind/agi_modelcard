import React from 'react';
import styled from 'styled-components';

import { ITextButton } from '@/interfaces/buttonInterfaces';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';

const TextButton = (props: ITextButton): React.ReactNode => {
  const { $text, $onClick } = props;

  const onClickButton = () => {
    if ($onClick) {
      $onClick();
    }
  };

  return (
    <div>
      <Container onClick={onClickButton} {...props}>
        {$text}
      </Container>
    </div>
  );
};
export default TextButton;

const Container = styled.button<ITextButton>`
	width: ${({ $width }) => ($width || '100%')};
	height: ${({ $height }) => ($height || toRem(52))};
	font-size: ${toRem(18)};
	font-weight: 600;
	color: ${commonColors.neutral50};
	background-color: ${commonColors.orange500};
	border: ${toRem(1)} solid ${commonColors.orange500};
	border-radius: ${toRem(8)};
`;
