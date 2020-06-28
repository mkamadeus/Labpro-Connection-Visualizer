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
      let duplicated = [...state, ...(action.nodes as CitizenNode[])];
      let resultMap = new Map();
      let result: CitizenNode[] = [];
      for (let i = 0; i < duplicated.length; i++) {
        if (!resultMap.has(duplicated[i].id)) {
          resultMap.set(duplicated[i].id, duplicated[i]);
          result.push(duplicated[i]);
        }
      }

      return result;
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
      let duplicated = [...state, ...(action.links as CitizenLink[])];
      let resultMap = new Map();
      let result = [];
      for (let i = 0; i < duplicated.length; i++) {
        if (!resultMap.has(`${duplicated[i].source},${duplicated[i].target}`)) {
          resultMap.set(
            `${duplicated[i].source},${duplicated[i].target}`,
            duplicated[i]
          );
          result.push(duplicated[i]);
        }
      }
      return result;
    case 'REMOVE_ALL':
      return [];
    default:
      return state;
  }
};
