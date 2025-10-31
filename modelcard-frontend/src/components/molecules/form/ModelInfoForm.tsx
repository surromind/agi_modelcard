'use client';

import React, { useEffect, useState } from 'react';
import {
  Controller, SubmitHandler, useForm,
} from 'react-hook-form';
import styled from 'styled-components';

import ModelFormInput from '@/components/atoms/input/ModelFormInput';
import ModelFormSelectBox from '@/components/atoms/selectbox/ModelFormSelectBox';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { IModelInfoForm, IModelInfoFormProps } from '@/interfaces/modelInfoFormInterfaces';
import {
  IFrameworkOption,
  ILicensesOption,
  IModelTypeSelectOption,
  ITaskSelectOption,
} from '@/interfaces/selectInterfaces';
import useModelEdit from '@/hooks/useModelEdit';
import { MODEL_STATES } from '@/constants/modelStates';
import { formValidation } from '@/utils/formValidation';
import { commonUtils } from '@/utils/common';
import useCategories from '@/hooks/useCategories';

const ModelInfoForm = (props:IModelInfoFormProps):React.ReactNode => {
  const {
    $contentType, $isEdit, $isEditStep, $modelInfo, $toStep,
  } = props;
  const {
    isBlank, isValidNum, isValidSel, isValidSurroLink, getStateName,
  } = commonUtils;
  const { validationErrorMsg } = formValidation;

  const {
    handleSubmit, control, formState: { errors, isValid }, setError, clearErrors, watch, setValue,
  } = useForm<IModelInfoForm>();

  const { updateModel, createModel } = useModelEdit();
  const { categories: selectBoxOptions } = useCategories();

  // 수정 단계 체크
  const isEdit = $isEdit && !$isEditStep;

  // 단계 변경 단계 체크
  const isEditStep = $isEdit && $isEditStep;

  /**
     * @description 단계 변경, 수정, 생성 단계에 맞는 gitUrl Validation State 값 리턴
     */
  const gitUrlValidationStateName = () => {
    if (!$isEdit) {
      return 'Project';
    }

    if (isEdit) {
      return getStateName($modelInfo?.state_code);
    }

    if (isEditStep && $toStep) {
      return getStateName($toStep);
    }

    return 'Project';
  };

  /**
     * @description 단계 변경, 수정, 생성 단계에 맞는 버튼 Text 리턴
     */
  const getBtnText = ():string => {
    if (isEdit) {
      return '수정 완료';
    }
    if (isEditStep) {
      return '단계 변경';
    }
    return '등록하기';
  };

  // Select Box 설정 관련 로직
  const [licensesOptions, setLicensesOptions] = useState<ILicensesOption[]>();
  const [frameworkOptions, setFrameworkOptions] = useState<IFrameworkOption[]>();
  const [modelsOptions, setModelsOptions] = useState<IModelTypeSelectOption[]>();
  const [taskOptions, setTaskOptions] = useState<ITaskSelectOption[]>();

  const setSelectBoxOptions = () => {
    if (selectBoxOptions) {
      setLicensesOptions(selectBoxOptions?.licenses);
      setFrameworkOptions(selectBoxOptions?.framework);
      setModelsOptions(selectBoxOptions?.model);
    }
  };

  useEffect(() => {
    setSelectBoxOptions();
  }, [selectBoxOptions]);

  const watchModelTypeId = watch('model_type_id');

  useEffect(() => {
    if (modelsOptions) {
      setTaskOptions(
        modelsOptions?.find((modelOption:IModelTypeSelectOption) => modelOption.id === Number(watchModelTypeId))?.task,
      );
    }
  }, [watchModelTypeId, modelsOptions]);

  const performanceScoreValidation = () => {
    const watchModelTypePerformanceScore = watch('performance_score');

    if (!watchModelTypePerformanceScore) {
      setError('performance_score', {
        message: validationErrorMsg('performance_score'),
      });
    } else {
      clearErrors('performance_score');
    }
  };

  const performanceMetricValidation = () => {
    const watchModelTypePerformanceMetric = watch('performance_metric');

    if (!watchModelTypePerformanceMetric) {
      setError('performance_metric', {
        message: validationErrorMsg('performance_metric'),
      });
    } else {
      clearErrors('performance_metric');
    }
  };

  /**
     * @description 성능, 지표 중 입력된 값이 있는지 체크
     */
  const performanceHasValueLength = () => {
    const watchPerformance = watch(['performance_score', 'performance_metric']);
    const hasValue = watchPerformance.filter((value) => value);

    return hasValue.length;
  };

  const onBlurPerformanceValidation = () => {
    if ($contentType !== MODEL_STATES.PROJECT || performanceHasValueLength() > 0) {
      performanceScoreValidation();
      performanceMetricValidation();
    } else {
      clearErrors(['performance_score', 'performance_metric']);
    }
  };

  // Form Validation & 값 세팅 관련 로직
  const onBlurIsEmptyValidation = (
    e:React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    formName:keyof IModelInfoForm,
    state = '',
  ) => {
    const inputValue = e.target.value ? e.target.value : '';

    if (isBlank(inputValue)) {
      setError(formName, {
        message: validationErrorMsg(formName, state),
      });
    } else {
      clearErrors(formName);
    }
  };

  const onBlurIsNumberValidation = (
    e:React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    formName:keyof IModelInfoForm,
    state = '',
  ) => {
    const inputValue = e.target.value;

    if (!isValidNum(inputValue)) {
      setError(formName, {
        message: validationErrorMsg(formName, state),
      });
      setValue(formName, inputValue.replace(/[^\d.]/g, ''));
    } else {
      clearErrors(formName);
    }
  };

  const onBlurIsSelectValidation = (
    e:React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    formName:keyof IModelInfoForm,
  ) => {
    const inputValue = e.target.value;

    if (!isValidSel(inputValue)) {
      setError(formName, {
        message: validationErrorMsg(formName),
      });
    } else {
      clearErrors(formName);
    }
  };

  const onBlurIsLinkValidation = (
    e:React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    formName:keyof IModelInfoForm,
    state = '',
  ) => {
    const inputValue = e.target.value;

    if (!isValidSurroLink(inputValue)) {
      setError(formName, {
        message: validationErrorMsg(formName, state),
      });
    } else {
      clearErrors(formName);
    }
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const watchAll = watch(['name', 'description', 'performance_score',
    'performance_metric', 'size', 'model_type_id', 'task_id', 'framework_id', 'license_id', 'git_url']);

  useEffect(() => {
    if (isEdit && Object.keys(errors).length < 1) {
      setIsDisabled(false);
    } else if (!isEdit && Object.keys(errors).length < 1 && isValid) {
      setIsDisabled(false);
    } else if (isEditStep && Object.keys(errors).length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(true);
    }
  }, [$isEdit, isValid, errors, isValid, watchAll]);

  /**
     * @description 모델 수정 페이지 진입시 값 설정
     */
  const setModelInfo = () => {
    if ($modelInfo && selectBoxOptions) {
      setValue('name', $modelInfo?.name);
      setValue('description', $modelInfo?.description);
      setValue('performance_score', $modelInfo?.performance_score || '');
      setValue('performance_metric', $modelInfo?.performance_metric);
      setValue('size', $modelInfo?.size || '');
      setValue('model_type_id', $modelInfo?.model_type?.id);
      setValue('task_id', $modelInfo?.task?.id);
      setValue('framework_id', $modelInfo?.framework?.id);
      setValue('license_id', $modelInfo?.license?.id);

      if (isEditStep) {
        setValue('git_url', '');
      } else {
        setValue('git_url', $modelInfo?.git_url);
      }
    }
  };

  useEffect(() => {
    if ($isEdit && $modelInfo && selectBoxOptions) {
      setModelInfo();
    }
  }, [$modelInfo, selectBoxOptions]);

  const onSubmit: SubmitHandler<IModelInfoForm> = (data) => (
    $isEdit ? updateModel(data, $contentType) : createModel(data));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModelInfoFormWrapper>
        <FormTitleWrapper>
          <FormTitle>
            기본정보
          </FormTitle>
          <FormSubTitle>
            기본 정보를 빠짐 없이 모두 입력해주세요.
          </FormSubTitle>
        </FormTitleWrapper>

        <FormContents>
          <FormRow $isRequired>
            <label>모델명</label>
            <ControllerContainer>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{
                  required: validationErrorMsg('name'),
                  onBlur: (e) => {
                    onBlurIsEmptyValidation(e, 'name');
                  },
                }}
                render={({ field }) => (
                  <ModelFormInput
                    {...field}
                    $isTextCount
                    $textMaxLength={50}
                    $isError={!!errors?.name?.message}
                    $placeholder="ex) 모델 이름 - (레이어 수 or 파라미터 수, 생략가능)_Dataset"
                  />
                )}
              />
              { errors?.name?.message ? <p>{errors?.name?.message}</p> : null }
            </ControllerContainer>
          </FormRow>

          <FormRow $isRequired>
            <label>한줄설명</label>
            <ControllerContainer>
              <Controller
                name="description"
                control={control}
                defaultValue=""
                rules={{
                  required: validationErrorMsg('description'),
                  onBlur: (e) => {
                    onBlurIsEmptyValidation(e, 'description');
                  },
                }}
                render={({ field }) => (
                  <ModelFormInput
                    {...field}
                    $isTextCount
                    $textMaxLength={40}
                    $isError={!!errors?.description?.message}
                    $placeholder="한 줄 설명을 입력해주세요."
                  />
                )}
              />
              { errors?.description?.message ? <p>{errors?.description?.message}</p> : null }
            </ControllerContainer>
          </FormRow>

          <FormRow $isRequired={$contentType !== MODEL_STATES.PROJECT}>
            <label>성능</label>
            <ModelFormPerformanceInput>
              <ControllerContainer style={{ width: '100%' }}>
                <Controller
                  name="performance_score"
                  control={control}
                  defaultValue={'' as unknown as number}
                  rules={$contentType !== MODEL_STATES.PROJECT ? {
                    required: validationErrorMsg('performance_score'),
                    onBlur: (e) => {
                      onBlurIsEmptyValidation(e, 'performance_score');
                      onBlurIsNumberValidation(e, 'performance_score');
                      onBlurPerformanceValidation();
                    },
                    onChange: (e) => {
                      onBlurIsEmptyValidation(e, 'performance_score');
                      onBlurIsNumberValidation(e, 'performance_score');
                      onBlurPerformanceValidation();
                    },
                  } : {
                    onBlur: (e) => {
                      if (performanceHasValueLength() > 0) {
                        onBlurIsEmptyValidation(e, 'performance_score');
                        onBlurIsNumberValidation(e, 'performance_score');
                        onBlurPerformanceValidation();
                      } else {
                        clearErrors(['performance_metric', 'performance_score']);
                      }
                    },
                    onChange: (e) => {
                      if (performanceHasValueLength() > 0) {
                        onBlurIsEmptyValidation(e, 'performance_score');
                        onBlurIsNumberValidation(e, 'performance_score');
                        onBlurPerformanceValidation();
                      } else {
                        clearErrors(['performance_metric', 'performance_score']);
                      }
                    },
                  }}
                  render={({ field }) => (
                    <div style={{ width: '100%' }}>
                      <ModelFormInput
                        {...field}
                        $textMaxLength={14}
                        $onChangeValue={(e) => field.onChange(String(e.target.value))}
                        $isError={!!errors?.performance_score?.message}
                        $placeholder="성능 값을 숫자로 입력해주세요."
                      />
                    </div>
                  )}
                />
                { errors?.performance_score?.message ? <p>{errors?.performance_score?.message}</p> : null }
              </ControllerContainer>
              <ControllerContainer>
                <Controller
                  name="performance_metric"
                  control={control}
                  defaultValue=""
                  rules={$contentType !== MODEL_STATES.PROJECT ? {
                    required: validationErrorMsg('performance_metric'),
                    onBlur: (e) => {
                      onBlurPerformanceValidation();
                      onBlurIsEmptyValidation(e, 'performance_metric');
                    },
                  } : {
                    onBlur: (e) => {
                      if (performanceHasValueLength() > 0) {
                        onBlurPerformanceValidation();
                        onBlurIsEmptyValidation(e, 'performance_metric');
                      } else {
                        clearErrors(['performance_metric', 'performance_score']);
                      }
                    },
                  }}
                  render={({ field }) => (
                    <div style={{ width: toRem(200) }}>
                      <ModelFormInput
                        {...field}
                        $textMaxLength={30}
                        $isError={!!errors?.performance_metric?.message}
                        $placeholder="지표 값을 입력해주세요."
                      />
                    </div>
                  )}
                />
                { errors?.performance_metric?.message ? <p>{errors?.performance_metric?.message}</p> : null }
              </ControllerContainer>
            </ModelFormPerformanceInput>
          </FormRow>

          <FormRow $isRequired={$contentType !== MODEL_STATES.PROJECT}>
            <label>파일 크기</label>
            <ControllerContainer>
              <Controller
                name="size"
                control={control}
                defaultValue={'' as unknown as number}
                rules={$contentType !== MODEL_STATES.PROJECT ? {
                  required: validationErrorMsg('size'),
                  onBlur: (e) => {
                    onBlurIsNumberValidation(e, 'size');
                    onBlurIsEmptyValidation(e, 'size');
                  },
                  onChange: (e) => {
                    onBlurIsNumberValidation(e, 'size');
                  },
                } : {
                  onBlur: (e) => {
                    if (e.target.value && String(e.target.value).length > 0) {
                      onBlurIsNumberValidation(e, 'size');
                      onBlurIsEmptyValidation(e, 'size');
                    } else {
                      clearErrors('size');
                    }
                  },
                  onChange: (e) => {
                    if (e.target.value && String(e.target.value).length > 0) {
                      onBlurIsNumberValidation(e, 'size');
                    } else {
                      clearErrors('size');
                    }
                  },
                }}
                render={({ field }) => (
                  <ModelFormInput
                    {...field}
                    $textMaxLength={15}
                    $onChangeValue={(e) => field.onChange(String(e.target.value))}
                    $isError={!!errors?.size?.message}
                    $placeholder="Weight 모델 파일의 크기(Byte 기준)를 숫자로 입력하세요."
                  />
                )}
              />
              { errors?.size?.message ? <p>{errors?.size?.message}</p> : null }
            </ControllerContainer>
          </FormRow>

          <FormRow $isRequired>
            <label>분야</label>
            <ControllerContainer>
              <Controller
                name="model_type_id"
                control={control}
                defaultValue={0}
                rules={{
                  required: validationErrorMsg('model_type_id'),
                  onBlur: (e) => {
                    onBlurIsSelectValidation(e, 'model_type_id');
                  },
                }}
                render={({ field }) => (
                  <ModelFormSelectBox
                    {...field}
                    $labelName="model_type_id"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    options={modelsOptions || []}
                    $isError={!!errors?.model_type_id?.message}
                  />
                )}
              />
              { errors?.model_type_id?.message ? <p>{errors?.model_type_id?.message}</p> : null }
            </ControllerContainer>
          </FormRow>

          <FormRow $isRequired>
            <label>작업</label>
            <ControllerContainer>
              <Controller
                name="task_id"
                control={control}
                defaultValue={0}
                rules={{
                  required: validationErrorMsg('task_id'),
                  onBlur: (e) => {
                    onBlurIsSelectValidation(e, 'task_id');
                  },
                }}
                render={({ field }) => (
                  <ModelFormSelectBox
                    {...field}
                    $labelName="task_id"
                    options={taskOptions || []}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    $isError={!!errors?.task_id?.message}
                  />
                )}
              />
              { errors?.task_id?.message ? <p>{errors?.task_id?.message}</p> : null }
            </ControllerContainer>
          </FormRow>

          <FormRow $isRequired>
            <label>프레임워크</label>
            <ControllerContainer>
              <Controller
                name="framework_id"
                control={control}
                defaultValue={0}
                rules={{
                  required: validationErrorMsg('framework_id'),
                  onBlur: (e) => {
                    onBlurIsSelectValidation(e, 'framework_id');
                  },
                }}
                render={({ field }) => (
                  <ModelFormSelectBox
                    {...field}
                    $labelName="framework_id"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    $isError={!!errors?.framework_id?.message}
                    options={frameworkOptions || []}
                  />
                )}
              />
              { errors?.framework_id?.message ? <p>{errors?.framework_id?.message}</p> : null }
            </ControllerContainer>
          </FormRow>

          <FormRow $isRequired={$contentType === MODEL_STATES.OPERATING}>
            <label>라이센스</label>
            <ControllerContainer>
              <Controller
                name="license_id"
                control={control}
                defaultValue={0}
                rules={$contentType === MODEL_STATES.OPERATING ? {
                  required: validationErrorMsg('license_id'),
                  onBlur: (e) => {
                    onBlurIsSelectValidation(e, 'license_id');
                  },
                } : {}}
                render={({ field }) => (
                  <ModelFormSelectBox
                    {...field}
                    $labelName="license_id"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    $isError={!!errors?.license_id?.message}
                    options={licensesOptions || []}
                  />
                )}
              />
              { errors?.license_id?.message ? <p>{errors?.license_id?.message}</p> : null }
            </ControllerContainer>
          </FormRow>

          <FormRow $isRequired>
            <label>gitlab 링크</label>
            <ControllerContainer>
              <Controller
                name="git_url"
                control={control}
                defaultValue=""
                rules={{
                  required: validationErrorMsg('git_url', gitUrlValidationStateName()),
                  onBlur: (e) => {
                    onBlurIsEmptyValidation(e, 'git_url', gitUrlValidationStateName());
                    onBlurIsLinkValidation(e, 'git_url', gitUrlValidationStateName());
                  },
                }}
                render={({ field }) => (
                  <ModelFormInput
                    {...field}
                    $isError={!!errors?.git_url?.message}
                    $placeholder={`${gitUrlValidationStateName()} Repository gitlab 링크를 첨부해주세요.`}
                  />
                )}
              />
              { errors?.git_url?.message ? <p>{errors?.git_url?.message}</p> : null }
            </ControllerContainer>
          </FormRow>
        </FormContents>
      </ModelInfoFormWrapper>
      <FormSubmitBtnContainer>
        <FormSubmit type="submit" value={getBtnText()} disabled={isDisabled} />
      </FormSubmitBtnContainer>
    </form>
  );
};

export default ModelInfoForm;

const ModelInfoFormWrapper = styled.div`
    width: 100%;
    min-width: ${toRem(1000)};
    border-radius: ${toRem(15)};
    padding: ${toRem(26)} ${toRem(32)} ${toRem(30)};
    background: ${commonColors.neutral200};
    margin-bottom: ${toRem(30)};
    box-sizing: border-box;
`;

const FormTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${toRem(12)};
    letter-spacing: -0.03em;
    margin-bottom: ${toRem(26)};
`;

const FormTitle = styled.h2`
    font-size: ${toRem(22)};
    font-weight: 700;
    line-height: ${toRem(30)};
    color: ${commonColors.neutral800};
`;

const FormSubTitle = styled.p`
    font-size: ${toRem(16)};
    font-weight: 500;
    line-height: ${toRem(22)};
    color: ${commonColors.neutral600};
`;

const FormContents = styled.div`
    padding: ${toRem(30)};
    border-radius: ${toRem(10)};
    background: ${commonColors.neutral50};
`;

const FormRow = styled.div<{ $isRequired?: boolean }>`
    display: flex;
    align-items: center;
    gap: ${toRem(20)};
    margin-bottom: ${toRem(30)};

    &:last-child {
        margin-bottom: 0;
    }
    
    > label {
        width: ${toRem(150)};
        font-size: ${toRem(16)};
        font-weight: 700;
        line-height: ${toRem(22)};
        letter-spacing: -0.03em;
        
        &::after {
           display: ${({ $isRequired }) => ($isRequired ? 'inline-block' : 'none')};
           content: '*';
           margin-left: ${toRem(5)};
           color: ${commonColors.red500};
        }
    }
    
    > div {
        width: 100%;
    }
`;

const FormSubmitBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ModelFormPerformanceInput = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: ${toRem(20)};
`;

const FormSubmit = styled.input<{ disabled:boolean }>`
    width: ${toRem(114)};
    height: ${toRem(40)};
    padding-left: ${toRem(18)};
    border-radius: ${toRem(5)};
    border: none;
    background: url("/images/atoms/icCheckWhite.svg");
    background-color: ${({ disabled }) => (disabled ? commonColors.neutral400 : commonColors.navy900)};
    background-repeat : no-repeat;
    background-position: center right 15px;
    color: ${commonColors.neutral50};
    font-size: ${toRem(15)};
    font-weight: 700;
    line-height: ${toRem(21)};
    letter-spacing: -0.03em;
    text-align: left;
    box-sizing: border-box;
`;

const ControllerContainer = styled.div`
    
    > p {
        margin-top: ${toRem(12)};
        font-size: ${toRem(14)};
        font-weight: 500;
        line-height: ${toRem(19)};
        letter-spacing: -0.03em;
        color: ${commonColors.red500};
    }
`;
