import React from "react";
import {
  Box,
  Container,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
  }

  render() {
    return (
      <Container>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                this.setState({ isDrawerOpen: true });
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor={"left"}
          open={this.state.isDrawerOpen}
          onClose={() => {
            this.setState({ isDrawerOpen: false });
          }}
        >
          <Box>
            <List>
              {["Pisang", "Goreng", "Tepung"].map((val) => {
                return (
                  <div key={"drawer_item_" + val}>
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
    );
  }
}
