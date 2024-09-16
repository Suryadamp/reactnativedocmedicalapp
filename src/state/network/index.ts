import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NetInfoStateType } from "@react-native-community/netinfo";

interface NetworkPayloadData {
  type: NetInfoStateType;
  isConnected: boolean | null;
}

interface CommonVariableState {
  commonVariable: NetworkPayloadData[];
  appConfiguration: any[];
}

const initialState: NetworkPayloadData = {
  type: NetInfoStateType.unknown,
  isConnected: null
};

const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    resetState: () => initialState,
    setNetworkState: (state, { payload }: PayloadAction<NetworkPayloadData>) => {
      state.type = payload.type;
      state.isConnected = payload.isConnected;
    },
  },
});

export const { resetState, setNetworkState } = networkSlice.actions;
export default networkSlice.reducer;
