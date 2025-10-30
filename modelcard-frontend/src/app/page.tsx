'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import { toRem } from '@/utils/styleUtil';
import TextButton from '@/components/atoms/buttons/TextButton';
import commonColors from '@/constants/colors';
import introLogo from '@/assets/images/icIntroLogo.svg';

const Intro = () => {
  const router = useRouter();
  const routeToMain = () => {
    router.push('/home');
  };

  return (
    <Container>
      <VideoArea>
        <img className="logo" src={introLogo.src} alt="" />
        <div className="title"><span>AI Studio - Models</span></div>
        <div className="videoBox">
          <video loop autoPlay muted className="">
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        </div>
      </VideoArea>
      <TextBox>
        <div>
          <p className="title">
            원하는 모델을 찾고,
            테스트까지
          </p>
          <p className="description">
            흩어져있던 모델들을 모아 한눈에 보고,
            관리하여 테스트까지 진행할 수 있습니다.
          </p>
          <TextButton $text="시작하기" $onClick={routeToMain} />
        </div>
      </TextBox>
    </Container>
  );
};

export default Intro;

const Container = styled.div`
  height: 100vh;
  display: flex;
`;

const VideoArea = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
  min-width: ${toRem(1320)};
  
  .logo {
    position: absolute;
    left: ${toRem(63)};
    top: ${toRem(63)};
    z-index: 999;
  }
  
  .title {
    position: relative;
    z-index: 999;
    font-size: ${toRem(75)};
    font-weight: 800;
    height: 100%;
    text-align: center;
    color: ${commonColors.neutral50};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    span {
      padding-bottom: ${toRem(89)};
    }
  }
  
  .videoBox {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    
    &:after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 99;
      content: '';
      background-color: rgba(0,0,0,0.2);
    }
    
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const TextBox = styled.div`
  width: 30%;
  height: 100%;
  min-width: ${toRem(600)};
  display: flex;
  align-items: center;
  justify-content: center;
  
  & > div {
    width:${toRem(340)};
    
    p.title {
      color: ${commonColors.neutral800};
      font-size: ${toRem(40)};
      font-weight: 600;
      line-height: ${toRem(55)};
      margin-bottom: ${toRem(25)};
    }
  
    p.description {
      color: ${commonColors.neutral600};
      font-weight: 400;
      font-size: ${toRem(20)};
      line-height: ${toRem(28)};
      margin-bottom: ${toRem(60)};
    }
  }
`;
