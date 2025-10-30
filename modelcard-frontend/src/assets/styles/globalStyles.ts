'use client';

import { createGlobalStyle } from 'styled-components';

import commonColors from '@/constants/colors';

const GlobalStyles = createGlobalStyle`
  * {
    word-break: keep-all;
  }

  html {
    width: 100%;
    background-color: ${commonColors.neutral100};
  }

  // Link, a태그 초기화
  a {
    text-decoration: none;
    outline: none
  }

  a:hover, a:active {
    text-decoration: none;
  }
  
  button {
	  border: none;
	  cursor: pointer;
	  background-color: transparent;
	  
	  &:disabled {
		  cursor: default;
	  }
  }
  
  input, textarea, button {
	  outline: none;
  }

  //p {
  //  white-space: pre-line;
  //
  //  span {
  //    white-space: pre-line;
  //  }
  //}
`;

export default GlobalStyles;
