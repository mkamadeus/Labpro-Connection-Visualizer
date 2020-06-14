import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@material-ui/core';
import { CitizenData, ElementBending } from '../api/citizen';
import SearchComponent from '../components/SearchComponent';
import GraphComponent from '../components/GraphComponent';
import CitizenInformation from '../components/CitizenInformation';
import SuspectList from '../components/SuspectList';
import SuspectContext from '../context/SuspectContext';
import GraphContext from '../context/GraphContext';
import { CitizenNode, CitizenLink } from '../api/graph';

export default function App() {
  // States
  const [selectedNode, setSelectedNode] = useState<CitizenData>();
  const [data, setCitizenData] = useState<Set<CitizenData>>(
    new Set<CitizenData>()
  );
  const [graphNodes, setGraphNodes] = useState<CitizenNode[]>([]);
  const [graphLinks, setGraphLinks] = useState<CitizenLink[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addCitizenData = (citizen: CitizenData) => {
    setCitizenData(data.add(citizen));
  };

  const addGraphNode = (node: CitizenNode) => {
    setGraphNodes(graphNodes.concat(node));
  };

  const addGraphLink = (link: CitizenLink) => {
    setGraphLinks(graphLinks.concat(link));
  };

  // useEffect for removing duplicates
  useEffect(() => {});

  return (
    <GraphContext.Provider
      value={{
        graphNodes,
        graphLinks,
        addGraphNode,
        addGraphLink,
        loading,
        setLoading,
        setGraphLinks,
        setGraphNodes,
      }}
    >
      <Box display={'flex'} flexDirection={'row'} width={'100%'}>
        <Box width={'100%'} height={'100vh'} bgcolor={'#eeeeee'} p={'1em'}>
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
            <SuspectContext.Provider
              value={{
                data,
                addCitizenData,
              }}
            >
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
                  {selectedNode ? (
                    <CitizenInformation node={selectedNode} />
                  ) : null}
                </Grid>
                <Grid item sm={12} md={6}>
                  <SuspectList />
                </Grid>
              </Grid>
            </SuspectContext.Provider>
          </Box>
          {/* <div style={{ flex: '1 1 auto', backgroundColor: 'red' }}></div> */}
        </Box>
      </Box>
    </GraphContext.Provider>
  );
}
