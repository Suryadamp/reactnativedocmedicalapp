import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface configState {
  configId: number | null;
  isEnableTokenAppointment: boolean;
}

interface UserState {
  userId: number | null;
  userName: string;
  mobile: string;
  roles: [];
  config: configState[];
  permissions: string[];
}

const initialState: UserState = {
  userId: null,
  userName: '',
  mobile: '',
  roles: [],
  config: [],
  permissions: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setUserDetails: (state, { payload }: PayloadAction<UserState>) => {
      state.userId = payload.userId;
      state.userName = payload.userName;
      state.mobile = payload.mobile;
      state.roles = payload.roles;
      state.config = payload.config;
      state.permissions = payload.permissions;
    },
  },
});

export const { resetState, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
