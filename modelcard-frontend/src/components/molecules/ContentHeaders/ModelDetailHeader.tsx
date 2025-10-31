import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import { isEmpty } from 'lodash';
import axios from 'axios';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { IModelDetailHeaderProps } from '@/interfaces/contentHeaderInterfaces';
import Navigation from '@/components/atoms/Navigation';
import TextIconButton40 from '@/components/atoms/buttons/TextIconButton40';
import calendar from '@/assets/images/atoms/icCalendarGrey.svg';
import calendarCheck from '@/assets/images/atoms/icCalendarCheckGrey.svg';
import TextIconButton32 from '@/components/atoms/buttons/TextIconButton32';
import DetailHashtag from '@/components/atoms/hashtag/DetailHashtag';
import { ModelStep } from '@/types/commonTypes';
import { ApiGatewayURL } from '@/constants/urls';
import Modal from '@/components/atoms/Modal';

const ModelDetailHeader = (props: IModelDetailHeaderProps): React.ReactNode => {
  const {
    $navigations,
    $className,
    $initial,
    $title,
    $description,
    $created,
    $updated,
    $onClick,
    $btnInference,
    $currentStep,
    $hashtag,
    $hashtagIcon,
  } = props;

  const router = useRouter();
  const searchParams = useSearchParams();
  const modelId = searchParams.get('modelId');

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  if (isEmpty(modelId)) {
    throw Error('modelId is required');
  }

  const changeStepRouter = (id: number, nextStep: ModelStep) => {
    const params = new URLSearchParams(searchParams);

    params.set('modelId', id.toString());
    params.set('toStep', nextStep);

    const query = params.toString();

    router.push(`/models/edit/?${query}`);
  };

  const currentProject = (
    <TextIconButton32
      $iconType="next"
      $buttonType="staging"
      $text="Staging 단계 변경"
      $onClick={() => changeStepRouter(Number(modelId), 'MSSTAG')}
    />
  );

  const currentStaging = (
    <>
      <TextIconButton32
        $iconType="prev"
        $buttonType="project"
        $text="Project 단계 변경"
        $onClick={() => changeStepRouter(Number(modelId), 'MSPROJ')}
      />
      <TextIconButton32
        $iconType="next"
        $buttonType="operation"
        $text="Operation 단계 변경"
        $onClick={() => changeStepRouter(Number(modelId), 'MSOPER')}
      />
    </>
  );

  const currentOperation = (
    <>
      <TextIconButton32
        $iconType="prev"
        $buttonType="project"
        $text="Project 단계 변경"
        $onClick={() => changeStepRouter(Number(modelId), 'MSPROJ')}
      />
      <TextIconButton32
        $iconType="prev"
        $buttonType="staging"
        $text="Staging 단계 변경"
        $onClick={() => changeStepRouter(Number(modelId), 'MSSTAG')}
      />
    </>
  );

  const buttonType = {
    project: currentProject,
    staging: currentStaging,
    operation: currentOperation,
  };

  const deleteModel = async (id:number) => {
    const result = await axios
      .delete(`${ApiGatewayURL}/models/${id}`).then((res) => {
        router.push('/home');
        return res.data;
      }).catch((e) => {
        console.error(e);
      }).finally(() => {
        setIsOpenDeleteModal(false);
      });

    return result;
  };

  const openModal = () => {
    setIsOpenDeleteModal(true);
  };

  const closeModal = () => {
    setIsOpenDeleteModal(false);
  };

  const onClickTest = () => {
    $onClick();
  };

  return (
    <Container className={$className}>
      <NaviRow>
        <Navigation $navigations={$navigations} />
      </NaviRow>

      <TitleRow>
        <div className="">
          <span className="initial">{$initial}</span>
          <span className="title">{$title}</span>
        </div>
        {!!$onClick && $navigations[1].name !== 'Project' && (
          <div className="">
            <TextIconButton40
              $iconType="confirm"
              $text="테스트하러 가기"
              $onClick={onClickTest}
              $isDisabled={!($btnInference.address && $btnInference.port)}
            />
          </div>
        )}
      </TitleRow>

      <DescriptionRow>
        <Description>
          <p>{$description}</p>
        </Description>

        <DateBox>
          <img src={calendar.src} alt="" />
          <span>
            Created :
            {' '}
            {$created}
          </span>
          {$updated && (
          <>
            <span className="bar" />
            <img src={calendarCheck.src} alt="" />
            <span>
              Updated :
              {' '}
              {$updated}
            </span>
          </>
          )}
        </DateBox>
      </DescriptionRow>

      <TagRow>
        <div>
          <DetailHashtag $content={$hashtag} $taskIcon={$hashtagIcon} />
        </div>

        <ButtonBox>
          {buttonType[$currentStep]}
          <TextIconButton32 $iconType="pencil" $buttonType="edit" $text="수정" $onClick={() => router.push(`/models/edit?modelId=${modelId}`)} />
          <TextIconButton32 $iconType="delete" $buttonType="delete" $text="삭제" $onClick={openModal} />
        </ButtonBox>
      </TagRow>

      {isOpenDeleteModal && (
      <Modal $contentType="delete" $confirmAction={() => deleteModel(Number(modelId))} $cancelAction={closeModal} />
      )}
    </Container>
  );
};
export default ModelDetailHeader;

const Container = styled.div`
  width: ${toRem(1516)};
`;

const NaviRow = styled.div`
  margin-bottom: ${toRem(50)};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${toRem(22)};
  
  & > div:first-child {
    display: flex;
    
    span.initial {
        height: ${toRem(36)};
        line-height: ${toRem(36)};
        color: #fff;
        font-size: ${toRem(18)};
        font-weight: 600;
        border-radius: ${toRem(5)};
        background-color: ${commonColors.navy900};
        display: inline-block;
        text-align: center;
        margin-right: ${toRem(12)};
        padding: 0 ${toRem(7)};
      }
      
      span.title {
        display: inline-block;
        width: ${toRem(1250)};
        font-size: ${toRem(34)};
        font-weight: 700;
        color: ${commonColors.navy900};
        vertical-align: sub;
        word-break: break-word;
      }
  }
  
  
`;
const DescriptionRow = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Description = styled.div`

    p {
      color: ${commonColors.neutral700};
      font-size: ${toRem(18)};
      width: ${toRem(450)};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-left: ${toRem(50)};
    }
`;

const DateBox = styled.div`
  color: ${commonColors.neutral600};
  font-weight: 500;
  font-size: ${toRem(20)};
  margin-bottom: ${toRem(22)};
  
    img {
      width: ${toRem(20)};
      height: ${toRem(20)};
      margin-right: ${toRem(4)};
    }
    
  span {
    vertical-align: top;
  }
  
  span.bar {
    display: inline-block;
    width: ${toRem(1)};
    height: ${toRem(18)};
    margin: 0 ${toRem(18)};
    background-color: ${commonColors.neutral600};
    vertical-align: inherit;
  }
`;
const TagRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonBox = styled.div`
  display: flex;
  gap: ${toRem(12)};
`;
