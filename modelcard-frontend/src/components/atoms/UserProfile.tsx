import React from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';

const UserProfile = (): React.ReactNode => (
  <Container>
    <User>User01(관리자)</User>
    <Guide>관리자님 환영합니다.</Guide>
  </Container>
);

export default UserProfile;

const Container = styled.div`
  border: ${toRem(1)} solid ${commonColors.neutral400};
  padding: ${toRem(16)} ${toRem(20)};
  border-radius: ${toRem(10)};
  box-sizing: border-box;
`;

const User = styled.p`
	color: ${commonColors.neutral900};
	font-weight: 900;
	font-size: ${toRem(18)};
	margin-bottom: ${toRem(12)};
`;

const Guide = styled.p`
  color: ${commonColors.neutral600};
  font-size: ${toRem(16)};
`;
