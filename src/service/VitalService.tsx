// VitalService
import ApiUtil from '../util/ApiUtil';
import store from '../state';

import { setVitals, setDoctorVitals, setAppointmentVitals } from '../state/vitals';
import { vitalApiUrls } from '../constants/ApiConstants';
import { responseLatency } from './AuthService';
import { SyncScreen, syncLocalDatabase } from '../database/DBSync';
import { OpVitalDBHandler } from '../database/tables/OpVitals';

export const getVitals = (): Promise<any> => {
  return responseLatency('GetVitals', async () => {
    try {
      const response = await ApiUtil.getWithToken(vitalApiUrls.getVitals);
      if (response.success) {
        store.dispatch(setVitals(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getVitalsByDoctor = (doctorId: string): Promise<any> => {
  return responseLatency('GetVitalsByDoctor', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${vitalApiUrls.getDoctorVitals}?doctor_id=${doctorId}`,
      );
      if (response.success) {
        store.dispatch(setDoctorVitals(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getAppointmentVitals = (appointId: number | null = null): Promise<any> => {
  return responseLatency('GetAppointmentVitals', async () => {
    return new Promise((res: any, reject: any) => {
      try {
        syncLocalDatabase(SyncScreen.opVitals, appointId ?? undefined, async () => {
          const response = await OpVitalDBHandler.getInstance().fetchDataHandler({
            appointment_id: appointId,
          });
          if (response.success || response.data) {
            store.dispatch(setAppointmentVitals(response.data));
          }
          res(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const appointmentVitalsCreate = (data: any): Promise<any> => {
  return responseLatency('AppointmentVitalsCreate', async () => {
    try {
      const response = await ApiUtil.postWithToken(`${vitalApiUrls.appointmentCreate}`, data);
      if (response.success) {
        await getAppointmentVitals(data.appointment_id);
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};
