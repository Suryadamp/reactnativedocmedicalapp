import { commonApiUrls, userApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, DBTables, LastSyncTime } from '../DBSync';

export class AppConfigDbSync extends DBSync {
  public format(appConfig: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var index in appConfig) {
      data.push([
        null,
        index,
        String(appConfig[index]),
        0]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var payload: { [key: string]: string | number } = {
      "table_name": DBTables.users,
      "count": lastSyncTime.count,
      "time": lastSyncTime.time
    }
    var records: any = await this.fetch({}, commonApiUrls.appConfiguration);
    if (records?.data) {
      return await this.format(records.data);
    }
    return Promise.resolve(null);
  }
}

export class AppConfigDBHandler extends DBHandler {
  protected dbSync: DBSync = new AppConfigDbSync();
  protected tableName: string = "appconfig";
  protected columns: { [key: string]: string } = {
    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "config": "TEXT",
    "data": "TEXT",
    "updated_at": "DATETIME"
  };
  private static instance: AppConfigDBHandler;

  constructor() {
    super();
    this.buildTable();
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

  public static getInstance(): AppConfigDBHandler {
    if (!AppConfigDBHandler.instance) {
      AppConfigDBHandler.instance = new AppConfigDBHandler();
    }

    return AppConfigDBHandler.instance;
  }

  public async fetchDataHandler(filter: any = null) {
    if (this.supportOffline) {
      const dbResponse: any = await this.getAllRecords();
      var appConfig: any = dbResponse.map((row: any) => {
        var joinVars = { [row.config]: JSON.parse(row.data) };
        return joinVars;
      });
      return { data: appConfig };
    } else {
      return await ApiUtil.getWithToken(commonApiUrls.appConfiguration);
    }
  }
}