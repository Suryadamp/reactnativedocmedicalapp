import { useEffect, useState } from 'react';
import { AppointmentDBHandler } from './tables/Appointment';
import ApiUtil from '../util/ApiUtil';
import { syncApiUrls } from '../constants/ApiConstants';
import { db } from './db';
import store, { RootState } from '../state';
import { PrescriptionDBHandler } from './tables/Prescriptions';
import { LaboratoryDBHandler } from './tables/Laboratory';
import { CommonVarsDBHandler } from './tables/CommonVariables';
import { UsersDBHandler } from './tables/User';
import { BookTestDBHandler } from './tables/BookTest';
import { AppConfigDBHandler } from './tables/AppConfig';
import { PatientDBHandler } from './tables/Patient';
import { useIsFocused } from '@react-navigation/native';
import { BillsAndPaymentsDBHandler } from './tables/BillsAndPayments';
import { VaccineDBHandler } from './tables/Vaccines';
import { useSelector } from 'react-redux';
import { RemainderDBHandler } from './tables/Remainders';
import { responseLatency } from '../service/AuthService';
import { SurveyQuizDBHandler } from './tables/SurveyQuestions';
import { SurveyAnswersDBHandler } from './tables/SurveyAnswer';
import { OpVitalDBHandler } from './tables/OpVitals';
import { AdmissionDBHandler } from './tables/IpAdmission';
import { IpVitalDBHandler } from './tables/IpVitals';

export abstract class DBSync {
  public abstract format(data: any): Promise<any>;
  protected fetch(payload: any, syncUrl: string = syncApiUrls.databaseSync): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const currentState = await store.getState();
        if (currentState.network.isConnected) {
          const response = await ApiUtil.postWithToken(syncUrl, [payload]);
          resolve(response);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  public abstract syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null>;
}

export interface LastSyncTime {
  time: string;
  count: number;
  success: boolean;
  patient_id?: number | string;
  op_id?: number | string;
  ip_admission_id?: number | string;
}

export interface DbSyncPostParams {
  table_name: string;
  count: number;
  date_time: string;
  patient_id?: number | string;
  op_id?: number | string;
  ip_admission_id?: number | string;
}

const keyMapping: { [key: string]: string } = {
  op_vitals: 'op_id',
  ip_vitals: 'ip_admission_id',
  patient_id: 'patient_id',
};

export abstract class DBHandler {
  private _userRole: Array<string> = [];
  private _userId: number | null = null;
  protected abstract dbSync: DBSync;
  protected abstract tableName: string;
  protected abstract columns: { [key: string]: string };
  public abstract fetchDataHandler(data: any): any;
  public async syncToLocal(patientId: string | number): Promise<void> {
    var lastSyncTime: LastSyncTime = await this.lastSyncTime();
    if (lastSyncTime) {
      const key: string = keyMapping[this.tableName] || keyMapping.patient_id;
      lastSyncTime[key] = patientId;
      var records = await this.dbSync.syncDB(lastSyncTime);
      if (records != null && records.length > 0) {
        let deleteColumn;
        if (keyMapping[this.tableName]) {
          deleteColumn = this.tableName === 'ip_vitals' ? 'ip_admission_id' : 'appointment_id';
        }
        await this.deletePatientRecord([patientId], deleteColumn);
        var promises: Array<Promise<any>> = [];
        for (var i in records) {
          promises.push(this.insertRecord(records[i]));
        }
        await Promise.all(promises).then(() => {
          console.log('Insert completed');
        });
      }
    }
  }

  protected get supportOffline(): boolean {
    const offlineProfiles: boolean =
    UsersDBHandler.getInstance().userRole.includes('patient') || UsersDBHandler.getInstance().userRole.includes('doctor');
    console.log(
      offlineProfiles ? `🪣 loaded from disk ${this.tableName}` : `🌐 Online ${this.tableName}`,
    );
    console.log('This role', UsersDBHandler.getInstance()._userRole, UsersDBHandler.getInstance()._userId);
    return offlineProfiles;
  }

  protected get userRole(): Array<string> {
    if (UsersDBHandler.getInstance()._userRole.length == 0) {
      const currentState = store.getState();
      UsersDBHandler.getInstance()._userRole = currentState.users.roles;
    }
    return UsersDBHandler.getInstance()._userRole;
  }

  protected get userId(): number | null {
    if (UsersDBHandler.getInstance()._userId == null) {
      const currentState = store.getState();
      UsersDBHandler.getInstance()._userId = currentState.users.userId;
    }
    return UsersDBHandler.getInstance()._userId;
  }

  protected set userId(userId: number | null) {
    UsersDBHandler.getInstance()._userId = userId;
  }

  protected set userRole(roles: Array<string>) {
    UsersDBHandler.getInstance()._userRole = roles;
  }

  public async buildTable() {
    if ((await this.tableExists()).length <= 0) {
      var tableQuery: string = `CREATE TABLE IF NOT EXISTS ${this.tableName} (`;
      for (var column in this.columns) {
        tableQuery += `${column} ${this.columns[column]}, `;
      }
      tableQuery = tableQuery.slice(0, -2);
      tableQuery += ')';
      await (await db).executeSql(tableQuery);
    }
    // this.syncToLocal();
  }
  private async tableExists(): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
      (async () => {
        const result = await (
          await db
        ).executeSql(
          `SELECT name FROM sqlite_master WHERE type="table" AND name="${this.tableName}"`,
        );
        resolve(result[0].rows.raw());
      })().catch((error) => reject(error));
    });
  }
  protected async insertRecord(records: Array<string>) {
    return (await db).transaction((tx) => {
      tx.executeSql(
        `INSERT OR REPLACE INTO ${this.tableName} (${Object.keys(this.columns).join(',')}) VALUES (${new Array(Object.keys(this.columns).length).fill('?').join(',')})`,
        records,
      );
    });
  }

  protected async updateRecord(primaryId: string, record: Array<any>) {
    return (await db).transaction((tx) => {
      tx.executeSql(
        `UPDATE ${this.tableName} SET ${Object.keys(this.columns).join(' = ?, ')} = ? WHERE id = ${primaryId}`,
        record,
      );
    });
  }
  protected async deleteRecord(primaryIds: Array<any>) {
    return (await db).transaction((tx) => {
      tx.executeSql(`DELETE FROM ${this.tableName} WHERE id IN (${primaryIds.join(',')})`);
    });
  }

  protected async deletePatientRecord(patientId: Array<any>, columnName = 'patient_id') {
    return (await db).transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${this.tableName} WHERE ${columnName} IN (${patientId.join(',')})`,
      );
    });
  }

  protected async truncate() {
    if ((await this.tableExists()).length <= 0) {
      return;
    }
    return (await db).transaction((tx) => {
      tx.executeSql(`DELETE FROM ${this.tableName}`);
      tx.executeSql(`UPDATE SQLITE_SEQUENCE SET seq = 0 WHERE name = "${this.tableName}"`);
    });
  }
  protected async dropTable() {
    return (await db).transaction((tx) => {
      tx.executeSql(`DROP TABLE ${this.tableName}`);
    });
  }
  public getAllRecords(pageNo: number = 0): Promise<Object> {
    return new Promise((resolve, reject) => {
      (async () => {
        const result = await (await db).executeSql(`SELECT * FROM ${this.tableName}`);
        resolve(result[0].rows.raw());
      })().catch((error) => reject(error));
    });
  }

  public getAllRecordByColumn(
    column: { [key: string]: string | number },
    pageNo?: number | null,
  ): Promise<Object> {
    return responseLatency(`Sql ${this.tableName} Table`, async () => {
      return new Promise((resolve, reject) => {
        (async () => {
          let query = `SELECT * FROM ${this.tableName} WHERE ${Object.keys(column)
            .map((key: string) => key + ' = ' + column[key])
            .join(' AND ')}`;
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

  public deleteRecordByColumn(column: { [key: string]: string | number }): Promise<Object> {
    var query: string = `DELETE FROM ${this.tableName} WHERE ${Object.keys(column)
      .map((key: string) => key + ' = ' + column[key])
      .join(' AND ')}`;
    return responseLatency(query, async () => {
      return (await db).transaction((tx) => {
        tx.executeSql(query);
      });
    });
  }

  public getRecordById(primaryId: string) {
    return new Promise((resolve, reject) => {
      (async () => {
        const result = await (
          await db
        ).executeSql(
          `SELECT * FROM ${this.tableName} WHERE ${Object.keys(this.columns)[0]} = ${primaryId} LIMIT 0, 10`,
        );
        resolve(result[0].rows.raw());
      })().catch((error) => reject(error));
    });
  }

  protected async lastSyncTime(): Promise<{ count: number; time: string; success: boolean }> {
    return responseLatency(`Sql ${this.tableName} Table`, async () => {
      return new Promise((resolve, reject) => {
        (async () => {
          const result = await (
            await db
          ).executeSql(`SELECT updated_at FROM ${this.tableName} ORDER BY updated_at ASC`);
          var record = result[0].rows;
          var lastRecord = record.item(record.length - 1);
          resolve({
            count: record.length,
            time:
              record.length > 0 && lastRecord.updated_at
                ? lastRecord.updated_at
                : '0000-00-00 00:00:00',
            success: true,
          });
        })().catch((error) => resolve({ count: 0, success: false, time: '0' }));
      });
    });
  }
}

export interface DBRecord<T> {
  id: string;
  data: T;
  updated_time: string;
}

export enum SyncScreen {
  login,
  dashboard,
  appointments,
  prescriptions,
  patients,
  labreports,
  laboratory,
  commonvars,
  users,
  appconfig,
  booktests,
  billsandpayments,
  vaccines,
  remainders,
  doctors,
  surveyQuestions,
  medicalRecords,
  opVitals,
  ipAdmissions,
  ipVitals,
}

export enum DBTables {
  permissions = 'permissions',
  appointments = 'appointments',
  prescriptions = 'prescriptions',
  patients = 'patients',
  labreports = 'labreports',
  laboratory = 'lab_reports',
  commonvars = 'commonvars',
  users = 'users',
  appconfig = 'appconfig',
  booktests = 'booktests',
  billsandpayments = 'bill_list',
  vaccines = 'vaccines',
  remainders = 'reminders',
  doctors = 'doctors',
  surveyQuestions = 'survey_questions',
  medicalRecords = 'medical_records',
  opVitals = 'op_vitals',
  ipAdmissions = 'ip_admissions',
  ipVitals = 'ip_vitals',
}

export const useSyncLocalDatabase = (syncScreen: SyncScreen) => {
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const isFocused = useIsFocused();
  const [screen, setScreen] = useState<SyncScreen>(syncScreen);
  useEffect(() => {
    if (isFocused) {
      syncLocalDatabase(screen, selectedPatient?.id);
    }
  }, [isFocused]);
  return [screen, setScreen];
};

const DEFAULT_PATIENT_ID = 76;

export const syncLocalDatabase = async (
  syncScreen: SyncScreen,
  patientId: string | number = DEFAULT_PATIENT_ID,
  callback?: Function,
) => {
  switch (syncScreen) {
    case SyncScreen.login:
      await AppConfigDBHandler.getInstance().buildTable();
      await AppointmentDBHandler.getInstance().buildTable();
      await BillsAndPaymentsDBHandler.getInstance().buildTable();
      await BookTestDBHandler.getInstance().buildTable();
      await CommonVarsDBHandler.getInstance().buildTable();
      await LaboratoryDBHandler.getInstance().buildTable();
      await PatientDBHandler.getInstance().buildTable();
      await PrescriptionDBHandler.getInstance().buildTable();
      await UsersDBHandler.getInstance().buildTable();
      await VaccineDBHandler.getInstance().buildTable();
      await RemainderDBHandler.getInstance().buildTable();
      await SurveyQuizDBHandler.getInstance().buildTable();
      await SurveyAnswersDBHandler.getInstance().buildTable();
      await OpVitalDBHandler.getInstance().buildTable();
      await AdmissionDBHandler.getInstance().buildTable();
      await IpVitalDBHandler.getInstance().buildTable();
      // await UsersDBHandler.getInstance().syncToLocal().then(async() => {
      //     console.log("UsersDBHandler");
      //     await getUserDetails();
      //     PatientDBHandler.getInstance().syncToLocal();
      //     CommonVarsDBHandler.getInstance().syncToLocal();
      //     CommonVarsDBHandler.getInstance().fetchDataHandler(null);
      // });
      break;
    case SyncScreen.dashboard:
      break;
    case SyncScreen.appointments:
      AppointmentDBHandler.getInstance()
        .syncToLocal(patientId)
        .then(() => {
          console.log('SyncScreen.appointments');
          if (callback) {
            callback();
          }
        });
      break;
    case SyncScreen.prescriptions:
      PrescriptionDBHandler.getInstance()
        .syncToLocal(patientId)
        .then(() => {
          console.log('SyncScreen.prescriptions');
          if (callback) {
            callback();
          }
        });
      break;
    case SyncScreen.patients:
      PatientDBHandler.getInstance().syncToLocal();
      break;
    case SyncScreen.laboratory:
      LaboratoryDBHandler.getInstance()
        .syncToLocal(patientId)
        .then(() => {
          console.log('SyncScreen.laboratory');
          if (callback) {
            callback();
          }
        });
      break;
    case SyncScreen.commonvars:
      CommonVarsDBHandler.getInstance().syncToLocal();
      break;
    case SyncScreen.users:
      UsersDBHandler.getInstance().syncToLocal();
      break;
    case SyncScreen.booktests:
      BookTestDBHandler.getInstance()
        .syncToLocal(patientId)
        .then(() => {
          console.log('SyncScreen.booktests');
          if (callback) {
            callback();
          }
        });
      break;
    case SyncScreen.billsandpayments:
      BillsAndPaymentsDBHandler.getInstance()
        .syncToLocal(patientId)
        .then(() => {
          console.log('SyncScreen.billsandpayments');
          if (callback) {
            callback();
          }
        });
      break;
    case SyncScreen.vaccines:
      await VaccineDBHandler.getInstance().syncToLocal(patientId);
      break;
    case SyncScreen.remainders:
      await RemainderDBHandler.getInstance().syncToLocal(patientId);
      break;
    case SyncScreen.surveyQuestions:
      await SurveyQuizDBHandler.getInstance()
        .syncToLocal()
        .then(() => {
          console.log('SyncScreen.surveyQuestions');
          if (callback) {
            callback();
          }
        });
      break;
    case SyncScreen.opVitals:
      await OpVitalDBHandler.getInstance()
        .syncToLocal(patientId)
        .then(() => {
          console.log('SyncScreen.opVitals');
          if (callback) {
            callback();
          }
        });
      break;
    case SyncScreen.ipAdmissions:
      await AdmissionDBHandler.getInstance()
        .syncToLocal(patientId)
        .then(() => {
          console.log('SyncScreen.ipAdmissions');
          if (callback) {
            callback();
          }
        });
      break;
    case SyncScreen.ipVitals:
      await IpVitalDBHandler.getInstance()
        .syncToLocal(patientId)
        .then(() => {
          console.log('SyncScreen.ipVitals');
          if (callback) {
            callback();
          }
        });
      break;
    default:
      throw Error('db blueprint was not found');
  }
};
