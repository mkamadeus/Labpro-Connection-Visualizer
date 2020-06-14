import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import SearchContext from '../context/SearchContext';
import { getCitizenData, CitizenData } from '../api/citizen';
import GraphContext from '../context/GraphContext';
import { ElementColors } from '../api/citizen';

const SearchButton = () => {
  const { query } = useContext(SearchContext);
  const {
    graphNodes,
    graphLinks,
    setGraphNodes,
    setGraphLinks,
    setLoading,
  } = useContext(GraphContext);

  const onClick = async () => {
    setLoading!(false);
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
        setGraphNodes!(nodes);
        setGraphLinks!(links);
        console.log(graphNodes, graphLinks);
        setLoading!(true);
      })
      .catch((error) => {});
  };

  return (
    <Button fullWidth color="primary" variant="outlined" onClick={onClick}>
      Search
    </Button>
  );
};

export default SearchButton;
