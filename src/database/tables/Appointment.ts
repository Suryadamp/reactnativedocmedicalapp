import { apppointmentApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class AppointmentDbSync extends DBSync {
  public format(appointments: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in appointments) {
      data.push([appointments[index].id,
      JSON.stringify(appointments[index]),
      appointments[index].doctor_id,
      appointments[index].patient_id,
      appointments[index].appoint_date,
      appointments[index].updated_at]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      "table_name": DBTables.appointments,
      "count": lastSyncTime.count,
      "date_time": lastSyncTime.time,
      "patient_id": lastSyncTime.patient_id
    };
    var records: any = await this.fetch(payload);
    if (records?.data?.appointments?.data) {
      return await this.format(records.data.appointments.data);
    }
    return Promise.resolve(null);
  }
}

export class AppointmentDBHandler extends DBHandler {

  private static instance: AppointmentDBHandler;

  protected dbSync: DBSync = new AppointmentDbSync();
  protected tableName: string = "appointments";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER",
    "data": "TEXT",
    "doctor_id": "INTEGER",
    "patient_id": "INTEGER",
    "appoint_date": "DATE",
    "updated_at": "DATETIME"
  };

  public static getInstance(): AppointmentDBHandler {
    if (!AppointmentDBHandler.instance) {
      AppointmentDBHandler.instance = new AppointmentDBHandler();
    }

    return AppointmentDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.patient_id) {
      const dbResponse: any = await this.getAllRecordByColumn({ "patient_id": String(filter.patient_id) }, filter.start);
      var appointmentList: Array<any> = dbResponse.map((row: any) => JSON.parse(row.data));
      return { data: { result: appointmentList } };
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
      return await ApiUtil.getWithToken(apppointmentApiUrls.apppointmentList, args);
    }
  }
}