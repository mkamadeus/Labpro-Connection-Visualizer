import React, { useContext } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import {
  CitizenGraphData,
  CitizenNode,
  CitizenLink,
  getCitizenGraphData,
} from '../api/graph';
import { getCitizenData } from '../api/citizen';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GraphContext } from '../context/GraphContext';
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
  const {
    graphNodes,
    graphLinks,
    graphLinksDispatcher,
    graphNodesDispatcher,
  } = useContext(GraphContext);
  const { setSelectedNode } = useContext(SelectedNodeContext);

  return (
    <div className={classes.graphRoot}>
      <D3Graph
        id={'graph'}
        data={
          {
            nodes: graphNodes as CitizenNode[],
            links: graphLinks as CitizenLink[],
          } as CitizenGraphData
        }
        config={{
          height: 600,
          width: 600,
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
        onClickNode={async (nodeId) => {
          await getCitizenData(nodeId).then((response) => {
            setSelectedNode!(response);
          });
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
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      />
    </div>
  );
};

const EmptyGraph = () => {
  // Stylesheet
  const classes = useStyles();

  return (
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
