import { prescriptionApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class DoctorDbSync extends DBSync {
  public format(prescriptions: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in prescriptions) {
      data.push([prescriptions[index].id,
      JSON.stringify(prescriptions[index]),
      prescriptions[index].patient_id,
      prescriptions[index].created_at,
      prescriptions[index].created_at]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      "table_name": DBTables.doctors,
      "count": lastSyncTime.count,
      "date_time": lastSyncTime.time,
      "patient_id": lastSyncTime.patient_id
    }
    var records: any = await this.fetch(payload);
    if (records?.data?.doctors?.data) {
      return await this.format(records.data.doctors.data);
    }
    return Promise.resolve(null);
  }
}

export class DoctorDBHandler extends DBHandler {

  private static instance: DoctorDBHandler;

  protected dbSync: DBSync = new DoctorDbSync();
  protected tableName: string = "doctors";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER",
    "name": "TEXT",
    "data": "TEXT",
    "patient_id": "TEXT",
    "created_at": "DATETIME",
    "updated_at": "DATETIME"
  };

  public static getInstance(): DoctorDBHandler {
    if (!DoctorDBHandler.instance) {
      DoctorDBHandler.instance = new DoctorDBHandler();
    }

    return DoctorDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.patient_id) {
      const dbResponse: any = await this.getAllRecordByColumn({ "patient_id": String(filter.patient_id) }, 1);
      var prescriptionList: Array<any> = dbResponse.map((row: any) => JSON.parse(row.data));
      return { data: prescriptionList };
    } else {
      return await ApiUtil.getWithToken(prescriptionApiUrls.prescriptionsList, {
        patient_id: filter.patient_id,
        from_date: filter.from_date,
        to_date: filter.to_date
      });
    }
  }
}