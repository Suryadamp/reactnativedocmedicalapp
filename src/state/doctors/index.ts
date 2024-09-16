import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScheduleTiming {
  id: number;
  doctor_id: string;
  day_name: string;
  start_time: string;
  end_time: string;
  interval: string;
}

interface User {
  id: number;
  title: string;
  name: string;
  last_name: string;
  mobile: string;
  scheduletiming: ScheduleTiming[];
}

interface DoctorDetail {
  user_id: number;
  degree: string;
  sign: string | null;
  reg_no: string | null;
  department: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
  updated_by: string | null;
  deleted_by: string | null;
  user: User;
}

interface DoctorsState {
  doctorsList: DoctorDetail[];
}

const initialState: DoctorsState = {
  doctorsList: [],
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    resetState: () => initialState,
    setDoctorsDetails: (state, { payload }: PayloadAction<DoctorDetail>) => {
      state.doctorsList = [payload];
    },
  },
});

export const { resetState, setDoctorsDetails } = doctorSlice.actions;
export default doctorSlice.reducer;
