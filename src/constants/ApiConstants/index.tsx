export const authApiUrls = {
  login: '/login',
  logout: '/logout',
  refreshToken: '/refresh-token',
};

export const billAndPaymentsApiUrls = {
  getBillandPaymentList: '/payments/bill-list?patient_id',
  billingItems: '/billing/items/lab-test-items',
  addBillPayment: '/billing/create-bill-payment',
  paymentsBill: '/payments/bill/',
  advanceCreate: '/advance/create',
};

export const commonApiUrls = {
  commonVariables: '/common-variables',
  appConfiguration: '/app-configuration',
  surveyQuestions: '/survey-questions',
  logs: '/logs',
};

export const doctorApiUrls = {
  doctorList: '/doctors',
};

export const patientApiUrls = {
  patientsList: '/patients',
  updatePatient: '/patients/update/',
  patientCreate: '/patients/create',
};

export const prescriptionApiUrls = {
  prescriptionsList: '/prescriptions/list',
  symptoms: '/symptoms',
  prescriptionsProducts: '/prescriptions/products',
  createPrescription: '/prescriptions/create',
  updatePrescription: '/prescriptions/update/',
  updatePrescriptionDosage: '/prescriptions/product-dosage-time/update/',
  deletePrescriptionProduct: '/prescriptions/product/delete/',
  deletePrescription: '/prescriptions/delete/',
  prescriptionAppointment: '/prescriptions/'
};

export const userApiUrls = {
  user: '/user',
  userAccount:'/user-account'
};

export const vaccineApiUrls = {
  vaccineList: '/vaccines/list?patient_id',
};

export const reminderApiUrls = {
  remindersList: '/remainders/list',
  updateReminder: '/remainder-update/',
};

export const apppointmentApiUrls = {
  purposesList: '/purposes',
  apppointmentList: '/appointments/list',
  checkApppointment: '/appointments/check',
  createApppointment: '/appointments/create',
  apppointmentSlots: '/appointments/slots',
  cancelApppointment: '/appointments/cancel',
  doctorAvailbleDays: '/appointments/available-days',
  appointmentsReschedule: '/appointments/reschedule',
  appointmentTrackStatus: '/appointments/tracking_status',
  createVital: '/appointments/create-vitals',
  validateRoom: '/appointments/room-id-check',
  meetingCompleted: '/appointments/tracking_status',
};

export const investigationApiUrls = {
  createInvestigation: '/investigations/create',
  getInvestigation: '/investigations/list',
  deleteInvestigation: '/investigations/item-delete',
  deleteAllInvestigation: '/investigations/delete',
};

export const medicalRecordsApiUrls = {
  createMedicalRecord: '/medical-records/create',
  getMedicalRecords: '/medical-records/',
  deleteMedicalRecord: '/medical-records/delete/',
  getMedicalRecord: '/medical-records/view/',
};

export const sequenceApiUrls = {
  getSequenceNo: '/sequence',
};

export const inpatientApiUrls = {
  createIp: '/inpatients/admissions',
  list: '/inpatients/admissions',
  rooms: '/inpatients/rooms',
  roomTransferGet: '/inpatients/admissions/room-transfer-history/',
  roomTransferUpdate: '/inpatients/admissions/room-transfer/',
  prescription: '/inpatients/prescription/',
  inpatientVitals: '/inpatients/vitals/',
  doctorVitals: '/vitals',
  vitals: '/vitals',
  vitalsCreate: '/inpatients/vitals',
  inpatientInvestigation: '/inpatients/investigation/',
  investigationCreate: '/inpatients/investigation/create',
  prescriptionCreate: '/inpatients/prescription/create',
  investigationDelete: '/inpatients/investigation/delete/',
  prescriptionDelete: '/inpatients/prescription/delete/',
  inpatientDelete: '/inpatients/admissions/',
};

export const vitalApiUrls = {
  getVitals: '/op-vitals/',
  getDoctorVitals: '/vitals',
  appointmentCreate: '/op-vitals',
};
export const permissionList = {
  mobileAppointmentsView: 'mobile_appointments_view',
  mobileAppointmentsAdd: 'mobile_appointments_add',
  mobileAppointmentsCancel: 'mobile_appointments_cancel',
  mobileAppointmentsReschedule: 'mobile_appointments_reschedule',
  mobileAppointmentsInvoice: 'mobile_appointments_invoice',
  mobileAppointmentsSupport: 'mobile_appointments_support',
  mobileInvestigationsView: 'mobile_investigations_view',
  mobileInvestigationsAdd: 'mobile_investigations_add',
  mobileInvestigationsDelete: 'mobile_investigations_delete',
  mobilePrescriptionView: 'mobile_prescription_view',
  mobilePrescriptionAdd: 'mobile_prescription_add',
  mobilePrescriptionEdit: 'mobile_prescription_edit',
  mobilePrescriptionDelete: 'mobile_prescription_delete',
  mobileVitalsView: 'mobile_vitals_view',
  mobileVitalsAdd: 'mobile_vitals_add',
  mobileVitalsDelete: 'mobile_vitals_delete',
  mobileLabReportView: 'mobile_labreport_view',
  mobileLabReportPrint: 'mobile_labreport_print',
  mobileBillsPaymentList: 'mobile_bills_payment_list',
  mobileBillsPaymentPay: 'mobile_bills_payment_pay',
  mobileBillsPaymentInvoice: 'mobile_bills_payment_invoice',
  mobileBillsPaymentAdvance: 'mobile_bills_payment_advance',
  mobileBookTestAdd: 'mobile_book_test_add',
  mobileVaccineView: 'mobile_vaccine_view',
  mobileVaccineEdit: 'mobile_vaccine_edit',
  mobileReminderAction: 'mobile_reminder_action',
  mobileReminderDelete: 'mobile_reminder_delete',
  mobileReminderTrackActivity: 'mobile_reminder_track_activity',
  moibileMediRecordAdd: 'moibile_medirecord_add',
  moibileMediRecordEdit: 'moibile_medirecord_edit',
  moibileMediRecordDelete: 'moibile_medirecord_delete',
  moibileMediRecordShare: 'moibile_medirecord_share',
  moibileMediRecordDownload: 'moibile_medirecord_download',
  moibileMediRecordPatientSwitch: 'moibile_medirecord_patient_switch',
  mobileAddPatient: 'mobile_add_patient',
  mobileEditPatient: 'mobile_edit_patient',
  mobileAdminAppointmentView: 'mobile_admin_appointment_view',
  mobileAppointmentVideoCallView: 'mobile_appointment_video_call_view',
  mobileLabreportShare: 'mobile_labreport_share',
  mobileLabreportDownload: 'mobile_labreport_download',
  mobileBillsPaymentShare: 'mobile_bills_payment_share',
  mobileBillsPaymentDownload: 'mobile_bills_payment_download',
  mobileBookTestView: 'mobile_book_test_view',
  mobileReminderView: 'mobile_reminder_view',
  mobileReminderAdd: 'mobile_reminder_add',
  mobileReminderEdit: 'mobile_reminder_edit',
  moibileMedirecordView: 'moibile_medirecord_view',
  mobileAdmisssionView: 'mobile_admisssion_view',
  mobileDeleteAccount: 'mobile_delete_account',
};
export const syncApiUrls = {
  databaseSync: '/database-sync',
};
