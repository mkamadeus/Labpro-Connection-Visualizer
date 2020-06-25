import React from 'react';
import { Box } from '@material-ui/core';
import SearchBar from './SearchBar';
import SearchButton from './SearchButton';
import { SearchContextProvider } from '../context/SearchContext';

const SearchComponent = () => {
  return (
    <SearchContextProvider>
      <Box flexGrow={'2'} px={'0.5em'}>
        <SearchBar />
      </Box>
      <Box flexGrow={'1'} px={'0.5em'}>
        <SearchButton />
      </Box>
    </SearchContextProvider>
  );
};

export default SearchComponent;
