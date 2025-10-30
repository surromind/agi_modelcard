import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { OPERATION_INFO_LIST, STAGING_INFO_LIST } from '@/constants/levelFormInfoList';
import icInfoGreen from '@/assets/images/atoms/icInfoGreen.svg';
import { ILevelFormInfoItem, ILevelFormInfoBoxProps } from '@/interfaces/levelFormInfoBoxInterface';
import { MODEL_STATES } from '@/constants/modelStates';

const LevelFormInfoBox = (props: ILevelFormInfoBoxProps): React.ReactNode => {
  const { $infoType } = props;

  const getLevelFormInfoList = (infoType:string) : ILevelFormInfoItem[] => {
    switch (infoType) {
      case MODEL_STATES.STAGING:
        return STAGING_INFO_LIST;
      case MODEL_STATES.OPERATING:
        return OPERATION_INFO_LIST;
      case MODEL_STATES.PROJECT:
        return [];
      default:
        return [];
    }
  };

  return (
    <LevelFormInfoBoxContainer {...props}>
      {
          getLevelFormInfoList($infoType).map((levelFormInfoItem: ILevelFormInfoItem) => (
            <LevelFormInfoBoxItem key={levelFormInfoItem.id}>
              <Img
                src={icInfoGreen.src}
              />
              {levelFormInfoItem.description}
            </LevelFormInfoBoxItem>
          ))
        }
    </LevelFormInfoBoxContainer>
  );
};

export default LevelFormInfoBox;

const LevelFormInfoBoxContainer = styled.ul`
    width: 100%;
    padding: ${toRem(22)} ${toRem(32)};
    background: ${commonColors.green50};
    border: ${toRem(2)} dashed ${commonColors.green400};
    border-radius: ${toRem(10)};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: ${toRem(16)};
`;

const LevelFormInfoBoxItem = styled.li`
    display: flex;
    align-items: center;
    gap: ${toRem(6)};
    color: ${commonColors.green400};
    font-size: ${toRem(14)};
    font-weight: 600;
    line-height: ${toRem(19)};
    letter-spacing: -0.03em;
`;

const Img = styled.img`
    width: ${toRem(16)};
    height: ${toRem(16)};
`;
