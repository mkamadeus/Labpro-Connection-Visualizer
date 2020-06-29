import React, { useState } from 'react';
import {
  createMuiTheme,
  PaletteType,
  MuiThemeProvider,
} from '@material-ui/core';

export const ThemeContext = React.createContext<() => void>(() => {});

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState({
    palette: {
      type: 'light' as PaletteType,
    },
  });

  const toggleTheme = () => {
    setTheme({
      palette: {
        type: theme.palette.type === 'light' ? 'dark' : 'light',
      },
    });
  };

  const muiTheme = createMuiTheme(theme);

  return (
    <ThemeContext.Provider value={toggleTheme}>
      <MuiThemeProvider theme={muiTheme}>{props.children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
