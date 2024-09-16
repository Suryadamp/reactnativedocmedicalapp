// Service - MedicalRecords
import { medicalRecordsApiUrls } from '../constants/ApiConstants';
import ApiUtil from '../util/ApiUtil';
import { responseLatency } from './AuthService';

export const createMedicalRecord = (body: any): Promise<any> => {
  return responseLatency('CreateMedicalRecord', async () => {
    try {
      const response = await ApiUtil.postFormDataWithToken(
        medicalRecordsApiUrls.createMedicalRecord,
        body,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getMedicalRecords = (
  appointmentId?: string,
  patientId?: string | number,
): Promise<any> => {
  return responseLatency('GetMedicalRecords', async () => {
    try {
      const query = appointmentId ? `appoint_id=${appointmentId}` : `patient_id=${patientId}`;
      const response = await ApiUtil.getWithToken(
        `${medicalRecordsApiUrls.getMedicalRecords}?${query}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const deleteMedicalRecord = (medicalRecordId: string): Promise<any> => {
  return responseLatency('DeleteMedicalRecord', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(
        `${medicalRecordsApiUrls.deleteMedicalRecord}${medicalRecordId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getMedicalRecordById = (medicalRecordId: string): Promise<any> => {
  return responseLatency('GetMedicalRecordById', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${medicalRecordsApiUrls.getMedicalRecord}${medicalRecordId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};
