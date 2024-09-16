import { inpatientApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class AdmissionDbSync extends DBSync {
  public format(admissions: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in admissions) {
      data.push([
        admissions[index].id,
        JSON.stringify(admissions[index]),
        admissions[index].doctor_id,
        admissions[index].patient_id,
        admissions[index].op_no,
        admissions[index].uhid,
        admissions[index].doa,
        admissions[index].updated_at,
      ]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      table_name: DBTables.ipAdmissions,
      count: lastSyncTime.count,
      date_time: lastSyncTime.time,
      patient_id: lastSyncTime.patient_id,
    };
    var records: any = await this.fetch(payload);
    if (records?.data?.ip_admissions?.data) {
      return await this.format(records.data.ip_admissions.data);
    }
    return Promise.resolve(null);
  }
}

export class AdmissionDBHandler extends DBHandler {
  private static instance: AdmissionDBHandler;

  protected dbSync: DBSync = new AdmissionDbSync();
  protected tableName: string = 'ip_admissions';
  protected columns: { [key: string]: string } = {
    id: 'INTEGER',
    data: 'TEXT',
    doctor_id: 'INTEGER',
    patient_id: 'INTEGER',
    op_no: 'TEXT',
    uhid: 'TEXT',
    doa: 'DATE',
    updated_at: 'DATETIME',
  };

  public static getInstance(): AdmissionDBHandler {
    if (!AdmissionDBHandler.instance) {
      AdmissionDBHandler.instance = new AdmissionDBHandler();
    }

    return AdmissionDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.patient_id) {
      const dbResponse: any = await this.getAllRecordByColumn(
        { patient_id: String(filter.patient_id) },
        filter.start,
      );
      var admissionList: Array<any> = dbResponse.map((row: any) => JSON.parse(row.data));
      return { data: { result: admissionList } };
    } else {
      return await ApiUtil.getWithToken(inpatientApiUrls.list);
    }
  }
}
