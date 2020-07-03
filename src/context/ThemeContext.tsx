import React, { useState } from 'react';
import {
  createMuiTheme,
  PaletteType,
  MuiThemeProvider,
} from '@material-ui/core';

/**
 * SuspectContext context definition.
 */
export const ThemeContext = React.createContext<() => void>(() => {});

/**
 * SuspectContextProvider props definition.
 */
export type ThemeContextProviderProps = {
  children: React.ReactNode;
};

/**
 * SuspectContextProvider Component.
 */
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
