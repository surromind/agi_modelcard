'use client';

import React from 'react';
import styled from 'styled-components';

import TestView from '@/components/atoms/TestView';
import icDoc from '@/assets/images/atoms/icDoc.svg';
import { toRem } from '@/utils/styleUtil';
import ModelTestHeader from '@/components/molecules/ContentHeaders/ModelTestHeader';

const ModelsTestClient = (): React.ReactNode => (
  <Container>
    <Content>
      <Header>

        <ModelTestHeader
          $initial="CV"
          $title="Compute Vision_Transformer_Car"
          $description="카드와 관련된 설명이 보여집니다 카드와 관련된 설명이 보여집니다 카드와 관련된 설명이 보여집니다"
          $navigations={[
            {
              name: 'Home',
              url: '/',
            },
            {
              name: 'menu1',
              url: '/',
            },
            {
              name: 'menu22',
              url: '/',
            },
          ]}
        />
      </Header>
      <Body>

        <TestView
          $isLoading
          $originImg={icDoc.src}
          $resultImg={icDoc.src}
        />
      </Body>
    </Content>
  </Container>
);

export default ModelsTestClient;

const Container = styled.div`

`;

const Header = styled.div`
  padding: ${toRem(50)} 0;
  
`;

const Content = styled.div`
  margin: 0 auto;
  width: ${toRem(1516)};
`;

const Body = styled.div`
    margin-bottom: ${toRem(100)};
`;
