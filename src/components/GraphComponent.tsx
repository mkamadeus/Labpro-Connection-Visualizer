import React, { useState, useEffect, useContext, useRef } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { CitizenGraphData, CitizenNode, CitizenLink } from '../api/graph';
import { getCitizenData, CitizenData, ElementColors } from '../api/citizen';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import GraphContext from '../context/GraphContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    graphRoot: {
      boxShadow: theme.shadows[12],
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100% ',
      backgroundColor: '#fff',
    },
  })
);

// Get color from TS definition

interface GraphComponentProps {
  onClickNode: (node: CitizenData) => void;
  nodeId: string;
  graphData: CitizenGraphData;
}

const GraphComponent = ({ nodeId, onClickNode }: GraphComponentProps) => {
  // Stylesheet
  const classes = useStyles();
  const { graphNodes, graphLinks, loading, setLoading } = useContext(
    GraphContext
  );

  const [graphData, setGraphData] = useState<CitizenGraphData>({
    nodes: graphNodes,
    links: graphLinks,
  } as CitizenGraphData);

  console.log(graphData);

  // useEffect(() => {
  //   setGraphData({
  //     nodes: graphNodes,
  //     links: graphLinks,
  //   } as CitizenGraphData);
  // }, []);

  return loading ? (
    <div className={classes.graphRoot}>
      <D3Graph
        id={'graph'}
        data={graphData}
        config={{
          height: 600,
          width: 600,
          directed: true,
        }}
        onClickNode={async (nodeId) => {
          const node = await getCitizenData(nodeId);
          onClickNode(node);
        }}
      />
    </div>
  ) : null;
};

export default GraphComponent;
