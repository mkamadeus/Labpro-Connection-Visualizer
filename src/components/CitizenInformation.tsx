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
} from '@material-ui/core';
import { ElementColors, getCitizenData } from '../api/citizen';
import useGraphInfo from '../hook/GraphInfoHook';
import useSuspectInfo from '../hook/SuspectInfoHook';

const CitizenInformation = () => {
  const { isSelectedSuspected, suspectButtonAction } = useSuspectInfo();
  const {
    selectedNode,
    setSelectedNode,
    expandNode,
    isNodePresent,
  } = useGraphInfo();

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
              onClick={suspectButtonAction}
              color="primary"
            >
              {isSelectedSuspected() ? 'Remove' : 'Save'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleClick}
              color="primary"
              disabled={isNodePresent(selectedNode.id)}
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
