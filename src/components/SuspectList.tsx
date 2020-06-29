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
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import RemoveIcon from '@material-ui/icons/Remove';
import DialogBase from './DialogBase';
import { SuspectContext } from '../context/SuspectContext';
import { CitizenData, ElementColors } from '../api/citizen';

const SuspectList = () => {
  let suspects: CitizenData[] = [];
  const { suspectMap, suspectMapDispatcher } = useContext(SuspectContext);

  for (let i = 0; i < Object.keys(suspectMap!).length; i++) {
    suspects.push(suspectMap![Object.keys(suspectMap!)[i]]);
  }

  return (
    <DialogBase
      action={'Open suspect list'}
      title={'Suspects'}
      // button={<button></button>}
    >
      <List dense>
        {suspects.length !== 0 ? (
          suspects.map((citizen: CitizenData) => {
            return (
              <ListItem key={`citizen_${citizen.id}`} divider>
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
                  primaryTypographyProps={{ variant: 'body2' }}
                  primary={citizen.name}
                  secondaryTypographyProps={{ variant: 'caption' }}
                  secondary={`ID: #${citizen.id}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() =>
                      suspectMapDispatcher!({
                        type: 'REMOVE_SUSPECT',
                        id: citizen.id,
                      })
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                </ListItemSecondaryAction>
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
