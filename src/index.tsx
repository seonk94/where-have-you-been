import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Root from './router';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import RecordProvider from './lib/provider/RecordProvider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { UserProvider } from './lib/provider/UserProvider';

(window.Kakao).init(process.env.REACT_APP_KAKAO_KEY);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ApolloProvider client={client}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <RecordProvider>
              <Root />
              <GlobalStyle/>
            </RecordProvider>
          </MuiPickersUtilsProvider>
        </ApolloProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
