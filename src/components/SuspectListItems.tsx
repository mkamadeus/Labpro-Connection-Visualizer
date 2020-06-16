import React, { useEffect, useState, useContext } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CitizenData, ElementColors } from '../api/citizen';
import SuspectContext from '../context/SuspectContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listRoot: {
      flex: '1 1 auto',
      overflowY: 'scroll',
      height: '0px',
    },
  })
);

const SuspectListItems = () => {
  const classes = useStyles();

  const { data } = useContext(SuspectContext);
  const [citizenData, setCitizenData] = useState<CitizenData[]>([]);
  // useEffect(() => {
  //   setCitizenData(Array.from(data));
  // }, [data]);

  return (
    <List className={classes.listRoot}>
      {citizenData.map((citizen: CitizenData) => {
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
      })}
    </List>
  );
};

export default SuspectListItems;
