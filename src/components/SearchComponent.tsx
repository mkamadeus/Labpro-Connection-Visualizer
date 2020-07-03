import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    toolbar: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      alignItems: 'flex-start',
    },
  });
});

/**
 * `SearchComponent` component.
 * The component that holds information for the top application bar.
 */
const SearchComponent = () => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <SearchBar />
        </Toolbar>
      </AppBar>
      {/* <Toolbar className={classes.toolbar} style={{ content: '' }} /> */}
    </>
  );
};

export default SearchComponent;
