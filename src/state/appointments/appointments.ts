import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppointmentDetails {
  appoint_date: string;
  doctor_name: string;
  doctor_id: string;
  id: number;
  op_no: string;
  patient_id: string;
  patient_mobile: string;
  patient_name: string;
  patient_sys_id: string;
  pres_no: string | null;
  purpose: string;
  slot_label: string;
  status: string | null;
  token_no: string;
  type: number | null;
  out: string;
  consulting: string;
  arrived: string;
  vitals_count?: number | null;
  prescription_count?: number | null;
  investigations_count?: number | null;
  medical_records_count?: number | null;
  video_call_id?: string;
}

interface AppointmentState {
  appointmentList: AppointmentDetails[];
}

const initialState: AppointmentState = {
  appointmentList: [],
};

const appointmentListSlice = createSlice({
  name: 'appointmentList',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setAppointments: (state, { payload }: PayloadAction<any[]>) => {
      state.appointmentList = payload;
    },
  },
});

export const { resetState, setAppointments: setAppointmentList } = appointmentListSlice.actions;
export default appointmentListSlice.reducer;
