import React, { Component } from 'react';
import { Graph } from 'react-d3-graph';

export default class GraphComponent extends Component {
  render() {
    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      links: [
        { source: '1', target: '2' },
        { source: '1', target: '3' },
      ],
    };
    return (
      <div style={{ border: 'solid #000 1px', width: '100%' }}>
        <Graph id={'graph'} data={data} />
      </div>
    );
  }
}
