import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import icSearch from '@/assets/images/atoms/icSearch.svg';
import { toRem } from '@/utils/styleUtil';
import { InputProps } from '@/interfaces/inputInterfaces';

const Input = (props: InputProps): React.ReactNode => {
  const {
    $placeholder,
    $isSearch,
    $isTextCount,
    $isShowTextCount,
    $textMaxLength,
    $value,
    $onChangeValue,
  } = props;

  const [text, setText] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if ($textMaxLength && $isShowTextCount && newText.length > $textMaxLength) {
      return;
    }

    setText(e.target.value);

    if ($onChangeValue) { $onChangeValue(e); }
  };

  useEffect(() => {
    setText($value || '');
  }, [$value]);

  return (
    <InputWrapper>
      <TextInput placeholder={$placeholder} value={text} onChange={handleOnChange} />
      {$isSearch && <Img src={icSearch.src} alt="검색" />}
      {$isTextCount && $isShowTextCount && (
        <TextCount>
          {text?.length}
          /
          {$textMaxLength}
        </TextCount>
      )}
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
`;
const TextInput = styled.input`
    //    width: Fixed (500px)
    //height: Fixed (42px)
    //padding: 0px, 14px, 0px, 14px
    //border-radius: 5px
    //border: 1px
    //justify: space-between

    width: 100%;
    height: ${toRem(42)};


    padding: 0 ${toRem(14)};
    padding-right: ${toRem(38)};

    border: 1px solid rgba(186, 192, 204, 1);
    border-radius: ${toRem(5)};

    font-size: ${toRem(16)};
    color: rgba(0, 0, 0, 1);

    &::placeholder {
        color: rgba(186, 192, 204, 1);
    }
`;

const Img = styled.img`
    position: absolute;
    right: ${toRem(14)};

    width: ${toRem(24)};
    height: ${toRem(24)};
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
