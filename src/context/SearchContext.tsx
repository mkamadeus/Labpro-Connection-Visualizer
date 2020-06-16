import React, { useState } from 'react';

/**
 * `SearchContext` Props definition.
 */
export type SearchContextProps = {
  query: string;
  setQuery: (value: string) => void;
};

/**
 * `SearchContextProvider` component props definition.
 */
export type SearchContextProviderProps = {
  children?: React.ReactNode;
};

/**
 * `SearchContext` definition.
 */
export const SearchContext = React.createContext<Partial<SearchContextProps>>(
  {}
);

/**
 * `SearchContextProvider` component.
 * @param props Props supplied to the component, having type of `SearchContextProviderProps`.
 */
export const SearchContextProvider = (props: SearchContextProviderProps) => {
  // States
  const [query, setQuery] = useState<string>('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {props.children}
    </SearchContext.Provider>
  );
};
