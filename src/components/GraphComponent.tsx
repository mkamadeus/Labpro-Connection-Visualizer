import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import {
  CitizenGraphData,
  CitizenNode,
  CitizenLink,
  GraphConfig,
} from '../api/graph';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import useGraph from '../hook/GraphHook';
import { GraphContext } from '../context/GraphContext';

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
    },
    italicText: {
      fontStyle: 'italic',
    },
  })
);

/**
 * `GraphComponent` Component.
 */
const GraphComponent = () => {
  // Stylesheet
  const classes = useStyles();

  // Graph Hook
  const { expandNode } = useGraph();
  const { graphNodes, graphLinks } = useContext(GraphContext);

  return graphNodes!.length > 0 ? <Graph /> : <EmptyGraph />;
};

const Graph = () => {
  // Stylesheet
  const classes = useStyles();
  // Graph Hook
  const { expandNode } = useGraph();
  const { graphNodes, graphLinks } = useContext(GraphContext);
  const [graphData, setGraphData] = useState<CitizenGraphData>({
    nodes: graphNodes as CitizenNode[],
    links: graphLinks as CitizenLink[],
  });

  const constructGraphData = useCallback(async () => {
    setGraphData({
      nodes: graphNodes as CitizenNode[],
      links: graphLinks as CitizenLink[],
    });
  }, [setGraphData, graphNodes, graphLinks]);

  useEffect(() => {
    constructGraphData();
  }, [constructGraphData]);

  return (
    <div className={classes.graphRoot}>
      <div className={classes.graphContainer}>
        <D3Graph
          id={'graph'}
          data={graphData}
          config={GraphConfig}
          onClickNode={expandNode}
        />
      </div>
    </div>
  );
};

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
