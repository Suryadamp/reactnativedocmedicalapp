import { LaboratoryDBHandler } from '../database';
import { SyncScreen, syncLocalDatabase } from '../database/DBSync';
import ApiUtil from '../util/ApiUtil';
import { responseLatency } from './AuthService';

export interface LabReportResult {
  bill_no: string;
  doctor_name: string;
  url: string;
  items: LabItems[];
}

export interface LabItems {
  bill_no: string;
  doctor_name: string;
  item_name: string;
  sub_tests: LabSubTests[];
}

export interface LabSubTests {
  test_name: string;
  ref_range: string;
  reading_value: string;
  sample_date: string;
  result_type: string;
  result_level: string;
}

export const getLabReports = async (
  patient_id: number | null = null,
  test_id: string | null = null,
  from_date: string | null = null,
  to_date: string | null = null,
): Promise<any> => {
  return responseLatency('GetLabReports', async () => {
    try {
      return new Promise((res: any, rej: any) => {
        syncLocalDatabase(SyncScreen.laboratory, patient_id ?? undefined, async () => {
          const response: any = await LaboratoryDBHandler.getInstance().fetchDataHandler({
            patient_id,
            test_id,
            from_date,
            to_date,
          });
          res(response);
        });
      });
      // await syncLocalDatabase(SyncScreen.laboratory, patient_id ?? undefined);
      // const response: any = await LaboratoryDBHandler.getInstance().fetchDataHandler({
      //   patient_id,
      //   test_id,
      //   from_date,
      //   to_date,
      // });
      // return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getBase64Document = (uri: string | null = null): Promise<any> => {
  return responseLatency('GetBase64Document', async () => {
    try {
      const response = await ApiUtil.getWithToken(`${uri}`);
      return response;
    } catch (error) {
      throw error;
    }
  });
};
