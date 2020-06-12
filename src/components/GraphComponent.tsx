import React, { useState, useEffect } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { CitizenGraphData, CitizenNode, CitizenLink } from '../api/graph';
import { getCitizenData, CitizenData } from '../api/citizen';

interface GraphComponentProps {
  onClickNode: (node: CitizenData) => void;
  nodeId: string;
}

const GraphComponent = ({ nodeId, onClickNode }: GraphComponentProps) => {
  // Graph States
  const [definedNodes, setDefinedNodes] = useState<{[key: string]: CitizenNode;}>({}); //prettier-ignore
  const [definedLinks, setDefinedLinks] = useState<Set<CitizenLink>>(new Set());
  const [isLoaded, setLoaded] = useState<boolean>(false);

  // useEffect(()=>{

  // })
  const colors = {
    water: '#3f51b5',
    earth: '#795548',
    fire: '#f44336',
    air: '#00bcd4',
  };

  const nodeArray = [];
  for (let key in definedNodes) {
    nodeArray.push(definedNodes[key]);
  }

  const gdata: CitizenGraphData = {
    nodes: nodeArray,
    links: Array.from(definedLinks.values()),
  };

  useEffect(() => {
    // Function for graph building
    const getCitizenSet = async (id: string, depth: number) => {
      const nodeSet: { [key: string]: CitizenNode } = {};
      const linkSet = new Set<CitizenLink>();

      // Create queue for BFS
      let idQueue: string[] = [];
      idQueue.push(id);

      while (idQueue.length !== 0 && depth > 0) {
        const currentId = idQueue.shift();
        await getCitizenData(currentId as string).then((response) => {
          // Add starting node to set
          const node: CitizenNode = {
            id: currentId as string,
            color: colors[response.element],
            ...response,
          };
          nodeSet[currentId as string] = node;

          // For each friend in array...
          response.friends?.forEach((friend) => {
            // Add node into set
            const node: CitizenNode = {
              id: friend.id,
              color: colors[friend.element],
              ...friend,
            };
            if (!!nodeSet[friend.id]) {
              return;
            }

            nodeSet[friend.id] = node;

            // Add link into set
            const friendNode: CitizenLink = {
              source: currentId as string,
              target: friend.id,
            };
            linkSet.add(friendNode);

            // Push id to queue
            idQueue.push(friend.id);
          });
        });
        depth -= 1;
      }

      // Set state of defined nodes and links
      setDefinedNodes(nodeSet);
      setDefinedLinks(linkSet);
      setLoaded(true);
    };

    getCitizenSet(nodeId, 2);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isLoaded ? (
    <div
      style={{
        border: 'solid #000 1px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <D3Graph
        id={'graph'}
        data={gdata}
        config={{ height: 600, width: 600, directed: true }}
        onClickNode={async (nodeId) => {
          const node = await getCitizenData(nodeId);
          onClickNode(node);
        }}
      />
    </div>
  ) : null;
};

export default GraphComponent;
