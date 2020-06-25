import React, { useContext } from 'react';
import {
  Box,
  Card,
  Avatar,
  CardContent,
  Typography,
  Chip,
  Button,
} from '@material-ui/core';
import { CitizenData, ElementColors, getCitizenData } from '../api/citizen';
import { SuspectContext } from '../context/SuspectContext';
import { SelectedNodeContext } from '../context/SelectedNodeContext';

interface CitizenInformationProps {
  selectedNode: CitizenData;
}

const CitizenInformation = () => {
  const { suspectMap, suspectMapDispatcher } = useContext(SuspectContext);
  const { selectedNode, setSelectedNode } = useContext(SelectedNodeContext);

  const chipSorting = (x: CitizenData, y: CitizenData) => {
    if (x.id > y.id) return -1;
    else if (x.id < y.id) return 1;
    else return 0;
  };

  return !!selectedNode ? (
    <Card
      style={{
        width: '100%',
      }}
    >
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
          <Button
            variant="contained"
            fullWidth
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
            {!!suspectMap![selectedNode.id]
              ? 'Remove from List'
              : 'Add to List'}
          </Button>
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
          {selectedNode.friends?.sort(chipSorting).map((value) => {
            return (
              <Box p={0.5} key={`chip_${value.id}`}>
                <Chip
                  label={`#${value.id} ${value.name}`}
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
    </Card>
  ) : null;
};

export default CitizenInformation;
