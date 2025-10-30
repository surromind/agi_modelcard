import React from 'react';
import styled from 'styled-components';

import { IFilterCheckedBoxList } from '@/interfaces/filterInterfaces';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import icChecked from '@/assets/images/atoms/icFilterChecked.svg';

const FilterCheckboxList = (props: IFilterCheckedBoxList): React.ReactNode => {
  const { $data, $taskItems, $setTaskItems } = props;

  const onClickCheckbox = (itemId: number) => {
    const currentCheckboxs = [...$taskItems];

    if ($taskItems.includes(itemId)) {
      const newResult = currentCheckboxs.filter((item) => item !== itemId);
      $setTaskItems(newResult);
    } else {
      $setTaskItems([...$taskItems, itemId]);
    }
  };

  return (
    <Container>
      <ListBox>
        {$data?.map((item, index) => (
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
    </Container>
  );
};

export default FilterCheckboxList;

const Container = styled.div`
  padding: ${toRem(30)};
  background-color: ${commonColors.neutral50};
  border-radius: ${toRem(10)};
`;

const ListBox = styled.ul`
  margin: 0;
  padding: 0;
  border-bottom: ${toRem(1)} solid ${commonColors.neutral400};
  padding-bottom: ${toRem(30)};
  margin-bottom: ${toRem(30)};
  
  &:last-child {
    border: none;
    padding: 0;
    margin: 0;
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
  //transition: background 300ms; /* 0.3초에 걸쳐 background 변경 */
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
    box-shadow: inset 0 0 0 1px ${commonColors.neutral500};
  }

  /* 체크된 체크박스 스타일*/

  &:checked {
    //background-color: #007bff;
    background: url(${icChecked.src}) no-repeat;
  }

  /* 체크된 체크박스 앞쪽에 체크이미지 추가 */

  &:checked::before {
    box-shadow: none;
  }
`;
