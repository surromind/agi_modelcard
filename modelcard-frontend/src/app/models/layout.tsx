'use client';

import React from 'react';
import styled from 'styled-components';

import MainHeader from '@/components/molecules/MainHeader';
import { toRem } from '@/utils/styleUtil';

const EmptyLayout = ({ children }: { children: React.ReactNode }):React.ReactNode => (
  <>
    <HeaderBox>
      <MainHeader $notificationCount={0} $userInitial="U" />
    </HeaderBox>
    <MainContentsWrapper>
      {children}
    </MainContentsWrapper>
  </>
);
export default EmptyLayout;

const HeaderBox = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  z-index: 999;
`;

const MainContentsWrapper = styled.div`
    margin: 0 auto;
    padding-top: ${toRem(72)};
`;
