import { GraphNode, GraphLink, GraphData } from 'react-d3-graph';
import { CitizenData } from './citizen';

export interface CitizenNode extends GraphNode, CitizenData {}

export interface CitizenLink extends GraphLink {}

export interface CitizenGraphData extends GraphData<CitizenNode, CitizenLink> {}
