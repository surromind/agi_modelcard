import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';

interface IHashtag {
  $type: string;
  $text: string;
}

const Hashtag = (props: IHashtag): React.ReactNode => {
  const {
    $text,
  } = props;

  return (
    <HashtagWrapper {...props}>
      {$text}
    </HashtagWrapper>
  );
};

export default Hashtag;

const HashtagWrapper = styled.div<IHashtag>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${toRem(28)};
  padding: 0 ${toRem(13)};

  font-size: ${toRem(14)};
  font-weight: 500;

  border-radius: ${toRem(6)};

  background: ${({ $type }) => {
    switch ($type) {
      case 'framework':
        return commonColors.teal50;
      case 'license':
        return commonColors.blue50;
      default:
        return commonColors.teal50;
    }
  }};

  color: ${({ $type }) => {
    switch ($type) {
      case 'framework':
        return commonColors.blue700;
      case 'license':
        return commonColors.blue800;
      default:
        return commonColors.blue700;
    }
  }};
`;
