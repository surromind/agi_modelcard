import React from 'react';
import styled from 'styled-components';

import Badge from '@/components/atoms/badge/Badge';
import icDoubleArrow from '@/assets/images/atoms/icDoubleArrow.svg';
import { toRem } from '@/utils/styleUtil';
import { MODEL_STATES } from '@/constants/modelStates';

interface IStepBadge {
  $step: string;
}

const StepBadge = ({ $step }:IStepBadge): React.ReactNode => (
  <StepBadgeWrapper>
    <Badge $text="Project" $isActivated={$step === MODEL_STATES.PROJECT} $badgeType="project" />
    <Img src={icDoubleArrow.src} alt="doubleArrow" />
    <Badge $text="Staging" $isActivated={$step === MODEL_STATES.STAGING} $badgeType="staging" />
    <Img src={icDoubleArrow.src} alt="doubleArrow" />
    <Badge $text="Operation" $isActivated={$step === MODEL_STATES.OPERATING} $badgeType="operation" />
  </StepBadgeWrapper>
);

export default StepBadge;

const StepBadgeWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Img = styled.img`
    width: ${toRem(10)};
    height: ${toRem(10)};
    margin: 0 ${toRem(9)}
`;
