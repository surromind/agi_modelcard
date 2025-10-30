import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

import icArrowUp from '@/assets/images/atoms/icArrowUp.svg';
import { toRem } from '@/utils/styleUtil';
import { ISelectBoxProps } from '@/interfaces/selectInterfaces';
import commonColors from '@/constants/colors';

const ModelFormSelectBox = React.forwardRef((props:ISelectBoxProps &
{ value:number, onChange?: (e:React.FocusEvent<HTMLSelectElement>) => void, onBlur: () => void }, ref: ForwardedRef<HTMLSelectElement>) => {
  const {
    options, onChange, onBlur, $isError = false, $labelName = '', value,
  } = props;

  const getSelectDefaultOption = (labelName:string) => {
    switch (labelName) {
      case 'model_type_id':
        return '분야';
      case 'task_id':
        return 'Task';
      case 'framework_id':
        return 'Framework';
      case 'license_id':
        return 'License';
      default:
        return '분야';
    }
  };

  return (
    <SelectBoxWrapper>
      <Select ref={ref} onChange={onChange} value={value} $isError={$isError} onBlur={onBlur}>
        <option key={0} value={0}>{`${getSelectDefaultOption($labelName)}를 선택해주세요.`}</option>
        {options && options.map((option) => (
          <option key={option.id} value={option.id}>{option.name}</option>))}
      </Select>
      <Img src={icArrowUp.src} alt="화살표" />
    </SelectBoxWrapper>
  );
});
export default ModelFormSelectBox;

const SelectBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;
const Select = styled.select<{ $isError: boolean }>`
    position: relative;
    width: 100%;
    height: ${toRem(42)};
    padding: ${toRem(10)} ${toRem(14)};

    border: ${toRem(1)} solid ${({ $isError }) => ($isError ? `${commonColors.red500}` : `${commonColors.neutral500}`)};
    border-radius: ${toRem(5)};

    appearance: none;
    
    font-size: ${toRem(16)};
    font-weight: 500;
    line-height: ${toRem(22)};
    letter-spacing: -0.03em;
    
    option {
        color: ${commonColors.navy900};
        
        &:first-child {
            color: ${commonColors.neutral500};
        }
    }
`;

const Img = styled.img`
    position: absolute;
    right: ${toRem(14)};
    
    width: ${toRem(14)};
    height: ${toRem(14)};
    
    transform: rotate(180deg);
`;
