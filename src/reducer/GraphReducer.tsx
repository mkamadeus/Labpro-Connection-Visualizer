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
 * GraphLinksAction for useReducer's CitizenLink Action.
 */
export type GraphIdAction = {
  type: string;
  id: string;
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
    case 'ADD_NODES':
      let result = [...state, ...(action.nodes as CitizenNode[])];
      return result.filter(
        (value, index) => index === result.findIndex((e) => e.id === value.id)
      );
    case 'REMOVE_ALL':
      return [];
    default:
      return state;
  }
};

/**
 * The reducer function for CitizenLink[].
 * @param state The current state passed
 * @param action The action for the current state
 */
export const linkReducer: GraphLinkReducer = (
  state: CitizenLink[],
  action: GraphLinksAction
) => {
  switch (action.type) {
    case 'ADD_LINKS':
      let result = [...state, ...(action.links as CitizenLink[])];
      return result.filter(
        (value, index) =>
          index ===
          result.findIndex(
            (e) => e.source === value.source && e.target === value.target
          )
      );
    case 'REMOVE_ALL':
      return [];
    default:
      return state;
  }
};
