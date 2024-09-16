import { billAndPaymentsApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class BillsAndPaymentsDbSync extends DBSync {
  public format(billingItems: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in billingItems) {
      data.push([
        billingItems[index].id,
        billingItems[index].patient_id,
        billingItems[index].doctor_id ?? 0,
        billingItems[index].dept_id,
        JSON.stringify(billingItems[index]),
        billingItems[index].updated_at
      ]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      "table_name": DBTables.billsandpayments,
      "count": lastSyncTime.count,
      "date_time": lastSyncTime.time,
      "patient_id": lastSyncTime.patient_id
    }
    var records: any = await this.fetch(payload);
    if (records?.data?.bill_list?.data) {
      return await this.format(records.data.bill_list.data);
    }
    return Promise.resolve(null);
  }
}

export class BillsAndPaymentsDBHandler extends DBHandler {

  private static instance: BillsAndPaymentsDBHandler;

  protected dbSync: DBSync = new BillsAndPaymentsDbSync();
  protected tableName: string = "bills_and_payments";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER",
    "patient_id": "INTEGER",
    "doctor_id": "INTEGER",
    "dept_id": "INTEGER",
    "data": "TEXT",
    "updated_at": "DATETIME"
  };

  public static getInstance(): BillsAndPaymentsDBHandler {
    if (!BillsAndPaymentsDBHandler.instance) {
      BillsAndPaymentsDBHandler.instance = new BillsAndPaymentsDBHandler();
    }

    return BillsAndPaymentsDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline) {
      let query: { [key: string]: any } = {
        "patient_id": filter.patient_id
      };

      if (filter.status == "Custom") {
        query[`date_created BETWEEN "${filter.date?.startDate}"`] = `"${filter.date?.endDate}"`;
      } else if (filter.status != "All") {
        query['is_paid'] = filter.status == "Paid" ? 1 : 0;
      }
      const dbResponse: any = await this.getAllRecordByColumn(query);
      const billLists: Array<any> = dbResponse.map((row: any) => JSON.parse(row.data));
      return { data: billLists };
    } else {
      const query =
        filter.status !== 'Custom'
          ? `&bill_status=${filter.status}`
          : `&bill_status=${filter.status}&from_date=${filter.date?.startDate || null}&to_date=${filter.date?.endDate || null
          }`;
      const response = await ApiUtil.getWithToken(
        `${billAndPaymentsApiUrls.getBillandPaymentList}=${filter.patient_id}${query}`,
      );
      return response;
    }
  }
}