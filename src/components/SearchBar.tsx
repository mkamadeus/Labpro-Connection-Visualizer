import React from 'react';
import { InputBase, Theme } from '@material-ui/core';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(
  ({ shape, palette, spacing, transitions, shadows }: Theme) =>
    createStyles({
      search: {
        position: 'relative',
        borderRadius: shape.borderRadius,
        backgroundColor: fade(palette.common.white, 0.15),
        boxShadow: shadows[3],
        '&:hover': {
          backgroundColor: fade(palette.common.white, 0.25),
        },
        '&:focus-within': {
          backgroundColor: fade(palette.common.white, 0.25),
          boxShadow: shadows[6],
        },
        transition: transitions.create('box-shadow'),
        marginLeft: 0,
        width: '100%',
      },
      searchIcon: {
        padding: spacing(0, 2),
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
        padding: spacing(2, 1, 2, 0),
        paddingLeft: `calc(1em + ${spacing(4)}px)`,
        transition: transitions.create('width'),
        width: '100%',
        fontSize: '1.3em',
      },
    })
);

const SearchBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        classes={{ root: classes.inputRoot, input: classes.inputInput }}
      />
    </div>
  );
};

export default SearchBar;
