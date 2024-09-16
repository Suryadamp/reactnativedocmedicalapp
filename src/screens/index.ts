import SignIn from './SignIn';
import SignUp from './SignUp';
import Splash from './Splash';
import {
  ViewAppointment,
  SearchAppointment,
  BookAppointment,
  CancelAppointment,
  BookingCanceled,
} from '../screens/Appointment';
import ViewDoctor from './ViewDoctor';
import CommingSoon from './CommingSoon';
import Dashboard from './Dashboard';
import MedicalRecords from './MedicalRecords';
import { LobbyScreen, VideoCallRoomScreen } from './TeleConsultation';
import { ViewRemainder, CreateRemainder, RemainderCard, RemainderDetail } from './Remainder';
import Settings from './Settings';
import { BillsPayment } from './BillsAndPayments';
import Profile from './Profile';
import RemainderListNew from './RemainderNew/RemainderListNew';
import TrackActivity from './RemainderNew/TrackActivity';
import { InvestigationsList } from './Investigations';
import { SelectTest } from './BookTest';
import PatientRegistration from './Admin/PatientRegistration';
import AdminViewAppointment from './Admin/ViewAppointment';
import AddVitals from './Admin/AddVitals';
import AddMedicalRecord from './MedicalRecords/AddMedicalRecord';
import ViewMedicalRecord from './MedicalRecords/ViewMedicalRecord';
import ViewMedicalRecordPdf from './MedicalRecords/ViewMedicalRecordPdf';
import ViewVitals from './Inpatients/ViewVitals';

/* Inpatients screens */
import { InpatientsList } from './Inpatients';

export {
  TrackActivity,
  SignIn,
  SignUp,
  Splash,
  CommingSoon,
  ViewAppointment,
  SearchAppointment,
  ViewDoctor,
  BookAppointment,
  Dashboard,
  MedicalRecords,
  ViewRemainder,
  CreateRemainder,
  Settings,
  RemainderListNew,
  RemainderCard,
  RemainderDetail,
  BillsPayment,
  LobbyScreen,
  VideoCallRoomScreen,
  Profile,
  CancelAppointment,
  BookingCanceled,
  InvestigationsList,
  SelectTest,
  PatientRegistration,
  AdminViewAppointment,
  AddVitals,
  AddMedicalRecord,
  ViewMedicalRecord,
  ViewMedicalRecordPdf,
  InpatientsList,
  ViewVitals,
};
