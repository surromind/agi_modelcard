import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import commonColors from '@/constants/colors';
import { toRem } from '@/utils/styleUtil';
import loading from '@/assets/images/loading.gif';
import { ITestViewProps } from '@/interfaces/TestViewInterface';

const TestView = (props: ITestViewProps): React.ReactNode => {
  const { $isLoading, $originImg, $resultImg } = props;
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    setIsLoading($isLoading);
  }, [$isLoading]);

  return (
    <Container>
      <p className="title">View</p>

      <ViewBox>
        <View>
          <p className="imgTitle">원본 이미지</p>

          {isLoading ? (
            <Loading>
              <img src={loading.src} alt="" />
              <p>
                이미지를 불러오는 중입니다.
                <br />
                잠시만 기다려주세요.
              </p>
            </Loading>
          ) : (
            <img src={$originImg.src} alt="" />
          )}
        </View>

        <View>
          <p className="imgTitle">예측 결과</p>
          <img src={$resultImg.src} alt="" />
        </View>
      </ViewBox>
    </Container>
  );
};
export default TestView;

const Container = styled.div`
  width: ${toRem(1516)};
  background-color: ${commonColors.neutral200};
  border-radius: ${toRem(15)};
  padding: ${toRem(26)} ${toRem(32)};
  box-sizing: border-box;
  
  p.title {
    font-weight: 700;
    color: ${commonColors.neutral800};
    font-size: ${toRem(22)};
    margin-bottom: ${toRem(26)};
  }
`;

const ViewBox = styled.div`
  display: flex;
  gap: ${toRem(26)};
`;

const View = styled.div`
  background-color: ${commonColors.neutral50};
  border-radius: ${toRem(16)};
  width: ${toRem(713)};
  height: auto;
  
  padding: ${toRem(30)};
  box-sizing: border-box;
  
  p.imgTitle {
    margin-bottom: ${toRem(16)};
    font-weight: 700;
    font-size: ${toRem(18)};
    color: ${commonColors.neutral900};
  }
  
  img {
    width: ${toRem(653)};
    height: ${toRem(400)};
  }
`;

const Loading = styled.div`
  background-color: ${commonColors.neutral300};
  width: ${toRem(653)};
  height: ${toRem(400)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  
  img {
    width: ${toRem(64)};
    height: ${toRem(64)};
    margin-bottom: ${toRem(30)};
  }
  
  p {
    font-weight: 700;
    line-height: ${toRem(30)};
    font-size: ${toRem(22)};
    color: ${commonColors.navy900};
  }
`;
