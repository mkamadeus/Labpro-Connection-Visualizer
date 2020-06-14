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

interface CitizenInformationProps {
  node: CitizenData;
}

const colormap = ElementColors;

const CitizenInformation = ({ node }: CitizenInformationProps) => {
  const { data, addCitizenData } = useContext(SuspectContext);

  return (
    <Card
      style={{
        width: '100%',
      }}
    >
      <CardHeader
        avatar={<Avatar aria-label="element">F</Avatar>}
        title={node.name || 'Name you select will show up here.'}
        subheader={`ID: #${node.id || '???'}`}
      />
      <CardContent>
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            console.log(node);
            addCitizenData(node);
            console.log('test');
          }}
          color="primary"
        >
          {data.has(node) ? 'Remove from List' : 'Add to List'}
        </Button>
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
          {node.friends?.map((value) => {
            return (
              <Box p={0.5} key={`chip_${value.id}`}>
                <Chip
                  label={`#${value.id} ${value.name}`}
                  clickable={true}
                  style={{
                    backgroundColor: colormap[value.element],
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CitizenInformation;
