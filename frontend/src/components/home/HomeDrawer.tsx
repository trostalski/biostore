import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomeDrawer = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 1,
        flexShrink: 0,
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List component={"nav"}>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/home");
              }}
            >
              Methods
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/reagents");
              }}
            >
              Reagents
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/devices");
              }}
            >
              Devices
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                navigate("/home");
              }}
            >
              Explore
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
});

export default HomeDrawer;
