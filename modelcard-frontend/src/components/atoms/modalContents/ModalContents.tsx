import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import icQuestion from '@/assets/images/atoms/icQuestion.svg';
import icExclamation from '@/assets/images/atoms/icExclamation.svg';
import LevelRadio from '@/components/atoms/radio/LevelRadio';
import { IMoveToStepFunc } from '@/interfaces/modalInterfaces';

const ContentProjectToStaging = (): React.ReactNode => (
  <Container>
    <img src={icQuestion.src} alt="" />
    <p>
      현재
      <span> Project 단계에 있는 모델 카드</span>
      입니다.
      <br />
      다음 단계인
      <span> Staging 단계</span>
      로 상태를 변경하시겠습니까?
    </p>
  </Container>
);
const ContentStagingToProject = (): React.ReactNode => (
  <Container>
    <img src={icQuestion.src} alt="" />
    <p>
      현재
      <span> Staging 단계에 있는 모델 카드</span>
      입니다.
      <br />
      이전 단계인
      <span> Project 단계</span>
      로 상태를 변경하시겠습니까?
    </p>
  </Container>
);
const ContentStagingToOperation = (): React.ReactNode => (
  <Container>
    <img src={icQuestion.src} alt="" />
    <p>
      현재
      <span> Staging 단계에 있는 모델 카드</span>
      입니다.
      <br />
      다음 단계인
      <span> Operation 단계</span>
      로 상태를 변경하시겠습니까?
    </p>
  </Container>
);

const ContentOperation = (props: IMoveToStepFunc): React.ReactNode => (
  <Container>
    <img src={icExclamation.src} alt="" />
    <p>
      현재
      <span> Operation 단계에 있는 모델 카드</span>
      입니다.
      <br />
      이전 단계인
      <span>Staging 단계</span>
      또는
      <span>Project 단계</span>
      로 상태 변경을
      {' '}
      <br />
      원하신다면, 한가지를 선택해주세요.
    </p>

    <div className="buttonBox">
      <LevelRadio $setMoveToStep={props.$setMoveToStep} />
    </div>
  </Container>
);

const ContentDelete = (): React.ReactNode => (
  <Container>
    <img src={icQuestion.src} alt="" />
    <p>
      해당 모델을 삭제하시겠습니까?
    </p>
  </Container>
);

export {
  ContentProjectToStaging, ContentStagingToProject, ContentStagingToOperation, ContentOperation, ContentDelete,
};

const Container = styled.div`
  img {
    width: ${toRem(40)};
    height: ${toRem(40)};
    margin-bottom: ${toRem(20)};
  }
  
  p {
    font-weight: 500;
    color: ${commonColors.navy800};
    font-size: ${16};
    line-height: ${toRem(22)};
    
    span {
      font-weight: 700;
    }
  }
  
  .buttonBox {
    width: ${toRem(410)};
    margin: ${toRem(20)} auto 0;
  }
`;
