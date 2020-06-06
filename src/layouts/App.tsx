import React from 'react';
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NavigationBarComponent from '../components/NavigationBarComponent';
import GraphComponent from '../components/GraphComponent';

interface AppProps {}
interface AppState {
  isDrawerOpen: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
  }

  render() {
    return (
      <>
        <NavigationBarComponent
          onClick={() => {
            this.setState({ isDrawerOpen: true });
          }}
        />
        <Container>
          <GraphComponent />
          <Drawer
            anchor={'left'}
            open={this.state.isDrawerOpen}
            onClose={() => {
              this.setState({ isDrawerOpen: false });
            }}
          >
            <Box>
              <List>
                {['Pisang', 'Goreng', 'Tepung'].map((val) => {
                  return (
                    <div key={'drawer_item_' + val}>
                      <ListItem>
                        <ListItemIcon>
                          <MenuIcon />
                        </ListItemIcon>
                        <ListItemText primary={val} />
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
              </List>
            </Box>
          </Drawer>
          <div></div>
        </Container>
      </>
    );
  }
}
