import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { toRem } from '@/utils/styleUtil';
import commonColors from '@/constants/colors';
import { ModelStep } from '@/types/commonTypes';
import { IMoveToStepFunc } from '@/interfaces/modalInterfaces';

const LevelRadio = (props: IMoveToStepFunc): React.ReactNode => {
  const { $setMoveToStep } = props;

  const [radioValue, setRadioValue] = useState<ModelStep>('MSPROJ');

  const onClickRadio = (arg: ModelStep) => {
    setRadioValue(arg);
  };

  useEffect(() => {
    if (!$setMoveToStep) return;

    $setMoveToStep(radioValue);
  }, [radioValue]);

  return (
    <LevelRadioWraaper>
      <RadioBox onClick={() => onClickRadio('MSPROJ')}>
        <input type="radio" id="project" name="radio" value="project" defaultChecked={radioValue === 'MSPROJ'} />
        <label htmlFor="project">Project 단계</label>
      </RadioBox>
      <RadioBox onClick={() => onClickRadio('MSSTAG')}>
        <input type="radio" id="staging" name="radio" value="staging" defaultChecked={radioValue === 'MSSTAG'} />
        <label htmlFor="staging">Staging 단계</label>
      </RadioBox>

    </LevelRadioWraaper>
  );
};

export default LevelRadio;
const LevelRadioWraaper = styled.div`
    display: flex;
    gap: ${toRem(10)};

    label {
        font-size: ${toRem(14)};
        line-height: ${toRem(20)};
        color: rgba(51, 57, 66, 1);
        font-weight: 600;
      color: ${commonColors.neutral800};
    }

    [type="radio"], span {
        vertical-align: middle;
    }

    [type="radio"] {
        appearance: none;
        border: ${toRem(1)} solid ${commonColors.neutral600};
        border-radius: 50%;
        width: 1.25em;
        height: 1.25em;
        //transition: border 0.5s ease-in-out;
    }

    [type="radio"]:checked {
        border: 0.4em solid rgba(1, 105, 205, 1);
        color: rgba(1, 105, 205, 1);
    }

    [type="radio"]:checked + label {
        color: rgba(1, 105, 205, 1);
    }

    [type="radio"]:focus-visible {
        outline-offset: max(2px, 0.1em);
        outline: max(2px, 0.1em) dotted tomato;
    }

    [type="radio"]:hover {
        box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
        cursor: pointer;
    }

    [type="radio"]:hover + span {
        cursor: pointer;
    }

    [type="radio"]:disabled {
        background-color: lightgray;
        box-shadow: none;
        opacity: 0.7;
        cursor: not-allowed;
    }

    [type="radio"]:disabled + span {
        opacity: 0.7;
        cursor: not-allowed;
    }

    /* Global CSS */

    fieldset {
        display: flex;
        justify-content: center;
        border: none;
        margin: 0;
        padding: 40px 20px;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }


`;

const RadioBox = styled.div`
    width: ${toRem(200)};
    height: ${toRem(62)};
    display: flex;
    align-items: center;
    border-radius: ${toRem(6)};
    border: ${toRem(1)} solid ${commonColors.neutral400};

    input {
        margin: 0 ${toRem(8)} 0 ${toRem(20)};
    }
    
    &:hover{
        cursor: pointer;
    }
`;
