import React, { Component } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { CitizenGraphData, CitizenNode, CitizenLink } from '../../api/graph';
import axios from 'axios';
import { CitizenDataWithFriends } from '../../api/citizen';

interface GraphComponentState {
  loaded: boolean;
  definedNodes: Set<CitizenNode>;
  definedLinks: Set<CitizenLink>;
}

export default class GraphComponent extends Component<{}, GraphComponentState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      loaded: false,
      definedNodes: new Set<CitizenNode>(),
      definedLinks: new Set<CitizenLink>(),
    };
  }

  componentDidMount() {
    this.getCitizenSet('1', 2);
  }

  // Getter from API
  async getCitizenData(id: string): Promise<CitizenDataWithFriends> {
    return new Promise((resolve, reject) => {
      axios.get(`https://avatar.labpro.dev/friends/${id}`).then(
        (response) => {
          console.log(response);
          resolve(response.data.payload as CitizenDataWithFriends);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getCitizenSet(id: string, depth: number) {
    const nodeSet = new Set<CitizenNode>();
    const linkSet = new Set<CitizenLink>();

    // Create queue for BFS
    let idQueue: string[] = [];
    idQueue.push(id);

    let tempQueue: string[] = [];
    while (depth > 0) {
      if (idQueue.length === 0) {
        depth -= 1;
        idQueue = idQueue.concat(tempQueue);
        tempQueue = [];
      }
      const currentId = idQueue.shift();
      await this.getCitizenData(currentId as string).then((response) => {
        // Add starting node to set
        const node: CitizenNode = { id: currentId as string, ...response };
        nodeSet.add(node);

        // For each friend in array...
        response.friends.forEach((friend) => {
          // Add node into set
          const node: CitizenNode = { id: friend.id, ...friend };
          nodeSet.add(node);

          // Add link into set
          const friendNode: CitizenLink = {
            source: currentId as string,
            target: friend.id,
          };
          linkSet.add(friendNode);

          // Push id to queue
          tempQueue.push(friend.id);
        });
      });
    }

    // Set state of defined nodes and links
    this.setState({ definedNodes: nodeSet, definedLinks: linkSet });
    this.setState({ loaded: true });
  }

  render() {
    const gdata: CitizenGraphData = {
      nodes: Array.from(this.state.definedNodes.values()),
      links: Array.from(this.state.definedLinks.values()),
    };

    return this.state.loaded ? (
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
          config={{ height: 800, width: 1200, directed: true }}
        />
      </div>
    ) : null;
  }
}
