import React, { useState, useContext } from 'react';
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  colors,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  MenuItem,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { SuspectContext } from '../context/SuspectContext';
import { CitizenData, ElementColors } from '../api/citizen';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      colors: theme.palette.grey[500],
    },
    title: {
      fontSize: '24pt',
      fontWeight: 600,
    },
    suspectContainer: {
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.shape.borderRadius,
    },
  })
);

const SuspectListItems = () => {
  let suspects: CitizenData[] = [];
  const { suspectMap } = useContext(SuspectContext);

  for (let i = 0; i < Object.keys(suspectMap!).length; i++) {
    suspects.push(suspectMap![Object.keys(suspectMap!)[i]]);
  }

  return (
    <List dense disablePadding>
      {suspects.length !== 0 ? (
        suspects.map((citizen: CitizenData) => {
          return (
            <ListItem key={`citizen_${citizen.id}`}>
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: ElementColors[citizen.element],
                  }}
                >
                  {citizen.name[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={citizen.name}
                secondary={`ID: #${citizen.id}`}
              />
            </ListItem>
          );
        })
      ) : (
        <Typography>No suspects yet!</Typography>
      )}
    </List>
  );
};

const SuspectList = () => {
  // Stylesheet
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const showSuspectGraph = () => {};

  return (
    <>
      <MenuItem onClick={handleOpen}>Open suspects list</MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <MuiDialogTitle disableTypography className={classes.root}>
          <Typography variant="h6">Suspects</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <DialogContent dividers>
          <SuspectListItems />
        </DialogContent>
        <DialogActions>
          <Button fullWidth color={'primary'}>
            Show Suspect Graph
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuspectList;
