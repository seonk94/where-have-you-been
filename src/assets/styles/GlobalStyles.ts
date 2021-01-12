import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0px !important;
  }
`;

export const Spacer = styled.div`
	flex-grow: 1;
`;
