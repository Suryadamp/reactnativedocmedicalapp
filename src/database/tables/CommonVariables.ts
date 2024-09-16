import { commonApiUrls } from '../../constants/ApiConstants';
import store from '../../state';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, LastSyncTime } from '../DBSync';

export class CommonVarsDbSync extends DBSync {
  public format(commonvars: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in commonvars) {
      data.push([null, index, JSON.stringify(commonvars[index]), 0]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    const currentState = await store.getState();
    if(currentState.network.isConnected) {
      var records: any = await ApiUtil.getWithToken(commonApiUrls.commonVariables);
      if (records?.data) {
        return await this.format(records.data);
      }
    }
    return Promise.resolve(null);
  }
}

export class CommonVarsDBHandler extends DBHandler {
  private static instance: CommonVarsDBHandler;
  protected dbSync: DBSync = new CommonVarsDbSync();
  protected tableName: string = 'commonvars';
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    variable: 'TEXT',
    data: 'TEXT',
    updated_at: 'DATETIME',
  };

  public static getInstance(): CommonVarsDBHandler {
    if (!CommonVarsDBHandler.instance) {
      CommonVarsDBHandler.instance = new CommonVarsDBHandler();
    }

    return CommonVarsDBHandler.instance;
  }

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
    if (this.supportOffline) {
      const dbResponse: any = await this.getAllRecords();
      var commonVars: any = dbResponse.map((row: any) => {
        var joinVars = { [row.variable]: JSON.parse(row.data) };
        return joinVars;
      });
      return { data: Object.assign({}, ...commonVars) };
    } else {
      return await ApiUtil.getWithToken(commonApiUrls.commonVariables);
    }
  }
}
