import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, IconButton, List, ListItemIcon, ListItemText } from '@material-ui/core';
import { useMainTemplateState } from 'src/lib/provider/RecordProvider';
import { MoreVert } from '@material-ui/icons';
import styled from 'styled-components';

interface Props {
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
  drawer: boolean;
}

const useStyles = makeStyles({
  drawer : {
    width : 250
  },
  list : {
    padding : '0'
  },
  root : {
    flexGrow : 1
  },
  spacer : {
    flexGrow : 1
  }
});

const ListItem = styled.div`
  display: block;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

function RecordDrawer({ toggleDrawer, drawer } : Props) {
  const classes = useStyles();

  const list = () => (
    <div
      className={clsx(classes.drawer)}
      role="presentation"
    >
      <List className={classes.list}>
        
      </List>
    </div>
  );

  return (
    <SwipeableDrawer anchor="left" open={drawer} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
      {list()}
    </SwipeableDrawer>
  );
}

export default RecordDrawer;
