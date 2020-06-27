import React from 'react';
import {
  Box,
  Grid,
  Container,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
} from '@material-ui/core';

import SearchComponent from '../components/SearchComponent';
import GraphComponent from '../components/GraphComponent';
import CitizenInformation from '../components/CitizenInformation';
import SuspectList from '../components/SuspectList';
import FloatingActionButton from '../components/FloatingActionButton';

import { SuspectContextProvider } from '../context/SuspectContext';
import { GraphContextProvider } from '../context/GraphContext';
import { LoadingContextProvider } from '../context/LoadingContext';
import { SelectedNodeContextProvider } from '../context/SelectedNodeContext';

export default function App() {
  return (
    <GraphContextProvider>
      <LoadingContextProvider>
        <SelectedNodeContextProvider>
          <SuspectContextProvider>
            <div style={{ position: 'relative' }}>
              <SearchComponent />
              <Container>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <GraphComponent />
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6}></Grid>
                    <Grid item sm={12} md={6}>
                      <CitizenInformation />
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
              <FloatingActionButton />
            </div>
          </SuspectContextProvider>
        </SelectedNodeContextProvider>
      </LoadingContextProvider>
    </GraphContextProvider>
  );
}
