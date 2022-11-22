import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Fab, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ChangeEvent, useState } from "react";

export default function NewCategoryPopover(props: any) {
  const id = props.open ? "simple-popover" : undefined;

  const [categoryName, setCategoryName] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setCategoryName(value);
  };

  const handleSubmit = () => {
    fetch("http://localhost:8001/category/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: categoryName, user_id: props.userId }),
    })
      .then((res) => {
        if (res.status == 200) {
          props.categoryMutate();
          props.handleClose();
        } else {
          window.alert("Category could not be created.");
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Popover
        id={id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid container alignItems={"center"} p={1}>
          <Grid item>
            <TextField
              onChange={handleChange}
              placeholder="Name"
              variant="standard"
              autoFocus={true}
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            ></TextField>
          </Grid>
          <Grid item sx={{ ml: 2 }}>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              type="submit"
              onClick={handleSubmit}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}
