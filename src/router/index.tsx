import React from 'react';
import { Route, Switch } from 'react-router-dom';
import login from 'src/pages/login';
import main from 'src/pages/main';

function Root() {

  return <>
    <Switch>
      <Route exact
        path="/"
        key="main"
        component={main} />
      <Route exact
        path="/login"
        key="login"
        component={login} />
    </Switch>
  </>;
}
export default Root;
