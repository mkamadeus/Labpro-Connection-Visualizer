import React, { useState, useEffect } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { CitizenGraphData, CitizenNode, CitizenLink } from '../api/graph';
import axios from 'axios';
import { CitizenDataWithFriends } from '../api/citizen';

interface GraphComponentProps {
  onClickNode: (node: CitizenDataWithFriends) => void;
  nodeId: string;
}

export default function GraphComponent({
  nodeId,
  onClickNode,
}: GraphComponentProps) {
  const [definedNodes, setDefinedNodes] = useState<{
    [key: string]: CitizenNode;
  }>({});
  const [definedLinks, setDefinedLinks] = useState<Set<CitizenLink>>(new Set());
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const colors = {
    water: '#3f51b5',
    earth: '#795548',
    fire: '#f44336',
    air: '#00bcd4',
  };

  // Function to send a GET request to the API
  const getCitizenData = async (
    id: string
  ): Promise<CitizenDataWithFriends> => {
    return new Promise((resolve, reject) => {
      axios.get(`https://avatar.labpro.dev/friends/${id}`).then(
        (response) => {
          resolve(response.data.payload as CitizenDataWithFriends);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

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
        response.friends.forEach((friend) => {
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

  const nodeArray = [];
  for (let key in definedNodes) {
    nodeArray.push(definedNodes[key]);
  }

  const gdata: CitizenGraphData = {
    nodes: nodeArray,
    links: Array.from(definedLinks.values()),
  };

  useEffect(() => {
    getCitizenSet(nodeId, 2);
  }, []);

  return isLoaded ? (
    <div
      style={{
        border: 'solid #000 1px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <D3Graph
        id={'graph'}
        data={gdata}
        config={{ height: 200, width: 600, directed: true }}
        onClickNode={async (nodeId) => {
          const node = await getCitizenData(nodeId);
          onClickNode(node);
        }}
      />
    </div>
  ) : null;
}
