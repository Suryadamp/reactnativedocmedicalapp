import { vitalApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, DbSyncPostParams, LastSyncTime } from '../DBSync';

export class OpVitalDbSync extends DBSync {
  public format(opVital: Array<{ [key: string]: any }>, lastSyncTime?: LastSyncTime): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var ptr in opVital) {
      data.push([
        opVital[ptr].id,
        lastSyncTime?.op_id,
        opVital[ptr].vital_date,
        opVital[ptr].vital_id,
        opVital[ptr].vital_name,
        opVital[ptr].vital_unit,
        opVital[ptr].vital_value,
        opVital[ptr].updated_at,
      ]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: DbSyncPostParams = {
      table_name: DBTables.opVitals,
      count: lastSyncTime.count,
      date_time: lastSyncTime.time,
      op_id: lastSyncTime.op_id,
    };
    var records: any = await this.fetch(payload);
    if (records?.data?.op_vitals?.data) {
      return await this.format(records.data.op_vitals.data, lastSyncTime);
    }
    return Promise.resolve(null);
  }
}

export class OpVitalDBHandler extends DBHandler {
  private static instance: OpVitalDBHandler;

  protected dbSync: DBSync = new OpVitalDbSync();
  protected tableName: string = 'op_vitals';
  protected columns: { [key: string]: string } = {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    appointment_id: 'INTEGER',
    vital_date: 'TEXT',
    vital_id: 'INTEGER',
    vital_name: 'TEXT',
    vital_unit: 'TEXT',
    vital_value: 'TEXT',
    updated_at: 'DATETIME',
  };

  public static getInstance(): OpVitalDBHandler {
    if (!OpVitalDBHandler.instance) {
      OpVitalDBHandler.instance = new OpVitalDBHandler();
    }

    return OpVitalDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline && filter.appointment_id) {
      const dbResponse: any = await this.getAllRecordByColumn({
        appointment_id: String(filter.appointment_id),
      });
      return { data: dbResponse };
    } else {
      return await ApiUtil.getWithToken(`${vitalApiUrls.getVitals}${filter.appointment_id}`);
    }
  }
}
