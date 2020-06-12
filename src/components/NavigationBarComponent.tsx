import React, { Component } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBarComponent from './SearchBar';

interface NavigationBarComponentProps {
  onClick: Function;
}

export default class NavigationBarComponent extends Component<
  NavigationBarComponentProps
> {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              this.props.onClick();
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" component="h1">
            Suspect Expander
          </Typography>
          <Box px={4}>
            <SearchBarComponent />
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}
