import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class RemainderDbSync extends DBSync {
  public format(remainders: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var ptr in remainders) {
      data.push([
        remainders[ptr].id,
        remainders[ptr].prescription_id,
        remainders[ptr].patient_id ?? 0,
        remainders[ptr].symptom_id,
        remainders[ptr].product_id,
        remainders[ptr].start_date,
        remainders[ptr].end_date,
        JSON.stringify(remainders[ptr]),
        remainders[ptr].updated_at]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      "table_name": DBTables.remainders,
      "count": lastSyncTime.count,
      "date_time": lastSyncTime.time,
      "patient_id": lastSyncTime.patient_id
    }
    var records: any = await this.fetch(payload);
    if (records?.data?.reminders?.data) {
      return await this.format(records.data.reminders.data);
    }
    return Promise.resolve(null);
  }
}

export class RemainderDBHandler extends DBHandler {

  private static instance: RemainderDBHandler;

  protected dbSync: DBSync = new RemainderDbSync();
  protected tableName: string = "remainders";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER",
    "prescription_id": "INTEGER",
    "patient_id": "INTEGER",
    "symptom_id": "INTEGER",
    "product_id": "INTEGER",
    "start_date": "DATE",
    "end_date": "DATE",
    "data": "TEXT",
    "updated_at": "DATETIME"
  };

  public static getInstance(): RemainderDBHandler {
    if (!RemainderDBHandler.instance) {
      RemainderDBHandler.instance = new RemainderDBHandler();
    }

    return RemainderDBHandler.instance;
  }

  public async addNewRemainder(remainder: { [key: string]: any }) {
    var record: Array<any> = [
      remainder.id,
      remainder.prescription_id,
      remainder.patient_id,
      remainder.symptom_id,
      remainder.product_id,
      remainder.start_date,
      remainder.end_date,
      JSON.stringify(remainder),
      remainder.updated_at,
    ];
    await this.insertRecord(record);
  }

  public async deleteRemainder(id: number) {
    await this.deleteRecord([id]);
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.patient_id) {
      const dbResponse: any = await this.getAllRecordByColumn({ "patient_id": String(filter.patient_id) });
      var remainderList: Array<any> = dbResponse.map((row: any) => JSON.parse(row.data));
      return { data: remainderList };
    } else {
      return await ApiUtil.getWithToken('/remainders/list', {
        patient_id: filter.patient_id,
        filter_type: 'all',
        from_date: filter.from_date,
        to_date: filter.to_date,
      });
    }
  }
}