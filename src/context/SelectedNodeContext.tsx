import React, { useState } from 'react';
import { CitizenData } from '../api/citizen';

/**
 * SelectedNodeContext props definition.
 */
export type SelectedNodeContextProps = {
  selectedNode: CitizenData;
  setSelectedNode: (data: CitizenData | undefined) => void;
};

/**
 * SelectedNodContextProvider props definition.
 */
export type SelectedNodeContextProviderProps = {
  children?: React.ReactNode;
};

/**
 * SelectedNodContext context definition.
 */
export const SelectedNodeContext = React.createContext<
  Partial<SelectedNodeContextProps>
>({});

/**
 * `SelectedNodContextProvider` component.
 * @param props TProps supplied to the component, with the type of SelectedNodeContextProviderProps
 */
export const SelectedNodeContextProvider = (
  props: SelectedNodeContextProviderProps
) => {
  const [selectedNode, setSelectedNode] = useState<CitizenData | undefined>();

  return (
    <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
      {props.children}
    </SelectedNodeContext.Provider>
  );
};
