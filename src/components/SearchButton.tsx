import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { SearchContext } from '../context/SearchContext';
import { getCitizenData, CitizenData } from '../api/citizen';
import { GraphContext } from '../context/GraphContext';
import { ElementColors } from '../api/citizen';
import { LoadingContext } from '../context/LoadingContext';
import { SelectedNodeContext } from '../context/SelectedNodeContext';
import { getCitizenGraphData } from '../api/graph';

const SearchButton = () => {
  const { query } = useContext(SearchContext);
  const { setLoading } = useContext(LoadingContext);
  const { setSelectedNode } = useContext(SelectedNodeContext);
  const {
    graphNodes,
    graphLinks,
    graphNodesDispatcher,
    graphLinksDispatcher,
  } = useContext(GraphContext);

  const onClick = async () => {
    setLoading!(true);
    await getCitizenData(query as string).then(
      (response: Required<CitizenData>) => {
        setSelectedNode!(response);
      }
    );
    await getCitizenGraphData(query as string)
      .then((response) => {
        graphNodesDispatcher!({ type: 'ADD_NODES', nodes: response.nodes });
        graphLinksDispatcher!({ type: 'ADD_LINKS', links: response.links });
        setLoading!(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button fullWidth color="primary" variant="outlined" onClick={onClick}>
      Search
    </Button>
  );
};

export default SearchButton;
