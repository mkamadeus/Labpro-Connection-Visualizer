import React from 'react';
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import DialogBase from './DialogBase';
import { CitizenData, ElementColors } from '../api/citizen';
import useGraph from '../hook/GraphHook';

const SuspectList = () => {
  // Graph Hook
  const { getSuspectArray, getSuspectGraphData } = useGraph();

  // Create suspect list
  let suspects: CitizenData[] = getSuspectArray();

  return (
    <DialogBase
      action={'Open suspect list'}
      title={'Suspects'}
      button={
        <Button onClick={getSuspectGraphData} disabled={suspects.length === 0}>
          Show Suspect Graph
        </Button>
      }
    >
      <List dense>
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
                  primaryTypographyProps={{ variant: 'body2' }}
                  primary={citizen.name}
                  secondaryTypographyProps={{ variant: 'caption' }}
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
