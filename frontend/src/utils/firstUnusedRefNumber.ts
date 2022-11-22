interface SampleType {
  id: number;
  reference_number: number;
  conditions: string;
  method_id: number;
  name?: string;
}

export const firstUnusedRefNumber = (dgRows: SampleType[]) => {
  let counter: number = 1;
  while (dgRows.some((row) => row.reference_number == counter)) {
    counter += 1;
  }
  return counter;
};
