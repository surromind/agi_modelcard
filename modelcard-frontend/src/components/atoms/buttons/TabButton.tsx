import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { ITabButtonProps } from '@/interfaces/buttonInterfaces';

const TabButton = (props: ITabButtonProps): React.ReactNode => {
  const {
    $text, $tabValue, $currentActiveTab, $onClick,
  } = props;
  const onClickTab = () => {
    $onClick();
  };
  return (
    <Container
      role="presentation"
      onClick={onClickTab}
      className={$currentActiveTab === $tabValue ? 'active' : ''}
    >
      <span>{$text}</span>
    </Container>
  );
};
export default TabButton;

const Container = styled.div`
  width: 100%;
  height: ${toRem(40)};
  line-height: ${toRem(40)};
  background-color: ${commonColors.neutral50};
  color: ${commonColors.navy900};
  font-size: ${toRem(16)};
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  
  &.active {
    color: ${commonColors.neutral50};
    background-color: ${commonColors.navy900};
  }
    
`;
