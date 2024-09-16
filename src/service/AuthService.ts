import { setAccessToken, setRefreshToken } from '../state/auth';
import KeyChainService from './KeyChainService';
import store from '../state';
import ApiUtil from '../util/ApiUtil';
import { getDoctorsList } from './DoctorService';
import { getPurposeList } from './AppointmentService';
import { getAllVitals } from './InpatientService';
import { getPrescriptionProducts, getPrescriptionSymptoms } from './PrescriptionService';
import { getAppConfiguration, getCommonvariables } from './commonVariableService';
import { getUserDetails } from './UserService';
import { authApiUrls } from '../constants/ApiConstants';
import { getSurveyQuestions } from './SurveyService';
import { customLogger } from '../components/CustomLogger';
import { PatientDBHandler, UsersDBHandler } from '../database';
import { CommonVarsDBHandler } from '../database/tables/CommonVariables';
import { getPatientsList } from './Patients';

export interface IAuthToken {
  access_token: string;
}

export const login = async (mobile: string, password: string): Promise<any> => {
  return await responseLatency('Login', async () => {
    try {
      const userInfo = await ApiUtil.postWithoutToken(authApiUrls.login, {
        mobile,
        password,
        platform: 'mobile',
      });
      console.log(userInfo);
      if (userInfo?.data?.access_token) {
        await storeAccessToken(userInfo.data);
        return userInfo?.data;
      } else {
        return userInfo;
      }
    } catch (e) {
      console.error(e);
      return e;
    }
  });
};

export const updateUserData = async () => {
  await UsersDBHandler.getInstance().syncToLocal();
  await PatientDBHandler.getInstance().syncToLocal();
  await getUserDetails();
  await CommonVarsDBHandler.getInstance().syncToLocal();
  return await responseLatency('LoginUpdate', async () => {
    // Fetch and process all necessary data in parallel
    // await getUserDetails();
    await getPatientsList();
    const currentState = await store.getState();
    await Promise.all([
      // await getListOfAppointments(roles.includes('patient') && patientsData.data.data[0].id),
      getCommonvariables(),
      getAppConfiguration(),
      // getDoctorsList(),
      // getBillItemsList(),
      // getAllVitals(),
      // getPurposeList(),
      // getPrescriptionSymptoms(),
      // getPrescriptionProducts(),
      // getRemainderList(),
      // getPrescriptionRemainderList(),
      // SurveyQuestionsAnswers.createTable(),
      // SurveyQuestions.createTable(),
      // getSurveyQuestions(),
    ]);
    if (currentState.network.isConnected) {
      getDoctorsList();
      getPrescriptionSymptoms();
      getPrescriptionProducts();
      getPurposeList();
      getSurveyQuestions();
      getAllVitals();
    }
  });
};

// export const updateUserData = async () => {
//   // Define a callback function
//   const loginCallback = async () => {
//     // Fetch and process all necessary data in parallel
//     const currentState = await store.getState();
//     const roles: any = currentState?.users?.roles;
//     getPatientsList();
//     await Promise.all([
//       await getCommonvariables(),
//       await getAppConfiguration(),
//       SurveyQuestionsAnswers.createTable(),
//       SurveyQuestions.createTable(),
//     ]);
//       getPatientsList();
//     if (currentState.network.isConnected) {
//       getDoctorsList();
//       getPrescriptionSymptoms();
//       getPrescriptionProducts();
//       getPurposeList();
//       getSurveyQuestions();
//     }
//   };

//   // Call syncLocalDatabase and use the callback
//   syncLocalDatabase(SyncScreen.login)
//     .then(async () => {
//       await responseLatency('LoginUpdate', loginCallback);
//     })
//     .catch((error) => {
//       // Handle error if necessary
//       console.error('Error during login sync:', error);
//     });
// };

export const logout = async (): Promise<any> => {
  return await responseLatency('Logout', async () => {
    try {
      const response = await ApiUtil.postWithToken(authApiUrls.logout);
      await removeAccessToken();
      await UsersDBHandler.getInstance().resetUserData();
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};

export const refreshTokenUpdate = async (body: { refresh_token: string }): Promise<any> => {
  return await responseLatency('RefreshTokenUpdate', async () => {
    try {
      const response = await ApiUtil.postWithoutToken(authApiUrls.refreshToken, body);
      if (response.data.refresh_token && response.data.access_token) {
        await storeAccessToken(response?.data);
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};

export const storeAccessToken = async (token: any): Promise<any> => {
  return await responseLatency('StoreAccessToken', async () => {
    try {
      await KeyChainService.setSecureValue('accessToken', token?.access_token);
      await KeyChainService.setSecureValue('refreshToken', token?.refresh_token);
      store.dispatch(setAccessToken(token?.access_token));
      store.dispatch(setRefreshToken(token?.refresh_token));
      return true;
    } catch (error) {
      console.error('Error storing access token:', error);
      throw new Error('Failed to store access token');
    }
  });
};

export const removeAccessToken = async (): Promise<any> => {
  return await responseLatency('RemoveAccessToken', async () => {
    try {
      await KeyChainService.removeSecureValue('accessToken');
      await KeyChainService.removeSecureValue('refreshToken');
      await KeyChainService.removeSecureValue('userId');
      store.dispatch(setAccessToken(''));
      store.dispatch(setRefreshToken(''));
    } catch (error) {
      console.error('Error removing access token:', error);
      throw new Error('Failed to remove access token');
    }
  });
};

export const responseLatency = async (
  operation: string,
  operationFunction: Function,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const requestStartTime = Date.now(); // Start timing the operation
    operationFunction()
      .then((response: any) => {
        const requestEndTime = Date.now(); // End timing the operation
        customLogger(
          operation?.slice(0, 3) === 'Sql' ? 'sql' : 'api',
          operation,
          `${operation} Request took ${requestEndTime - requestStartTime}ms`,
          '',
          '',
          requestEndTime - requestStartTime,
        );

        if (response?.errors) {
          customLogger(
            response?.errors === 'Success' ? 'success' : 'error',
            `${operation} API`,
            response.errors,
          );
        } else if (response?.message) {
          customLogger('Success', `${operation} API`, response.message);
        } else if (response?.data?.errors) {
          customLogger(
            response?.data?.errors === 'Success' ? 'success' : 'error',
            `${operation} API`,
            response.data.errors,
          );
        }
        resolve(response); // Resolve with the response
      })
      .catch((error: any) => {
        const requestEndTime = Date.now(); // End timing the operation
        customLogger(
          'api',
          operation,
          `${operation} Request took ${requestEndTime - requestStartTime}ms`,
          '',
          '',
          requestEndTime - requestStartTime,
        );
        customLogger('error', `${operation} API`, error);
        reject(error); // Reject with the error
      });
  });
};
