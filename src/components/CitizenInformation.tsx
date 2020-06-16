import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Chip,
  Button,
} from '@material-ui/core';
import { CitizenData, ElementColors } from '../api/citizen';
import SuspectContext from '../context/SuspectContext';
import { SelectedNodeContext } from '../context/SelectedNodeContext';

interface CitizenInformationProps {
  selectedNode: CitizenData;
}

const CitizenInformation = () => {
  const { data, addCitizenData } = useContext(SuspectContext);
  const { selectedNode } = useContext(SelectedNodeContext);

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
        <Box display={'flex'} flexDirection={'column'} p={'1em'}>
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
              <Box>{selectedNode.name}</Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                >{`ID: #${selectedNode.id}`}</Typography>
              </Box>
            </Box>
          </Box>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              // setSelectedNode(selectedNode);
            }}
            color="primary"
          >
            {/* {data.has(selectedNode) ? 'Remove from List' : 'Add to List'} */}
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
