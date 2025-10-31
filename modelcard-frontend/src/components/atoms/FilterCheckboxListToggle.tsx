import React, { useState } from 'react';
import styled from 'styled-components';

import { IFilterCheckedBoxListToggle } from '@/interfaces/filterInterfaces';
import { toRem, modelCategoryIcon } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import icArrow from '@/assets/images/atoms/icFilterArrowGrey.svg';
import icChecked from '@/assets/images/atoms/icFilterChecked.svg';

const FilterCheckboxListToggle = (props: IFilterCheckedBoxListToggle): React.ReactNode => {
  const { $data, $taskItems, $setTaskItems } = props;

  const [filterListOpen, setFilterListOpen] = useState<{ [key: string]: boolean }>({
    CV: true,
    TS: true,
    AU: true,
    TE: true,
    MU: true,
    LG: true,
  });

  const onClickToggle = (abbr: string) => {
    setFilterListOpen({
      ...filterListOpen,
      [abbr]: !filterListOpen[abbr],
    });
  };

  const onClickCheckbox = (itemId: number) => {
    const currentCheckboxes = [...$taskItems];

    if ($taskItems.includes(itemId)) {
      const newResult = currentCheckboxes.filter((item) => item !== itemId);
      $setTaskItems(newResult);
    } else {
      $setTaskItems([...$taskItems, itemId]);
    }
  };

  return (
    <Container>
      {$data?.map((data, idx) => (
        <ToggleBox key={data.name} className="toggleBox" $isOpen={filterListOpen[data.abbreviation]}>
          <button onClick={() => onClickToggle(data.abbreviation)} type="button">
            <div>
              <img src={modelCategoryIcon(data.name)} alt="" />
              <Title>
                {data.name}
              </Title>
            </div>
            <img
              className="arrow"
              src={icArrow.src}
              alt=""
            />
          </button>

          <ListBox
            className={data.abbreviation}
            $isOpen={filterListOpen[data.abbreviation]}
            $filterState={filterListOpen}
            $taskCount={data.task.length}
          >
            {data.task.map((item, index) => (
              <li key={index} role="presentation">
                <Checkbox
                  type="checkbox"
                  onChange={() => onClickCheckbox(item.id)}
                  checked={$taskItems.includes(item.id)}
                  id={item.id.toString()}
                />
                <label htmlFor={item.id.toString()}>{item.name}</label>
              </li>
            ))}
          </ListBox>
        </ToggleBox>
      ))}
    </Container>
  );
};
export default FilterCheckboxListToggle;

const Container = styled.div`
  padding: ${toRem(30)};
  background-color: ${commonColors.neutral50};
  border-radius: ${toRem(10)};

  .toggleBox:not(:last-child) {
    border-bottom: ${toRem(1)} solid ${commonColors.neutral400};
    padding-bottom: ${toRem(30)};
    margin-bottom: ${toRem(30)};
  }

`;

const ToggleBox = styled.div<{ $isOpen: boolean }>`
  button {
    width: 100%;
    height: ${toRem(25)};
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin-bottom: ${toRem(20)};

    img {
      width: ${toRem(24)};
      height: ${toRem(24)};
      margin: ${toRem(-0.5)} ${toRem(6)} 0 0;
  
    }
    
    img.arrow {
      transform: ${({ $isOpen }) => ($isOpen ? 'rotateZ( 180deg )' : 0)};
      transition: all  0.5s;
    }
  }
`;

const Title = styled.span`
  
  font-weight: 700;
  font-size: ${toRem(18)};
  color: ${commonColors.neutral900};
  vertical-align: super;
`;

const ListBox = styled.ul<{ $isOpen: boolean, $filterState:{ [key: string]: boolean }, $taskCount: number }>`
  margin: 0;
  padding: 0;
  height: auto;
  overflow-y: hidden;
  transition: height 0.5s;
  
  &.CV, &.TS, &.AU, &.TE, &.MU, &.LG {
    height: ${({ $isOpen, $taskCount }) => ($isOpen ? `${toRem($taskCount * 46)}` : 0)};
  }
  
  li {
    height: ${toRem(46)};
    line-height: ${toRem(46)};
    color: ${commonColors.neutral900};
    font-size: ${toRem(16)};
    font-weight: 500;
    list-style: none;
   
    label {
      margin-left: ${toRem(12)};
      vertical-align: super;
    }
  }
`;

const Checkbox = styled.input`
  /* 체크되기전 체크박스 스타일*/
  width: ${toRem(20)};
  height: ${toRem(20)};
  appearance: none; /* 원래 제공되는 체크박스 없애기 */
  border-radius: ${toRem(3)}; /* 동그랗게 만들기 */
  background-color: #ffffff;
  cursor: pointer;

  /* 체크되기전 체크박스 앞쪽에 새 컨텐츠를 추가 */
  &::before {
    content: '';
    color: transparent;
    display: block;
    width: inherit; /* 부모 속성 그대로 받기 */
    height: inherit; /* 부모 속성 그대로 받기 */
    border-radius: inherit; /* 부모 속성 그대로 받기 */
    border: 0;
    background-color: transparent;
    background-size: contain; /* 지정한 요소 안에 배경 이미지가 다 들어오도록 이미지를 확대/축소하기 */
    box-shadow: inset 0 0 0 ${toRem(1)} ${commonColors.neutral500};
  }

  /* 체크된 체크박스 스타일*/
  &:checked {
    background: url(${icChecked.src}) no-repeat;
  }

  /* 체크된 체크박스 앞쪽에 체크이미지 추가 */
  &:checked::before {
    box-shadow: none;
  }
`;
