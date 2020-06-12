import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  Chip,
} from '@material-ui/core';
import { CitizenData } from '../api/citizen';

interface CitizenInformationComponentProps {
  node: CitizenData;
}

const colormap = {
  water: require('@material-ui/core/colors/blue').default[200],
  earth: require('@material-ui/core/colors/brown').default[200],
  fire: require('@material-ui/core/colors/red').default[200],
  air: require('@material-ui/core/colors/indigo').default[200],
};

export default function CitizenInformationComponent({
  node,
}: CitizenInformationComponentProps) {
  console.log(colormap);
  return (
    <Card style={{ width: '100%' }}>
      <CardHeader
        avatar={<Avatar aria-label="element">F</Avatar>}
        title={node.name}
        subheader={`ID: #${node.id}`}
      />
      <CardContent>
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
              <Box p={0.5}>
                <Chip
                  key={`chip_${value.id}`}
                  label={`#${value.id} ${value.name}`}
                  clickable={true}
                  style={{ backgroundColor: colormap[value.element] }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
