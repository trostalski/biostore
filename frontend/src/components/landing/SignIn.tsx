import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { SERVER_BASE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { CssBaseline } from "@mui/material";

const SignIn = React.forwardRef((props: any, ref) => {
  const user: any = JSON.parse(localStorage.getItem("user")!);

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(SERVER_BASE + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: new URLSearchParams(state),
    })
      .then((res) => {
        if (res.status == 200) {
          res.json().then((data) => {
            // setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            navigate("/home");
          });
        } else {
          window.alert("Login unsuccessful.");
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 12 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                value={state.username}
                onChange={handleChange}
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={state.password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
});

export default SignIn;
