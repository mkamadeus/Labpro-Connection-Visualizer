import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Box,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  CitizenData,
  ElementBending,
  getCitizenData,
  ElementColors,
} from '../api/citizen';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: theme.shadows[6],
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
  // States
  const [data, setCitizenData] = useState<CitizenData[]>([]);

  useEffect(() => {
    async function getFriends() {
      await getCitizenData('1').then((response: CitizenData) => {
        setCitizenData(response?.friends as CitizenData[]);
      });
    }
    getFriends();
  }, []);

  return (
    <List style={{ flex: '1 1 auto', overflowY: 'scroll', height: '0px' }}>
      {data.map((citizen: CitizenData) => {
        return (
          <ListItem key={`citizen_${citizen.id}`}>
            <ListItemAvatar>
              <Avatar
                style={{ backgroundColor: ElementColors[citizen.element] }}
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
      })}
    </List>
  );
};

const SuspectList = () => {
  // Stylesheet
  const classes = useStyles();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      height={'100%'}
      className={classes.root}
    >
      <Box
        p={5}
        bgcolor={'white'}
        borderRadius={'5px'}
        display={'flex'}
        flexDirection={'column'}
        flex={'1 1 auto'}
      >
        <Typography className={classes.title}>Suspects:</Typography>
        <Box
          display={'flex'}
          flexDirection={'column'}
          height={'100%'}
          mt={'1em'}
          className={classes.suspectContainer}
        >
          <SuspectListItems />
        </Box>
        <Box mt={'2em'}>
          <Button variant="contained" fullWidth color={'primary'}>
            Show Suspect Graph
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SuspectList;
