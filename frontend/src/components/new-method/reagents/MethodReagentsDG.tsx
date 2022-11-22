import { Grid, Typography, Button } from "@mui/material";
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
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../../api/fetcher";
import { SERVER_BASE } from "../../../constants";
import SelectReagentDialog from "./SelectReagentDialog";
import CreateReagentDialog from "./CreateReagentDialog";

const MethodReagentsDG = (props: any) => {
  const user: any = JSON.parse(localStorage.getItem("user")!);
  const [rows, setRows] = useState<any[]>([]);
  const [selectDialogIsOpen, setSelectDialogIsOpen] = useState(false);
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);

  const { data, error, mutate } = useSWR<any>(
    SERVER_BASE + `method/${props.methodId}/reagents`,
    fetcher,
    {
      onSuccess: (data) => {
        let result: any[] = [];
        data.forEach((item: any) => {
          result.push({
            id: item.reagent.id,
            name: item.reagent.name,
            company: item.reagent.company,
            product_id: item.reagent.product_id,
            link: item.reagent.link,
            type: item.reagent.type,
            amount: item.amount,
          });
        });
        setRows(result);
      },
    }
  );

  const handleCloseSelectDialog = () => {
    setSelectDialogIsOpen(false);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogIsOpen(false);
  };

  const columns: GridColumns = [
    {
      field: "name",
      headerName: "Name",
      description: "Name of the reagent",
      width: 200,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      description: "Amount of the reagent",
      width: 100,
      editable: true,
    },
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
    fetch(SERVER_BASE + `method/${props.methodId}/reagent/delete`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
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
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    fetch(SERVER_BASE + `reagent/${newRow.id}/update`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newRow),
    })
      .then((res) => {
        if (res.status == 200) {
          mutate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return newRow;
  };

  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item xs={3}>
          <Typography fontWeight={"bold"}>Reagents</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCreateDialogIsOpen(true)}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 2 }}
            onClick={() => {
              setSelectDialogIsOpen(true);
            }}
          >
            Select
          </Button>
        </Grid>
        <Grid item mt={2} xs={12}>
          <div style={{ flexGrow: 1, height: 200, width: "100%" }}>
            <DataGrid
              rows={!rows ? [] : rows}
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
      <SelectReagentDialog
        isOpen={selectDialogIsOpen}
        handleClose={handleCloseSelectDialog}
        methodId={props.methodId}
        mutate={mutate}
      />
      <CreateReagentDialog
        isOpen={createDialogIsOpen}
        handleClose={handleCloseCreateDialog}
        methodId={props.methodId}
        mutate={mutate}
      />
    </>
  );
};

export default MethodReagentsDG;
