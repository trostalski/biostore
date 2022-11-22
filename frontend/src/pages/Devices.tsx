import {
  CssBaseline,
  Box,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridToolbar,
  MuiEvent,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";
import HomeHeader from "../components/home/HomeHeader";
import { SERVER_BASE } from "../constants";

const Devices = () => {
  const user: any = JSON.parse(localStorage.getItem("user")!);

  const {
    data: rows,
    error,
    mutate,
  } = useSWR<any>(SERVER_BASE + `user/${user.id}/devices`, fetcher);

  const handleCreateDevice = (e: any) => {
    const newDevice = {
      user_id: user.id,
      name: "",
      company: "",
      product_id: "",
      link: "",
      type: "",
    };
    e.preventDefault();
    fetch("http://localhost:8001/device/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDevice),
    })
      .then((res) => {
        if (res.status == 200) {
          mutate();
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Name",
      description: "Name of the device",
      width: 200,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      editable: true,
    },
    { field: "company", headerName: "Company", width: 100, editable: true },
    {
      field: "product_id",
      headerName: "Product-ID",
      width: 150,
      editable: true,
    },
    {
      field: "link",
      headerName: "Link",
      width: 200,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log(rows);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    fetch(SERVER_BASE + `device/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status == 200) {
          mutate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      // setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    fetch(SERVER_BASE + `device/${newRow.id}/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newRow),
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    return newRow;
  };

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
          <Grid container>
            <Grid item>
              <Box
                sx={{
                  width: 1100,
                  height: "auto",
                  mt: 8,
                  backgroundColor: "white",
                  ml: 10,
                  borderRadius: 4,
                  pb: 8,
                }}
              >
                <Grid container alignItems={"center"}>
                  <Grid item xs={10} ml={2}>
                    <Typography sx={{ fontSize: 36, width: 600 }}>
                      Devices
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handleCreateDevice}>
                      New Device
                    </Button>
                  </Grid>
                  <Grid item xs={11.2} mt={2} ml={4}>
                    <div style={{ flexGrow: 1, height: 500, width: "100%" }}>
                      <DataGrid
                        rows={!rows ? [] : rows}
                        columns={columns}
                        editMode="row"
                        density="compact"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={(newModel) =>
                          setRowModesModel(newModel)
                        }
                        onRowEditStart={handleRowEditStart}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        experimentalFeatures={{ newEditingApi: true }}
                        disableSelectionOnClick
                        components={{ Toolbar: GridToolbar }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Devices;
