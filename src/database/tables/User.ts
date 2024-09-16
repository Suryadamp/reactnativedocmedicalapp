import { userApiUrls } from '../../constants/ApiConstants';
import KeyChainService from '../../service/KeyChainService';
import store from '../../state';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, LastSyncTime } from '../DBSync';

export class UsersDbSync extends DBSync {
  public format(users: { [key: string]: any }): Promise<any> {
    var data: Array<any> = [
      users.id,
      users.name,
      users.mobile,
      JSON.stringify(users.roles),
      JSON.stringify(users.permissions),
      0];
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    const currentState = await store.getState();
    if(currentState.network.isConnected) {
      var records: any = await ApiUtil.getWithToken(userApiUrls.user);
      if (records?.data?.user) {
        return await this.format(records.data.user);
      }
    }
    return Promise.resolve(null);
  }
}

export class UsersDBHandler extends DBHandler {
  private static instance: UsersDBHandler;
  protected dbSync: DBSync = new UsersDbSync();
  protected tableName: string = "users";
  protected columns: { [key: string]: string } = {
    "id": "INTEGER",
    "name": "TEXT",
    "mobile": "TEXT",
    "roles": "TEXT",
    "permissions": "TEXT",
    "updated_at": "DATETIME"
  };

  public async syncToLocal() {
    var lastSyncTime = await this.lastSyncTime();
    if (lastSyncTime) {
      var records = await this.dbSync.syncDB(lastSyncTime);
      if (records != null) {
        UsersDBHandler.getInstance().userId = records[0];
        UsersDBHandler.getInstance().userRole = JSON.parse(records[3]);
        await KeyChainService.setSecureValue('userId', String(this.userId));
        await this.insertRecord(records);
      } else {
        let userId: string | boolean = await KeyChainService.getSecureValue('userId');
        if(userId) {
          this.fetchDataHandler({userId});
        }
      }
    }
  }

  public static getInstance(): UsersDBHandler {
    if (!UsersDBHandler.instance) {
      UsersDBHandler.instance = new UsersDBHandler();
    }

    return UsersDBHandler.instance;
  }

  public get getUserId(): number | null {
    return this.userId;
  }

  public get getUserRole(): Array<string> | null {
    return this.userRole;
  }

  public resetUserData() {
    this.userId = null;
    this.userRole = [];
  }

  public async fetchDataHandler(filter: any = null) {
    if (!store.getState().network.isConnected || this.supportOffline) {
      const dbResponse: any = await this.getAllRecordByColumn({"id": filter.userId});
      const userRecord = dbResponse.map((row: any) => {
        row['roles'] = JSON.parse(row.roles);
        row['permissions'] = JSON.parse(row.permissions);
        return row;
      });
      if(userRecord.length) {
        UsersDBHandler.getInstance().userId =  userRecord[0].id;
        UsersDBHandler.getInstance().userRole =  userRecord[0].roles;
      }
      return { data: { user: userRecord[0] } };
    } else {
      return await ApiUtil.getWithToken(userApiUrls.user);
    }
  }
}