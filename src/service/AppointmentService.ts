import ApiUtil from '../util/ApiUtil';
import store from '../state';
import { setPurposesList } from '../state/appointments/purposesOfAppointment';
import { setAppointmentList } from '../state/appointments/appointments';
import { apppointmentApiUrls } from '../constants/ApiConstants';
import { AppointmentDBHandler } from '../database';
import { SyncScreen, syncLocalDatabase } from '../database/DBSync';
import { responseLatency } from './AuthService';

interface getListOfAppointmentsParams {
  patient_id?: number | null;
  appoint_date?: string | null;
  start?: number | null;
}

export const getPurposeList = (): Promise<any> => {
  return responseLatency('GetPurposeList', async () => {
    try {
      const response = await ApiUtil.getWithToken(apppointmentApiUrls.purposesList);
      store.dispatch(setPurposesList(response.data));
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getListOfAppointments = async ({
  patient_id,
  appoint_date,
  start = 1,
}: getListOfAppointmentsParams = {}): Promise<any> => {
  return responseLatency('GetListOfAppointments', async () => {
    try {
      return syncLocalDatabase(SyncScreen.appointments, patient_id ?? undefined, async () => {
        const response: any = await AppointmentDBHandler.getInstance().fetchDataHandler({
          patient_id,
          appoint_date,
          start,
        });
        if (start === 1) {
          store.dispatch(setAppointmentList(response));
        }
        return response;
      });

    } catch (error) {
      throw error;
    }
  });
};

export const getCheckAppointments = (
  patient_id: number | undefined,
  doctor_id: number | undefined,
  appoint_date: string | null,
): Promise<any> => {
  return responseLatency('GetCheckAppointments', async () => {
    try {
      const response = await ApiUtil.getWithToken(apppointmentApiUrls.checkApppointment, {
        patient_id,
        doctor_id,
        appoint_date,
      });
      console.log({ response });
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const bookNewAppointment = (data: any): Promise<any> => {
  return responseLatency('BookNewAppointment', async () => {
    try {
      const response = await ApiUtil.postWithToken(apppointmentApiUrls.createApppointment, data);
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getAppointmentSlots = (
  doctor_id: number | undefined,
  appoint_for: number | undefined,
  appoint_date: string | undefined,
): Promise<any> => {
  return responseLatency('GetAppointmentSlots', async () => {
    try {
      const response = await ApiUtil.postWithToken(apppointmentApiUrls.apppointmentSlots, {
        doctor_id,
        appoint_for,
        appoint_date,
      });
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const cancelAppointment = (
  appoint_id: number | undefined,
  status: number | undefined,
  reason?: string | undefined,
): Promise<any> => {
  return responseLatency('CancelAppointment', async () => {
    try {
      const response = await ApiUtil.postWithToken(apppointmentApiUrls.cancelApppointment, {
        appoint_id,
        status,
        reason,
      });
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const getDoctorAvaibleDays = (doctor_id: number | undefined): Promise<any> => {
  return responseLatency('GetDoctorAvaibleDays', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${apppointmentApiUrls.doctorAvailbleDays}/${doctor_id}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const rescheduleAppointment = (reschdule: any | undefined): Promise<any> => {
  return responseLatency('RescheduleAppointment', async () => {
    try {
      const response = await ApiUtil.postWithToken(
        apppointmentApiUrls.appointmentsReschedule,
        reschdule,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const trackStatusAppointment = (appointmentId: string, type: string): Promise<any> => {
  return responseLatency('TrackStatusAppointment', async () => {
    try {
      const response = await ApiUtil.postWithToken(apppointmentApiUrls.appointmentTrackStatus, {
        id: appointmentId,
        type,
      });
      return response;
    } catch (error) {
      throw error;
    }
  });
};

export const validateRoom = (appointmentId: string, roomId: string): Promise<any> => {
  return responseLatency('ValidateRoom', async () => {
    try {
      const response = await ApiUtil.getWithToken(
        `${apppointmentApiUrls.validateRoom}/${appointmentId}/${roomId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  });
};
