import {
  GraphNode,
  GraphLink,
  GraphData,
  GraphConfiguration,
} from 'react-d3-graph';
import { CitizenData, getCitizenData, ElementColors } from './citizen';

/**
 * Node interface for react-d3-graph with additional information
 * related to CitizenData.
 */
export interface CitizenNode extends GraphNode, CitizenData {}

/**
 * Link interface for react-d3-graph.
 */
export interface CitizenLink extends GraphLink {}

/**
 * Graph data interface for react-d3-graph using the
 * defined CitizenNode and CitizenLink interface.
 */
export interface CitizenGraphData extends GraphData<CitizenNode, CitizenLink> {}

/**
 * Method to make a get graph data which is processed without duplicates.
 * @param query ID of citizen.
 */
export const getCitizenGraphData = async (
  query: string
): Promise<CitizenGraphData> => {
  return new Promise(async (resolve, reject) => {
    let nodes: CitizenNode[] = [];
    let links: CitizenLink[] = [];

    await getCitizenData(query as string)
      .then((response: Required<CitizenData>) => {
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

        resolve({ nodes: nodes, links: links } as CitizenGraphData);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

/**
 * Graph configuration for the graph component.
 */
export const GraphConfig: Partial<GraphConfiguration<
  CitizenNode,
  CitizenLink
>> = {
  height: 600,
  width: 300,
  directed: true,
  staticGraph: false,
  automaticRearrangeAfterDropNode: true,
  d3: {
    gravity: -50,
    linkLength: 50,
    linkStrength: 1,
    alphaTarget: 1,
    disableLinkForce: false,
  },
  link: {
    opacity: 0.5,
    type: 'CURVE_SMOOTH',
    strokeWidth: 1,
  },
  node: {
    size: 150,
  },
  highlightOpacity: 0.2,
  nodeHighlightBehavior: true,
};
