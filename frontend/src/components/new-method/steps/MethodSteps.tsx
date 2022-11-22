import { Grid, Typography, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../../api/fetcher";
import { SERVER_BASE } from "../../../constants";
import CreateStepDialog from "./CreateStepDialog";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ClearIcon from "@mui/icons-material/Clear";

function MethodSteps(props: any) {
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [stepState, setStepState] = useState({
    number: 0,
    day: "",
    time: "",
    temperature: "",
    duration: "",
    description: "",
    method_id: props.methodId,
  });
  const [stepId, setStepId] = useState("");

  const handleCloseStepModal = () => {
    setIsStepModalOpen(false);
  };

  const handleDeleteStep = (stepId: number) => {
    fetch(SERVER_BASE + `step/${stepId}/delete`, { method: "POST" })
      .then((res) => {
        if (res.status == 200) {
          mutate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearStateValues = () => {
    setStepState({
      number: 0,
      day: "",
      time: "",
      temperature: "",
      duration: "",
      description: "",
      method_id: props.methodId,
    });
    setStepId("");
  };

  const { data, error, mutate } = useSWR<any>(
    SERVER_BASE + `method/${props.methodId}/steps`,
    fetcher
  );

  if (!data) {
    return <div>Loading Steps…</div>;
  }

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Typography fontWeight={"bold"}>Steps</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setIsStepModalOpen(true);
            }}
          >
            Add Step
          </Button>
        </Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Grid item xs={1}>
            <Typography fontWeight={"bold"}>Day</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography fontWeight={"bold"}>Time</Typography>
          </Grid>
          <Grid item xs={5.5}>
            <Typography fontWeight={"bold"}>Description</Typography>
          </Grid>
          <Grid item xs={1.5}>
            <AvTimerIcon />
          </Grid>
          <Grid item xs={1.5}>
            <DeviceThermostatIcon />
          </Grid>
          <Grid item xs={1.5}></Grid>
          {data
            .sort((a: any, b: any) => (a.number > b.number ? 1 : -1))
            .map((step: any) => (
              <React.Fragment key={step.id}>
                <Grid item xs={1}>
                  {step.day}
                </Grid>
                <Grid item xs={1}>
                  {step.time}
                </Grid>
                <Grid item xs={5.5}>
                  {step.description}
                </Grid>
                <Grid item xs={1.5}>
                  {step.duration}
                </Grid>
                <Grid item xs={1.5}>
                  {step.temperature}
                </Grid>
                <Grid item xs={1.5}>
                  <Grid container>
                    <Grid item xs={6}>
                      <IconButton
                        onClick={() => {
                          handleDeleteStep(step.id);
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          setStepState({
                            number: step.number,
                            day: step.day,
                            description: step.description,
                            duration: step.duration,
                            temperature: step.temperature,
                            time: step.time,
                            method_id: props.methodId,
                          });
                          setStepId(step.id);
                          setIsStepModalOpen(true);
                        }}
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
        </Grid>
      </Grid>
      <CreateStepDialog
        isOpen={isStepModalOpen}
        handleClose={handleCloseStepModal}
        methodId={props.methodId}
        mutate={mutate}
        day={stepState.day}
        time={stepState.time}
        duration={stepState.duration}
        temperature={stepState.temperature}
        description={stepState.description}
        number={stepState.number}
        stepId={stepId}
        clearStateValues={clearStateValues}
      />
    </>
  );
}

export default MethodSteps;
