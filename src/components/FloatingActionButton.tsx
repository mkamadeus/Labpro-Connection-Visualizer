import React, { useState } from 'react';
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
import useGraphInfo from '../hook/GraphInfoHook';

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
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { clearGraph } = useGraphInfo();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

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
      </Menu>
    </>
  );
};

export default FloatingActionButton;
