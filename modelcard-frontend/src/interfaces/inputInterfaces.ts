import React from 'react';

export interface InputProps {
  $placeholder?: string;
  $isSearch?: boolean;
  $isTextCount?: boolean;
  $isShowTextCount?: boolean;
  $textMaxLength?: number;
  $value?: string;
  $onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  $isError?:boolean;
}
