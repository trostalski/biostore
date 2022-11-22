import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import colors from "../../colors.json";
import { forwardRef } from "react";

const LandingHeader = forwardRef((props: any, ref) => {
  const user: any = localStorage.getItem("user");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          style={{ backgroundColor: colors["dark-blue"] }}
        >
          <Toolbar variant="dense">
            <Box flexGrow={1} />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
});

export default LandingHeader;
