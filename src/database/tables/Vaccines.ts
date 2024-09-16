import { vaccineApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class VaccineDbSync extends DBSync {
  public format(vaccines: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    console.log(vaccines);
    for (var ptr in vaccines) {
      for (var index in vaccines[ptr].vaccine_chart) {
        data.push([
          vaccines[ptr].id,
          vaccines[ptr].title,
          vaccines[ptr].name,
          vaccines[ptr].vaccine_chart[index].patient_id,
          vaccines[ptr].vaccine_chart[index].given_date,
          vaccines[ptr].vaccine_chart[index].due_date,
          JSON.stringify(vaccines[ptr].vaccine_chart[index]),
          vaccines[ptr].vaccine_chart[index].updated_at]);
      }
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      "table_name": DBTables.vaccines,
      "count": lastSyncTime.count,
      "date_time": lastSyncTime.time,
      "patient_id": lastSyncTime.patient_id
    }
    var records: any = await this.fetch(payload);
    if (records?.data?.vaccines?.data) {
      return await this.format(records.data.vaccines.data);
    }
    return Promise.resolve(null);
  }
}

export class VaccineDBHandler extends DBHandler {

  private static instance: VaccineDBHandler;

  protected dbSync: DBSync = new VaccineDbSync();
  protected tableName: string = "vaccines";
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "id": "INTEGER",
    "title": "TEXT",
    "name": "TEXT",
    "patient_id": "INTEGER",
    "given_date": "DATE",
    "due_date": "DATE",
    "data": "TEXT",
    "updated_at": "DATETIME"
  };

  public static getInstance(): VaccineDBHandler {
    if (!VaccineDBHandler.instance) {
      VaccineDBHandler.instance = new VaccineDBHandler();
    }

    return VaccineDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.patient_id) {
      const dbResponse: any = await this.getAllRecordByColumn({ "patient_id": String(filter.patient_id) });
      var vaccineList: Array<any> = [];
      let vaccines = dbResponse.map((row: any) => JSON.parse(row.data));
      if (dbResponse.length > 0) {
        vaccineList.push({
          id: dbResponse[0].id,
          title: dbResponse[0].title,
          name: dbResponse[0].name,
          vaccine_chart: vaccines
        })
      }
      return { data: vaccineList };
    } else {
      const query =
        filter.status !== 'Custom'
          ? `&vaccine_status=${filter.status}`
          : `&vaccine_status=${filter.status}&from_date=${filter.date?.startDate || null}&to_date=${filter.date?.endDate || null
          }`;
      return await ApiUtil.getWithToken(
        `${vaccineApiUrls.vaccineList}=${filter.patient_id}${query}`,
      );
    }
  }
}