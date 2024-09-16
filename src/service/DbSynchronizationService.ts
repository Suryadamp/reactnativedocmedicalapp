import ApiUtil from '../util/ApiUtil';
import store from '../state';
import { syncApiUrls } from '../constants/ApiConstants';

export const syncDb = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const payload = [
      {
        table_name: 'auth',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'appointments',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'billAndPayments',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'medicalRecords',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'reports',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'userConfig',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'doctors',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'paitents',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'appointments',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
      {
        table_name: 'users',
        count: 1,
        time: '2024-02-01 04:05:00',
      },
    ];
    try {
      const response = await ApiUtil.postWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const authDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'auth',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const userDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'users',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const appointmentDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'appointments',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const paitentDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'paitents',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const doctorsDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'doctors',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const userConfigDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'userConfig',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const reportsDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'reports',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const medicalRecordsDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'medicalRecords',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const billAndPaymentsDbSync = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = [
        {
          table_name: 'billAndPayments',
          count: 1,
          time: '2024-02-01 04:05:00',
        },
      ];
      const response = await ApiUtil.getWithToken(syncApiUrls.databaseSync, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
