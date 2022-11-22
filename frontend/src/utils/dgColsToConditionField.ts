import { GridColumns, GridRowModel } from "@mui/x-data-grid";

interface ConditionsType {
  [key: string]: any;
}

interface SampleType {
  id: number;
  reference_number: number;
  conditions: any; //this is actually JSON
  method_id: number;
  name?: string;
}

export const dgColsToConditionField = (dgCols: GridColumns) => {
  // this method takes the current column names as input and
  // returns a JSON string containing the header names

  let result: ConditionsType = {};

  dgCols.forEach((col) => {
    let condition: string = col.field!;
    result[condition] = "";
  });

  return result;
};

export const updateRowConditionField = (newRow: GridRowModel): GridRowModel => {
  // this array includes all the fields that are also defined in the prisma
  // scheme and that should not be modified (packed into the conditions JSON)
  const defaultSapmleField: Array<string> = [
    "id",
    "reference_number",
    "name",
    "method_id",
    "conditions",
  ];
  for (const [key, value] of Object.entries(newRow)) {
    if (!defaultSapmleField.includes(key)) {
      if (value) {
        newRow.conditions[key] = value;
      } else {
        newRow.conditions[key] = "";
      }
    }
  }
  return newRow;
};

export const synchronizeColumnsFromSamples = (
  samples: SampleType[],
  cols: GridColumns
): GridColumns => {
  let result: GridColumns = [];
  samples.forEach((sample) => {
    for (const [key, value] of Object.entries(sample.conditions)) {
      if (
        !(
          cols.some((col) => col.field == key) ||
          result.some((res) => res.field == key)
        )
      ) {
        result.push({
          field: key,
          headerName: key,
          width: 100,
          editable: true,
        });
      }
    }
  });
  return result;
};

export const synchronizeRowsAndSamples = (rows: GridRowModel[]) => {
  const defaultSampleField: Array<string> = [
    "id",
    "reference_number",
    "name",
    "method_id",
    "conditions",
  ];

  if (Array.isArray(rows)) {
    Array.from(rows).forEach((row) => {
      for (const [key, value] of Object.entries(row.conditions)) {
        if (value) {
          row[key] = value;
        } else {
          row[key] = "";
        }
      }
    });
  }
  return rows;
};

export const updateRowsFromSamples = () => {};
