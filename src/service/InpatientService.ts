// Service - Inpatient
import ApiUtil from '../util/ApiUtil';
import store from '../state';
import {
  sequenceApiUrls,
  inpatientApiUrls,
  billAndPaymentsApiUrls,
} from '../constants/ApiConstants';
import {
  setInpatientIpNo,
  setInpatientList,
  resetStateItem,
  setInpatientPrescriptions,
  setVitals,
  setDoctorVitals,
  setInpatientVitals,
  setSelectedInpatient,
  setInpatientInvestigation,
  setInpatientInvoice,
} from '../state/inpatients';
import { responseLatency } from './AuthService';
import { SyncScreen, syncLocalDatabase } from '../database/DBSync';
import { AdmissionDBHandler } from '../database/tables/IpAdmission';
import { IpVitalDBHandler } from '../database/tables/IpVitals';

export const inpatientSetIpNo = (): Promise<any> => {
  return responseLatency('InpatientSetIpNo', async () => {
    try {
      const response = await ApiUtil.getWithToken(`${sequenceApiUrls.getSequenceNo}/ip`);
      if (response.success && response.data && response.data[0]) {
        store.dispatch(setInpatientIpNo(response.data[0].sequence_no));
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientCreate = (data: any): Promise<any> => {
  return responseLatency('InpatientCreate', async () => {
    try {
      const response = await ApiUtil.postWithToken(`${inpatientApiUrls.createIp}`, data);
      if (response.success) {
        store.dispatch(resetStateItem());
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientGetRoomList = (): Promise<any> => {
  return responseLatency('InpatientGetRoomList', async () => {
    try {
      const response = await ApiUtil.getWithToken(`${inpatientApiUrls.rooms}`);
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getInpatientList = (): Promise<any> => {
  return responseLatency('GetInpatientList', async () => {
    return new Promise((res: any, reject: any) => {
      const selectedPatient: any = store.getState().patients.selectedPatient;
      try {
        syncLocalDatabase(SyncScreen.ipAdmissions, selectedPatient.id ?? undefined, async () => {
          const response = await AdmissionDBHandler.getInstance().fetchDataHandler({
            patient_id: selectedPatient.id,
          });
          if (response.success || response.data) {
            store.dispatch(setInpatientList(response.data.result));
          }
          res(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const inpatientGetById = (inpatientAdmissionId: string): Promise<any> => {
  return responseLatency('InpatientGetById', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${inpatientApiUrls.roomTransferGet}${inpatientAdmissionId}`,
      );
      if (response.success) {
        store.dispatch(setSelectedInpatient(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientRoomTransferUpdate = (
  inpatientAdmissionId: string,
  data: any,
): Promise<any> => {
  return responseLatency('InpatientRoomTransferUpdate', async () => {
    try {
      const response = await ApiUtil.postWithToken(
        `${inpatientApiUrls.roomTransferUpdate}${inpatientAdmissionId}`,
        data,
      );

      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientVitalsCreate = (data: any): Promise<any> => {
  return responseLatency('InpatientVitalsCreate', async () => {
    try {
      const response = await ApiUtil.postWithToken(`${inpatientApiUrls.vitalsCreate}`, data);
      if (response.success) {
        await getInpatientVitals(data.ip_admission_id, { type: 'latest' });
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientInvestigationCreate = (data: any): Promise<any> => {
  return responseLatency('InpatientInvestigationCreate', async () => {
    try {
      const response = await ApiUtil.postWithToken(`${inpatientApiUrls.investigationCreate}`, data);
      if (response.success) {
        await getInpatientList();
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientPrescriptionCreate = (data: any): Promise<any> => {
  return responseLatency('InpatientPrescriptionCreate', async () => {
    try {
      const response = await ApiUtil.postWithToken(`${inpatientApiUrls.prescriptionCreate}`, data);
      if (response.success) {
        await getInpatientList();
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientGetPrescriptions = (inpatientAdmissionId: string): Promise<any> => {
  return responseLatency('InpatientGetPrescriptions', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${inpatientApiUrls.prescription}${inpatientAdmissionId}`,
      );

      if (response.success) {
        store.dispatch(setInpatientPrescriptions(response.data));
      }

      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getAllVitals = (): Promise<any> => {
  return responseLatency('GetAllVitals', async () => {
    try {
      const response = await ApiUtil.getWithToken(`${inpatientApiUrls.vitals}`);

      if (response.success) {
        store.dispatch(setVitals(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getDoctorVitals = (doctorId: string): Promise<any> => {
  return responseLatency('GetDoctorVitals', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${inpatientApiUrls.doctorVitals}?doctor_id=${doctorId}`,
      );

      if (response.success) {
        store.dispatch(setDoctorVitals(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getInpatientVitals = (ipAdmissionId: string, body?: any): Promise<any> => {
  return responseLatency('GetInpatientVitals', async () => {
    return new Promise((res: any, reject: any) => {
      try {
        syncLocalDatabase(SyncScreen.ipVitals, ipAdmissionId ?? undefined, async () => {
          const response = await IpVitalDBHandler.getInstance().fetchDataHandler({
            ipAdmissionId,
            body,
          });
          if (body?.type === 'latest' && (response.success || response.data)) {
            store.dispatch(setInpatientVitals(response.data));
          }
          res(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const inpatientGetInvestigation = (ipAdmissionId: string): Promise<any> => {
  return responseLatency('InpatientGetInvestigation', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${inpatientApiUrls.inpatientInvestigation}${ipAdmissionId}`,
      );
      if (response.success) {
        store.dispatch(setInpatientInvestigation(response.data));
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientCreatePrescription = (data: any): Promise<any> => {
  return responseLatency('InpatientCreatePrescription', async () => {
    try {
      const response = await ApiUtil.postWithToken(`${inpatientApiUrls.prescriptionCreate}`, data);
      if (response.success) {
        await getInpatientList();
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientDeletePrescription = (inpatientPrescriptionId: string): Promise<any> => {
  return responseLatency('InpatientDeletePrescription', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(
        `${inpatientApiUrls.prescriptionDelete}${inpatientPrescriptionId}`,
      );
      if (response.success) {
        await getInpatientList();
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientDeleteInvestigation = (inpatientInvestigationId: string): Promise<any> => {
  return responseLatency('InpatientDeleteInvestigation', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(
        `${inpatientApiUrls.investigationDelete}${inpatientInvestigationId}`,
      );
      if (response.success) {
        await getInpatientList();
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientDelete = (inpatientId: string): Promise<any> => {
  return responseLatency('InpatientDelete', async () => {
    try {
      const response = await ApiUtil.deleteWithToken(
        `${inpatientApiUrls.inpatientDelete}${inpatientId}`,
      );
      if (response.success) {
        await getInpatientList();
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const inpatientGetInvoice = (patientId: string, ipAdmissionId: string): Promise<any> => {
  return responseLatency('InpatientGetInvoice', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${billAndPaymentsApiUrls.getBillandPaymentList}=${patientId}&ip_admission_id=${ipAdmissionId}`,
      );

      if (response.success) {
        store.dispatch(setInpatientInvoice(response.data));
        await getInpatientList();
      }
      return response;
    } catch (error) {
      throw error;
    }
  });
};
