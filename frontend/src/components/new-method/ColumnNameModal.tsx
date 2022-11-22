import { Button, Grid, Modal, TextField } from "@mui/material";
import React from "react";

const ColumnNameModal = (props: any) => {
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Grid container>
        <Grid item xs={10}>
          <TextField></TextField>
        </Grid>
        <Grid item>
          <Button>Submit</Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ColumnNameModal;
