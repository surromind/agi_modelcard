import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import icHome from '@/assets/images/atoms/icNavigationHome.svg';
import icArrow from '@/assets/images/atoms/icNavigationArrow.svg';
import { INavigationProps } from '@/interfaces/navigationInterfaces';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { useModelStore } from '@/stores/model';
import { MODEL_STATES } from '@/constants/modelStates';

const Navigation = (props: INavigationProps): React.ReactNode => {
  const { $navigations } = props;
  const router = useRouter();
  const { setParams, getParams, resetParams } = useModelStore();

  return (
    <Container>
      <Home src={icHome.src} alt="" />

      <MenuBox>
        {$navigations.map((navi, index, navigation) => {
          const isLast = navigation.length - 1 === index;
          const goNaviPage = () => router.push(navi?.url);

          const filterNavigation = () => {
            switch (navi.name) {
              case 'Project':
                setParams({ ...getParams(), state: MODEL_STATES.PROJECT });
                goNaviPage();
                break;

              case 'Staging':
                setParams({ ...getParams(), state: MODEL_STATES.STAGING });
                goNaviPage();
                break;

              case 'Operation':
                setParams({ ...getParams(), state: MODEL_STATES.OPERATING });
                goNaviPage();
                break;

              case 'Models':
                resetParams();
                goNaviPage();
                break;

              default:
                goNaviPage();
            }
          };

          return (
            <li key={index} className={isLast ? 'lastNavigation' : ''}>
              <button type="button" onClick={filterNavigation}>
                <span>{navi.name}</span>
                {!isLast && (
                  <img src={icArrow.src} alt="" />
                ) }
              </button>
            </li>
          );
        })}
      </MenuBox>
    </Container>
  );
};
export default Navigation;

const Container = styled.div`
  display: flex;
`;
const Home = styled.img`
  width: 20px;
  height: 20px;
  margin: ${toRem(2)} ${toRem(8)} 0 0;
`;
const MenuBox = styled.ul`
  display: flex;
  
  li {
    display: flex;
    
    &.lastNavigation {
      span {
        color: ${commonColors.neutral700};
      }
    }
      
      > button {
          display: flex;
          align-items: center;
      }
    
    span {
      line-height: ${toRem(23)};
      color: ${commonColors.neutral600};
      font-size: ${toRem(20)};
      cursor: pointer;
    }

    img {
      margin: 0 ${toRem(4)};
    }
  }
  
  
 
`;
