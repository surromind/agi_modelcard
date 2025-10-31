import React, { useEffect } from 'react';
import styled from 'styled-components';

import icArrowUp from '@/assets/images/atoms/icArrowUp.svg';
import { toRem } from '@/utils/styleUtil';
import { ISelectBoxProps } from '@/interfaces/selectInterfaces';
import { useModelStore } from '@/stores/model';

const SelectBox = (props:ISelectBoxProps): React.ReactNode => {
  const { options } = props;
  const { getParams, setParams, params } = useModelStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams({ ...getParams(), order: e.target.value ?? 'updated_at' });
  };

  useEffect(() => {
    setParams({ ...getParams(), order: 'updated_at' });
  }, [params.state]);

  return (
    <SelectBoxWrapper>
      <Select onChange={handleOnChange} value={params.order}>
        {options && options.map((option) => (
          <option key={option.id} value={'value' in option ? option.value : 'updated_at'}>{option.name}</option>
        ))}
      </Select>
      <Img src={icArrowUp.src} alt="화살표" />
    </SelectBoxWrapper>
  );
};
export default SelectBox;

const SelectBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;
const Select = styled.select`
    position: relative;
    width: 100%;
    height: ${toRem(42)};
    padding: ${toRem(10)} ${toRem(14)};

    border: 1px solid rgba(186, 192, 204, 1);
    border-radius: ${toRem(5)};

    appearance: none;
`;

const Img = styled.img`
    position: absolute;
    right: ${toRem(14)};
    
    width: ${toRem(14)};
    height: ${toRem(14)};
    
    transform: rotate(180deg);
`;
