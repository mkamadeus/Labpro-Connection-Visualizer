import React, { useState, useContext } from 'react';
import {
  Fab,
  Menu,
  MenuItem,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import SuspectList from './SuspectList';
import HelpDialog from './HelpDialog';
import { ThemeContext } from '../context/ThemeContext';
import useGraph from '../hook/GraphHook';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  });
});

const FloatingActionButton = () => {
  // State
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  // Graph Hook
  const { clearGraph } = useGraph();

  // Theme Context
  const toggleTheme = useContext(ThemeContext);

  // Stylesheet
  const classes = useStyles();

  // Function for handling fab click
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  // Function for handling fab close
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="fav"
        onClick={handleClick}
        className={classes.fab}
      >
        <PeopleIcon />
      </Fab>
      <Menu
        anchorEl={anchor as HTMLElement}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <SuspectList />
        <MenuItem onClick={clearGraph}>Clear graph</MenuItem>
        <HelpDialog />
        <MenuItem onClick={toggleTheme}>Toggle theme</MenuItem>
      </Menu>
    </>
  );
};

export default FloatingActionButton;
