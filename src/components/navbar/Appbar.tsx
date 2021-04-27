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
  root : {
    flexGrow : 1
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
      <AppBar className={classes.appbar} position="static">
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
