// State - Inpatient
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPatient {
  id: string;
  name: string;
}

export interface IDoctor {
  id: string;
  name: string;
}

export interface IIpType {
  id: string;
  value: string;
}

export interface IRoomDetail {
  bed: string;
  floorId: string;
  name: string;
  roomId: string;
}

export interface InpatientItem {
  patient: IPatient | null;
  doctor: IDoctor | null;
  ipType: IIpType | null;
  roomDetail: IRoomDetail | null;
  mobile: string;
  doa: string;
  ip_no: string;
  attender: string;
  attender_mobile: string;
  health_condition: string;
}
interface IPayloadItem {
  name: keyof InpatientItem;
  value: any;
}

interface Inpatient {
  id: number;
  is_discharge: number;
  reason?: string;
  doa: Date | string;
  dod?: string;
  ip_no: string;
  name: string;
  patient_name: string;
  patient_sys_id: number;
  uhid: string;
  mobile: string;
  doctor_name: string;
  created_user: string;
  status: string;
  prescription_count: number;
  investigations_count: number;
  discharge_summary_count: number;
  vitals_count: number;
}

interface InpatientSelectedRoom {
  floor_name: string;
  room_id: string;
  roomNo: string;
}

interface InpatientsState {
  item: InpatientItem;
  selectedRoom: InpatientSelectedRoom | null;
  inpatientList: Inpatient[];
  invoice: any;
  // prescriptions: IPrescription[];
  prescriptions: any[];
  vitals: any[];
  doctorVitals: any;
  inpatientVitals: any[];
  inpatientInvestigation: any[];
  selectedInpatient: any;
}

const initialState: InpatientsState = {
  inpatientList: [],
  selectedRoom: null,
  prescriptions: [],
  selectedInpatient: null,
  invoice: null,
  vitals: [],
  doctorVitals: [],
  inpatientVitals: [],
  inpatientInvestigation: [],
  item: {
    patient: null,
    doctor: null,
    mobile: '',
    doa: '',
    ip_no: '',
    ipType: null,
    attender: '',
    attender_mobile: '',
    roomDetail: null,
    health_condition: '',
  },
};

const inpatientSlice = createSlice({
  name: 'inpatients',
  initialState,
  reducers: {
    resetStateInPatients: () => initialState,
    resetStateItem: (state) => {
      state.item = initialState.item;
    },
    setInpatientIpNo: (state, { payload }: PayloadAction<string>) => {
      state.item.ip_no = payload;
    },
    setInpatientItem: (state, { payload }: PayloadAction<IPayloadItem>) => {
      const { name, value } = payload;
      if (name in state.item) {
        state.item[name] = value;
      }
    },
    setInpatientList: (state, { payload }: PayloadAction<Inpatient[]>) => {
      state.inpatientList = payload;
    },
    setInpatientSelectedRoom: (state, { payload }: PayloadAction<any>) => {
      state.selectedRoom = payload;
    },
    resetInpatientSelectedRoom: (state) => {
      state.selectedRoom = initialState.selectedRoom;
    },
    setInpatientPrescriptions: (state, { payload }: PayloadAction<any>) => {
      state.prescriptions = payload;
    },
    setVitals: (state, { payload }: PayloadAction<any>) => {
      state.vitals = payload;
    },
    setInpatientVitals: (state, { payload }: PayloadAction<any>) => {
      state.inpatientVitals = payload;
    },
    setInpatientInvestigation: (state, { payload }: PayloadAction<any>) => {
      state.inpatientInvestigation = payload;
    },
    setDoctorVitals: (state, { payload }: PayloadAction<any>) => {
      state.doctorVitals = payload;
    },
    setSelectedInpatient: (state, { payload }: PayloadAction<any>) => {
      state.selectedInpatient = payload;
    },
    setInpatientInvoice: (state, { payload }: PayloadAction<any>) => {
      state.invoice = payload;
    },
  },
});

export const {
  resetStateInPatients,
  setInpatientItem,
  setInpatientIpNo,
  resetStateItem,
  setInpatientList,
  setInpatientSelectedRoom,
  resetInpatientSelectedRoom,
  setInpatientPrescriptions,
  setVitals,
  setInpatientVitals,
  setDoctorVitals,
  setSelectedInpatient,
  setInpatientInvestigation,
  setInpatientInvoice,
} = inpatientSlice.actions;
export default inpatientSlice.reducer;
