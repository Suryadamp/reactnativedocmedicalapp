import { customLogger } from '../components/CustomLogger';
import { userApiUrls } from '../constants/ApiConstants';
import { PatientDBHandler, UsersDBHandler } from '../database';
import store from '../state';
import { setMobile } from '../state/auth';
import { setPatientDetails, setTempPatientList } from '../state/patients';
import { setUserDetails } from '../state/users';
import ApiUtil from '../util/ApiUtil';
import { responseLatency } from './AuthService';
import KeyChainService from './KeyChainService';

export const getUserDetails = (): Promise<any> => {
  const currentState = store.getState();
  const patientsData = currentState?.patients?.patientList;
  return responseLatency('GET User details', async () => {
    try {
      const userId: string | boolean = await KeyChainService.getSecureValue('userId');
      const response = await UsersDBHandler.getInstance().fetchDataHandler({userId});
      const userData = {
        userId: response?.data?.user?.id,
        userName: response?.data?.user?.name,
        mobile: response?.data?.user?.mobile,
        roles: response?.data?.user?.roles,
        config: response?.data?.config,
        primaryPatientId: patientsData[0]?.id,
        permissions: response?.data?.user?.permissions,
      };
      store.dispatch(setUserDetails(userData));
      store.dispatch(setMobile(response?.data?.user?.mobile));
      const localPatients: any = await PatientDBHandler.getInstance().fetchDataHandler({
        user_id: response?.data?.user?.id,
      });
      if (localPatients) {
        store.dispatch(setTempPatientList(localPatients));
      }
      customLogger('identifier', 'User Info', response?.data?.user?.id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
};

export const deleteUser = (): Promise<any> => {
  return responseLatency('DeleteUser', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(userApiUrls.userAccount);
      return response;
    } catch (error) {
      throw error;
    }
  });
};
