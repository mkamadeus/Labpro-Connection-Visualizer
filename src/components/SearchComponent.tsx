import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';
import SearchContext from '../context/SearchContext';

const SearchComponent = () => {
  // States
  const [query, setQuery] = useState<string>('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      <Box flexGrow={'2'} px={'0.5em'}>
        <SearchBar />
      </Box>
      <Box flexGrow={'1'} px={'0.5em'}>
        <SearchButton />
      </Box>
    </SearchContext.Provider>
  );
};

export default SearchComponent;
