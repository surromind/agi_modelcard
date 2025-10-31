import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import icMenuIconOrange from '@/assets/images/atoms/icMenuIconOrange.svg';
import icMenuIcon from '@/assets/images/atoms/icMenuIcon.svg';
import icCheckList from '@/assets/images/atoms/icCheckList.svg';
import icMenuArrow from '@/assets/images/atoms/icMenuArrow.svg';
import icMenuArrowOrange from '@/assets/images/atoms/icMenuArrowOrange.svg';
import { useModelStore } from '@/stores/model';
import { MODEL_STATES } from '@/constants/modelStates';

const LeftMenu = (): React.ReactNode => {
  const { getParams, setParams, params } = useModelStore();
  const [activeMenu, setActiveMenu] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  useEffect(() => {
    setActiveMenu(params.state);
  }, [params]);

  const onClickMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { menu } = target.dataset;

    if (target.tagName === 'SPAN') {
      setActiveMenu(target?.dataset?.menu ?? '');
    }

    if (menu === '') {
      setParams({ ...getParams(), state: '' });
    } else {
      const state = MODEL_STATES[menu as keyof typeof MODEL_STATES];

      setParams({ ...getParams(), state });
    }

    setParams({
      ...getParams(),
      page: 1,
      state: menu ?? '',
      task: [],
      framework: [],
      license: [],
      title: '',
      order: 'updated_at',
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <Container>
      <MenuHeader>Main</MenuHeader>

      {/* MenuBox => 대메뉴 + 서브메뉴 */}
      <MenuBox onClick={onClickMenu}>
        {/* 대메뉴 Menu */}
        <Menu>
          <li
            role="presentation"
            className={`menuItem ${activeMenu === '' ? 'activeMenu' : ''}`}
          >
            {activeMenu === '' && (
            <>
              <img src={icMenuIconOrange.src} alt="" />
              <span data-menu="">Models</span>
              <ArrowBox $isMenuOpen={isMenuOpen} onClick={toggleMenu}>
                <img className="down" src={icMenuArrowOrange.src} alt="" />
              </ArrowBox>
            </>
            )}

            {activeMenu !== '' && (
            <>
              <img src={icMenuIcon.src} alt="" />
              <span data-menu="">Models</span>
              <ArrowBox $isMenuOpen={isMenuOpen} onClick={toggleMenu}>
                <img className="down" src={icMenuArrow.src} alt="" />
              </ArrowBox>
            </>
            )}
          </li>
        </Menu>

        {/* 대메뉴 Menu의 서브메뉴 */}
        <Submenu $isMenuOpen={isMenuOpen}>
          <li className={`menuItem ${activeMenu === 'MSPROJ' ? 'activeMenu' : ''}`}>
            <span data-menu="MSPROJ">Project</span>
          </li>
          <li className={`menuItem ${activeMenu === 'MSSTAG' ? 'activeMenu' : ''}`}>
            <span data-menu="MSSTAG">Staging</span>
          </li>
          <li className={`menuItem ${activeMenu === 'MSOPER' ? 'activeMenu' : ''}`}>
            <span data-menu="MSOPER">Operation</span>
          </li>
        </Submenu>
      </MenuBox>

      <Divider />

      {/* 2차 */}
      {/* <MenuBox onClick={onClickMenu}> */}
      {/*   <Menu> */}
      {/*     <li className={`menuItem ${activeMenu === 'test' ? 'activeMenu' : ''}`}> */}
      {/*       <img src={icCheckList.src} alt="" /> */}
      {/*       <span data-menu="test">Test</span> */}
      {/*     </li> */}
      {/*   </Menu> */}
      {/* </MenuBox> */}
    </Container>
  );
};
export default LeftMenu;

const Container = styled.div`
  width: ${toRem(300)};
  color: ${commonColors.neutral900};
  
  // 모든 메뉴는 li.menuItem로 되어있음
  li.menuItem {
  height: ${toRem(55)};
  line-height: ${toRem(55)};
  padding-left: ${toRem(20)};
  cursor: pointer;
  
    span {
        display: block;
    }
  }
`;

const MenuHeader = styled.div`
  height: ${toRem(60)};
  line-height: ${toRem(60)};
  color: ${commonColors.neutral900};
  font-weight: 600;
  font-size: ${toRem(16)};
  padding-left: ${toRem(20)};
`;

const MenuBox = styled.div`
  .activeMenu {
    background-color: ${commonColors.orange50};
    color: ${commonColors.orange500};
    border-radius: ${toRem(5)};
  }
`;

// Menu는 대메뉴에 해당
const Menu = styled.ul`
  font-weight: 600;
	
  li {
    position: relative;
    display: flex;
    align-items: center;
    
    img {
      width: ${toRem(22)};
      height: ${toRem(22)};
      margin-right: ${toRem(7)};
    }
    
    span {
      width: 100%;
    }
  }
`;

const ArrowBox = styled.div<{ $isMenuOpen: boolean }>`
  position: absolute;
  right: ${toRem(10)};
  padding: 0 ${toRem(10)};
  
  transform: ${({ $isMenuOpen }) => ($isMenuOpen ? 'rotateZ( 180deg )' : 0)};
  transition: all  0.5s;
  transform-origin: 50% 50%;

  img {
    margin: 0 !important;
    vertical-align: text-top;
  }
`;

const Submenu = styled.ul<{ $isMenuOpen: boolean }>`
  font-weight: 400;
  height: ${({ $isMenuOpen }) => ($isMenuOpen ? `${toRem(165)}` : 0)};
  transition: height 0.5s;
  overflow: hidden;
  
  li {
    padding-left: ${toRem(50)};
    font-weight: 500;
    color: ${commonColors.neutral700};
  }
`;

const Divider = styled.div`
  height: ${toRem(1)};
  background-color: ${commonColors.neutral300};
  margin: ${toRem(10)} 0;
`;
