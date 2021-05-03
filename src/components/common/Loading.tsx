import { CircularProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles({
  root : {
    position : 'absolute',
    width : '100%',
    height : '100%',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    justifyContent : 'center'
  }
});

function Loading() {
  const classes = useStyles();
  return (
    <Paper className={classes.root} square elevation={0}>
      <h3>Loading</h3>
      <CircularProgress />
    </Paper>
  );
}

export default Loading;
