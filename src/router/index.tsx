import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppToolbar from 'src/components/navbar/AppToolBar';
import login from 'src/pages/login';
import main from 'src/pages/main';

function Root() {

  return <>
    <AppToolbar/>
    <Switch>
      <Route exact
        path="/"
        component={main} />
      <Route exact
        path="/login"
        component={login} />
    </Switch>
  </>;
}
export default Root;
