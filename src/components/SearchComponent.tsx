import React from 'react';
import {
  Box,
  makeStyles,
  Theme,
  createStyles,
  Menu,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SearchBar from './SearchBar';
import { SearchContextProvider } from '../context/SearchContext';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    searchRoot: { padding: '1em' },
    root: {
      flexGrow: 1,
    },
    toolbar: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      alignItems: 'flex-start',
    },
  });
});

const SearchComponent = () => {
  const classes = useStyles();
  return (
    <>
      <SearchContextProvider>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <SearchBar />
          </Toolbar>
        </AppBar>
      </SearchContextProvider>
      <Toolbar className={classes.toolbar} style={{ content: '' }} />
    </>
  );
};

export default SearchComponent;
