import {
  Dashboard,
  ViewAppointment,
  MedicalRecords,
  Settings,
  BillsPayment,
  RemainderListNew,
  PatientRegistration,
  AdminViewAppointment,
  InpatientsList,
} from '../../screens';
import { assets } from '../../constants';
import PrescriptionList from '../../screens/Prescriptions/PrescriptionList';
import Vaccines from '../../screens/vaccines/vaccines';
import { SelectTest } from '../../screens/BookTest';
import LabReports from '../../screens/Laboratory/LabReports';
import { SvgIcon } from '../../constants/SvgIcon';
import { permissionList } from '../../constants/ApiConstants';
import Survey from '../../screens/Survey';

export const routes = [
  {
    name: 'Dashboard',
    component: Dashboard,
    icon: <SvgIcon name="DashboardIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
  },
  {
    name: 'My Appointments',
    component: ViewAppointment,
    icon: <SvgIcon name="AppointmentIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    permission: permissionList.mobileAppointmentsView,
  },
  {
    name: 'Prescriptions',
    component: PrescriptionList,
    icon: <SvgIcon name="PrescriptionIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    permission: permissionList.mobilePrescriptionView,
  },
  {
    name: 'Laboratory',
    component: LabReports,
    icon: <SvgIcon name="LaboratoryIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    comingSoon: false,
    permission: permissionList.mobileLabReportView,
  },
  {
    name: 'Book Test',
    component: SelectTest,
    icon: <SvgIcon name="BookTestIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    comingSoon: false,
    permission: permissionList.mobileBookTestView,
  },
  {
    name: 'Bills & Payments',
    component: BillsPayment,
    icon: <SvgIcon name="BillsPaymentIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    permission: permissionList.mobileBillsPaymentList,
  },
  {
    name: 'Vaccines',
    component: Vaccines,
    icon: <SvgIcon name="VaccinesIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    comingSoon: false,
    permission: permissionList.mobileVaccineView,
  },
  {
    name: 'Admissions',
    component: InpatientsList,
    icon: <SvgIcon name="AdmissionsIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    permission: permissionList.mobileAdmisssionView,
  },
  {
    name: 'Medical Records',
    component: MedicalRecords,
    icon: <SvgIcon name="MedicalrecordIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    permission: permissionList.moibileMedirecordView,
  },
  {
    name: 'Reminders',
    component: RemainderListNew,
    icon: <SvgIcon name="RemaindersIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    permission: permissionList.mobileReminderView,
  },
  {
    name: 'Survey',
    component: Survey,
    icon: <SvgIcon name="SurveyIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
  },
  {
    name: 'Settings',
    component: Settings,
    icon: <SvgIcon name="SettingIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
  },
  {
    name: 'FAQ',
    component: Dashboard,
    icon: <SvgIcon name="FAQIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    comingSoon: true,
  },
  {
    name: 'Feedback',
    component: Dashboard,
    icon: <SvgIcon name="FeedbackIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    comingSoon: true,
  },
  {
    name: 'Support',
    component: Dashboard,
    icon: <SvgIcon name="SupportIcon" />,
    showHeader: true,
    iconArrow: assets.rightArrowBlack,
    comingSoon: true,
  },
];
