import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { stat } from "fs";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SERVER_BASE } from "../../../constants";

const CreateStepDialog = (props: any) => {
  const [state, setState] = useState({
    number: 0,
    day: "",
    time: "",
    temperature: "",
    duration: "",
    description: "",
    method_id: props.methodId,
  });

  useEffect(() => {
    setState({
      number: props.number,
      day: props.day,
      description: props.description,
      duration: props.duration,
      temperature: props.temperature,
      time: props.time,
      method_id: props.methodId,
    });
    return () => {};
  }, [props]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };

  const handleCreateStep = () => {
    fetch(SERVER_BASE + "step/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(state),
    })
      .then((res) => {
        if (res.status == 200) {
          props.mutate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateStep = (stepId: string) => {
    console.log(state);
    fetch(SERVER_BASE + `step/${stepId}/update`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(state),
    })
      .then((res) => {
        if (res.status == 200) {
          props.mutate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Dialog open={props.isOpen} onClose={props.handleClose}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={4.4}>
            <DialogTitle>Step Number:</DialogTitle>
          </Grid>
          <Grid item xs={7.6}>
            <TextField
              inputProps={{ style: { textAlign: "center" } }}
              autoFocus
              name="number"
              type="number"
              variant="outlined"
              size="small"
              value={state.number || ""}
              sx={{ width: 100 }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <DialogContent>
          <DialogContentText>
            Please specify the step parameters.
          </DialogContentText>
          <Grid container>
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin="dense"
                name="day"
                label="Day"
                type="text"
                variant="standard"
                value={state.day || ""}
                sx={{ width: 100 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin="dense"
                name="time"
                label="Time"
                type="text"
                value={state.time || ""}
                sx={{ width: 100 }}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin="dense"
                name="temperature"
                label="Temperature"
                type="text"
                value={state.temperature || ""}
                sx={{ width: 100 }}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin="dense"
                name="duration"
                label="Duration"
                type="text"
                value={state.duration || ""}
                sx={{ width: 100 }}
                variant="standard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                multiline
                rows={4}
                margin="dense"
                name="description"
                label="Description"
                type="text"
                value={state.description || ""}
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.clearStateValues();
              props.handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (props.stepId) {
                handleUpdateStep(props.stepId);
              } else {
                handleCreateStep();
              }
              props.clearStateValues();
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

export default CreateStepDialog;
