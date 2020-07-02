import React, { useState } from 'react';
import { InputBase, Theme } from '@material-ui/core';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import useGraph from '../hook/GraphHook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      // marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
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
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
  })
);

const SearchBar = () => {
  // Stylesheet
  const classes = useStyles();

  // States
  const [query, setQuery] = useState('');

  // Custom Hook
  const { expandNode } = useGraph();

  const handleSearch = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      await expandNode!(query as string);
    }
  };

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
        onKeyDown={handleSearch}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
