import React, { useState, useEffect, useReducer } from 'react';
import { Box, Grid, Fade } from '@material-ui/core';
import { CitizenData, ElementBending } from '../api/citizen';
import SearchComponent from '../components/SearchComponent';
import GraphComponent from '../components/GraphComponent';
import CitizenInformation from '../components/CitizenInformation';
import SuspectList from '../components/SuspectList';
import SuspectContext, {
  SuspectContextProvider,
} from '../context/SuspectContext';
import { GraphContextProvider } from '../context/GraphContext';
import { LoadingContextProvider } from '../context/LoadingContext';
import { SelectedNodeContextProvider } from '../context/SelectedNodeContext';
import { CitizenNode, CitizenLink } from '../api/graph';

export default function App() {
  return (
    <GraphContextProvider>
      <LoadingContextProvider>
        <SelectedNodeContextProvider>
          <SuspectContextProvider>
            <Box display={'flex'} flexDirection={'row'} width={'100%'}>
              <Box
                width={'100%'}
                height={'100vh'}
                bgcolor={'#eeeeee'}
                p={'1em'}
              >
                <GraphComponent
                  nodeId={'1'}
                  onClickNode={(nodeId) => {
                    setSelectedNode(nodeId);
                  }}
                />
              </Box>
              <Box
                display={'flex'}
                flexDirection={'column'}
                width={'100%'}
                height={'100vh'}
                p={'2em'}
              >
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  p={'1em'}
                  width={'100%'}
                  mx={'-0.5em'}
                >
                  <SearchComponent />
                </Box>
                <Box display={'flex'} flex={'1 1 auto'} p={'1em'}>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                      <CitizenInformation />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <SuspectList />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </SuspectContextProvider>
        </SelectedNodeContextProvider>
      </LoadingContextProvider>
    </GraphContextProvider>
  );
}
