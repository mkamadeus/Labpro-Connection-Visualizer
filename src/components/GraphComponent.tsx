import React from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { CitizenNode, CitizenLink } from '../api/graph';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useGraph from '../hook/GraphHook';

/**
 * Stylesheet definition.
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    graphRoot: {
      padding: '0.5em',
      height: '90vh',
    },
    graphContainer: {
      boxShadow: theme.shadows[3],
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
    },
    italicText: {
      fontStyle: 'italic',
    },
  })
);

/**
 * `GraphComponent` Component.
 * The graph component created using the `react-d3-graph` library. Only showing graph when there's at least 1 node.
 */
const GraphComponent = () => {
  // Graph Hook
  const { graphNodes } = useGraph();

  return graphNodes!.length > 0 ? <Graph /> : <EmptyGraph />;
};

/**
 * `Graph` component, used in `GraphComponent`.
 * The actual graph component.
 */
const Graph = () => {
  // Stylesheet
  const classes = useStyles();
  // Graph Hook
  const { graphNodes, graphLinks, expandNode } = useGraph();

  return (
    <div className={classes.graphRoot}>
      <div className={classes.graphContainer} id={'graphContainer'}>
        <D3Graph
          id={'graph'}
          data={{
            nodes: graphNodes as CitizenNode[],
            links: graphLinks as CitizenLink[],
          }}
          config={{
            height: document.getElementById('graphContainer')?.offsetHeight,
            width: document.getElementById('graphContainer')?.offsetWidth,
            directed: true,
            staticGraph: false,
            automaticRearrangeAfterDropNode: true,
            d3: {
              gravity: -50,
              linkLength: 50,
              linkStrength: 1,
              alphaTarget: 1,
              disableLinkForce: false,
            },
            link: {
              opacity: 0.5,
              type: 'CURVE_SMOOTH',
              strokeWidth: 1,
            },
            node: {
              size: 150,
            },
            highlightOpacity: 0.2,
            nodeHighlightBehavior: true,
          }}
          onClickNode={expandNode}
        />
      </div>
    </div>
  );
};

/**
 * `EmptyGraph` component.
 * The `EmptyGraph` is a placeholder for when the graph has no nodes.
 */
const EmptyGraph = () => {
  // Stylesheet
  const classes = useStyles();

  return (
    <div className={classes.graphRoot}>
      <div className={classes.graphContainer}>
        <Typography
          className={classes.italicText}
          variant="subtitle1"
          color="textSecondary"
        >
          Search for an ID to preview the graph.
        </Typography>
      </div>
    </div>
  );
};

export default GraphComponent;
