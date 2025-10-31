import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

import ModelDetailHeader from '@/components/molecules/ContentHeaders/ModelDetailHeader';
import commonColors from '@/constants/colors';
import { toRem } from '@/utils/styleUtil';
import loading from '@/assets/images/loading.gif';
import icLink from '@/assets/images/atoms/icLink.svg';
import useModel from '@/hooks/useModel';
import { commonUtils } from '@/utils/common';

const ModelDetailClient = (): React.ReactNode => {
  const searchParams = useSearchParams();
  const modelId = searchParams.get('modelId');
  const { getStateName } = commonUtils;
  const { modelInfo: modelDetail, isLoading } = useModel();

  const modelStateCode = modelDetail?.state_code;
  const modelName = modelDetail?.name;
  const modelInference = modelDetail?.inference;

  const modelDetailNavigation = [
    { name: 'Models', url: '/home' },
    { name: `${getStateName(modelStateCode)}`, url: '/home' },
    { name: `${modelName}`, url: `/models/detail?modelId=${modelId}` },
  ];

  const getInferenceUrl = (address:string, port:number) => `http://${address}:${port}`;

  if (isEmpty(modelId)) {
    throw Error('modelId is required');
  }

  if (isLoading) {
    return (
      <Loading>
        <img src={loading.src} alt="" />
      </Loading>
    );
  }
  if (isEmpty(modelDetail)) {
    return <div>잘못된 호출</div>;
  }

  return (
    <Container>
      <Content>
        <Header>
          <ModelDetailHeader
            $created={dayjs(modelDetail.created_at).format('YYYY-MM-DD')}
            $currentStep={modelDetail.state_name}
            $description={modelDetail.description}
            $hashtag={{
              framework: modelDetail?.framework?.name,
              license: modelDetail?.license?.name,
              task: `${modelDetail?.model_type?.name} > ${modelDetail?.task?.name}`,
            }}
            $hashtagIcon="computerVision"
            $initial={modelDetail.task.abbreviation}
            $navigations={modelDetailNavigation}
            $onClick={() => window.open(getInferenceUrl(modelInference.address, modelInference.port))}
            $btnInference={modelInference}
            $title={modelDetail.name}
            $updated={dayjs(modelDetail.updated_at).format('YYYY-MM-DD')}
          />
        </Header>

        <Body>
          <Title>Readme</Title>
          <div className="bodyContent">
            <div className="gitUrl">
              <div className="title">
                <img src={icLink.src} alt="" />
                <span>gitlab 링크</span>
              </div>
              <a className="url" href={modelDetail.git_url} target="_blank" rel="noreferrer">{modelDetail.git_url}</a>
            </div>
            <div className="readmeContent" dangerouslySetInnerHTML={{ __html: modelDetail?.document }} />
          </div>
        </Body>
      </Content>
    </Container>
  );
};

export default ModelDetailClient;

const Loading = styled.div`
  width: 100%;
  height: calc(100vh - ${toRem(72)});
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: ${commonColors.neutral100};
  height: 100vh;
`;

const Content = styled.div`
  width: ${toRem(1520)};
  margin: 0 auto;
  padding-bottom: ${toRem(100)};
`;
const Header = styled.div`
  padding: ${toRem(50)} 0;
`;

const Body = styled.div`
  padding: ${toRem(26)} ${toRem(32)};
  margin-bottom: ${toRem(100)};
  border-radius: ${toRem(10)};
  background-color: ${commonColors.neutral200};

  .bodyContent {
    background-color: ${commonColors.neutral50};
    border-radius: ${toRem(10)};
    padding: ${toRem(30)};

    .gitUrl {
      display: flex;
      gap: ${toRem(95)};
      background-color: ${commonColors.neutral200};
      padding: ${toRem(30)};
      border-radius: ${toRem(6)};
      line-height: ${toRem(22)};

      .title {
        display: flex;
        gap: ${toRem(10)};

        img {
          width: ${toRem(20)};
          height: ${toRem(20)};
          margin-top: ${toRem(3)};
        }

        span {
          color:${commonColors.neutral700};
          font-weight: 600;
        }
      }

      .url {
        color: ${commonColors.blue500};
        font-weight: 500;
        text-decoration: underline;
      }
    }
  }

  .readmeContent {
    font-size: ${toRem(16)};
    line-height: 1.5;
    word-wrap: break-word;
    border-radius: ${toRem(6)};
    padding: ${toRem(26)} 0 ${toRem(30)};

    h1, h2, h3, h4, h5 {
      margin-top: ${toRem(24)};
      margin-bottom: ${toRem(16)};
      line-height: ${toRem(20)};
      font-weight: 600;
    }

    h1 {
      padding-bottom: ${toRem(15)};
      font-size: ${toRem(32)};
      border-bottom: ${toRem(1)} solid ${commonColors.neutral500};
      line-height: ${toRem(37)};
    }
    h2 {
      padding-bottom: ${toRem(15)};
      font-size: ${toRem(24)};
      border-bottom: ${toRem(1)} solid ${commonColors.neutral500};
      line-height: ${toRem(30)};
    }
    h3 {
      margin-top: ${toRem(24)};
      margin-bottom: ${toRem(16)};
      font-weight: 600;
      line-height: ${toRem(26)};
      font-size: ${toRem(20)};
    }

    h4 {
      font-size: ${toRem(16)};
      margin-top: ${toRem(24)};
      margin-bottom: ${toRem(16)};
      font-weight: 600;
      line-height: ${toRem(24)};
    }
    h5 {
      margin-top: ${toRem(24)};
      margin-bottom: ${toRem(16)};
      font-weight: 600;
      line-height: ${toRem(20)};
    }

    p {
      margin-bottom: ${toRem(16)};
      line-height: ${toRem(24)};
    }

    pre {
      padding: ${toRem(16)};
      overflow: auto;
      font-size: ${toRem(14)};
      line-height: ${toRem(23)};
      border-radius: ${toRem(6)};
      word-wrap: normal;
      background-color: ${commonColors.neutral200};
      margin-bottom: ${toRem(16)};
    }

    code {
      display: inline;
      padding: 0;
      margin: 0;
      overflow: visible;
      line-height: inherit;
      word-wrap: normal;
      background-color: transparent;
      border: 0;
    }

    ul, ol {
      padding-left: ${toRem(32)};
      margin-top: 0;
      margin-bottom: ${toRem(16)};
    }

    ul {
      list-style-type: disc;
    }

    li {
      display: list-item;
    }

    img {
      max-width: 100%;
    }

    blockquote {
      margin-top: 0;
      margin-bottom: ${toRem(16)};
      padding: 0 ${toRem(16)};
      border-left: ${toRem(4)} solid ${commonColors.neutral300};
    }

    hr {
      height: ${toRem(4)};
      padding: 0;
      margin: ${toRem(24)} 0;
      background-color: ${commonColors.neutral200};
      border: 0;
    }
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${toRem(22)};
  color: ${commonColors.neutral800};
  margin-bottom: ${toRem(26)};
`;
