import { SyncScreen, syncLocalDatabase } from '../database/DBSync';
import { VaccineDBHandler } from '../database/tables/Vaccines';
import { responseLatency } from './AuthService';

export const getVaccinesList = (
  patient_id: number | null = null,
  status: string,
  date: { startDate: string | null; endDate: string | null },
): Promise<any> => {
  return responseLatency('GetVaccinesList', async () => {
    return new Promise(async (resolve, reject) => {
      try {
        syncLocalDatabase(SyncScreen.prescriptions, patient_id ?? undefined, async () => {
          const response = await VaccineDBHandler.getInstance().fetchDataHandler({
            patient_id,
            status,
            date,
          });
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  });
};
