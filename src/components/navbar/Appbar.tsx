import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root : {
    flexGrow : 1,
    position : 'sticky',
    top : 0,
    zIndex : 1000
  },
  appbar : {
    boxShadow : 'none'
  },
  title : {
    flexGrow : 1
  },
  spacer : {
    flexGrow : 1
  }
});

function Appbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Map Marker
          </Typography>
          <div className={classes.spacer}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Appbar;
