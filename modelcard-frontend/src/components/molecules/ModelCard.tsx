import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

import { toRem, modelCategoryIcon } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { IModelCardProps } from '@/interfaces/modelCardInterfaces';
import Hashtag from '@/components/atoms/hashtag/Hashtag';
import Badge from '@/components/atoms/badge/Badge';
import IconButton22 from '@/components/atoms/buttons/IconButton22';
import Modal from '@/components/atoms/Modal';
import { ModalTypes } from '@/types/modalTypes';
import { ApiGatewayURL } from '@/constants/urls';
import { ModelStep } from '@/types/commonTypes';
import useModels from '@/hooks/useModels';

const ModelCard = (props: IModelCardProps): React.ReactNode => {
  const {
    $initial, $id,
    $title,
    $description,
    $performance, $fileSize, $task, $taskIcon, $hashtag, $currentStep, $date, $performanceMetric, $fileUnit,
  } = props;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalContentType, setModalContentType] = useState<ModalTypes>('projectToStaging');

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const router = useRouter();

  const capitalText = (text: string) => {
    let capital = '';

    if (text) {
      capital = text.charAt(0).toUpperCase() + text.slice(1);
    }

    return capital;
  };

  const routeToDetail = () => {
    router.push(`/models/detail?modelId=${$id}`);
  };

  const [moveToStep, setMoveToStep] = useState<ModelStep>('MSSTAG');

  const searchParams = useSearchParams();
  const changeStepRouter = (id: number, nextStep: ModelStep) => {
    const params = new URLSearchParams(searchParams);

    params.set('modelId', id.toString());
    params.set('toStep', nextStep);

    const query = params.toString();

    router.push(`/models/edit/?${query}`);
  };

  // 현재 Project 단계인 경우
  const onClickNextStaging = () => {
    // 모달에 나올 내용
    setModalContentType('projectToStaging');
    setMoveToStep('MSSTAG'); // staging으로 MSPROJ, MSST, MSOPER
    setIsOpenModal(true);
  };

  // 현재 Staging 단계인 경우
  const onClickNextOperation = () => {
    // 모달에 나올 내용
    setModalContentType('stagingToOperation');
    setMoveToStep('MSOPER'); // operation으로
    setIsOpenModal(true);
  };
  const onClickPrevProject = () => {
    // 모달에 나올 내용
    setModalContentType('stagingToProject');
    setMoveToStep('MSPROJ'); // project로
    setIsOpenModal(true);
  };

  const onClickEdit = (id: number) => {
    router.push(`/models/edit?modelId=${id}`);
  };

  const onClickPrevSteps = () => {
    // 모달에 나올 내용
    setModalContentType('operation');
    setIsOpenModal(true);
  };
  const { refetchModels } = useModels();
  const deleteModel = async (id:number) => {
    // 삭제 api
    const result = await axios
      .delete(`${ApiGatewayURL}/models/${id}`).then((res) => {
        refetchModels();
        return res.data;
      }).catch((e) => {
        console.error(e);
      }).finally(() => {
        setIsOpenDeleteModal(false);
      });

    return result;
  };
  const onClickDelete = (e: React.MouseEvent<HTMLLIElement>) => {
    setIsOpenDeleteModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setIsOpenDeleteModal(false);
  };

  return (
    <Container>
      <Header role="presentation" onClick={routeToDetail}>
        <HeaderTitle>
          <span className="initial">{$initial}</span>
          <span className="title">{$title}</span>
        </HeaderTitle>
        <Description className="description">{$description}</Description>
      </Header>

      <Body>
        <ItemRow>
          <span>{`성능(${$performanceMetric || '-'})`}</span>
          <span>{$performance || '-'}</span>
        </ItemRow>
        <ItemRow>
          <span>{`파일크기(${$fileUnit || '-'})`}</span>
          <span>{$fileSize || '-'}</span>
        </ItemRow>

        <TaskRow>
          <img src={modelCategoryIcon($taskIcon)} alt="" />
          <span>{$task}</span>
        </TaskRow>

        <HashtagRow>
          <Hashtag $text={$hashtag?.framework} $type="framework" />
          {$hashtag?.license && (
            <Hashtag $text={$hashtag?.license} $type="license" />
          )}
        </HashtagRow>

        <BottomRow>
          <div>
            <span className="current">
              <Badge
                $badgeType={$currentStep}
                $height={`${toRem(31)}`}
                $text={capitalText($currentStep)}
                $isActivated
              />
            </span>
            <span className="date">{$date}</span>
          </div>

          <ul className="buttons">
            {$currentStep === 'project' && (
              <li
                onClick={onClickNextStaging}
                role="presentation"
              >
                <IconButton22 $iconType="next" />
              </li>
            )}

            {$currentStep === 'staging' && (
              <>
                <li
                  onClick={onClickPrevProject}
                  role="presentation"
                >
                  <IconButton22 $iconType="prev" />
                </li>
                <li
                  onClick={onClickNextOperation}
                  role="presentation"
                >
                  <IconButton22 $iconType="next" />
                </li>
              </>
            )}

            {$currentStep === 'operation' && (
              <li
                onClick={onClickPrevSteps}
                role="presentation"
              >
                <IconButton22 $iconType="prev" />
              </li>
            )}

            <li
              onClick={() => onClickEdit($id)}
              role="presentation"
            >
              <IconButton22 $iconType="pencil" />
            </li>
            <li
              onClick={(e: React.MouseEvent<HTMLLIElement>) => onClickDelete(e)}
              role="presentation"
            >
              <IconButton22 $iconType="delete" />
            </li>
          </ul>
        </BottomRow>
      </Body>

      {isOpenModal && (
        <Modal
          $contentType={modalContentType}
          $confirmAction={() => changeStepRouter($id, moveToStep)}
          $cancelAction={closeModal}
          $setMoveToStep={(step: ModelStep) => setMoveToStep(step)}
        />
      )}

      {isOpenDeleteModal && (
        <Modal $contentType="delete" $confirmAction={() => deleteModel($id)} $cancelAction={closeModal} />
      )}
    </Container>
  );
};
export default ModelCard;

const Container = styled.div`
  width: ${toRem(468)};
  height: ${toRem(402)};
  border: ${toRem(1)} solid ${commonColors.neutral500};
  border-radius: ${toRem(10)};
  background: ${commonColors.neutral50};
  box-sizing: border-box;
 
`;

const Header = styled.div`
  height: ${toRem(160)};
  padding: ${toRem(30)};
  border-bottom: ${toRem(1)} solid ${commonColors.neutral400};
  box-sizing: border-box;
  cursor: pointer;
`;

const HeaderTitle = styled.div`
  display: flex;
  gap: ${toRem(16)};
  font-weight: 600;
  margin-bottom: ${toRem(20)};
  
  .initial {
    width: ${toRem(60)};
    height: ${toRem(60)};
    line-height: ${toRem(60)};
    background-color: ${commonColors.navy900};
    display: inline-block;
    border-radius: ${toRem(5)};
    text-align: center;
    
    font-size: ${toRem(28)};
    color: ${commonColors.neutral50};
  }
  
  .title {
    width: ${toRem(332)};
    font-size: ${toRem(22)};
    line-height: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: ${commonColors.navy900};
    word-break: break-word;
  }
`;

const Description = styled.p`
  width: ${toRem(408)};
  height: ${toRem(20)};
  font-size: ${toRem(16)};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${commonColors.neutral700};
`;

const Body = styled.div`
  padding: ${toRem(26)} ${toRem(30)} ${toRem(20)};
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  height: ${toRem(24)};
  margin-bottom: ${toRem(6)};
  
  & > span:first-child {
    font-size: ${toRem(16)};
    color: ${commonColors.neutral700};
  }
  
  & > span:last-child {
    font-size: ${toRem(20)};
    font-weight: 600;
    color: ${commonColors.neutral900};
  }
`;

const TaskRow = styled.div`
  display: flex;
  gap: ${toRem(5)};
  margin: ${toRem(20)} 0 ${toRem(16)};
  
  img {
    width: ${toRem(20)};
    height: ${toRem(20)};
    margin-top: ${toRem(-2)};
  }
  
  span {
    color: ${commonColors.neutral700};
    font-size: ${toRem(16)};
    font-weight: 500;
  }
`;

const HashtagRow = styled.div`
  display: flex;
  gap: ${toRem(6)};
  margin-bottom: ${toRem(16)};
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  
  & > div:first-child {
    display: flex;
    align-items: center;
    gap: ${toRem(12)};
    
    .current {
      margin-right: ${12};
    }
    
    .date {
      font-size: ${toRem(16)};
      color: ${commonColors.neutral600};
    }
  }
  
  & > ul.buttons {
    padding: 0;
    margin: 0;
    display: flex;
    gap: ${toRem(24)};
    
    li {
      list-style: none;
      margin-top: ${toRem(5)};
    }
  }
`;
