import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'src/components/navbar/AppBar';
import main from 'src/pages/main';

function Root() {

  return <>
    <AppBar/>
    <Switch>
      <Route exact
        path="/"
        component={main} />
    </Switch>
  </>;
}
export default Root;
