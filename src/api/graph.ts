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
        console.log('pisang', nodes, links);

        resolve({ nodes: nodes, links: links } as CitizenGraphData);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
