import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../../api/fetcher";
import { SERVER_BASE } from "../../../constants";
import RefreshIcon from "@mui/icons-material/Refresh";

const SelectDeviceDialog = (props: any) => {
  const [state, setState] = useState<any[]>([]);

  const user: any = JSON.parse(localStorage.getItem("user")!);

  const { data, error, mutate } = useSWR<any>(
    SERVER_BASE + `user/${user.id}/devices`,
    fetcher
  );

  const handleChange = (e: any, deviceId: number) => {
    if (e.target.checked) {
      setState((current) => [
        ...current,
        { method_id: props.methodId, device_id: deviceId },
      ]);
    } else {
      setState((current) =>
        current.filter((item) => item.device_id != deviceId)
      );
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(SERVER_BASE + `method/devices/connect`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(state),
    })
      .then((res) => {
        if (res.status == 200) {
          props.mutate();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>
          <Grid container alignItems="center">
            <Grid item xs={2}>
              <Typography fontWeight={"bold"} fontSize={20}>
                Select Device
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <IconButton
                onClick={() => {
                  mutate();
                }}
              >
                <RefreshIcon></RefreshIcon>
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 4 }}>
            Add Devices from your store to the method.
          </DialogContentText>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <Typography fontWeight={"bold"}>Name</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography fontWeight={"bold"}>Type</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography fontWeight={"bold"}>Company</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography fontWeight={"bold"}>Product-Id</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography fontWeight={"bold"}>Link</Typography>
            </Grid>
            {!data
              ? null
              : data
                  .filter((device: any) =>
                    device.methods.every(
                      (method: any) => method.method_id != props.methodId
                    )
                  )
                  .map((device: any) => (
                    <React.Fragment key={device.id}>
                      <Grid item xs={1}>
                        <Checkbox
                          onChange={(e) => {
                            handleChange(e, device.id);
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {device.name}
                      </Grid>
                      <Grid item xs={2}>
                        {device.type}
                      </Grid>
                      <Grid item xs={2}>
                        {device.company}
                      </Grid>
                      <Grid item xs={2}>
                        {device.product_id}
                      </Grid>
                      <Grid item xs={2}>
                        {device.link}
                      </Grid>
                    </React.Fragment>
                  ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose();
              setState([]);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleSubmit(e);
              props.handleClose();
              setState([]);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SelectDeviceDialog;
