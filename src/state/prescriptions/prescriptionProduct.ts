import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PrescriptionProducts {
  id: number;
  name: string;
}

interface PrescriptionProductState {
  prescriptionProductList: PrescriptionProducts[];
  prescriptionAction: boolean;
}

const initialState: PrescriptionProductState = {
  prescriptionProductList: [],
  prescriptionAction: false,
};

const prescriptionProductSlice = createSlice({
  name: 'prescriptionProductList',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setPrescriptionProductList: (state, { payload }: PayloadAction<PrescriptionProducts[]>) => {
      state.prescriptionProductList = payload;
    },
    setPrescriptionAction: (state, { payload }: PayloadAction<boolean>) => {
      state.prescriptionAction = payload;
    },
  },
});

export const {
  resetState,
  setPrescriptionProductList: setPrescriptionProductList,
  setPrescriptionAction,
} = prescriptionProductSlice.actions;
export default prescriptionProductSlice.reducer;
