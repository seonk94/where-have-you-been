import { Box, Container, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import KakaoLoginButton from 'src/assets/images/kakao_login_medium_narrow.png';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { getMe, useUserDispatch } from 'src/lib/provider/UserProvider';

const useStyles = makeStyles({
  container : {
    height : 'calc(100vh - 64px)'
  },
  loginColumn : {
    height : '100%',
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center'
  },
  loginBox : {
    border : '1px solid #e6e6e6',
    padding : '24px',
    borderRadius : '8px'
  },
  loginImage : {
    display : 'block',
    cursor : 'pointer'
  },
  loginButton : {
    outline : 'none',
    border : 'none',
    background : '#fff',
    padding : '0'
  },
  title : {
    fontWeight : 700,
    paddingBottom : '8px',
    marginBottom : '16px',
    borderBottom : '1px solid #212121'
  }
});


function login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useUserDispatch();
  
  function handleLogin() {
    window.Kakao.Auth.login({
      success : function(authObj : {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        refresh_token_expires_in: number;
        token_type: string;
      }) {
        window.Kakao.Auth.setAccessToken(authObj.access_token);
        getMe(dispatch);
        history.push('/');
      },
      fail : function(err : {
        error: string;
        error_description: string;
      }) {
        console.error(err);
      }
    });
  }
  return (
    <Container className={classes.container}>
      <Box className={classes.loginColumn}>
        <Box className={classes.loginBox}>
          <Typography variant="h6" className={classes.title}>
            로그인
          </Typography>
          <button onClick={handleLogin} className={classes.loginButton}>
            <img className={classes.loginImage} src={KakaoLoginButton} alt="kakao login"/>
          </button>
        </Box>
      </Box>
    </Container>
  );
}

export default login;
