import { Button, Fade, Menu, MenuItem, Paper } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const MenuContainer = styled(Paper)`
  display: flex;
  align-items: center;
  margin: 4px 0;
  position: sticky;
  z-index: 1000;
  top: 56px;
`;

function BoardMenu() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <MenuContainer elevation={0} square>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        최신 순
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>최신 순</MenuItem>
        <MenuItem onClick={handleClose}>오래된 순</MenuItem>
      </Menu>
    </MenuContainer>
  );
}

export default React.memo(BoardMenu);
