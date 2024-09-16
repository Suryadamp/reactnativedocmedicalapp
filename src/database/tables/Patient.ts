import { patientApiUrls } from '../../constants/ApiConstants';
import store from '../../state';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, LastSyncTime } from '../DBSync';
import { UsersDBHandler } from './User';

export class PatientDbSync extends DBSync {
  public format(patients: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in patients) {
      data.push([
        patients[index].id,
        patients[index].title,
        patients[index].name,
        patients[index].blood_group,
        patients[index].mobile,
        patients[index].patient_mobile ?? null,
        patients[index].sex,
        patients[index].age,
        patients[index].dob ?? null,
        patients[index].uhid ?? null,
        patients[index].email ?? null,
        patients[index].area ?? null,
        patients[0].id,
        0
      ]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    const currentState = store.getState();
    if(currentState.network.isConnected) {
      var records: any = await ApiUtil.getWithToken(patientApiUrls.patientsList);
      if (records?.data?.data) {
        return await this.format(records.data.data);
      }
    }
    return Promise.resolve(null);
  }
}

export class PatientDBHandler extends DBHandler {

  private static instance: PatientDBHandler;

  protected dbSync: DBSync = new PatientDbSync();
  protected tableName: string = "patients";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER",
    "title": "INTEGER",
    "name": "INTEGER",
    "blood_group": "TEXT",
    "mobile": "TEXT",
    "patient_mobile": "TEXT",
    "sex": "TEXT",
    "age": "TEXT",
    "dob": "TEXT",
    "uhid": "TEXT",
    "email": "TEXT",
    "area": "TEXT",
    "user_id": "INTEGER",
    "updated_at": "DATETIME"
  };

  public async syncToLocal(): Promise<void> {
    var lastSyncTime = await this.lastSyncTime();
    if (lastSyncTime) {
      var records = await this.dbSync.syncDB(lastSyncTime);
      if (records != null) {
        await this.deleteRecordByColumn({"user_id": String(UsersDBHandler.getInstance().getUserId) });
        for (var i in records) {
          records[i][12] = UsersDBHandler.getInstance().getUserId;
          this.insertRecord(records[i]);
        }
      }
    }
  }

  public static getInstance(): PatientDBHandler {
    if (!PatientDBHandler.instance) {
      PatientDBHandler.instance = new PatientDBHandler();
    }

    return PatientDBHandler.instance;
  }

  public async insertOfflinePatient(patientData: any) {
    this.insertRecord([
      patientData.id,
      patientData.title,
      patientData.name,
      patientData.blood_group,
      patientData.mobile,
      patientData.patient_mobile ?? null,
      patientData.sex,
      patientData.age,
      patientData.dob ?? null,
      patientData.uhid ?? null,
      patientData.email ?? null,
      patientData.area ?? null,
      patientData.user_id,
      0,
    ]);
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline) {
      const filterQuery: any = { "user_id": String(this.userId) };
      if (filter.search) {
        // filterQuery['name'] = `LIKE '%${filter.search}%'`;
      }
      const dbResponse: any = await this.getAllRecordByColumn(filterQuery, filter.start);
      console.log(dbResponse);
      // var patientList: Array<any> = dbResponse.map((row: any) => JSON.parse(row.data));
      return { data: { data: dbResponse, total: dbResponse.length } };
    } else {
      let args: Object = {};
      if (filter.patient_id || filter.appoint_date) {
        args = {
          patient_id: filter.patient_id,
          appoint_date: filter.appoint_date,
        }
      } else {
        args = {
          start: filter.start,
        }
      }
      return await ApiUtil.getWithToken(patientApiUrls.patientsList, { page: filter.page, search: filter.search });
    }
  }
}