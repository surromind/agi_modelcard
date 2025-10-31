import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { IBadge } from '@/interfaces/badgeInterfaces';

const Badge = (props :IBadge): React.ReactNode => {
  const { $text } = props;

  return (
    <BadgeComponent {...props} $backgroundColor={props.$badgeType}>
      <span>{$text}</span>
    </BadgeComponent>
  );
};
export default Badge;

const BadgeComponent = styled.div<IBadge & { $backgroundColor: string }>`
    display: flex;
    align-items: center;
    justify-content: center;

    height: ${({ $height }) => ($height || `${toRem(35)}`)};
    line-height: ${({ $height }) => ($height || `${toRem(35)}`)};
    padding: ${toRem(6)} ${toRem(20)};
    border-radius: ${toRem(20)};
    box-sizing: border-box;
    background: ${({ $isActivated, $backgroundColor }) => {
    if (!$isActivated) {
      return commonColors.navy50;
    }
    switch ($backgroundColor) {
      case 'project':
        return commonColors.orange500;
      case 'staging':
        return commonColors.teal500;
      case 'operation':
        return commonColors.violet500;
      default:
        return commonColors.orange500;
    }
  }};

    
  
   span {
     font-size: ${toRem(14)};
     color: ${({ $isActivated }) => ($isActivated ? 'rgba(255, 255, 255, 1)' : 'rgba(186, 192, 204, 1)')};
     font-weight: 600;
     text-align: center;
   }
`;
