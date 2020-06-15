import React, { useState } from 'react';

/**
 * LoadingContext value defintion
 */
export type LoadingContextProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * `LoadingContextProvider` props definition.
 */
export type LoadingContextProviderProps = {
  children?: React.ReactNode;
};

/**
 * `LoadingContext` definition
 */
export const LoadingContext = React.createContext<Partial<LoadingContextProps>>(
  {}
);

/**
 * `LoadingContextProvider` Component.
 * @param props Props supplied to the component, with the type of `LoadingContextProviderProps`
 */
export const LoadingContextProvider = (props: LoadingContextProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {props.children}
    </LoadingContext.Provider>
  );
};
