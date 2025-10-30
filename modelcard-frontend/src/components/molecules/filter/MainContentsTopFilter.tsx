import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import TextIconButton40 from '@/components/atoms/buttons/TextIconButton40';
import SelectBox from '@/components/atoms/selectbox/SelectBox';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import Input from '@/components/atoms/input/Input';
import IconTextButton42 from '@/components/atoms/buttons/IconTextButton42';
import { IMainContentsTopFilterProps } from '@/interfaces/mainContentsTopFilterInterfaces';
import { useModelStore } from '@/stores/model';
import { MODEL_STATES } from '@/constants/modelStates';

const MainContentsTopFilter = (props:IMainContentsTopFilterProps):React.ReactNode => {
  const { $contentsTitle, $contentsCount } = props;
  const { getParams, setParams, params } = useModelStore();

  const router = useRouter();
  const routeToAddModel = () => {
    router.push('/models/edit');
  };

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setParams({ ...getParams(), title: newVal ?? '', page: 1 });
  };

  return (
    <ContentsHeaderContainer>
      <ContentsHeaderTopContainer>
        <ContentsTitleContainer>
          <ContentsTitle>{$contentsTitle}</ContentsTitle>
          <ContentsCount>{$contentsCount}</ContentsCount>
        </ContentsTitleContainer>

        <InputContainer>
          <Input $isSearch $placeholder="모델명을 입력해주세요" $value={params.title} $onChangeValue={handleOnchange} />
        </InputContainer>
      </ContentsHeaderTopContainer>

      <ContentsHeaderBottomContainer>
        <ContentsHeaderBottomFilterContainer>
          <SelectBoxContainer>
            <SelectBox options={[
              { id: 0, name: '이름', value: 'name' },
              { id: 1, name: '최신 날짜순', value: 'updated_at' }, // updated
              { id: 2, name: '최신 작성순', value: 'created_at' }, // created
            ]}
            />
          </SelectBoxContainer>
          {/* 2차 개발 */}
          {/* <IconTextButton42 $text="내가 등록한 모델만 보기" $onClick={() => {}} /> */}
        </ContentsHeaderBottomFilterContainer>

        {(getParams().state === '' || getParams().state === MODEL_STATES.PROJECT) && (
          <TextIconButton40 $iconType="add" $text="모델 생성하기" $onClick={routeToAddModel} />
        )}
      </ContentsHeaderBottomContainer>
    </ContentsHeaderContainer>
  );
};

export default MainContentsTopFilter;

const ContentsHeaderContainer = styled.div`
    width: 100%;
    min-width: ${toRem(957)};
`;

const ContentsHeaderTopContainer = styled.div`
    width: 100%;
    margin-bottom: ${toRem(33)};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ContentsTitleContainer = styled.div`
`;

const ContentsTitle = styled.h2`
    display: inline-block;
    font-size: ${toRem(30)};
    font-weight: 700;
    line-height: ${toRem(36)};
    letter-spacing: -0.03em;
    color: ${commonColors.navy900};
`;

const ContentsCount = styled.span`
    margin-left: ${toRem(12)};
    font-size: ${toRem(20)};
    font-weight: 600;
    line-height: ${toRem(27)};
    letter-spacing: -0.03em;
    color: ${commonColors.neutral600};
`;

const InputContainer = styled.div`
    width: ${toRem(500)};
`;

const ContentsHeaderBottomContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const ContentsHeaderBottomFilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${toRem(12)};
`;

const SelectBoxContainer = styled.div`
    width: ${toRem(180)};
`;
