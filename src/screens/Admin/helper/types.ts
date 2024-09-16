// Types
export interface IPatientState {
  generatedId?: number;
  isEdit?: boolean;
  selectedTab: number;
  isTitleOpen: boolean;
  isBloodOpen: boolean;
  isRelationTypeOpen: boolean;
  isDateOpen: boolean;
  loader: boolean;
  isCreateChart: boolean;
  title: string;
  name: string;
  dob: string;
  age: string;
  email: string;
  relationName: string;
  mobile: string;
  sex: number;
  bloodGroup: string;
  relationType: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  area: string;
  district: string;
  country: string;
  state: string;
  isVaccCreated: boolean;
  isUseAccAddress: boolean;
  errors: string[];
  image: any;
  showModal?: boolean;
  uhid: string;
}

export interface IAppointmentListState {
  doctor: any;
  isFilterOpen: boolean;
  isShowMenuBottomSheet: boolean;
  isOpenTrackStatus: boolean;
  selectedDate: Date;
  filterType: string;
  selectedDateString: string | null;
  selectedAppointment: any;
  filterValue: string;
}

export interface IVitalsState {
  height: string;
  weight: string;
  bmi: string;
  ibw: string;
  bp: string;
  fbs: string;
  ppbs: string;
  rbs: string;
  hba1c: string;
  pulse: string;
  temp: string;
  o2: string;
  diag_info: string;
  loader?: boolean;
  showModal?: boolean;
}
