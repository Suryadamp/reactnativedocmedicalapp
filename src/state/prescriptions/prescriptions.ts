import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the types for your prescription data
interface PrescriptionProduct {
  id: number;
  prescription_id: number;
  // ... other properties
  prescription_dosage_timings: DosageTiming[];
  product: {
    id: number;
    name: string;
  };
  symptom: {
    id: number;
    symptom_name: string;
  };
}

interface DosageTiming {
  id: number;
  prescription_product_id: number;
  dosage_time: string;
}

export interface Prescription {
  id: number;
  patient_id: number;
  invoice_no: string;
  // ... other properties
  prescription_product: {
    [key: string]: PrescriptionProduct[];
  };
}

interface PrescriptionState {
  prescriptions: Prescription[];
}

const initialState: PrescriptionState = {
  prescriptions: [],
};

const prescriptionSlice = createSlice({
  name: 'prescriptions',
  initialState,
  reducers: {
    resetState: () => initialState,
    setPrescriptions: (state, action: PayloadAction<Prescription[]>) => {
      state.prescriptions = action.payload;
    },
    // You can add more reducers as needed
  },
});

export const { resetState, setPrescriptions } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
