'use client';

import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Pagination } from 'antd';

import MainContentsTopFilter from '@/components/molecules/filter/MainContentsTopFilter';
import ModelCard from '@/components/molecules/ModelCard';
import { toRem } from '@/utils/styleUtil';
import { IModelCard } from '@/interfaces/modelCardInterfaces';
import { TaskIcon } from '@/types/modelCardTypes';
import { useModelStore } from '@/stores/model';
import useModels from '@/hooks/useModels';
import commonColors from '@/constants/colors';

const MainClient = ():React.ReactNode => {
  const mainTitle = 'Models';

  const { params, getParams, setParams } = useModelStore();
  const { modelList } = useModels();

  const handleOnChangePage = (page: number) => {
    setParams({ ...getParams(), page });
  };

  return (
    <div>
      <MainContentsTopFilterContainer>
        <MainContentsTopFilter $contentsTitle={mainTitle} $contentsCount={params?.total} />
      </MainContentsTopFilterContainer>
      { modelList && modelList.length > 0
        ? (
          <ModelCardContainer>
            {modelList?.map((modelCard: IModelCard) => (
              <ModelCard
                key={modelCard.id}
                $id={modelCard.id}
                $initial={modelCard.task.abbreviation}
                $title={modelCard.name}
                $description={modelCard.description}
                $performance={modelCard.performance_score?.toString()}
                $performanceMetric={modelCard.performance_metric}
                $fileSize={modelCard.file_size?.toString()}
                $fileUnit={modelCard.file_unit}
                $task={`${modelCard.model_type.name} > ${modelCard.task.name}`}
                $taskIcon={modelCard.model_type.name as TaskIcon}
                $hashtag={{ framework: modelCard?.framework?.name, license: modelCard?.license?.name }}
                $currentStep={modelCard.state_name}
                $date={dayjs(modelCard.updated_at).format('MMM DD, YYYY')}
              />
            ))}
          </ModelCardContainer>
        ) : <EmptyList>등록된 모델이 없습니다.</EmptyList>}
      <PaginationContainer>
        <Pagination
          current={params?.page}
          total={params?.total}
          pageSize={10}
          hideOnSinglePage
          onChange={handleOnChangePage}
        />
      </PaginationContainer>
    </div>
  );
};

export default MainClient;

const MainContentsTopFilterContainer = styled.div`
  margin-bottom: ${toRem(33)};
`;

const ModelCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${toRem(20)};
  margin-bottom: ${toRem(50)};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: ${toRem(50)};
  font-weight: 500;
  
  .ant-pagination-item {
    font-size: ${toRem(14)};
    color: ${commonColors.navy900};
    border: none;
    line-height: ${toRem(32)};
  }
  
  .ant-pagination-item-active {
    background-color: ${commonColors.navy700};
    color: ${commonColors.neutral50};
    
    &:hover {
      color: ${commonColors.neutral50};

      a {
        color: ${commonColors.neutral50};
      }
    }

    a {
      color: ${commonColors.neutral50}; 
    }
  }
  
  .ant-pagination-options {
    display: none;
  }
`;

const EmptyList = styled.div`
    width: 100%;
    height: calc(100vh - ${toRem(400)});
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${toRem(20)};
    font-weight: 500;
    line-height: ${toRem(27)};
    letter-spacing: -0.03em;
    color: ${commonColors.neutral500};
`;
