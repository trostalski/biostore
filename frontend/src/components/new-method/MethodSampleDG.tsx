import {
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  MuiEvent,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../api/fetcher";
import { SERVER_BASE } from "../../constants";
import {
  dgColsToConditionField,
  updateRowConditionField,
  synchronizeRowsAndSamples,
  synchronizeColumnsFromSamples,
} from "../../utils/dgColsToConditionField";
import { firstUnusedRefNumber } from "../../utils/firstUnusedRefNumber";

const MethodSamplesDG = (props: any) => {
  const user: any = JSON.parse(localStorage.getItem("user")!);

  const [currentCols, setCurrentCols] = useState<GridColumns>([
    {
      field: "reference_number",
      headerName: "#",
      width: 20,
      editable: true,
    },
  ]);
  const [newColumnName, setNewColumnName] = useState("");
  const [colModalOpen, setColModalOpen] = useState(false);
  const handleColModalOpen = () => setColModalOpen(true);
  const handleColModalClose = () => setColModalOpen(false);

  useEffect(() => {}, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setNewColumnName(value);
  };

  const {
    data: rows,
    error,
    mutate,
  } = useSWR<any>(SERVER_BASE + `method/${props.methodId}/samples`, fetcher, {
    onSuccess: (data) => {
      setCurrentCols(
        currentCols.concat(synchronizeColumnsFromSamples(data, currentCols))
      );
    },
  });

  const handleCreateSample = (e: any) => {
    e.preventDefault();
    const conditions = dgColsToConditionField(currentCols.slice(1));
    const unusedReferenceNumber: number = firstUnusedRefNumber(rows);
    const newSample = {
      method_id: props.methodId,
      reference_number: unusedReferenceNumber,
      conditions: conditions,
    };
    fetch("http://localhost:8001/sample/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSample),
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
    ...currentCols,
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 70,
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

  const handleAddColumn = () => {
    setCurrentCols([
      ...currentCols,
      {
        field: newColumnName,
        headerName: newColumnName,
        width: 100,
        editable: true,
      },
    ]);
  };

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
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    fetch(SERVER_BASE + `sample/${id}/delete`, {
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
    const updatedRow: GridRowModel = updateRowConditionField(newRow);
    fetch(SERVER_BASE + `sample/${updatedRow.id}/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedRow),
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
    return updatedRow;
  };

  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={2}>
          <Typography fontWeight={"bold"}>Samples</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" size="small" onClick={handleCreateSample}>
            Add Sample
          </Button>
        </Grid>
        <Grid item justifyItems="flex-end">
          <Button variant="outlined" size="small" onClick={handleColModalOpen}>
            Add Column
          </Button>
        </Grid>
        <Grid item mt={2} xs={12}>
          <div style={{ flexGrow: 1, height: 200, width: "100%" }}>
            <DataGrid
              rows={!rows ? [] : synchronizeRowsAndSamples(rows)}
              columns={columns}
              editMode="row"
              density="compact"
              rowModesModel={rowModesModel}
              onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
              onRowEditStart={handleRowEditStart}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              experimentalFeatures={{ newEditingApi: true }}
              disableSelectionOnClick
              hideFooter={true}
            />
          </div>
        </Grid>
      </Grid>
      <Dialog open={colModalOpen} onClose={handleColModalClose}>
        <DialogTitle>Add Column</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for the new column.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Column Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewColumnName(e.currentTarget.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleColModalClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleAddColumn();
              setNewColumnName("");
              handleColModalClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MethodSamplesDG;
