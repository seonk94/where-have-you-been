import React from 'react';
import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
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
const MenuIconButton = styled(FiMenu)`
  padding: 8px;
  cursor: pointer;
  border-radius: 50%;
  margin-right: 4px;
  &:hover {
    background: #ddd;
  }
`;

function AppBar() {
  return (
    <AppBarContainer>
      <MenuIconButton/>
      <AppBarTitle>
        Map Marker
      </AppBarTitle>
    </AppBarContainer>
  );
}

export default AppBar;
