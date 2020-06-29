import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MenuItem,
  Dialog,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Avatar,
  Box,
  Grid,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogBase from './DialogBase';
import classes from '*.module.css';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    avatar: {
      height: theme.spacing(12),
      width: theme.spacing(12),
    },
  });
});

const HelpDialog = () => {
  const classes = useStyles();

  const links = [
    {
      icon: require('@fortawesome/free-brands-svg-icons/faGithub').faGithub,
      color: '#000000',
      link:
        'https://github.com/mkamadeus/Labpro-Connection-Visualizer/tree/master',
    },
    {
      icon: require('@fortawesome/free-solid-svg-icons/faFile').faFile,
      color: '#2a9df4',
      link:
        'https://docs.google.com/document/d/1W7FoXIVN7OsY6xlA5Q1VarpExBwgMWQemsFHtbPHRhI/edit#heading=h.88r1nzalmz5u',
    },
  ];

  return (
    <DialogBase action={'Help'} title={'Help'}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        paddingBottom="0.5em"
      >
        <Avatar
          src={require('../images/author.jpg')}
          alt="author-image"
          className={classes.avatar}
        />
        <Typography variant="subtitle2">Matthew Kevin Amadeus</Typography>
        <Typography variant="caption">13518035</Typography>
      </Box>
      <Typography variant="body1" gutterBottom>
        This dialog was meant for people who seek for assistance regarding the
        use of this application.
      </Typography>
      <Typography variant="h6">How to Use</Typography>
      <Typography variant="body2" gutterBottom>
        Beifong-Wangky Suspect Expander was created to help the Republic City
        Police Department analyzing the connection between suspects. Generally,
        to use this application you can do several things:
        <ul>
          <li>
            Type in a valid citizen ID into the search box, then press Enter.
          </li>
          <li>
            Preview a graph symbolizing each citizen's link with each other.
          </li>
          <li>
            Preview a citizen's information; their bending abilities, citizen
            ID, and their connections.
          </li>
          <li>
            Expand a node to show more connections related to the node. You can
            click on the node itself or you may expand it via the citizen
            information panel.
          </li>
          <li>
            Clear the graph preview along with the citizen information preview.
          </li>
        </ul>
      </Typography>
      <Typography variant="h6">More</Typography>
      <Typography variant="body2" gutterBottom>
        Well, that's about it. Below are several links that is important to this
        project.
      </Typography>
      <Grid container spacing={2}>
        {links.map((value) => {
          return (
            <Grid item key={value.link}>
              <a href={value.link}>
                <FontAwesomeIcon
                  icon={value.icon}
                  size="2x"
                  color={value.color}
                />
              </a>
            </Grid>
          );
        })}
      </Grid>
    </DialogBase>
  );
};

export default HelpDialog;
