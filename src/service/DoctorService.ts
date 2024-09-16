import ApiUtil from '../util/ApiUtil';
import store from '../state';
import { setDoctorsDetails } from '../state/doctors';
import { doctorApiUrls } from '../constants/ApiConstants';

export const getDoctorsList = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ApiUtil.getWithToken(doctorApiUrls.doctorList);
      store.dispatch(setDoctorsDetails(response));
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
