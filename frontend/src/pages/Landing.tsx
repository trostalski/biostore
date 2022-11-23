import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "../components/landing/SignIn";
import SignUp from "../components/landing/SignUp";
import LandingHeader from "../components/landing/LandingHeader";
import Image from "mui-image";

const Landing = () => {
  const [loginOpen, setLoginOpen] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);

  const handleLoginButton = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const handleRegisterButton = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  return (
    <>
      <LandingHeader />
      <Grid container>
        <Grid
          item
          display={"flex"}
          justifyContent={"flex-start"}
          xs={8}
          sx={{ height: "100vh" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
            height={"100%"}
            width={"100%"}
          ></Image>
        </Grid>
        <Grid item xs={4} sx={{ p: 4, mt: 6 }}>
          <Box sx={{ width: "100%", height: "100%", bgcolor: "white" }}>
            <Grid container>
              <Grid item display={"flex"} justifyContent="center" xs={12}>
                <Button sx={{ flex: 1 }} onClick={handleLoginButton}>
                  Sign In
                </Button>
                <Button sx={{ flex: 1 }} onClick={handleRegisterButton}>
                  Register
                </Button>
              </Grid>
              <Grid item xs={12}>
                {loginOpen ? (
                  <SignIn />
                ) : (
                  <SignUp changeToLogin={handleLoginButton} />
                )}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Landing;
