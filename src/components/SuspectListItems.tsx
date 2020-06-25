import React, { useContext } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CitizenData, ElementColors } from '../api/citizen';
import { SuspectContext } from '../context/SuspectContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listRoot: {
      flex: '1 1 auto',
      overflowY: 'scroll',
      height: '0px',
    },
  })
);

const listItems = (suspectMap: { [key: string]: CitizenData }) => {
  let suspects: CitizenData[] = [];
  for (let i = 0; i < Object.keys(suspectMap!).length; i++) {
    suspects.push(suspectMap[Object.keys(suspectMap!)[i]]);
  }

  return suspects.map((citizen: CitizenData) => {
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
        <ListItemText primary={citizen.name} secondary={`ID: #${citizen.id}`} />
      </ListItem>
    );
  });
};

const SuspectListItems = () => {
  const classes = useStyles();
  const { suspectMap } = useContext(SuspectContext);

  return <List className={classes.listRoot}>{listItems(suspectMap!)}</List>;
};

export default SuspectListItems;
