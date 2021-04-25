import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RecordDrawer from './RecordDrawer';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import { firebaseAuth } from 'src/lib/provider/AuthProvider';
import { auth } from 'src/firebase';

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
  },
  spacer : {
    flexGrow : 1
  }
});

function AppToolbar() {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(firebaseAuth);

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

  function handleLogout() {
    auth.signOut();
    history.push('/login');
  }

  function handleLogin() {
    history.push('/login');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {
            user && 
            <>
              <IconButton edge="start"  onClick={() => setDrawer(true)} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <RecordDrawer drawer={drawer} toggleDrawer={toggleDrawer}/>
            </>
          }
          <Typography variant="h6" className={classes.title}>
            Map Marker
          </Typography>
          <div className={classes.spacer}/>
          {
            user
              ? <Button color="inherit" onClick={() => handleLogout()}>로그아웃</Button>
              : <Button color="inherit" onClick={() => handleLogin()}>로그인</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppToolbar;
