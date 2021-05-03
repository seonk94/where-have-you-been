/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useState } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { PaletteType } from '@material-ui/core';

interface Props {
  children: React.ReactNode
}

interface ThemeContextInterface {
  theme: PaletteType;
  setTheme: Function;
}

export const ThemeContext = createContext<ThemeContextInterface>({ theme : 'light', setTheme : () => { return; } });

function ThemeProvider({ children } : Props) {
  const [theme, setTheme] =  useState<PaletteType>('dark');
  const customTheme = createMuiTheme({
    palette : {
      type : theme,
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

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme
    }}>
      <MuiThemeProvider theme={customTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;