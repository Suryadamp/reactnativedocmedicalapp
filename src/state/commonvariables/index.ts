import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Unit {
  id: number;
  name: string;
  active: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  deleted_by: string | null;
}

interface Frequency {
  id: string;
  value: string;
}

interface FrequencyTimeType {
  id: string;
  value: string;
}

interface DurationType {
  id: string;
  value: string;
}

interface RelationType {
  id: string;
  value: string;
}

interface SpecificDays {
  id: string;
  value: string;
}

interface Interval {
  id: number;
  value: string;
}

interface IpType {
  id: number;
  value: string;
}

interface Data {
  blood_groups: any;
  titles: any;
  gender: any;
  units: Unit[];
  freq: Frequency[];
  freq_time_type: FrequencyTimeType[];
  duration_type: DurationType[];
  specific_days: SpecificDays[];
  interval: Interval[];
  lab_bill: string;
  op_bill: string;
  dosage_timings: string[];
  relations_type: RelationType[];
  ip_type: IpType[];
}

interface CommonVariableState {
  commonVariable: Data[];
  appConfiguration: any[];
}

const initialState: CommonVariableState = {
  commonVariable: [],
  appConfiguration: [],
};

const commonVariableSlice = createSlice({
  name: 'commonvariables',
  initialState,
  reducers: {
    resetState: () => initialState,
    setCommonVariable: (state, { payload }: PayloadAction<Data>) => {
      state.commonVariable = [payload];
    },
    setAppConfiguration: (state, { payload }: PayloadAction<Data>) => {
      state.appConfiguration = [payload];
    },
  },
});

export const { resetState, setCommonVariable, setAppConfiguration } = commonVariableSlice.actions;
export default commonVariableSlice.reducer;
