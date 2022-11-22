import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import colors from "../../colors.json";
import { forwardRef, useContext, useState } from "react";
import { Grid } from "@mui/material";
import { SERVER_BASE } from "../../constants";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import HomeDrawer from "./HomeDrawer";
import { UserContext } from "../landing/UserContext";

const HomeHeader = forwardRef((props: any, ref) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const user: any = JSON.parse(localStorage.getItem("user")!);

  const handleLogout = () => {
    fetch(SERVER_BASE + "auth/logout", {
      method: "POST",
      headers: {},
      credentials: "include",
    })
      .then((res) => {
        if (res.status == 200) {
          navigate("/");
          localStorage.removeItem("user");
        } else {
          window.alert("Logout unsuccessful.");
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: colors["dark-blue"],
            zIndex: 1500,
          }}
        >
          <Toolbar variant="dense">
            <Box flexGrow={1}>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/home");
                }}
              >
                HOME
              </Button>
            </Box>
            {!user ? (
              <Grid>
                <Button color="inherit" onClick={props.handleLoginButton}>
                  Login
                </Button>
                <Button color="inherit" onClick={props.handleRegisterButton}>
                  Register
                </Button>
              </Grid>
            ) : (
              <Grid>
                <Button color="inherit">{user.username}</Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Grid>
            )}
          </Toolbar>
        </AppBar>
        <HomeDrawer />
      </Box>
    </>
  );
});

export default HomeHeader;
