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
import { CitizenDataWithFriends } from '../api/citizen';

interface CitizenInformationComponentProps {
  node: CitizenDataWithFriends;
}

export default function CitizenInformationComponent({
  node,
}: CitizenInformationComponentProps) {
  // const labels = ['Nama 1', 'Nama 2', 'Nama 3', 'Nama 4'];
  return (
    <Box p={5} width={'100%'}>
      <Card style={{ width: '100%' }}>
        <CardHeader
          avatar={<Avatar aria-label="element">F</Avatar>}
          title={node.name}
          subheader={`ID: #${node.id}`}
        />
        <CardContent>
          <Typography variant="body2" color="textPrimary" component="p">
            Known connection{'(s)'}:
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              mx={-0.5}
              my={1}
              width="100%"
            >
              {node.friends.map((value) => {
                return (
                  <Box p={0.5}>
                    <Chip
                      key={value.name + '_chip'}
                      label={`#${value.id} ${value.name}`}
                      clickable={true}
                      color={'primary'}
                      style={{ backgroundColor: 'salmon' }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
