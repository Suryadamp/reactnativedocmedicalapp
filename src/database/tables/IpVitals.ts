import { inpatientApiUrls } from '../../constants/ApiConstants';
import { responseLatency } from '../../service/AuthService';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';
import { db } from '../db';

export class IpVitalDbSync extends DBSync {
  public format(ipVital: Array<{ [key: string]: any }>, lastSyncTime?: LastSyncTime): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var ptr in ipVital) {
      data.push([
        ipVital[ptr].id,
        lastSyncTime?.ip_admission_id,
        ipVital[ptr].vital_date,
        ipVital[ptr].vital_id,
        ipVital[ptr].vital_name,
        ipVital[ptr].vital_unit,
        ipVital[ptr].vital_value,
        ipVital[ptr].vital_date,
      ]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      table_name: DBTables.ipVitals,
      count: lastSyncTime.count,
      date_time: lastSyncTime.time,
      ip_admission_id: lastSyncTime.ip_admission_id,
    };
    var records: any = await this.fetch(payload);
    if (records?.data?.ip_vitals?.data) {
      return await this.format(records.data.ip_vitals.data, lastSyncTime);
    }
    return Promise.resolve(null);
  }
}

export class IpVitalDBHandler extends DBHandler {
  private static instance: IpVitalDBHandler;

  protected dbSync: DBSync = new IpVitalDbSync();
  protected tableName: string = 'ip_vitals';
  protected columns: { [key: string]: string } = {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    ip_admission_id: 'INTEGER',
    vital_date: 'TEXT',
    vital_id: 'INTEGER',
    vital_name: 'TEXT',
    vital_unit: 'TEXT',
    vital_value: 'TEXT',
    updated_at: 'DATETIME',
  };

  public static getInstance(): IpVitalDBHandler {
    if (!IpVitalDBHandler.instance) {
      IpVitalDBHandler.instance = new IpVitalDBHandler();
    }

    return IpVitalDBHandler.instance;
  }

  public getAllIPVitalRecordByColumn(query: any, pageNo?: number | null): Promise<Object> {
    return responseLatency(`Sql ${this.tableName} Table`, async () => {
      return new Promise((resolve, reject) => {
        (async () => {
          if (pageNo) {
            const offset = pageNo <= 1 ? 0 : (pageNo - 1) * 10;
            query += ` LIMIT ${offset}, 10`;
          }
          const result = await (await db).executeSql(query);
          resolve(result[0].rows.raw());
        })().catch((error) => reject(error));
      });
    });
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.ipAdmissionId) {
      const currentDate = new Date().toISOString().slice(0, 10);

      let query = `SELECT * FROM ${this.tableName} WHERE ip_admission_id = ${filter.ipAdmissionId}`;

      if (filter?.body?.type === 'latest') {
        query += ' GROUP BY vital_name ORDER BY MAX(vital_date) DESC';
      } else {
        if (filter.body.vital_ids?.length > 0) {
          const fromDate = filter.body.from_date.slice(0, 10);

          const vitalIds = filter.body.vital_ids.join(', ');
          console.log(fromDate === currentDate, fromDate, currentDate);
          query += ` AND vital_id IN (${vitalIds}) AND DATE(vital_date) BETWEEN '${fromDate}' AND '${currentDate}'`;
        }
        query += ' ORDER BY vital_date DESC';
      }
      const dbResponse: any = await this.getAllIPVitalRecordByColumn(query);
      return { data: dbResponse };
    } else {
      return await ApiUtil.getWithToken(
        `${inpatientApiUrls.inpatientVitals}${filter.ipAdmissionId}`,
        filter.body,
      );
    }
  }
}
