import React, { useContext } from 'react';
import { InputBase, Theme } from '@material-ui/core';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { SearchContext } from '../context/SearchContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      boxShadow: theme.shadows[1],
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      '&:focus-within': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        boxShadow: theme.shadows[2],
      },
      transition: theme.transitions.create('box-shadow'),
      marginLeft: 0,
      width: '100%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      width: '100%',
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(2, 1, 2, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      // fontSize: '1.3em',
    },
  })
);

const SearchBar = () => {
  const classes = useStyles();
  const { setQuery } = useContext(SearchContext);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery!(event.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={'Search for ID...'}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
