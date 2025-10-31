import React from 'react';
import styled from 'styled-components';

import { IDetailHashtagProps } from '@/interfaces/contentHeaderInterfaces';
import HashtagForDetail from '@/components/atoms/hashtag/HashtagForDetail';
import { toRem } from '@/utils/styleUtil';

const DetailHashtag = (props: IDetailHashtagProps): React.ReactNode => {
  const { $content, $taskIcon } = props;
  return (
    <Container>
      {$content.task && <HashtagForDetail $type="task" $text={$content.task} $isShowIcon $iconType={$taskIcon} />}
      {$content.framework && <HashtagForDetail $type="framework" $text={$content.framework} />}
      {$content.license && <HashtagForDetail $type="license" $text={$content.license} />}
    </Container>
  );
};
export default DetailHashtag;

const Container = styled.div`
  display: flex;
  gap: ${toRem(12)};
`;
