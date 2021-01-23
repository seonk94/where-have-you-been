import React from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

const AlertWrapper = styled.div<{ editMode : boolean}>`
  display: ${(props) => props.editMode ? 'block' : 'none'};
  position: absolute;
  margin: 12px;
  z-index: 5;
`;

interface Props {
  editMode: boolean;
}
function MapAlert({ editMode } : Props) {
  return (
    <AlertWrapper editMode={editMode}>
      <Alert variant='dark'>
        추가할 곳을 선택해주세요.
      </Alert>
    </AlertWrapper>
  );
}

export default MapAlert;
