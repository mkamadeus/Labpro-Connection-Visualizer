import React, { useReducer } from 'react';
import { CitizenNode, CitizenLink } from '../api/graph';
import {
  GraphNodesAction,
  nodeReducer,
  linkReducer,
  GraphLinksAction,
  GraphNodeReducer,
  GraphLinkReducer,
  idReducer,
  GraphIdReducer,
  GraphIdAction,
} from '../reducer/GraphReducer';

/**
 * GraphContext value definition.
 */
export type GraphContextProps = {
  graphNodes: CitizenNode[];
  graphLinks: CitizenLink[];
  graphId: { [key: string]: boolean };
  graphNodesDispatcher: React.Dispatch<GraphNodesAction>;
  graphLinksDispatcher: React.Dispatch<GraphLinksAction>;
  graphIdDispatcher: React.Dispatch<GraphIdAction>;
};

/**
 * GraphContextProvider Props definition.
 */
export type GraphContextProviderProps = {
  children?: React.ReactNode;
};

/**
 * GraphContext Context Hook
 */
export const GraphContext = React.createContext<Partial<GraphContextProps>>({});

/**
 * GraphContextProvider Component.
 * @param props Props supplied to the component, with the type of GraphContextProviderProps
 */
export const GraphContextProvider = (props: GraphContextProviderProps) => {
  // Graph nodes reducer
  const [graphNodes, graphNodesDispatcher] = useReducer<
    GraphNodeReducer,
    CitizenNode[]
  >(nodeReducer, [], () => {
    return [];
  });

  // Graph links reducer
  const [graphLinks, graphLinksDispatcher] = useReducer<
    GraphLinkReducer,
    CitizenLink[]
  >(linkReducer, [], () => {
    return [];
  });

  // Graph ID reducer
  const [graphId, graphIdDispatcher] = useReducer<
    GraphIdReducer,
    { [key: string]: boolean }
  >(idReducer, {}, () => {
    return {};
  });

  return (
    <GraphContext.Provider
      value={{
        graphNodes,
        graphLinks,
        graphId,
        graphNodesDispatcher,
        graphLinksDispatcher,
        graphIdDispatcher,
      }}
    >
      {props.children}
    </GraphContext.Provider>
  );
};
