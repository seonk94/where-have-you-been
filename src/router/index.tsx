import React, { Suspense, useContext, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import { firebaseAuth } from 'src/lib/provider/AuthProvider';
import main from 'src/pages/main';
import login from 'src/pages/login';
import ThemeProvider from 'src/lib/provider/ThemeProvider';

interface RouteProps {
  exact: boolean;
  path: string;
  key: string;
  user: firebase.default.User | null
  component: () => JSX.Element
}
function AuthRoute({ user, component, path, key, exact } : RouteProps) {

  return (
    user 
      ? <Route 
        exact
        path={path}
        key={key}
        component={component}/>
      : <Redirect to={{ pathname : '/login' }}/>
  );
}

function Root() {
  const { user, loadingAuthState } = useContext(firebaseAuth);

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
