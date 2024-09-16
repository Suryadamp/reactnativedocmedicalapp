import { billAndPaymentsApiUrls } from '../constants/ApiConstants';
import { BillsAndPaymentsDBHandler } from '../database';
import { SyncScreen, syncLocalDatabase } from '../database/DBSync';
import { BookTestDBHandler } from '../database/tables/BookTest';
import ApiUtil from '../util/ApiUtil';
import { responseLatency } from './AuthService';

export interface BillingLabData {
  id: string;
  name: string;
  price: string;
  dept_id: string;
  lab_tests: LabTests[];
}

export interface LabTests {
  id: string;
  bill_item_id: string;
  methodology_id: string;
  test_name: string;
  test_dept: string;
  methodology: string;
}

export const getBillAndPaymentList = (
  patient_id: number | null = null,
  status: string,
  date: { startDate: string | null; endDate: string | null },
): Promise<any> => {
  return responseLatency('GetBillAndPaymentList', async () => {
    try {
      return new Promise((res: any, rej: any) => {
        syncLocalDatabase(SyncScreen.billsandpayments, patient_id ?? undefined, async () => {
          const response = await BillsAndPaymentsDBHandler.getInstance().fetchDataHandler({
            patient_id,
            status,
            date,
          });
          res(response);
        });
      })
    } catch (error) {
      throw error;
    }
  });
};

// book test screen
export const getBillItemsList = (patient_id: number | null = null): Promise<any> => {
  return responseLatency('GetBillItemsList', async () => {
    return new Promise((res:any, reject:any) => {
    try {
        syncLocalDatabase(SyncScreen.booktests, patient_id ?? undefined, async() => {
          const response = await BookTestDBHandler.getInstance().fetchDataHandler({ patient_id });
          res(response);
        })       
      } catch (error) {
        reject(error);
      }
    })
  });
};

export const addBillPayment = (body: any): Promise<any> => {
  return responseLatency('AddBillPayment', async () => {
    try {
      const response = await ApiUtil.postWithToken(billAndPaymentsApiUrls.addBillPayment, body);
      return response;
    } catch (error) {
      throw error;
    }
  });
};

// bill and payment screen
export const createBillPayment = (bill_id: number, body: any): Promise<any> => {
  return responseLatency('CreateBillPayment', async () => {
    try {
      const response = await ApiUtil.postWithToken(
        `${billAndPaymentsApiUrls.paymentsBill}${bill_id}`,
        body,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const addAdvicePayment = (body: any): Promise<any> => {
  return responseLatency('AddAdvicePayment', async () => {
    try {
      const response = await ApiUtil.postWithToken(billAndPaymentsApiUrls.advanceCreate, body);
      return response;
    } catch (error) {
      throw error;
    }
  });
};
