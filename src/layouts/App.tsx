import React, { useState } from 'react';
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
import CitizenInformationComponent from '../components/CitizenInformationComponent';
import { CitizenDataWithFriends, ElementBending } from '../api/citizen';

export default function App() {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<CitizenDataWithFriends>({
    id: '',
    name: '',
    element: ElementBending.water,
    friends: [],
  } as CitizenDataWithFriends);

  return (
    <>
      <NavigationBarComponent
        onClick={() => {
          setDrawerOpen(true);
        }}
      />
      <Container>
        <Box display={'flex'} flexDirection={'row'} width={'100%'}>
          <GraphComponent
            onClickNode={(node: CitizenDataWithFriends) =>
              setSelectedNode(node)
            }
            nodeId={'1'}
          />
          <CitizenInformationComponent node={selectedNode} />
        </Box>
        <div></div>
      </Container>
      <Drawer
        anchor={'left'}
        open={isDrawerOpen}
        onClose={() => {
          setDrawerOpen(false);
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
    </>
  );
}
