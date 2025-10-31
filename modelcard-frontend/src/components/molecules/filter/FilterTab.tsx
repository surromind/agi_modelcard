import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import commonColors from '@/constants/colors';
import { toRem } from '@/utils/styleUtil';
import TabButton from '@/components/atoms/buttons/TabButton';
import Input from '@/components/atoms/input/Input';
import TextIconButton40 from '@/components/atoms/buttons/TextIconButton40';
import FilterCheckboxListToggle from '@/components/atoms/FilterCheckboxListToggle';
import FilterCheckboxList from '@/components/atoms/FilterCheckboxList';
import { useFilterAllList } from '@/hooks/useFilterList';
import { useFilterStore } from '@/stores/filter';
import { FilterType } from '@/types/filterTypes';
import { useModelStore } from '@/stores/model';
import {
  IFilterListData, IFilterListItem, IFilterListToggleData,
} from '@/interfaces/filterInterfaces';

const FilterTab = (): React.ReactNode => {
  const { setParams, getParams, params: modelParams } = useModelStore();
  const { setFilterListCategory } = useFilterStore();
  const { filterListAllData } = useFilterAllList();

  const params = getParams();

  const [currentActiveTab, setCurrentActiveTab] = useState<FilterType>('model-types');
  const [inputValue, setInputValue] = useState('');

  const [taskList, setTaskList] = useState();
  const [frameworkList, setFrameworkList] = useState();
  const [licenseList, setLicenseList] = useState();

  const onClickTab = (menu: FilterType) => {
    setCurrentActiveTab(menu);

    setFilterListCategory(menu); // frameworks, licenses, model-types
  };

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchKeyword = e.target.value;
    setInputValue(searchKeyword);
  };

  const resetFilter = () => {
    setInputValue('');

    setParams({ ...getParams(), task: [] });
    setParams({ ...getParams(), framework: [] });
    setParams({ ...getParams(), license: [] });
  };

  useEffect(() => {
    if (!filterListAllData) return;

    setTaskList(filterListAllData.model);
    setFrameworkList(filterListAllData.framework);
    setLicenseList(filterListAllData.licenses);
  }, [filterListAllData]);

  useEffect(() => {
    setCurrentActiveTab('model-types');
    setFilterListCategory('model-types');
    setInputValue('');
  }, [modelParams.state]);

  useEffect(() => {
    if (!filterListAllData) return;

    const modelResult = filterListAllData?.model?.map((category: IFilterListToggleData) => (
      {
        ...category,
        task: category.task.filter(
          (item: IFilterListItem) => item.name.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      }
    ));
    setTaskList(modelResult);

    const licenseResult = filterListAllData?.licenses?.filter(
      (item: IFilterListData) => {
        if (item.name.toLowerCase()
          .includes(inputValue.toLowerCase())) {
          return item;
        }
        return undefined;
      },
    );
    setLicenseList(licenseResult);

    const frameworkResult = filterListAllData?.framework?.filter(
      (item: IFilterListData) => item.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFrameworkList(frameworkResult);
  }, [inputValue, filterListAllData]);

  const isResetBtnDisabled = (params.task.length === 0)
      && (params.framework.length === 0)
      && (params.license.length === 0);

  return (
    <Container>
      <TabBox>
        <TabButton
          $text="Model"
          $tabValue="model-types"
          $currentActiveTab={currentActiveTab}
          $onClick={() => onClickTab('model-types')}
        />
        <TabButton
          $text="Framework"
          $tabValue="frameworks"
          $currentActiveTab={currentActiveTab}
          $onClick={() => onClickTab('frameworks')}
        />
        <TabButton
          $text="License"
          $tabValue="licenses"
          $currentActiveTab={currentActiveTab}
          $onClick={() => onClickTab('licenses')}
        />
      </TabBox>
      <SearchRow>
        <Input
          $isSearch
          $placeholder="필터링할 검색어를 입력해주세요."
          $value={inputValue}
          $onChangeValue={onChangeInputValue}
          $isShowTextCount
          $textMaxLength={50}
        />
        <TextIconButton40 $iconType="reset" $text="초기화" $isDisabled={isResetBtnDisabled} $onClick={resetFilter} />
      </SearchRow>

      <div>
        {currentActiveTab === 'model-types' && (
          <FilterCheckboxListToggle
            $data={taskList ?? []}
            $taskItems={getParams().task}
            $setTaskItems={(items: number[]) => setParams({ ...getParams(), task: items, page: 1 })}
          />
        )}
        {currentActiveTab === 'frameworks' && (
          <FilterCheckboxList
            $data={frameworkList ?? []}
            $taskItems={getParams().framework}
            $setTaskItems={(items: number[]) => setParams({ ...getParams(), framework: items, page: 1 })}
          />
        )}
        {currentActiveTab === 'licenses' && (
          <FilterCheckboxList
            $data={licenseList ?? []}
            $taskItems={getParams().license}
            $setTaskItems={(items: number[]) => setParams({ ...getParams(), license: items, page: 1 })}
          />
        )}
      </div>
    </Container>
  );
};
export default FilterTab;

const Container = styled.div`
  width: ${toRem(473)};
  box-sizing: border-box;
  padding: ${toRem(26)} ${toRem(32)};
    background-color: ${commonColors.neutral200};
  border-radius: ${toRem(15)};
`;

const TabBox = styled.div`
  display: flex;
  border-radius:${toRem(6)};
  overflow: hidden;
  margin-bottom: ${toRem(26)};
`;

const SearchRow = styled.div`
  display: flex;
  gap: ${toRem(12)};
  margin-bottom: ${toRem(26)};
`;
