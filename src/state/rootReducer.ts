import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import latestBookAppointment from './appointments/latestBookAppointment';
import purposesOfAppointment from './appointments/purposesOfAppointment';
import appointmentList from './appointments/appointments';
import prescriptionSymptomList from './prescriptions/prescriptionSymptoms';
import prescriptionProductList from './prescriptions/prescriptionProduct';
import prescriptions from './prescriptions/prescriptions';
import doctors from './doctors';
import patients from './patients';
import users from './users';
import commonvariables from './commonvariables';
import inpatients from './inpatients';
import vitals from './vitals';
import laboratory from './laboratory';
import baselineclinical from './survey/baseline_clinical';
import network from './network';

const rootReducer = combineReducers({
  auth,
  latestBookAppointment,
  purposesOfAppointment,
  appointmentList,
  doctors,
  patients,
  users,
  prescriptionSymptomList,
  prescriptionProductList,
  prescriptions,
  commonvariables,
  inpatients,
  vitals,
  laboratory,
  baselineclinical,
  network
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
