import ApiUtil from '../util/ApiUtil';
import store from '../state';
import { setPatientDetails } from '../state/patients';
import { patientApiUrls } from '../constants/ApiConstants';
import { PatientDBHandler } from '../database';
import { responseLatency } from './AuthService';

export const getPatientsList = (
  { page, search }: { page?: number; search?: string } = { page: 1, search: '' },
): Promise<any> => {
  return responseLatency('GetPatientsList', async () => {
    try {
      const response = await PatientDBHandler.getInstance().fetchDataHandler({ page, search });
      if (page === 1) {
        store.dispatch(setPatientDetails(response.data.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const updatePatientsDetails = (patient_id: number, data: any): Promise<any> => {
  return responseLatency('UpdatePatientsDetails', async () => {
    try {
      const response = await ApiUtil.putWithToken(
        `${patientApiUrls.updatePatient}${patient_id}`,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const createNewPatient = (data: any): Promise<any> => {
  return responseLatency('CreateNewPatient', async () => {
    try {
      const response = await ApiUtil.postFormDataWithToken(`${patientApiUrls.patientCreate}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  });
};
