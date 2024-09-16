import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PatientItem {
  id: number;
  name: string;
  mobile: string;
  age: string;
  dob: string;
  email: 'string';
  patient_mobile: 'string';
  sex: 'string';
  title: 'string';
  uhid: 'string';
}
export interface TempPatientItem {
  id: null;
  name: string;
  mobile: string;
  age: string;
  dob?: string;
  email: string;
  patient_mobile: string;
  sex: string;
  title?: string;
  uhid: string;
  blood_group: string;
  address: string;
}

interface PatientState {
  patientList: PatientItem[];
  tempPatientList: TempPatientItem[] | undefined;
  selectedPatient: PatientItem | undefined;
}

const initialState: PatientState = {
  patientList: [],
  tempPatientList: [],
  selectedPatient: undefined,
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    resetState: () => initialState,
    setPatientDetails: (state, { payload }: PayloadAction<PatientItem[]>) => {
      state.patientList = payload;
      // Only set selectedPatient if it's currently undefined
      if (!state.selectedPatient && payload.length > 0) {
        state.selectedPatient = payload[0];
      }
    },
    setSelectPatient: (state, { payload }: PayloadAction<PatientItem>) => {
      console.log({ payload });
      state.selectedPatient = payload;
    },
    setTempPatientList: (state, { payload }: PayloadAction<TempPatientItem>) => {
      state.tempPatientList = payload;
    },
  },
});

export const { resetState, setPatientDetails, setSelectPatient, setTempPatientList } =
  patientSlice.actions;
export default patientSlice.reducer;
