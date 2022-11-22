import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { SERVER_BASE } from "../../../constants";

const CreateReagentDialog = (props: any) => {
  const user: any = JSON.parse(localStorage.getItem("user")!);

  const initialState = {
    user_id: user.id,
    method_id: props.methodId,
    name: "",
    company: "",
    product_id: "",
    link: "",
    type: "",
  };

  const [state, setState] = useState(initialState);

  const handleCreateReagent = (e: any) => {
    e.preventDefault();
    fetch("http://localhost:8001/reagent/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => {
        if (res.status == 200) {
          props.mutate();
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth={true}
        open={props.isOpen}
        onClose={props.handleClose}
      >
        <DialogTitle>Create Reagent</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                variant="standard"
                value={state.name || ""}
                sx={{ width: 400 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                name="type"
                label="Type"
                type="text"
                value={state.type || ""}
                sx={{ width: 150 }}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                name="company"
                label="Company"
                type="text"
                value={state.company || ""}
                sx={{ width: 150 }}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                name="product_id"
                label="Product-ID"
                value={state.product_id || ""}
                fullWidth
                sx={{ width: 150 }}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoFocus
                margin="dense"
                name="link"
                label="link"
                type="text"
                value={state.link || ""}
                sx={{ width: 150 }}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
              setState(initialState);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleCreateReagent(e);
              setState(initialState);
              props.handleClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateReagentDialog;
