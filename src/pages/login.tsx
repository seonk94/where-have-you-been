import { Box, Container, Typography } from '@material-ui/core';
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
  loginColumn : {
    height : '100%',
    display : 'flex',
    flexDirection : 'column',
    backgroundColor : '#f5f5f5',
    width : 'fit-content',
    minWidth : '320px',
    margin : 'auto',
    padding : '16px',
    boxSizing : 'border-box'
  },
  title : {
    fontWeight : 700,
    paddingBottom : '8px',
    marginBottom : '16px',
    marginTop : '48px',
    borderBottom : '1px solid #212121'
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
    <Container className={classes.container}>
      <Box className={classes.loginColumn}>
        <Typography variant="h4" className={classes.title}>
            로그인
        </Typography>
        <section id="firebaseui-auth-container"></section>
        <Spacer/>
        <Typography variant="caption" className={classes.footer}>
            buba @ record-map
        </Typography>
      </Box>
    </Container>
  );
}

export default login;
