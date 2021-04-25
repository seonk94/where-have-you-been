import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Loading() {
  return (
    <LoadingContainer>
      <h3>Loading</h3>
      <CircularProgress />
    </LoadingContainer>
  );
}

export default Loading;
