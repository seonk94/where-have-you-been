import React from 'react';
import styled from 'styled-components';

const AppBarContainer = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 12px;
`;
const AppBarTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

function AppBar() {
  return (
    <AppBarContainer>
      <AppBarTitle>
        Map Marker
      </AppBarTitle>
    </AppBarContainer>
  );
}

export default AppBar;
