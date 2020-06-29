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
import DialogBase from './DialogBase';
import { SuspectContext } from '../context/SuspectContext';
import { CitizenData, ElementColors } from '../api/citizen';

const SuspectList = () => {
  let suspects: CitizenData[] = [];
  const { suspectMap } = useContext(SuspectContext);

  for (let i = 0; i < Object.keys(suspectMap!).length; i++) {
    suspects.push(suspectMap![Object.keys(suspectMap!)[i]]);
  }

  return (
    <DialogBase
      action={'Open suspect list'}
      title={'Suspects'}
      // button={<button></button>}
    >
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
    </DialogBase>
  );
};

export default SuspectList;
