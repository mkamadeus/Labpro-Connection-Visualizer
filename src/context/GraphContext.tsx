import React from 'react';
import { CitizenNode, CitizenLink } from '../api/graph';

type GraphContextProps = {
  graphNodes: CitizenNode[];
  graphLinks: CitizenLink[];
  addGraphNode: (node: CitizenNode) => void;
  addGraphLink: (link: CitizenLink) => void;
  setGraphNodes: (node: CitizenNode) => void;
  setGraphLinks: (link: CitizenLink) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

const GraphContext = React.createContext<Partial<GraphContextProps>>({});

export default GraphContext;
