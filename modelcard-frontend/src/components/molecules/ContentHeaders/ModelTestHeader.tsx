import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { IModelTestHeaderProps } from '@/interfaces/contentHeaderInterfaces';
import Navigation from '@/components/atoms/Navigation';

const ModelTestHeader = (props: IModelTestHeaderProps): React.ReactNode => {
  const {
    $navigations, $className, $initial, $title, $description,
  } = props;

  return (
    <Container className={$className}>
      <NaviRow>
        <Navigation $navigations={$navigations} />
      </NaviRow>

      <TitleRow>
        <div className="">
          <span className="initial">{$initial}</span>
          <span className="title">{$title}</span>
        </div>
      </TitleRow>

      <DescriptionRow>
        <Description>
          <p>{$description}</p>
        </Description>
      </DescriptionRow>
    </Container>
  );
};
export default ModelTestHeader;

const Container = styled.div`
  width: ${toRem(1516)};
`;

const NaviRow = styled.div`
  margin-bottom: ${toRem(50)};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${toRem(22)};
  
  & > div:first-child {
    display: flex;
    
    span.initial {
        height: ${toRem(36)};
        line-height: ${toRem(36)};
        color: #fff;
        font-size: ${toRem(18)};
        font-weight: 600;
        border-radius: ${toRem(5)};
        background-color: ${commonColors.navy900};
        display: inline-block;
        text-align: center;
        margin-right: ${toRem(12)};
        padding: 0 ${toRem(7)};
    }

      span.title {
        display: inline-block;
        width: ${toRem(1250)};
        font-size: ${toRem(34)};
        font-weight: 700;
        color: ${commonColors.navy900};
        vertical-align: sub;
      }
  }
`;

const DescriptionRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Description = styled.div`
    p {
        color: ${commonColors.neutral700};
        font-size: ${toRem(18)};
        width: ${toRem(450)};
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-left: ${toRem(50)};
    }
`;
