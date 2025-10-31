import React from 'react';
import styled from 'styled-components';

import icEyes from '@/assets/images/atoms/icComputerVision.svg';
import icTime from '@/assets/images/atoms/icTimeSeries.svg';
import icText from '@/assets/images/atoms/icText.svg';
import { toRem } from '@/utils/styleUtil';
import { IHashtag } from '@/interfaces/hashtagInterfaces';
import commonColors from '@/constants/colors';

const HashtagForDetail = (props: IHashtag): React.ReactNode => {
  const {
    $isShowIcon = true,
    $iconType,
    $text,
  } = props;

  const getIcon = (iconType: string | undefined) => {
    switch (iconType) {
      case 'computerVision':
        return icEyes.src;
      case 'timeSeries':
        return icTime.src;
      case 'text':
        return icText.src;
      default:
        return '';
    }
  };

  return (
    <HashtagWrapper {...props}>
      {($isShowIcon && getIcon($iconType))
          && <Img src={getIcon($iconType)} alt="icEyes" />}
      {$text}
    </HashtagWrapper>
  );
};

export default HashtagForDetail;

const HashtagWrapper = styled.div<IHashtag>`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: ${toRem(6)} ${toRem(13)};

    font-size: ${toRem(16)};
    color: ${({ $fontColor }) => ($fontColor || 'rgba(66, 74, 90, 1)')};
    background: ${({ $backgroundColor }) => ($backgroundColor || 'rgba(237, 239, 245, 1)')};
    font-weight: 500; 

    border: ${toRem(1)} solid rgba(237, 239, 245, 1);
    border-radius: ${toRem(6)};
  
  
    background: ${({ $type }) => {
    switch ($type) {
      case 'task':
        return commonColors.neutral50;
      case 'framework':
        return commonColors.blue50;
      case 'license':
        return commonColors.teal50;
      default:
        return commonColors.neutral50;
    }
  }};

  border: ${({ $type }) => {
    switch ($type) {
      case 'task':
        return `${toRem(1)} solid ${commonColors.neutral200}`;
      case 'framework':
        return `${toRem(1)} solid ${commonColors.navy100}`;
      case 'license':
        return `${toRem(1)} solid #C6F5F6`;
      default:
        return `${toRem(1)} solid ${commonColors.neutral200}`;
    }
  }};

  color: ${({ $type }) => {
    switch ($type) {
      case 'task':
        return commonColors.neutral700;
      case 'framework':
        return commonColors.blue800;
      case 'license':
        return commonColors.blue700;
      default:
        return commonColors.neutral700;
    }
  }};
`;

const Img = styled.img`
    width: ${toRem(20)};
    height: ${toRem(20)};
    margin-right: ${toRem(8)}
`;
