import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PurposeItem {
  id: number;
  name: string;
}

export interface PurposeState {
  purposeList: PurposeItem[];
}

export const initialState: PurposeState = {
  purposeList: [],
};

const purposesSlice = createSlice({
  name: 'purposes',
  initialState,
  reducers: {
    resetState: () => initialState,
    setPurposesList: (state, { payload }: PayloadAction<PurposeItem[]>) => {
      state.purposeList = payload;
    },
  },
});

export const { resetState, setPurposesList } = purposesSlice.actions;
export default purposesSlice.reducer;
