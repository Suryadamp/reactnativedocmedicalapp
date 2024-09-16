import { investigationApiUrls } from '../constants/ApiConstants';
import ApiUtil from '../util/ApiUtil';
import { responseLatency } from './AuthService';

export const createInvestigation = (body: any): Promise<any> => {
  return responseLatency('CreateInvestigation', async () => {
    try {
      const response = await ApiUtil.postWithToken(investigationApiUrls.createInvestigation, body);
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getInvestigation = (body: any): Promise<any> => {
  return responseLatency('GetInvestigation', async () => {
    try {
      const response = await ApiUtil.getWithToken(investigationApiUrls.getInvestigation, body);
      return response;
    } catch (error) {
      throw error;
    }
  });
};
export const deleteInvestigation = (id: number): Promise<any> => {
  return responseLatency('DeleteInvestigation', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(
        `${investigationApiUrls.deleteInvestigation}/${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const deleteAllInvestigation = (id: number): Promise<any> => {
  return responseLatency('DeleteAllInvestigation', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(
        `${investigationApiUrls.deleteAllInvestigation}/${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};
