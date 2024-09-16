import {
  BookAppointment,
  CommingSoon,
  MedicalRecords,
  SearchAppointment,
  SignIn,
  SignUp,
  Splash,
  ViewAppointment,
  ViewDoctor,
  ViewRemainder,
  RemainderCard,
  RemainderDetail,
  LobbyScreen,
  VideoCallRoomScreen,
  Profile,
  RemainderListNew,
  TrackActivity,
  CancelAppointment,
  BookingCanceled,
  InvestigationsList,
  SelectTest,
  PatientRegistration,
  AddVitals,
  AddMedicalRecord,
  ViewMedicalRecord,
  ViewMedicalRecordPdf,
  ViewVitals,
} from '../../screens';
import PrescriptionDetail from '../../screens/Prescriptions/PrescriptionDetail';
import AddPrescriptionForm from '../../screens/Prescriptions/AddPrescriptionForm';
import DrawerNavigation from '../DrawerNavigation/index';
import VaccineDetails from '../../screens/vaccines/VaccineDetails';
import {
  AdvancePayment,
  BillsPayment,
  TransactionSuccess,
  BillsPdfViewer,
} from '../../screens/BillsAndPayments';
import { OrderSummary } from '../../screens/BookTest';
import LabReportDetails from '../../screens/Laboratory/LabReportDetails';
import RemainderDetailsNew from '../../screens/RemainderNew/RemainderDetailsNew';
import ReminderTrackActivity from '../../screens/RemainderNew/ReminderTrackActivity';
import PrescriptionList from '../../screens/Prescriptions/PrescriptionList';
import ReportDocsList from '../../screens/Laboratory/ReportDocsList';
import RescheduleAppointment from '../../screens/Appointment/ViewAppointment/RescheduleAppointment';

/* Admin - Appointments */
import AppointmentVitals from '../../screens/Admin/Vitals';

/* Inpatients */
import {
  InpatientsList,
  AddInpatient,
  InpatientRoomTransfer,
  InpatientRoomList,
  InpatientPrescriptionList,
  InpatientVitalList,
  InpatientAddVitals,
  InpatientInvestigation,
  InpatientInvoice,
  InpatientAddPrescription,
  InpatientAdvancePayment,
} from '../../screens/Inpatients';

export const routes = [
  {
    name: 'ReportDocsList',
    component: ReportDocsList,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'DashboardStack',
    component: DrawerNavigation,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'Splash',
    component: Splash,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'SignIn',
    component: SignIn,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'SignUp',
    component: SignUp,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'CommingSoon',
    component: CommingSoon,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  /* {
    name: 'ViewAppointment',
    component: ViewAppointment,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  }, */
  {
    name: 'SearchAppointment',
    component: SearchAppointment,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'ViewDoctor',
    component: ViewDoctor,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'BookAppointment',
    component: BookAppointment,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'ViewRemainder',
    component: ViewRemainder,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'RemainderListNew',
    component: RemainderListNew,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'RemainderCard',
    component: RemainderCard,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'RemainderDetail',
    component: RemainderDetail,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'CreateRemainder',
    component: AddPrescriptionForm,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'MedicalRecords',
    component: MedicalRecords,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'PrescriptionDetail',
    component: PrescriptionDetail,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'RemainderDetailNew',
    component: RemainderDetailsNew,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'RemainderTrackActivity',
    component: ReminderTrackActivity,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'VaccineDetail',
    component: VaccineDetails,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'AdvancePayment',
    component: AdvancePayment,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'OrderSummary',
    component: OrderSummary,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'VideoCallLobby',
    component: LobbyScreen,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'CallConnected',
    component: VideoCallRoomScreen,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'LabReportDetails',
    component: LabReportDetails,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'Profile',
    component: Profile,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'TransactionSuccess',
    component: TransactionSuccess,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'BillsPdfViewer',
    component: BillsPdfViewer,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'TrackActivity',
    component: TrackActivity,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'CancelAppointment',
    component: CancelAppointment,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'BookingCanceled',
    component: BookingCanceled,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'PrescriptionList',
    component: PrescriptionList,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'BillsPayment',
    component: BillsPayment,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'RescheduleAppointment',
    component: RescheduleAppointment,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'InvestigationsList',
    component: InvestigationsList,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'SelectTest',
    component: SelectTest,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  {
    name: 'PatientRegistration',
    component: PatientRegistration,
    showHeader: false,
    headerProps: {
      showBackButton: false,
    },
  },
  /* {
    name: 'Prescriptions',
    component: PrescriptionList,
    showHeader: false,
    headerProps: {
      showBackButton: true,
    },
  }, */
  {
    name: 'Bills & Payments',
    component: BillsPayment,
    showHeader: false,
    headerProps: {
      showBackButton: true,
    },
  },
  /* {
    name: 'My Appointments',
    component: ViewAppointment,
    showHeader: false,
    headerProps: {
      showBackButton: true,
    },
  }, */
  {
    name: 'AddVitals',
    component: AddVitals,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'AddMedicalRecord',
    component: AddMedicalRecord,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'ViewMedicalRecord',
    component: ViewMedicalRecord,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'ViewMedicalRecordPdf',
    component: ViewMedicalRecordPdf,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  // {
  //   name: 'Admissions',
  //   component: InpatientsList,
  //   showHeader: true,
  //   headerProps: {
  //     showBackButton: true,
  //   },
  // },
  {
    name: 'AddInpatient',
    component: AddInpatient,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientRoomTransfer',
    component: InpatientRoomTransfer,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientRoomList',
    component: InpatientRoomList,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientPrescriptionList',
    component: InpatientPrescriptionList,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientAddVitals',
    component: InpatientAddVitals,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientVitalList',
    component: InpatientVitalList,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientInvestigation',
    component: InpatientInvestigation,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientAddPrescription',
    component: InpatientAddPrescription,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientInvoice',
    component: InpatientInvoice,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'InpatientAdvancePayment',
    component: InpatientAdvancePayment,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'AppointmentVitals',
    component: AppointmentVitals,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
  {
    name: 'ViewVitals',
    component: ViewVitals,
    showHeader: true,
    headerProps: {
      showBackButton: true,
    },
  },
];
