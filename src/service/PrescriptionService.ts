import { prescriptionApiUrls } from '../constants/ApiConstants';
import { PrescriptionDBHandler } from '../database';
import { SyncScreen, syncLocalDatabase } from '../database/DBSync';
import store from '../state';
import { setPrescriptionProductList } from '../state/prescriptions/prescriptionProduct';
import { setPrescriptionSymptomsList } from '../state/prescriptions/prescriptionSymptoms';
import ApiUtil from '../util/ApiUtil';
import { responseLatency } from './AuthService';

export const getPrescriptionList = async (
  patient_id: number | null = null,
  from_date: string | null = null,
  to_date: string | null = null,
): Promise<any> => {
  return responseLatency('GetPrescriptionList', async () => {
    return new Promise((res: any, rej: any) => {
      try {
        syncLocalDatabase(SyncScreen.prescriptions, patient_id ?? undefined, async () => {
          const response: any = await PrescriptionDBHandler.getInstance().fetchDataHandler({
            patient_id,
            from_date,
            to_date,
          });
          res(response);
        });
      } catch (error) {
        rej(error);
        throw error;
      }
    });
  });
};

export const getPrescriptionRemainderList = (patient_id: number | null = null): Promise<any> => {
  return responseLatency('GetPrescriptionRemainderList', async () => {
    try {
      const response = await getPrescriptionList(patient_id);
      if (Array.isArray(response.data)) {
        const filterData = response.data.filter((entry: any) =>
          Array.isArray(entry.prescription_product?.default),
        );
        return filterData;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  });
};

export const getPrescriptionSymptoms = (): Promise<any> => {
  return responseLatency('GetPrescriptionSymptoms', async () => {
    try {
      const response = await ApiUtil.getWithToken(prescriptionApiUrls.symptoms);
      store.dispatch(setPrescriptionSymptomsList(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getPrescriptionProducts = (): Promise<any> => {
  return responseLatency('GetPrescriptionProducts', async () => {
    try {
      const response = await ApiUtil.getWithToken('/prescriptions/products');
      store.dispatch(setPrescriptionProductList(response?.data?.result));
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const addNewPrescription = (data: any): Promise<any> => {
  return responseLatency('AddNewPrescription', async () => {
    try {
      const response = await ApiUtil.postWithToken(prescriptionApiUrls.createPrescription, data);
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const updatePrescription = (id: number, data: any): Promise<any> => {
  return responseLatency('UpdatePrescription', async () => {
    try {
      const response = await ApiUtil.putWithToken(
        `${prescriptionApiUrls.updatePrescription}${id}`,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const updatePrescriptionDosage = (id: number, data: any): Promise<any> => {
  return responseLatency('UpdatePrescriptionDosage', async () => {
    try {
      const response = await ApiUtil.putWithToken(
        `${prescriptionApiUrls.updatePrescriptionDosage}${id}`,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const deletePrescriptionMedicine = (id: any): Promise<any> => {
  return responseLatency('DeletePrescriptionMedicine', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(
        `${prescriptionApiUrls.deletePrescriptionProduct}${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const deletePrescription = (id: any): Promise<any> => {
  return responseLatency('DeletePrescription', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(
        `${prescriptionApiUrls.deletePrescription}${id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getAppointmentPrescriptions = (appoint_id: string | null = null): Promise<any> => {
  return responseLatency('GetAppointmentPrescriptions', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${prescriptionApiUrls.prescriptionAppointment}${appoint_id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const createAppointmentPrescription = (data: any): Promise<any> => {
  return responseLatency('CreateAppointmentPrescription', async () => {
    try {
      const response = await ApiUtil.postWithToken(prescriptionApiUrls.createPrescription, data);
      return response;
    } catch (error) {
      throw error;
    }
  });
};
