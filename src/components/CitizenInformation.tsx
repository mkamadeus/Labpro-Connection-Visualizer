import React from 'react';
import {
  Box,
  Card,
  Avatar,
  CardContent,
  Typography,
  Chip,
  Button,
  CardActions,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { ElementColors, getCitizenData } from '../api/citizen';
import useGraph from '../hook/GraphHook';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    informationRoot: {
      padding: '0.5em',
    },
  });
});

/**
 * `CitizenInformation` component.
 * Shows the panel that contains information of the citizn currently selected (ID, Element, and his/her connection with other citizen).
 */
const CitizenInformation = () => {
  const classes = useStyles();

  const {
    selectedNode,
    setSelectedNode,
    expandNode,
    isNodeExpanded,
    isSelectedSuspected,
    toggleSuspectStatus,
  } = useGraph();

  const handleClick = async (_event: React.MouseEvent<HTMLElement>) => {
    await expandNode!(selectedNode?.id as string);
  };

  return (
    <div className={classes.informationRoot}>
      <Card variant="outlined">
        {!!selectedNode ? (
          <CardContent>
            <Box display={'flex'} flexDirection={'column'} pb={'1em'}>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                <Box p={'0.5em'}>
                  <Avatar
                    aria-label="element"
                    style={{
                      backgroundColor: ElementColors[selectedNode.element],
                    }}
                  >
                    {selectedNode.name[0]}
                  </Avatar>
                </Box>
                <Box p={'0.5em'}>
                  <Box>
                    <Typography variant="body2">{selectedNode.name}</Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                    >{`ID: #${selectedNode.id}, Element: ${
                      selectedNode.element[0].toUpperCase() +
                      selectedNode.element.substring(1)
                    }`}</Typography>
                  </Box>
                </Box>
              </Box>
              <CardActions>
                <Button
                  variant="outlined"
                  onClick={toggleSuspectStatus}
                  color="primary"
                >
                  {isSelectedSuspected() ? 'Remove' : 'Save'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClick}
                  color="primary"
                  disabled={isNodeExpanded(selectedNode.id)}
                >
                  Expand
                </Button>
              </CardActions>
            </Box>
            <Typography variant="body2" color="textPrimary" component="p">
              Known connection{'(s)'}:
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              mx={-0.5}
              my={1}
              width="100%"
            >
              {selectedNode.friends?.map((value) => {
                if (value.id === selectedNode.id) return null;

                return (
                  <Box p={0.5} key={`chip_${value.id}`}>
                    <Chip
                      label={`#${value.id} ${value.name.split(' ')[0]}`}
                      clickable={true}
                      style={{
                        backgroundColor: ElementColors[value.element],
                        color: '#fff',
                      }}
                      size={'small'}
                      onClick={async () => {
                        await getCitizenData(value.id).then((response) => {
                          setSelectedNode!(response);
                        });
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Citizen information will be shown here.
            </Typography>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CitizenInformation;
