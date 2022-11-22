import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import CategoryAccordion from "../components/home/CategoryAccordion";
import HomeHeader from "../components/home/HomeHeader";
import NewCategoryPopover from "../components/home/NewCategoryPopover";
import { SERVER_BASE } from "../constants";

const Home = () => {
  const navigate = useNavigate();

  const user: any = JSON.parse(localStorage.getItem("user")!);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    data: categoryData,
    error: categoryError,
    mutate: categoryMutate,
  } = useSWR<any>(
    user ? SERVER_BASE + `user/${user.id}/categories-with-methods` : null,
    fetcher
  );

  useEffect(() => {
    fetch(SERVER_BASE + "method/delete/unnamed", { method: "POST" })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    return () => {};
  }, [categoryData]);

  const handleCreateMethod = () => {
    fetch(SERVER_BASE + "method/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ creator_id: user.id }),
    })
      .then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            const methodId: number = data.id;
            navigate("/newmethod", {
              state: {
                methodId: methodId,
              },
            });
          });
        } else {
          window.alert("Method could not be created.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (categoryError) return <p>An error occured while loading data.</p>;
  return (
    <>
      <CssBaseline />
      <Box
        component="main"
        position={"fixed"}
        sx={{
          bgcolor: "#eeeeee",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <HomeHeader />
        <Container maxWidth="lg">
          <Box
            sx={{
              width: 1100,
              height: "auto",
              mt: 10,
              backgroundColor: "white",
              ml: 10,
              borderRadius: 4,
              pb: 8,
            }}
          >
            <Grid
              container
              justifyContent={"space-between"}
              pt={4}
              pr={6}
              pl={6}
            >
              <Grid item xs={8}>
                <Typography variant="h5">My Methods</Typography>
              </Grid>
              <Grid item sx={{ mb: 4 }}>
                <Button variant="contained" onClick={handleCreateMethod}>
                  New Method
                </Button>
              </Grid>
              <Grid item xs={12}>
                {!categoryData
                  ? null
                  : categoryData.map((item: any) => (
                      <CategoryAccordion
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        methodsData={item.methods}
                        mutate={categoryMutate}
                      />
                    ))}
              </Grid>
              <Grid item>
                <Button onClick={handleClick}>Add Category</Button>
                <NewCategoryPopover
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  open={open}
                  userId={user.id}
                  categoryMutate={categoryMutate}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
