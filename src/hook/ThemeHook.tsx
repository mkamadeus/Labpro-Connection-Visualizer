import React, { useContext } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useContext({
    palette: {
      type: 'light',
    },
  });

  const toggleTheme = () => {
    setTheme({
      palette: {
        type: theme.palette.type === 'light' ? 'dark' : 'light',
      },
    });
  };

  const muiTheme = createMuiTheme;
};
