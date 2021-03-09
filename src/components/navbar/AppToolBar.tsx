import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { UserContext } from 'src/lib/provider/UserProvider';
import RecordDrawer from './RecordDrawer';

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
          <RecordDrawer drawer={drawer} toggleDrawer={toggleDrawer}/>
          <Typography variant="h6" className={classes.title}>
            Map Marker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppToolbar;
