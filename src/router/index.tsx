/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useContext, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import { firebaseAuth } from 'src/lib/provider/AuthProvider';
import main from 'src/pages/main';
import login from 'src/pages/login';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { PaletteType } from '@material-ui/core';
import ThemeProvider from 'src/lib/provider/ThemeProvider';

function AuthRoute({ user, component : Component, path, ...rest } : any) {
  const render = (props : any) => <Component {...props} />;
  return (
    user 
      ? <Route path={path}
        render={render}
        {...rest}/>
      : <Redirect to={{ pathname : '/login' }}/>
  );
}

function Root() {
  const { user, loadingAuthState } = useContext(firebaseAuth);
  const [themeType, setThemeType] = useState<PaletteType>('dark');
  const customTheme = createMuiTheme({
    palette : {
      type : themeType,
      primary : {
        main : '#546e7a'
      },
      secondary : {
        main : '#004d40'
      },
      error : {
        main : '#d50000'
      }
    },
    typography : {
      fontFamily : 'Noto Sans'
    }
  });

  return <ThemeProvider>
    {
      loadingAuthState ? <Loading />
        : 
        <Switch>
          <AuthRoute exact
            path="/"
            key="main"
            user={user}
            component={main} />
          <Route exact
            path="/login"
            key="login"
            component={login} />
        </Switch>
    }
  </ThemeProvider>;
}
export default Root;
