'use client';

import React from 'react';
import styled from 'styled-components';

import LeftMenu from '@/components/atoms/LeftMenu';
import MainHeader from '@/components/molecules/MainHeader';
import UserProfile from '@/components/atoms/UserProfile';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import FilterTab from '@/components/molecules/filter/FilterTab';

const DefaultLayout = ({ children }: { children: React.ReactNode }):React.ReactNode => (
  <>
    <HeaderBox>
      <MainHeader $notificationCount={0} $userInitial="U" />
    </HeaderBox>

    <MainContentsWrapper>
      <LeftMenuContainer>
        <div>
          <UserProfile />
          <LeftMenu />
        </div>
      </LeftMenuContainer>

      <MainContentsContainer>
        <div>
          {children}
        </div>
      </MainContentsContainer>

      <RightFilterContainer>
        <div>
          <FilterTab />
        </div>
      </RightFilterContainer>
    </MainContentsWrapper>
  </>
);

export default DefaultLayout;

const HeaderBox = styled.div`
  position: fixed;
  right: 0;
  left: 0;
  z-index: 999;
`;

const LeftMenuContainer = styled.div`
    width: ${toRem(340)};
    background: ${commonColors.neutral50};
    gap: ${toRem(10)};
    padding: ${toRem(30)} ${toRem(20)};
    border-right: ${toRem(1)} solid ${commonColors.neutral400};
  box-sizing: border-box;

  position: relative;

  & > div {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
      background: transparent;
    }
  }
`;

const MainContentsWrapper = styled.div`
    padding-top: ${toRem(72)};
    width: 100%;
    height: calc(100vh - ${toRem(72)});
    display: flex;
  overflow-y: hidden;
`;

const MainContentsContainer = styled.div`
  width: ${toRem(960)};
  padding: ${toRem(50)} ${toRem(50)} 0 ${toRem(50)};
  background: ${commonColors.neutral100};
  position: relative;
  
  & > div {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    
    &::-webkit-scrollbar {
      display: none;
      background: transparent;
    }
  }
`;

const RightFilterContainer = styled.div`
  background: ${commonColors.neutral100};
  padding-top: ${toRem(50)};
  box-sizing: border-box;
  position: relative;

  & > div {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
      background: transparent;
    }
  }
`;
