import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import { IModalProps } from '@/interfaces/modalInterfaces';
import commonColors from '@/constants/colors';
import { ModalTypes } from '@/types/modalTypes';
import TextIconButton40 from '@/components/atoms/buttons/TextIconButton40';
import {
  ContentProjectToStaging, ContentStagingToProject, ContentStagingToOperation, ContentOperation, ContentDelete,
} from '@/components/atoms/modalContents/ModalContents';

const Modal = (props: IModalProps): React.ReactNode => {
  const {
    $contentType, $confirmAction, $cancelAction, $setMoveToStep,
  } = props;

  const content = (type: ModalTypes) => {
    switch (type) {
      case 'projectToStaging':
        return <ContentProjectToStaging />;
      case 'stagingToProject':
        return <ContentStagingToProject />;
      case 'stagingToOperation':
        return <ContentStagingToOperation />;
      case 'operation':
        return <ContentOperation $setMoveToStep={$setMoveToStep} />;
      case 'delete':
        return <ContentDelete />;
      default:
        return '';
    }
  };

  const onClickConfirm = () => {
    $confirmAction();
  };
  const onClickCancel = () => {
    $cancelAction();
  };

  return (
    <ModalBg>
      <ModalContent>
        <ContentBox>
          {content($contentType)}
        </ContentBox>

        <ButtonBox>
          <TextIconButton40
            $iconType="cancel"
            $text="취소"
            $onClick={onClickCancel}
          />
          <TextIconButton40
            $bgColor="navy900"
            $iconType="confirm"
            $text="확인"
            $onClick={onClickConfirm}
          />
        </ButtonBox>
      </ModalContent>
    </ModalBg>
  );
};
export default Modal;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
`;

const ModalContent = styled.div`
  padding: ${toRem(30)} ${toRem(60)};
  border-radius: ${toRem(16)};
  max-width: ${toRem(530)};
  height: fit-content;
  background-color: ${commonColors.neutral50};
`;

const ContentBox = styled.div`
  text-align: center;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: ${toRem(10)};
  justify-content: center;
  margin-top: ${toRem(30)};
`;
