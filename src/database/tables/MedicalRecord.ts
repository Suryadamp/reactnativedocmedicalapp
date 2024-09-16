import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class MedicalRecordDbSync extends DBSync {
  public format(medicalRecords: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var ptr in medicalRecords) {
      data.push([
        medicalRecords[ptr].id,
        medicalRecords[ptr].prescription_id,
        medicalRecords[ptr].patient_id ?? 0,
        medicalRecords[ptr].symptom_id,
        medicalRecords[ptr].product_id,
        medicalRecords[ptr].start_date,
        medicalRecords[ptr].end_date,
        JSON.stringify(medicalRecords[ptr]),
        medicalRecords[ptr].updated_at]);
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

export class MedicalRecordDBHandler extends DBHandler {

  private static instance: MedicalRecordDBHandler;

  protected dbSync: DBSync = new MedicalRecordDbSync();
  protected tableName: string = "medical_records";
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

  public static getInstance(): MedicalRecordDBHandler {
    if (!MedicalRecordDBHandler.instance) {
        MedicalRecordDBHandler.instance = new MedicalRecordDBHandler();
    }

    return MedicalRecordDBHandler.instance;
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