import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  orgFirstName?: string;
  orgLastName?: string;
  location?: string;
  mobile: string | null;
}

const initialState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  mobile: null,
  orgFirstName: '',
  orgLastName: '',
  location: '',
};

const authSlice = createSlice({
  name: 'onboarding',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
    },
    setRefreshToken: (state, { payload }: PayloadAction<string>) => {
      state.refreshToken = payload;
    },
    setMobile: (state, { payload }: PayloadAction<string>) => {
      state.mobile = payload;
    },
    setOrgFirstName: (state, { payload }: PayloadAction<string>) => {
      state.orgFirstName = payload;
    },
    setOrgLastName: (state, { payload }: PayloadAction<string>) => {
      state.orgLastName = payload;
    },
    setLocation: (state, { payload }: PayloadAction<string>) => {
      state.location = payload;
    },
  },
});

export const {
  setAccessToken,
  setRefreshToken,
  resetState,
  setMobile,
  setOrgFirstName,
  setOrgLastName,
  setLocation,
} = authSlice.actions;
export default authSlice.reducer;
