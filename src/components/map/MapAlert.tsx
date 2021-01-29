import React from 'react';
import { Message } from 'semantic-ui-react';
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
      <Message positive>
        추가할 곳을 선택해주세요.
      </Message>
    </AlertWrapper>
  );
}

export default MapAlert;
