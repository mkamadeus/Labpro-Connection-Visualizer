import React, { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';
import { SelectedNodeContext } from '../context/SelectedNodeContext';
import { SuspectContext } from '../context/SuspectContext';
import { getCitizenData, CitizenData, ElementColors } from '../api/citizen';
import {
  getCitizenGraphData,
  CitizenGraphData,
  CitizenNode,
  CitizenLink,
} from '../api/graph';

const useGraph = () => {
  // Context
  const {
    graphLinks,
    graphNodes,
    graphLinksDispatcher,
    graphNodesDispatcher,
  } = useContext(GraphContext);
  const { suspectMap, suspectMapDispatcher } = useContext(SuspectContext);
  const { selectedNode, setSelectedNode } = useContext(SelectedNodeContext);

  /**
   * Procedure to clear the graph preview
   */
  const clearGraph = () => {
    graphNodesDispatcher!({ type: 'REMOVE_ALL' });
    graphLinksDispatcher!({ type: 'REMOVE_ALL' });
    setSelectedNode!(undefined);
  };

  /**
   * Check whether a node is shown on the graph.
   * @param nodeId The node ID checked
   */
  const isNodePresent = (nodeId: string) => {
    return graphNodes?.findIndex((value) => value.id === nodeId) !== -1;
  };

  /**
   * Check whether a node has expanded or not.
   * @param nodeId The node ID checked
   */
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

  /**
   * Check whether the selected node is suspected or not.
   */
  const isSelectedSuspected = () => {
    return !!suspectMap![selectedNode!.id];
  };

  /**
   * Toggle selected node status.
   */
  const toggleSuspectStatus = () => {
    if (isSelectedSuspected()) {
      suspectMapDispatcher!({
        type: 'REMOVE_SUSPECT',
        id: selectedNode?.id,
      });
    } else {
      suspectMapDispatcher!({
        type: 'ADD_SUSPECT',
        id: selectedNode?.id,
        suspect: selectedNode,
      });
    }
  };

  /**
   * Convert suspect map to array.
   */
  const getSuspectArray = () => {
    let suspects: CitizenData[] = [];
    for (let i = 0; i < Object.keys(suspectMap!).length; i++) {
      suspects.push(suspectMap![Object.keys(suspectMap!)[i]]);
    }
    return suspects;
  };

  /**
   * Build graph based on suspect list.
   */
  const getSuspectGraphData = () => {
    const suspects = getSuspectArray();
    let nodes: CitizenNode[] = [];
    let links: CitizenLink[] = [];

    for (let i = 0; i < suspects.length; i++) {
      nodes.push({
        ...suspects[i],
        color: ElementColors[suspects[i].element],
      });
      for (let j = 0; j < suspects[i].friends?.length!; j++) {
        // If friend is in the suspect list
        if (
          suspects.findIndex(
            (obj) =>
              obj.id === suspects[i]?.friends![j].id &&
              obj.id !== suspects[i]?.id
          ) !== -1
        ) {
          links.push({
            source: suspects[i].id,
            target: suspects[i]?.friends![j].id,
          });
        }
      }
    }

    clearGraph();
    graphNodesDispatcher!({ type: 'ADD_NODES', nodes: nodes });
    graphLinksDispatcher!({ type: 'ADD_LINKS', links: links });
    // console.log(getSuspectArray());
  };

  return {
    graphNodes,
    graphLinks,
    expandNode,
    clearGraph,
    getSuspectArray,
    getSuspectGraphData,
    selectedNode,
    setSelectedNode,
    isSelectedSuspected,
    isNodeExpanded,
    isNodePresent,
    toggleSuspectStatus,
  };
};

export default useGraph;
