// Vitals
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IVital {
  id: number;
  name: string;
  unit: string;
}

interface IDoctorVital {
  id: number;
  doctor_department_id: number;
  vital_master_id: number;
  vital_master: IVital;
}

interface IAppointmentVital {
  id: number;
  doctor_department_id: number;
  vital_master_id: number;
  vital_master: IVital;
}

interface VitalState {
  vitals: IVital[];
  doctorVitals: IDoctorVital[];
  appointmentVitals: IAppointmentVital[];
}

const initialState: VitalState = {
  vitals: [],
  doctorVitals: [],
  appointmentVitals: [],
};

const vitalSlice = createSlice({
  name: 'vitals',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setVitals: (state, { payload }: PayloadAction<IVital[]>) => {
      state.vitals = payload;
    },
    setDoctorVitals: (state, { payload }: PayloadAction<IDoctorVital[]>) => {
      state.doctorVitals = payload;
    },
    setAppointmentVitals: (state, { payload }: PayloadAction<IDoctorVital[]>) => {
      state.appointmentVitals = payload;
    },
  },
});

export const { resetState, setVitals, setDoctorVitals, setAppointmentVitals } = vitalSlice.actions;
export default vitalSlice.reducer;
