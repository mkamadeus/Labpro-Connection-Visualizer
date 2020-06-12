import { GraphNode, GraphLink, GraphData } from 'react-d3-graph';
import { CitizenData } from './citizen';

/**
 * Node interface for react-d3-graph with additional information
 * related to CitizenData.
 */
export interface CitizenNode extends GraphNode, CitizenData {}

/**
 * Link interface for react-d3-graph.
 */
export interface CitizenLink extends GraphLink {}

/**
 * Graph data interface for react-d3-graph using the
 * defined CitizenNode and CitizenLink interface.
 */
export interface CitizenGraphData extends GraphData<CitizenNode, CitizenLink> {}
