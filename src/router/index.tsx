import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import MainTemplate from 'src/template/MainTemplate';

function Root() {

  return <>
    <Switch>
      <Route exact
        path="/"
        component={MainTemplate} />
    </Switch>
  </>;
}
export default Root;
