import React, { useContext, useEffect } from 'react';
import {
  Box,
  Card,
  Avatar,
  CardContent,
  Typography,
  Chip,
  Button,
  createStyles,
  makeStyles,
  Theme,
  CardActions,
  IconButton,
} from '@material-ui/core';
import { CitizenData, ElementColors, getCitizenData } from '../api/citizen';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { SuspectContext } from '../context/SuspectContext';
import { SelectedNodeContext } from '../context/SelectedNodeContext';
import { GraphContext } from '../context/GraphContext';
import { getCitizenGraphData } from '../api/graph';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({});
});

const CitizenInformation = () => {
  const {
    graphId,
    graphIdDispatcher,
    graphNodesDispatcher,
    graphLinksDispatcher,
  } = useContext(GraphContext);
  const { suspectMap, suspectMapDispatcher } = useContext(SuspectContext);
  const { selectedNode, setSelectedNode } = useContext(SelectedNodeContext);

  const expandNode = async (nodeId: string) => {
    await getCitizenData(nodeId as string).then((response) => {
      setSelectedNode!(response);
      console.log(graphId);
      graphIdDispatcher!({
        type: 'ADD_ID',
        id: response.id,
      });
    });
    console.log(graphId);

    if (!graphId![nodeId]) {
      await getCitizenGraphData(nodeId as string)
        .then((response) => {
          graphNodesDispatcher!({
            type: 'ADD_NODES',
            nodes: response.nodes,
          });
          graphLinksDispatcher!({
            type: 'ADD_LINKS',
            links: response.links,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    await expandNode!(selectedNode?.id as string);
  };

  return !!selectedNode ? (
    <Card variant="outlined">
      <CardContent>
        <Box display={'flex'} flexDirection={'column'} pb={'1em'}>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Box p={'0.5em'}>
              <Avatar
                aria-label="element"
                style={{ backgroundColor: ElementColors[selectedNode.element] }}
              >
                {selectedNode.name[0]}
              </Avatar>
            </Box>
            <Box p={'0.5em'}>
              <Box>
                <Typography variant="subtitle1">{selectedNode.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">{`ID: #${
                  selectedNode.id
                }, Element: ${
                  selectedNode.element[0].toUpperCase() +
                  selectedNode.element.substring(1)
                }`}</Typography>
              </Box>
            </Box>
          </Box>
          <CardActions>
            <Button
              variant="outlined"
              onClick={() => {
                if (!!suspectMap![selectedNode.id]) {
                  suspectMapDispatcher!({
                    type: 'REMOVE_SUSPECT',
                    id: selectedNode.id,
                  });
                } else {
                  suspectMapDispatcher!({
                    type: 'ADD_SUSPECT',
                    id: selectedNode.id,
                    suspect: selectedNode,
                  });
                }
              }}
              color="primary"
            >
              {!!suspectMap![selectedNode.id] ? 'Remove' : 'Save'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleClick}
              color="primary"
              disabled={graphId![selectedNode.id]}
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
            if (value.id === selectedNode.id) return;

            return (
              <Box p={0.5} key={`chip_${value.id}`}>
                <Chip
                  label={`#${value.id} ${value.name.split(' ')[0]}`}
                  clickable={true}
                  style={
                    {
                      // backgroundColor: ElementColors[value.element],
                      // color: '#fff',
                    }
                  }
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
    </Card>
  ) : null;
};

export default CitizenInformation;
