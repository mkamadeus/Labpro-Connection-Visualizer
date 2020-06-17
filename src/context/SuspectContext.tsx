import React, { useReducer } from 'react';
import { CitizenData } from '../api/citizen';
import {
  suspectReducer,
  SuspectAction,
  SuspectReducer,
} from '../reducer/SuspectReducer';

/**
 * SuspectContext props definition.
 */
export type SuspectContextProps = {
  suspectMap: { [key: string]: CitizenData };
  suspectMapDispatcher: React.Dispatch<SuspectAction>;
};

/**
 * SuspectContextProvier props defintion.
 */
export type SuspectContextProviderProps = {
  children?: React.ReactNode;
};

/**
 * SuspcectContext context definition
 */
export const SuspectContext = React.createContext<Partial<SuspectContextProps>>(
  {}
);

export const SuspectContextProvider = (props: SuspectContextProviderProps) => {
  const [suspectMap, suspectMapDispatcher] = useReducer<
    SuspectReducer,
    { [key: string]: CitizenData }
  >(suspectReducer, {}, () => {
    return {};
  });

  return (
    <SuspectContext.Provider value={{ suspectMap, suspectMapDispatcher }}>
      {props.children}
    </SuspectContext.Provider>
  );
};
