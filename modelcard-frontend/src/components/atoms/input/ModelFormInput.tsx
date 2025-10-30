import React, { ForwardedRef } from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import { InputProps } from '@/interfaces/inputInterfaces';
import commonColors from '@/constants/colors';

const ModelFormInput = React.forwardRef((props: InputProps & { value?: string | number, onBlur?:() => void }, ref: ForwardedRef<HTMLInputElement>) => {
  const {
    $isTextCount, value, $textMaxLength, $placeholder, $isError, onBlur,
  } = props;

  return (
    <InputWrapper>
      <TextInput ref={ref} {...props} placeholder={$placeholder} maxLength={$textMaxLength} $isError={$isError} onBlur={onBlur} />
      {$isTextCount && value && typeof value === 'string' && (
      <TextCount>
        {value.length}
        /
        {$textMaxLength}
      </TextCount>
      )}
    </InputWrapper>
  );
});
export default ModelFormInput;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
`;
const TextInput = styled.input<{ $isError?: boolean }>`
    width: 100%;
    height: ${toRem(42)};

    padding: 0 ${toRem(14)};
    padding-right: ${toRem(38)};
    border: ${toRem(1)} solid ${({ $isError }) => ($isError ? `${commonColors.red500}` : `${commonColors.neutral500}`)};
    border-radius: ${toRem(5)};

    font-size: ${toRem(16)};
    color: rgba(0, 0, 0, 1);

    &::placeholder {
        color: rgba(186, 192, 204, 1);
    }
`;

const TextCount = styled.span`
    position: absolute;
    right: ${toRem(14)};
    color: rgba(186, 192, 204, 1);
    font-size: ${toRem(14)};
    line-height: ${toRem(20)};
    font-weight: 400;
    z-index: 1;
`;
