import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  Paper,
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from '../components/SearchBar';
import NavigationBarComponent from '../components/NavigationBarComponent';
import GraphComponent from '../components/GraphComponent';
import CitizenInformationComponent from '../components/CitizenInformationComponent';
import SuspectList from '../components/SuspectList';
import { CitizenData, ElementBending } from '../api/citizen';

export default function App() {
  const [selectedNode, setSelectedNode] = useState<CitizenData>({
    id: '',
    name: '',
    element: ElementBending.water,
    friends: [],
  } as CitizenData);

  return (
    <>
      <Box display={'flex'} flexDirection={'row'} width={'100%'}>
        <Box width={'100%'} height={'100vh'} bgcolor={'red'} p={'1em'}>
          <div>lol</div>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          height={'100vh'}
          p={'2em'}
        >
          <Box p={'1em'}>
            <SearchBar />
          </Box>
          <Box display={'flex'} flex={'1 1 auto'} p={'1em'}>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <CitizenInformationComponent node={selectedNode} />
              </Grid>
              <Grid item sm={12} md={6}>
                <SuspectList />
              </Grid>
            </Grid>
          </Box>
          {/* <div style={{ flex: '1 1 auto', backgroundColor: 'red' }}></div> */}
        </Box>
      </Box>
    </>
  );
}
