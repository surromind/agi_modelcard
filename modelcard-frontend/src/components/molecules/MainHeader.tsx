import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import IconTextButton32 from '@/components/atoms/buttons/IconTextButton32';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import imgSurroLogo from '@/assets/images/atoms/imgSurroLogo.svg';
import IconButtonUser from '@/components/atoms/buttons/IconButtonUser';
import IconButtonNotification from '@/components/atoms/buttons/IconButtonNotification';
import { IMainHeaderProps } from '@/interfaces/mainHeaderInterfaces';

const MainHeader = (props : IMainHeaderProps) => {
  const { $notificationCount, $userInitial } = props;

  const router = useRouter();
  const routeToHome = () => {
    router.push('/');
  };

  return (
    <MainHeaderContainer {...props}>
      <MainHeaderLogoContainer onClick={routeToHome}>
        <Img
          src={imgSurroLogo.src}
        />
        <HeaderTitle>AI Studio - Models</HeaderTitle>
      </MainHeaderLogoContainer>

      <MainHeaderInfoContainer>
        {/* <IconTextButton32 */}
        {/*   $text="Download Manual" */}
        {/*   $onClick={() => {}} */}
        {/*   $bgColor="neutral200" */}
        {/*   $iconType="doc" */}
        {/* /> */}
        <NotificationContainer>
          { $notificationCount
            ? <NotificationBadge>{$notificationCount}</NotificationBadge> : null}
          <IconButtonNotification $onClick={() => {}} />
        </NotificationContainer>
        {$userInitial ? <IconButtonUser $iconLetter={$userInitial} /> : null}
      </MainHeaderInfoContainer>
    </MainHeaderContainer>
  );
};

export default MainHeader;

const MainHeaderContainer = styled.div`
  width: 100%;
  min-width: ${toRem(650)};
  padding: 0 ${toRem(40)};
  height: ${toRem(72)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${commonColors.navy900};
  box-sizing: border-box;
`;

const MainHeaderLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${toRem(12)};
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
    font-size: ${toRem(18)};
    font-weight: 700;
    line-height: ${toRem(22)};
    // 'AI Studio - Models 세로 가운데 정렬을 위한 padding'
    padding-bottom: ${toRem(3)};
    letter-spacing: -0.03em;
    color: ${commonColors.neutral50};
`;

const Img = styled.img`
    width: ${toRem(150)};
    height: ${toRem(17)};
`;

const MainHeaderInfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${toRem(18)};
`;

const NotificationContainer = styled.div`
    width: ${toRem(32)};
    height: ${toRem(32)};
    position: relative;
`;

const NotificationBadge = styled.div`
    top: ${toRem(-8)};
    right: ${toRem(-12)};
    height: ${toRem(18)};
    border-radius: ${toRem(100)};
    position: absolute;
    background: ${commonColors.red500};
    color: ${commonColors.neutral50};
    padding: ${toRem(5)} ${toRem(6)};
    box-sizing: border-box;
    font-size: ${toRem(10)};
    line-height: ${toRem(5)};
`;
