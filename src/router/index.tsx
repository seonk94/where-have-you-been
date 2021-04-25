/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'src/components/common/Loading';
import { firebaseAuth } from 'src/lib/provider/AuthProvider';
import login from 'src/pages/login';
import main from 'src/pages/main';

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
  return <div>
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
  </div>;
}
export default Root;
