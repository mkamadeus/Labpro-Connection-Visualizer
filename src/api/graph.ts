import { GraphNode, GraphLink, GraphData } from 'react-d3-graph';
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
 * @param nodeId ID of citizen.
 */
export const getCitizenGraphData = async (
  nodeId: string
): Promise<CitizenGraphData> => {
  return new Promise(async (resolve, reject) => {
    let nodes: CitizenNode[] = [];
    let links: CitizenLink[] = [];

    await getCitizenData(nodeId as string)
      .then((response) => {
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

        resolve({
          nodes: nodes.filter(
            (object, index) =>
              nodes.findIndex((other) => other.id === object.id) === index
          ),
          links: links.filter(
            (object, index) =>
              links.findIndex(
                (other) =>
                  other.source === object.source &&
                  other.target === object.target
              ) === index
          ),
        } as CitizenGraphData);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  });
};
