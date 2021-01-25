import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from 'src/components/navbar/AppBar';
import MainTemplate from 'src/template/main/MainTemplate';

function Root() {

  return <>
    <AppBar/>
    <Switch>
      <Route exact
        path="/"
        component={MainTemplate} />
    </Switch>
  </>;
}
export default Root;
