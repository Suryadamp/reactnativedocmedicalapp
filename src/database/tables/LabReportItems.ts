import { prescriptionApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, LastSyncTime } from '../DBSync';

export class LabReportDbSync extends DBSync {
  public format(labReports: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in labReports) {
      data.push([labReports[index].id,
      JSON.stringify(labReports[index]),
      labReports[index].patient_id,
      labReports[index].created_at,
      labReports[index].created_at]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: { [key: string]: string | number } = {
      "table_name": DBTables.prescriptions,
      "count": lastSyncTime.count,
      "time": lastSyncTime.time
    }
    var records: any = await this.fetch(payload);
    if (records?.data) {
      return await this.format(records.data);
    }
    return Promise.resolve(null);
  }
}

export class LabReportDBHandler extends DBHandler {
  protected dbSync: DBSync = new LabReportDbSync();
  protected tableName: string = "labreports";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER",
    "data": "TEXT",
    "patient_id": "TEXT",
    "created_at": "DATETIME",
    "updated_at": "DATETIME"
  };

  public async syncToLocal(): Promise<void> {
    var lastSyncTime = await this.lastSyncTime();
    if (lastSyncTime) {
      await this.truncate();
      var records = await this.dbSync.syncDB(lastSyncTime);
      if (records != null) {
        for (var i in records) {
          this.insertRecord(records[i]);
        }
      }
    }
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.patient_id) {
      const dbResponse: any = await this.getAllRecordByColumn({ "patient_id": String(filter.patient_id) }, 1);
      var labReportList: Array<any> = dbResponse.map((row: any) => JSON.parse(row.data));
      return { data: labReportList };
    } else {
      return await ApiUtil.getWithToken(prescriptionApiUrls.prescriptionsList, {
        patient_id: filter.patient_id,
        from_date: filter.from_date,
        to_date: filter.to_date
      });
    }
  }
}