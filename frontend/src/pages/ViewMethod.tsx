import {
  Box,
  Button,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, Location, useNavigate } from "react-router-dom";
import HomeHeader from "../components/home/HomeHeader";
import CommentSidebar from "../components/new-method/CommentSidebar";
import MethodDevicesDG from "../components/new-method/devices/MethodDevicesDG";
import MethodReagentsDG from "../components/new-method/reagents/MethodReagentsDG";
import MethodSamplesDG from "../components/new-method/MethodSampleDG";
import MethodSteps from "../components/new-method/steps/MethodSteps";
import { ChangeEvent, useState } from "react";
import { SERVER_BASE } from "../constants";
import { fetcher } from "../api/fetcher";
import useSWR from "swr";

const ContainerBox = (props: any) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: 800,
        height: "auto",
        boxShadow: 4,
        mt: 2,
        ml: 10,
        p: 3,
        borderRadius: 4,
      }}
    >
      {props.children}
    </Box>
  );
};

const ViewMethod = () => {
  const location: Location = useLocation();
  const user: any = JSON.parse(localStorage.getItem("user")!);

  const { data: categoryData, mutate: categoryMutate } = useSWR(
    SERVER_BASE + `user/${user.id}/categories`,
    fetcher
  );
  console.log(categoryData);

  if (!(categoryData == undefined)) {
    if (categoryData.length == 0) {
      setTimeout(categoryMutate, 1000);
    }
  }

  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    duration: "",
    number_of_samples: "",
    description: "",
    category_id: "",
  });
  const [selectDisplay, setSelectDisplay] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  }

  function handleSelectChange(
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    const nameValue = e.target.value;
    setSelectDisplay(nameValue);

    const category = categoryData.filter(
      (category: any) => category.name === nameValue
    );

    const idValue = category[0].id;
    setState({ ...state, [e.target.name]: idValue });
  }

  const handleCreateMethod = () => {
    fetch(SERVER_BASE + `method/${location.state.methodId}/update`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(state),
    })
      .then((res) => {
        if (res.status == 200) {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CssBaseline />
      <HomeHeader />
      {/* Grey background box component */}
      <Box
        id="grayBackground"
        component="main"
        sx={{
          position: "fixed",
          bgcolor: "#eeeeee",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Grid container>
          <Grid item xs={9.6}>
            <Box sx={{ width: 1150, pl: 20, bgcolor: "#eeeeee" }}>
              <Box
                sx={{
                  width: 800,
                  height: "auto",
                  mt: 4,
                  backgroundColor: "inherit",
                  ml: 10,
                  borderRadius: 4,
                  pt: 4,
                  pb: 4,
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      inputProps={{ style: { fontSize: 32 } }}
                      placeholder="Title"
                      variant="standard"
                      value={state.name || ""}
                      name="name"
                      onChange={handleChange}
                      datatype="other"
                      sx={{ fontSize: 36, width: 800 }}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" sx={{ mt: 1 }}>
                      <Grid item xs={1}>
                        <Typography fontSize={14} color="gray">
                          Duration:
                        </Typography>
                      </Grid>
                      <Grid item xs={11}>
                        <TextField
                          name="duration"
                          value={state.duration || ""}
                          onChange={handleChange}
                          size="small"
                          variant="standard"
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" sx={{ mt: 2 }}>
                      <Grid item xs={2}>
                        <Typography>Number Of Samples:</Typography>
                      </Grid>
                      <Grid item xs={5.4}>
                        <TextField
                          name="number_of_samples"
                          onChange={handleChange}
                          value={state.number_of_samples || ""}
                          inputProps={{ style: { textAlign: "center" } }}
                          size="small"
                          type="text"
                          sx={{ backgroundColor: "white", width: 100 }}
                        ></TextField>
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Category"
                          name="category_id"
                          value={selectDisplay || ""}
                          select
                          onChange={handleSelectChange}
                          sx={{ backgroundColor: "white", width: 300 }}
                        >
                          {!categoryData ? (
                            <MenuItem>No Categories found</MenuItem>
                          ) : (
                            categoryData.map((category: any) => (
                              <MenuItem key={category.id} value={category.name}>
                                {category.name}
                              </MenuItem>
                            ))
                          )}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
              <ContainerBox>
                <Grid container justifyContent={"space-between"}>
                  <Grid item xs={12}>
                    <Typography fontWeight={"bold"}>Description</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      value={state.description || ""}
                      onChange={handleChange}
                      multiline
                      fullWidth
                      rows={2}
                      sx={{ pl: 2 }}
                    />
                  </Grid>
                </Grid>
              </ContainerBox>
              <ContainerBox>
                <Grid container>
                  <Grid item xs={6}>
                    <MethodReagentsDG methodId={location.state.methodId} />
                  </Grid>
                  <Grid item ml={2} xs={5.7}>
                    <MethodDevicesDG methodId={location.state.methodId} />
                  </Grid>
                </Grid>
              </ContainerBox>
              <ContainerBox>
                <MethodSamplesDG methodId={location.state.methodId} />
              </ContainerBox>
              <ContainerBox>
                <MethodSteps methodId={location.state.methodId} />
              </ContainerBox>
              <Grid container sx={{ mt: 4, pb: 10 }}>
                <Grid item xs={7}></Grid>
                <Grid item xs={5}>
                  <Button variant="outlined" sx={{ bgcolor: "white" }}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ ml: 4 }}
                    onClick={handleCreateMethod}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={2.4}>
            <CommentSidebar methodId={location.state.methodId} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewMethod;
