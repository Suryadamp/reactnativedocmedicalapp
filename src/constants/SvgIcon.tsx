import React from 'react';
import { View } from 'native-base';
import DashboardIcon from '../assets/svgs/dashboard-icon.svg';
import AppointmentIcon from '../assets/svgs/appointment-icon.svg';
import BillsPaymentIcon from '../assets/svgs/billPayments-icon.svg';
import BookTestIcon from '../assets/svgs/booktest-icon.svg';
import FAQIcon from '../assets/svgs/faq-icon.svg';
import LaboratoryIcon from '../assets/svgs/laboratory-icon.svg';
import MedicalrecordIcon from '../assets/svgs/medicalrecord-icon.svg';
import PrescriptionIcon from '../assets/svgs/prescription-icon.svg';
import RemaindersIcon from '../assets/svgs/remainders-icon.svg';
import SettingIcon from '../assets/svgs/settings-icon.svg';
import SupportIcon from '../assets/svgs/support-icon.svg';
import FeedbackIcon from '../assets/svgs/feedback-icon.svg';
import VaccinesIcon from '../assets/svgs/vaccines-icon.svg';
import AddPatientIcon from '../assets/svgs/add-patient-icon.svg';
import VitalIcon from '../assets/svgs/vitals-icon.svg';
import AdminPrescription from '../assets/svgs/admin-prescription-icon.svg';
import InvestigationIcon from '../assets/svgs/investigation-icon.svg';
import AdminMedicalRecords from '../assets/svgs/admin-medical-records.svg';
import InvoiceIcon from '../assets/svgs/invoice-icon.svg';
import BookedIcon from '../assets/svgs/booked-icon.svg';
import WaitingIcon from '../assets/svgs/waiting-icon.svg';
import SuccessIcon from '../assets/svgs/success-icon.svg';
import CheckIcon from '../assets/svgs/check-icon.svg';
import UnCheckIcon from '../assets/svgs/uncheck-icon.svg';
import ActiveAdminMedicalRecords from '../assets/svgs/active-medicalrecords-icon.svg';
import ActiveInvestigationIcon from '../assets/svgs/active-investigation-icon.svg';
import ActiveVitalIcon from '../assets/svgs/active-vitals-icon.svg';
import ActivePrescriptionIcon from '../assets/svgs/active-prescription-icon.svg';
import ActiveInvoiceIcon from '../assets/svgs/active-invoice-icon.svg';
import CalendarIcon from '../assets/svgs/calendar-icon';
import CancelIcon from '../assets/svgs/cancel-icon';
import MenuInvoiceIcon from '../assets/svgs/menu-invoice-icon';
import HeadsetIcon from '../assets/svgs/headset-icon';
import CancelAppointmentIcon from '../assets/svgs/cancel-appointment-icon';
import AvatarIcon from '../assets/svgs/avatar-icon';
import PlusIcon from '../assets/svgs/avatar-plus-icon';
import FilePhotoIcon from '../assets/svgs/file-photo';
import FileGalleryIcon from '../assets/svgs/file-gallery';
import FileUploadIcon from '../assets/svgs/file-upload';
import EditIcon from '../assets/svgs/edit-icon';
import ShareIcon from '../assets/svgs/share-icon';
import TrashIcon from '../assets/svgs/trash-icon';
import MenuIcon from '../assets/svgs/menu-icon';
import BackIcon from '../assets/svgs/back-icon';
import DownloadIcon from '../assets/svgs/download-icon';
import IpCalendarIcon from '../assets/svgs/ip-calendar-icon';
import IpRoomIcon from '../assets/svgs/ip-room-icon';
import UserIcon from '../assets/svgs/user-icon';
import IpReasonIcon from '../assets/svgs/ip-reason-icon';
import IpIdIcon from '../assets/svgs/ip-id-icon';
import IpHospitalIcon from '../assets/svgs/ip-hospital-icon';
import AddIcon from '../assets/svgs/add-icon';
import NotificationDotIcon from '../assets/svgs/notification-dot';
import HospitalHistoryIcon from '../assets/svgs/hospital-history-icon';
import IpHospitalFillIcon from '../assets/svgs/ip-hospital-fill-icon';
import IpBedIcon from '../assets/svgs/ip-bed-icon';
import IpBedFillIcon from '../assets/svgs/ip-bed-fill-icon';
import IpBookedIcon from '../assets/svgs/ip-booked-icon';
import ActiveDischargeIcon from '../assets/svgs/ip-discharge-icon';
import IpDischargeIcon from '../assets/svgs/ip-discharge-status-icon';
import AdmissionsIcon from '../assets/svgs/admissions-icon';
import RoomTransferIcon from '../assets/svgs/ip-room-transfer-icon';
import PrescriptionSuccessIcon from '../assets/svgs/prescription-success-icon';
import InvestigationSuccessIcon from '../assets/svgs/investigation-success-icon';
import MedicalSuccessIcon from '../assets/svgs/medical-success-icon';
import InvoiceSuccessIcon from '../assets/svgs/invoice-success-icon';
import VitalSuccessIcon from '../assets/svgs/vitals-success-icon';
import SurveyIcon from '../assets/svgs/survey-icon';
import SurveySuccessIcon from '../assets/svgs/survey-success-icon';
import SurveyReviewIcon from '../assets/svgs/survey-review-icon';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isHpTablet } from '../hooks/useDeviceCheck';

const appIconMap: Record<string, any> = {
  DashboardIcon: <DashboardIcon width={isHpTablet('2.5%')} height={isHpTablet('2.1%')} />,
  AppointmentIcon: <AppointmentIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  BillsPaymentIcon: <BillsPaymentIcon width={isHpTablet('2.5%')} height={isHpTablet('2.2%')} />,
  BookTestIcon: <BookTestIcon width={isHpTablet('2.5%')} height={isHpTablet('2.2%')} />,
  FAQIcon: <FAQIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  LaboratoryIcon: <LaboratoryIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  MedicalrecordIcon: <MedicalrecordIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  PrescriptionIcon: <PrescriptionIcon width={isHpTablet('2.5%')} height={isHpTablet('2%')} />,
  RemaindersIcon: <RemaindersIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  SettingIcon: <SettingIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  SupportIcon: <SupportIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  FeedbackIcon: <FeedbackIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  VaccinesIcon: <VaccinesIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  SurveyIcon: <SurveyIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  AddPatientIcon: <AddPatientIcon width={22} height={22} />,
  VitalIcon: <VitalIcon width={16} height={16} />,
  AdminPrescription: <AdminPrescription width={16} height={16} />,
  InvestigationIcon: <InvestigationIcon width={16} height={16} />,
  AdminMedicalRecords: <AdminMedicalRecords width={16} height={16} />,
  InvoiceIcon: <InvoiceIcon width={16} height={16} />,
  BookedIcon: <BookedIcon width={22} height={22} />,
  WaitingIcon: <WaitingIcon width={22} height={22} />,
  SuccessIcon: <SuccessIcon width={22} height={22} />,
  CancelAppointmentIcon: <CancelAppointmentIcon width={22} height={22} />,
  CheckIcon: <CheckIcon width={22} height={22} />,
  UnCheckIcon: <UnCheckIcon width={21} height={21} />,
  ActivePrescriptionIcon: <ActivePrescriptionIcon width={18} height={18} />,
  ActiveInvestigationIcon: <ActiveInvestigationIcon width={18} height={18} />,
  ActiveAdminMedicalRecords: <ActiveAdminMedicalRecords width={18} height={18} />,
  ActiveVitalIcon: <ActiveVitalIcon width={18} height={18} />,
  ActiveInvoiceIcon: <ActiveInvoiceIcon width={18} height={18} />,
  CalendarIcon: <CalendarIcon width={15} height={15} />,
  CancelIcon: <CancelIcon width={15} height={15} />,
  MenuInvoiceIcon: <MenuInvoiceIcon width={15} height={15} />,
  HeadsetIcon: <HeadsetIcon width={17} height={17} />,
  AvatarIcon: <AvatarIcon width={45} height={43} />,
  PlusIcon: <PlusIcon width={15} height={15} />,
  MedicalReportIcon: <AdminMedicalRecords width={25} height={25} />,
  MedicalPrescriptionIcon: <AdminPrescription width={24} height={24} />,
  MedicalInvoiceIcon: <InvoiceIcon width={24} height={24} />,
  MedicalActiveReportIcon: <ActiveAdminMedicalRecords width={24} height={24} />,
  MedicalActivePrescriptionIcon: <ActivePrescriptionIcon width={24} height={24} />,
  MedicalActiveInvoiceIcon: <ActiveInvoiceIcon width={24} height={24} />,
  FilePhotoIcon: <FilePhotoIcon width={15} height={15} />,
  FileGalleryIcon: <FileGalleryIcon width={15} height={15} />,
  FileUploadIcon: <FileUploadIcon width={15} height={15} />,
  EditIcon: <EditIcon width={12} height={12} />,
  ShareIcon: <ShareIcon width={12} height={12} />,
  TrashIcon: <TrashIcon width={20} height={20} />,
  MenuIcon: <MenuIcon width={15} height={15} />,
  BackIcon: <BackIcon width={22} height={22} />,
  DownloadIcon: <DownloadIcon width={16} height={16} />,
  IpCalendarIcon: <IpCalendarIcon width={13} height={13} />,
  IpRoomIcon: <IpRoomIcon width={13} height={13} />,
  UserIcon: <UserIcon width={15} height={15} />,
  IpReasonIcon: <IpReasonIcon width={15} height={15} />,
  IpIdIcon: <IpIdIcon width={15} height={15} />,
  IpHospitalIcon: <IpHospitalIcon width={24} height={24} />,
  AddIcon: <AddIcon width={16} height={16} />,
  NotificationDotIcon: <NotificationDotIcon width={10} height={10} />,
  HospitalHistoryIcon: <HospitalHistoryIcon width={24} height={24} />,
  IpHospitalFillIcon: <IpHospitalFillIcon width={24} height={24} />,
  IpBedFillIcon: <IpBedFillIcon width={24} height={24} />,
  IpBedIcon: <IpBedIcon width={24} height={24} />,
  IpBookedIcon: <IpBookedIcon width={32} height={32} />,
  ActiveDischargeIcon: <ActiveDischargeIcon width={21} height={21} />,
  IpDischargeIcon: <IpDischargeIcon width={32} height={32} />,
  AdmissionsIcon: <AdmissionsIcon width={isHpTablet('2.5%')} height={isHpTablet('2.5%')} />,
  RoomTransferIcon: <RoomTransferIcon width={20} height={20} />,
  PrescriptionSuccessIcon: <PrescriptionSuccessIcon width={18} height={18} />,
  InvestigationSuccessIcon: <InvestigationSuccessIcon width={18} height={18} />,
  InvoiceSuccessIcon: <InvoiceSuccessIcon width={18} height={18} />,
  MedicalSuccessIcon: <MedicalSuccessIcon width={18} height={18} />,
  VitalSuccessIcon: <VitalSuccessIcon width={18} height={18} />,
  SurveySuccessIcon: <SurveySuccessIcon width={50} height={50} />,
  SurveyReviewIcon: <SurveyReviewIcon width={15} height={15} />,
};

interface Props {
  name: string;
}

export const SvgIcon = ({ name }: Props) => <View>{appIconMap[name]}</View>;
