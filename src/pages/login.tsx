import { Box, Paper, Typography, Grid, Divider } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { Spacer } from 'src/assets/styles/GlobalStyles';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/app';
import { GoogleProvider } from 'src/firebase';
const useStyles = makeStyles({
  container : {
    height : '100vh'
  },
  item : {
    height : '100%',
    maxWidth : '520px'
  },
  row : {
    display : 'flex',
    flexDirection : 'column',
    height : 'calc(100% - 16px)',
    padding : '16px',
    boxSizing : 'border-box',
    margin : '8px'
  },
  title : {
    fontWeight : 700,
    paddingBottom : '8px',
    marginBottom : '16px',
    marginTop : '48px'
  },
  footer : {
    textAlign : 'center'
  }
});


function login() {
  const classes = useStyles();
  const history = useHistory();
  
  useEffect(() => {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl : '/',
      signInOptions : [
        GoogleProvider
      ]
    });
  }, []);

  return (
    <Paper square>
      <Grid container justify="center" className={classes.container}>
        <Grid item xs={12} sm={4} className={classes.item}>
          <Paper variant="outlined" className={classes.row}>
            <Typography variant="h4" className={classes.title}>
            로그인
            </Typography>
            <Divider/>
            <section id="firebaseui-auth-container"></section>
            <Spacer/>
            <Typography variant="caption" className={classes.footer}>
            buba @ record-map
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default login;
