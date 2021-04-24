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
import AuthProvider from './lib/provider/AuthProvider';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const customTheme = createMuiTheme({
  palette : {
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

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={customTheme}>
      <BrowserRouter>
        <AuthProvider>
          <ApolloProvider client={client}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <RecordProvider>
                <Root />
                <GlobalStyle/>
              </RecordProvider>
            </MuiPickersUtilsProvider>
          </ApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
