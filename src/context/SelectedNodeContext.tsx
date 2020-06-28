import React, { useState } from 'react';
import { CitizenData } from '../api/citizen';

export type SelectedNodeContextProps = {
  selectedNode: CitizenData;
  setSelectedNode: (data: CitizenData | undefined) => void;
};

export type SelectedNodeContextProvierProps = {
  children?: React.ReactNode;
};

export const SelectedNodeContext = React.createContext<
  Partial<SelectedNodeContextProps>
>({});

export const SelectedNodeContextProvider = (
  props: SelectedNodeContextProvierProps
) => {
  const [selectedNode, setSelectedNode] = useState<CitizenData | undefined>();

  return (
    <SelectedNodeContext.Provider value={{ selectedNode, setSelectedNode }}>
      {props.children}
    </SelectedNodeContext.Provider>
  );
};
