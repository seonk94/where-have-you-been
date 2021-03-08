import React, { useContext, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import UserProvider, { UserContext } from 'src/lib/provider/UserProvider';

const useStyles = makeStyles({
  list : {
    width : 250
  },
  fullList : {
    width : 'auto'
  },
  root : {
    flexGrow : 1
  },
  title : {
    flexGrow : 1
  }
});

function AppToolbar() {
  const [drawer, setDrawer] = useState(false);
  const { userId } = useContext(UserContext);
  const classes = useStyles();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawer(open);
  };
  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {
            userId && 
            <IconButton edge="start"  onClick={() => setDrawer(true)} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          }
          <SwipeableDrawer anchor="left" open={drawer} onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
            {list()}
          </SwipeableDrawer>
          <Typography variant="h6" className={classes.title}>
            Map Marker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppToolbar;
