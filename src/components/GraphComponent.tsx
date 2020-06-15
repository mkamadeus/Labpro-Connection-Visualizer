import React, { useState, useEffect, useContext, useRef } from 'react';
import { Graph as D3Graph } from 'react-d3-graph';
import { CitizenGraphData, CitizenNode, CitizenLink } from '../api/graph';
import { getCitizenData, CitizenData, ElementColors } from '../api/citizen';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { GraphContext } from '../context/GraphContext';
import { LoadingContext } from '../context/LoadingContext';

// Stylesheet definition
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

/**
 * GraphComponent Props Definition.
 */
interface GraphComponentProps {
  onClickNode: (node: CitizenData) => void;
  nodeId: string;
  graphData: CitizenGraphData;
}

/**
 * GraphComponent Component.
 */
const GraphComponent = ({ nodeId, onClickNode }: GraphComponentProps) => {
  // Stylesheet
  const classes = useStyles();
  const { graphNodes, graphLinks } = useContext(GraphContext);
  const { loading } = useContext(LoadingContext);

  return !loading ? (
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
