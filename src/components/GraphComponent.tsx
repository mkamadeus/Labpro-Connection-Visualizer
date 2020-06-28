import React, { useContext } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import {
  CitizenGraphData,
  CitizenNode,
  CitizenLink,
  getCitizenGraphData,
  GraphConfig,
} from '../api/graph';
import { getCitizenData } from '../api/citizen';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GraphContext } from '../context/GraphContext';
import { Typography } from '@material-ui/core';
import { SelectedNodeContext } from '../context/SelectedNodeContext';
import useGraphInfo from '../hook/GraphInfoHook';

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
      backgroundColor: '#fff',
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
  const { graphNodes } = useContext(GraphContext);

  return graphNodes!.length > 0 ? <Graph /> : <EmptyGraph />;
};

const Graph = () => {
  // Stylesheet
  const classes = useStyles();

  // Context
  const { graphNodes, graphLinks, expandNode } = useGraphInfo();

  return (
    <div className={classes.graphRoot}>
      <div className={classes.graphContainer}>
        <D3Graph
          id={'graph'}
          data={
            {
              nodes: graphNodes as CitizenNode[],
              links: graphLinks as CitizenLink[],
            } as CitizenGraphData
          }
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
