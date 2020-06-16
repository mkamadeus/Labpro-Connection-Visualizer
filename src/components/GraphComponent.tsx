import React, { useContext } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { CitizenGraphData, CitizenNode, CitizenLink } from '../api/graph';
import { getCitizenData, CitizenData, ElementColors } from '../api/citizen';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GraphContext } from '../context/GraphContext';
import { LoadingContext } from '../context/LoadingContext';
import { Typography } from '@material-ui/core';
import { SelectedNodeContext } from '../context/SelectedNodeContext';

/**
 * Stylesheet definition.
 */
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
    italicText: {
      fontStyle: 'italic',
    },
  })
);

/**
 * GraphComponent Props Definition.
 */
interface GraphComponentProps {
  onClickNode: (node: CitizenData) => void;
  nodeId: string;
  graphData: CitizenGraphData;
}

/**
 * `GraphComponent` Component.
 */
const GraphComponent = ({ nodeId, onClickNode }: GraphComponentProps) => {
  // Stylesheet
  const classes = useStyles();
  const { graphNodes, graphLinks } = useContext(GraphContext);
  const { setSelectedNode } = useContext(SelectedNodeContext);

  return graphNodes.length > 0 ? (
    <div className={classes.graphRoot}>
      <D3Graph
        id={'graph'}
        data={{
          nodes: graphNodes as CitizenNode[],
          links: graphLinks as CitizenLink[],
        }}
        config={{
          height: 600,
          width: 600,
          directed: true,
          staticGraph: false,
          d3: {
            gravity: -50,
            linkLength: 50,
          },
        }}
        onClickNode={async (nodeId) => {
          const node = await getCitizenData(nodeId);
          setSelectedNode(node);
        }}
      />
    </div>
  ) : (
    <div className={classes.graphRoot}>
      <Typography
        className={classes.italicText}
        variant="subtitle1"
        color="textSecondary"
      >
        Search for an ID to preview the graph.
      </Typography>
    </div>
  );
};

export default GraphComponent;
