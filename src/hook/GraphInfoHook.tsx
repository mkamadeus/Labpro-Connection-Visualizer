import { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';
import { SelectedNodeContext } from '../context/SelectedNodeContext';
import { getCitizenData } from '../api/citizen';
import { getCitizenGraphData } from '../api/graph';

/**
 * useGraphInfo custom hook.
 * Used for expanding nodes and getting information related to the graph
 */
const useGraphInfo = () => {
  const {
    graphNodes,
    graphLinks,
    graphNodesDispatcher,
    graphLinksDispatcher,
  } = useContext(GraphContext);
  const { selectedNode, setSelectedNode } = useContext(SelectedNodeContext);

  const clearGraph = () => {
    graphNodesDispatcher!({ type: 'REMOVE_ALL' });
    graphLinksDispatcher!({ type: 'REMOVE_ALL' });
    setSelectedNode!(undefined);
  };

  const isNodePresent = (nodeId: string) => {
    return graphNodes?.findIndex((value) => value.id === nodeId) !== -1;
  };

  const isNodeExpanded = (nodeId: string) => {
    return graphLinks?.findIndex((value) => value.source === nodeId) !== -1;
  };

  /**
   * Expand a node based on its ID.
   * @param nodeId The node ID requested
   */
  const expandNode = async (nodeId: string) => {
    await getCitizenData(nodeId as string).then((response) => {
      setSelectedNode!(response);
    });

    // If ID not present in node array...
    if (!isNodeExpanded(nodeId)) {
      await getCitizenGraphData(nodeId as string)
        .then((response) => {
          graphNodesDispatcher!({
            type: 'ADD_NODES',
            nodes: response.nodes,
          });
          graphLinksDispatcher!({
            type: 'ADD_LINKS',
            links: response.links,
          });
          return;
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } else {
      return;
    }
  };

  return {
    selectedNode,
    setSelectedNode,
    graphNodes,
    graphLinks,
    isNodePresent,
    isNodeExpanded,
    clearGraph,
    expandNode,
  };
};

export default useGraphInfo;
