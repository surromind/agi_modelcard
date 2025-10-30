'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';

import { toRem } from '@/utils/styleUtil';
import ModelAddHeader from '@/components/molecules/ContentHeaders/ModelAddHeader';
import ModelInfoForm from '@/components/molecules/form/ModelInfoForm';
import LevelFormInfoBox from '@/components/atoms/info/LevelFormInfoBox';
import useModel from '@/hooks/useModel';
import { MODEL_STATES } from '@/constants/modelStates';
import { commonUtils } from '@/utils/common';

const ModelsEditClient = ():React.ReactNode => {
  const searchParams = useSearchParams();
  const modelId = searchParams.get('modelId');
  const toStep = searchParams.get('toStep');
  const { getStateName } = commonUtils;
  const { modelInfo, isFetching } = useModel();

  const modelCreateNavigation = [{ name: 'Models', url: '/home' }, { name: '모델 생성', url: '/models/edit' }];
  const modelEditNavigation = [
    { name: 'Models', url: '/home' },
    { name: `${getStateName(modelInfo?.state_code)}`, url: '/home' },
    { name: `${modelInfo?.name}`, url: `/models/detail?modelId=${modelId}` },
    { name: '모델 수정', url: `/models/edit?modelId=${modelId}` },

  ];
  const modelEditStepNavigation = [
    { name: 'Models', url: '/home' },
    { name: `${getStateName(modelInfo?.state_code)}`, url: '/home' },
    { name: `${modelInfo?.name}`, url: `/models/detail?modelId=${modelId}` },
    { name: '단계 변경', url: `/models/edit?modelId=${modelId}&toStep=${toStep}` },
  ];

  const [isEdit, setIsEdit] = useState(false);
  const [isEditStep, setIsEditStep] = useState(false);
  const [modelState, setModelState] = useState(MODEL_STATES.PROJECT);
  const [modelNavigation, setModelNavigation] = useState(modelCreateNavigation);

  /**
     * @description params의 유무에 따라 생성/ 수정 페이지 구분
     */
  useEffect(() => {
    if (modelId && !toStep && modelInfo) {
      setIsEdit(true);
      setModelState(modelInfo?.state_code);
      setModelNavigation(modelEditNavigation);
    }

    // 업그레이드 할 step params
    if (modelId && toStep) {
      setIsEdit(true);
      setIsEditStep(true);
      setModelState(toStep);
      setModelNavigation(modelEditStepNavigation);
    }
  }, [modelId, toStep, modelInfo]);

  return (
    <ModelsEditContainer>
      { !isFetching
          && (
            <>
              <ModelAddHeaderContainer>
                <ModelAddHeader $navigations={modelNavigation} $step={modelState} $isEdit={isEdit} $isEditStep={isEditStep} />
              </ModelAddHeaderContainer>
              <LevelFormInfoBoxContainer>
                {
              isEditStep && modelState !== MODEL_STATES.PROJECT ? <LevelFormInfoBox $infoType={modelState} /> : null
          }
              </LevelFormInfoBoxContainer>

              <Body>
                {
                    !isFetching ? (
                      <ModelInfoForm
                        $contentType={modelState}
                        $isEdit={isEdit}
                        $isEditStep={isEditStep}
                        $modelInfo={modelInfo}
                        $toStep={toStep ?? ''}
                      />
                    ) : null
                }
              </Body>
            </>
          )}
    </ModelsEditContainer>
  );
};

export default ModelsEditClient;

const ModelsEditContainer = styled.div`
    margin: 0 auto;
    width: ${toRem(1000)};
`;

const ModelAddHeaderContainer = styled.div`
  padding: ${toRem(50)} 0;
`;

const Body = styled.div`
  margin-bottom: ${toRem(100)};
`;

const LevelFormInfoBoxContainer = styled.div`
    margin-bottom: ${toRem(30)};
`;
