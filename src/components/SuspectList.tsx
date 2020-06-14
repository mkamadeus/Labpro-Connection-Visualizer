import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SuspectListItems from '../components/SuspectListItems';

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
