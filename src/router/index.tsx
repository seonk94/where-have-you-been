import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import AppToolbar from 'src/components/navbar/AppToolBar';
import login from 'src/pages/login';
import main from 'src/pages/main';

function Root() {
  const history = useHistory();
  const [showAppBar, setShowAppBar] = useState(false);
  
  useEffect(() => {
    history.listen(() => {
      setShowAppBar(!history.location.pathname.includes('login'));
    });
  }, [history]);

  useEffect(() => {
    setShowAppBar(!history.location.pathname.includes('login'));
  }, []);
  return <>
    {
      showAppBar && 
    <AppToolbar/>
    }
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
