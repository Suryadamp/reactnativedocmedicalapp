import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface latestAppointmentState {
  appointmentId: string;
  doctorId: number | null;
  userId: number | null;
  patientId: number | null;
  purposeId: number | null;
  appointmentDate: string;
  tokenNo: number | null;
  status: number | null;
}

const initialState: latestAppointmentState = {
  appointmentId: '',
  doctorId: null,
  userId: null,
  patientId: null,
  purposeId: null,
  tokenNo: null,
  status: null,
  appointmentDate: '',
};

const latestAppointmentSlice = createSlice({
  name: 'latestAppointment',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setLatestAppointmentDetails: (state, { payload }: PayloadAction<latestAppointmentState>) => {
      state.appointmentId = payload.appointmentId;
      state.doctorId = payload.doctorId;
      state.userId = payload.userId;
      state.patientId = payload.patientId;
      state.purposeId = payload.purposeId;
      state.tokenNo = payload.tokenNo;
      state.status = payload.status;
      state.appointmentDate = payload.appointmentDate;
    },
  },
});

export const { resetState, setLatestAppointmentDetails } = latestAppointmentSlice.actions;
export default latestAppointmentSlice.reducer;
