import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PrescriptionSymptoms {
  id: number;
  symptom_name: string;
}

interface PrescriptionSymptomState {
  prescriptionSymptomList: PrescriptionSymptoms[];
}

const initialState: PrescriptionSymptomState = {
  prescriptionSymptomList: [],
};

const prescriptionSymptomSlice = createSlice({
  name: 'prescriptionSymptomsList',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setPrescriptionSymptomList: (state, { payload }: PayloadAction<PrescriptionSymptoms[]>) => {
      state.prescriptionSymptomList = payload;
    },
  },
});

export const { resetState, setPrescriptionSymptomList: setPrescriptionSymptomsList } =
  prescriptionSymptomSlice.actions;
export default prescriptionSymptomSlice.reducer;
