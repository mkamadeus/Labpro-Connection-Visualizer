import { CitizenNode, CitizenLink } from '../api/graph';

/**
 * GraphNodesAction for useReducer's CitizenNode Action.
 */
export type GraphNodesAction = {
  type: string;
  node?: CitizenNode;
  nodes?: CitizenNode[];
};

/**
 * GraphLinksAction for useReducer's CitizenLink Action.
 */
export type GraphLinksAction = {
  type: string;
  link?: CitizenLink;
  links?: CitizenLink[];
};

/**
 * Alias for CitizenNode reducer function.
 */
export type GraphNodeReducer = React.Reducer<CitizenNode[], GraphNodesAction>;

/**
 * Alias for CitizenLink reducer function.
 */
export type GraphLinkReducer = React.Reducer<CitizenLink[], GraphLinksAction>;

/**
 * The reducer function for CitizenNode[].
 * @param state The current state passed
 * @param action THe action for the current state
 */
export const nodeReducer: GraphNodeReducer = (
  state: CitizenNode[],
  action: GraphNodesAction
) => {
  switch (action.type) {
    case 'ADD_NODE':
      return [...state, action.node as CitizenNode];
    case 'ADD_NODES':
      return [...state, ...(action.nodes as CitizenNode[])];
    default:
      return state;
  }
};

/**
 * The reducer function for CitizenLink[].
 * @param state The current state passed
 * @param action The action for the current state
 *
 * @beta
 */
export const linkReducer: GraphLinkReducer = (
  state: CitizenLink[],
  action: GraphLinksAction
) => {
  switch (action.type) {
    case 'ADD_LINK':
      return [...state, action.link as CitizenLink];
    case 'ADD_LINKS':
      return [...state, ...(action.links as CitizenLink[])];
    default:
      return state;
  }
};
