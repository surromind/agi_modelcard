'use client';

import React from 'react';
import styled from 'styled-components';
import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';

interface IModelFormFileInputProps extends React.ComponentPropsWithoutRef<'input'> {
  $isError?: boolean;
}

const ModelFormFileInput = React.forwardRef<HTMLInputElement, IModelFormFileInputProps>((props, ref) => {
  const { $isError, ...rest } = props;

  return <StyledInput ref={ref} type="file" $isError={$isError} {...rest} />;
});

ModelFormFileInput.displayName = 'ModelFormFileInput';

export default ModelFormFileInput;

const StyledInput = styled.input<{ $isError?: boolean }>`
  width: 100%;
  height: ${toRem(48)};
  padding: ${toRem(12)} ${toRem(16)};
  border-radius: ${toRem(5)};
  border: 1px solid ${({ $isError }) => ($isError ? commonColors.red500 : commonColors.neutral400)};
  background-color: ${commonColors.neutral50};
  font-size: ${toRem(16)};
  color: ${commonColors.neutral900};
  box-sizing: border-box;

  &::file-selector-button {
    display: none;
  }

  &:focus {
    outline: none;
    border-color: ${commonColors.blue500};
  }
`;
