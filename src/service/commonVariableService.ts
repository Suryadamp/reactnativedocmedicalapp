import store from '../state';
import { setCommonVariable, setAppConfiguration } from '../state/commonvariables';
import { CommonVarsDBHandler } from '../database/tables/CommonVariables';
import { AppConfigDBHandler } from '../database/tables/AppConfig';
import { responseLatency } from './AuthService';
import ApiUtil from '../util/ApiUtil';
import { commonApiUrls } from '../constants/ApiConstants';
import RNFS from 'react-native-fs';
import DeviceInfo from 'react-native-device-info';

export const getCommonvariables = (): Promise<any> => {
  return responseLatency('GetCommonVariables', async () => {
    try {
      const response = await CommonVarsDBHandler.getInstance().fetchDataHandler(null);
      store.dispatch(setCommonVariable(response?.data));
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getAppConfiguration = (): Promise<any> => {
  return responseLatency('GetCommonVariables', async () => {
    try {
      const response = await AppConfigDBHandler.getInstance().fetchDataHandler();
      store.dispatch(setAppConfiguration(response?.data));
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const uploadLogs = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const uniqueId = await DeviceInfo.getUniqueId();
      const logsDirectory = `${RNFS.DocumentDirectoryPath}/logs`;
      const logFilePath = `${logsDirectory}/app_logs.log`;

      // Check if the log file exists
      const fileExists = await RNFS.exists(logFilePath);
      if (!fileExists) {
        reject('Log file does not exist');
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append('log_file', {
        uri: `file://${logFilePath}`,
        name: `${uniqueId}.log`,
        type: 'text/plain', // Adjust the file type if necessary
      });

      // Make API request to upload log file
      const response = await ApiUtil.postFormDataWithToken(commonApiUrls.logs, formData);
      console.log('Response:', response);

      // Check if upload was successful
      if (response && response.message === 'Success') {
        // Delete the log file after successful upload
        await RNFS.unlink(logFilePath);
        console.log('Log file deleted successfully');
      }

      resolve(response);
    } catch (error) {
      console.error('Error uploading logs:', error);
      reject(error);
    }
  });
};
