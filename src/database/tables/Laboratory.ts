import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class LaboratoryDbSync extends DBSync {
  public format(laboratories: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in laboratories) {
      console.log(laboratories[index]?.items[0]?.sub_tests[0]?.updated_at);
      data.push([null,
        JSON.stringify(laboratories[index]),
        laboratories[index].patient_id,
        laboratories[index].bill_date,
        laboratories[index].bill_date]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      "table_name": DBTables.laboratory,
      "count": lastSyncTime.count,
      "date_time": lastSyncTime.time,
      "patient_id": lastSyncTime.patient_id
    };
    var records: any = await this.fetch(payload);
    if (records?.data?.lab_reports?.data) {
      return await this.format(records.data.lab_reports.data);
    }
    return Promise.resolve(null);
  }
}

export class LaboratoryDBHandler extends DBHandler {

  private static instance: LaboratoryDBHandler;

  protected dbSync: DBSync = new LaboratoryDbSync();
  protected tableName: string = "laboratory";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "data": "TEXT",
    "patient_id": "TEXT",
    "bill_date": "DATETIME",
    "updated_at": "DATETIME"
  };

  public static getInstance(): LaboratoryDBHandler {
    if (!LaboratoryDBHandler.instance) {
      LaboratoryDBHandler.instance = new LaboratoryDBHandler();
    }

    return LaboratoryDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.patient_id) {
      console.log("🪦")
      const dbResponse: any = await this.getAllRecordByColumn({ "patient_id": String(filter.patient_id) }, 1);
      var laboratoryList: Array<any> = dbResponse.map((row: any) => JSON.parse(row.data));
      return { data: laboratoryList };
    } else {
      return await ApiUtil.getWithToken('laboratory/lab-report-list', {
        patient_id: filter.patient_id,
        test_id: filter.test_id,
        from_date: filter.from_date,
        to_date: filter.to_date,
      });
    }
  }
}