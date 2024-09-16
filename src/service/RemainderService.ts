import ApiUtil from '../util/ApiUtil';
import { RemainderDBHandler } from '../database/tables/Remainders';
import { SyncScreen, syncLocalDatabase } from '../database/DBSync';
import { responseLatency } from './AuthService';

export interface Remainder {
  id: number;
  prescription_id: string;
  symptom_id: string;
  product_id: string;
  dosage: string;
  units: string;
  freq: string;
  freq_time: string;
  freq_time_type: string;
  duration_count: string;
  duration_type: string;
  is_remainder: number;
  start_date: string;
  end_date: string;
  remarks: string;
  productname: string;
  symptom_name: string;
  exp: string;
  duration: string;
  access: number;
  dosage_time: string;
}

export interface Duration {
  interval_days: '';
  duration_count: '';
  interval: '';
  custom_date: '';
  specific_days: [];
}

export const getRemainderList = (
  patient_id: number | null = null,
  filter_type: string | null = null,
  from_date: string | null = null,
  to_date: string | null = null,
): Promise<any> => {
  return responseLatency('GetRemainderList', async () => {
    try {
      await syncLocalDatabase(SyncScreen.remainders, patient_id ?? undefined);
      const response = await RemainderDBHandler.getInstance().fetchDataHandler({
        patient_id,
        filter_type: 'all',
        from_date,
        to_date,
      });
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const reminderUpdate = (
  is_remainder: number | null = null,
  prescription_id: string | null = null,
  id: string | null = null,
): Promise<any> => {
  return responseLatency('ReminderUpdate', async () => {
    try {
      const response = await ApiUtil.patchWithToken(`/remainders/update/${prescription_id}/${id}`, {
        is_remainder,
      });
      return response;
    } catch (error) {
      throw error;
    }
  });
};
