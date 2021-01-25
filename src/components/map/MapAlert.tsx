import React from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

const AlertWrapper = styled.div<{ show : boolean}>`
  display: ${(props) => props.show ? 'block' : 'none'};
  position: absolute;
  margin: 12px;
  z-index: 5;
`;

interface Props {
  show: boolean;
}
function MapAlert({ show } : Props) {
  return (
    <AlertWrapper show={show}>
      <Alert variant='dark'>
        추가할 곳을 선택해주세요.
      </Alert>
    </AlertWrapper>
  );
}

export default MapAlert;
