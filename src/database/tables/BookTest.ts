import { billAndPaymentsApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, LastSyncTime } from '../DBSync';

export class BookTestDbSync extends DBSync {
  public format(billingItems: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in billingItems) {
      data.push([
        billingItems[index].id,
        billingItems[index].name,
        billingItems[index].price,
        billingItems[index].dept_id,
        JSON.stringify(billingItems[index].lab_tests),
        0
      ]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: { [key: string]: string | number } = {
      "table_name": DBTables.booktests,
      "count": lastSyncTime.count,
      "date_time": lastSyncTime.time
    }
    var records: any = await this.fetch(payload);
    if (records?.data) {
      return await this.format(records.data);
    }
    return Promise.resolve(null);
  }
}

export class BookTestDBHandler extends DBHandler {

  private static instance: BookTestDBHandler;

  protected dbSync: DBSync = new BookTestDbSync();
  protected tableName: string = "book_tests";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER",
    "name": "TEXT",
    "price": "TEXT",
    "dept_id": "INTEGER",
    "lab_tests": "TEXT",
    "patient_id": "TEXT",
    "updated_at": "DATETIME"
  };

  public static getInstance(): BookTestDBHandler {
    if (!BookTestDBHandler.instance) {
      BookTestDBHandler.instance = new BookTestDBHandler();
    }

    return BookTestDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (false && this.supportOffline) {
      const dbResponse: any = await this.getAllRecordByColumn({
        "patient_id": filter.patient_id
      });
      var billingItems: Array<any> = dbResponse.map((row: any) => {
        return {
          id: row.id,
          name: row.name,
          price: row.price,
          dept_id: row.dept_id,
          lab_tests: JSON.parse(row.lab_tests)
        }
      });

      return { data: billingItems };
    } else {
      return await ApiUtil.getWithToken(billAndPaymentsApiUrls.billingItems);
    }
  }
}