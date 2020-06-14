import React from 'react';

// SearchContext Definition
type SearchContextProps = {
  query: string;
  setQuery: (value: string) => void;
};
const SearchContext = React.createContext<Partial<SearchContextProps>>({});

export default SearchContext;
