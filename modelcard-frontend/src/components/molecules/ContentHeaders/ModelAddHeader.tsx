import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { IModelAddHeaderProps } from '@/interfaces/contentHeaderInterfaces';
import Navigation from '@/components/atoms/Navigation';
import StepBadge from '@/components/molecules/StepBadge';

const ModelAddHeader = (props: IModelAddHeaderProps): React.ReactNode => {
  const {
    $navigations, $className, $step, $isEdit, $isEditStep,
  } = props;

  const getPageTitle = () => {
    if ($isEdit && !$isEditStep) {
      return '모델 수정';
    }

    if ($isEdit && $isEditStep) {
      return '단계 변경';
    }

    return '모델 생성';
  };

  return (
    <Container className={$className}>
      <Navigation $navigations={$navigations} />

      <Content>
        <Title>{ getPageTitle() }</Title>
        <StepBox>
          <StepBadge $step={$step} />
        </StepBox>
      </Content>
    </Container>
  );
};
export default ModelAddHeader;

const Container = styled.div`
  width: ${toRem(1000)};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${toRem(55)};
`;

const Title = styled.p`
  font-weight: bold;
  font-size: ${toRem(34)};
  color: ${commonColors.navy900};
`;

const StepBox = styled.div`

`;
