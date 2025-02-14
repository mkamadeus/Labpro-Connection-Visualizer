import React, { useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';

import SearchComponent from '../components/SearchComponent';
import GraphComponent from '../components/GraphComponent';
import CitizenInformation from '../components/CitizenInformation';
import FloatingActionButton from '../components/FloatingActionButton';

import { SuspectContextProvider } from '../context/SuspectContext';
import { GraphContextProvider } from '../context/GraphContext';
import { SelectedNodeContextProvider } from '../context/SelectedNodeContext';

export default function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <GraphContextProvider>
      <SelectedNodeContextProvider>
        <SuspectContextProvider>
          <SearchComponent />
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <GraphComponent />
              </Grid>
              <Grid item xs={12} md={6}>
                <CitizenInformation />
              </Grid>
            </Grid>
          </Container>
          <FloatingActionButton />
        </SuspectContextProvider>
      </SelectedNodeContextProvider>
    </GraphContextProvider>
  );
}
