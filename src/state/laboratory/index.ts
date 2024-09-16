// State - Laboratory
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ILabReportItem {
  bill_no: string;
  doctor_name: string;
  item_name: string;
  sub_tests: string[];
}

interface ILabReport {
  bill_no: string;
  doctor_name: string;
  items: ILabReportItem[];
  url: string;
}

interface ILaboratoryState {
  labReports: ILabReport[] | [];
}

const initialState: ILaboratoryState = {
  labReports: [],
};

const labSlice = createSlice({
  name: 'laboratory',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setLabReports: (state, { payload }: PayloadAction<ILabReport[]>) => {
      state.labReports = payload;
    },
  },
});

export const { resetState, setLabReports } = labSlice.actions;
export default labSlice.reducer;
