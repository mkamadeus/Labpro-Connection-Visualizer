import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import SearchContext from '../context/SearchContext';
import { getCitizenData, CitizenData } from '../api/citizen';
import { GraphContext } from '../context/GraphContext';
import { ElementColors } from '../api/citizen';
import { LoadingContext } from '../context/LoadingContext';

const SearchButton = () => {
  const { query } = useContext(SearchContext);
  const { setLoading } = useContext(LoadingContext);
  const {
    graphNodes,
    graphLinks,
    graphNodesDispatcher,
    graphLinksDispatcher,
  } = useContext(GraphContext);

  const onClick = async () => {
    setLoading!(true);
    await getCitizenData(query as string)
      .then((response: Required<CitizenData>) => {
        let nodes = graphNodes;
        let links = graphLinks;
        nodes?.push({
          id: response.id,
          element: response.element,
          name: response.name,
          color: ElementColors[response.element],
        });
        for (let i = 0; i < response.friends.length; i++) {
          nodes?.push({
            id: response.friends[i].id,
            element: response.friends[i].element,
            name: response.friends[i].name,
            color: ElementColors[response.friends[i].element],
          });
          links?.push({
            source: response.id,
            target: response.friends[i].id,
          });
        }
        graphNodesDispatcher!({ type: 'ADD_NODES', nodes: nodes });
        graphLinksDispatcher!({ type: 'ADD_LINKS', links: links });
      })
      .then(() => {
        console.log(graphNodes, graphLinks);
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
