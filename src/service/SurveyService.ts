// Survey Service
import store from '../state';
import { setQuestions } from '../state/survey';
import { responseLatency } from './AuthService';
import { SurveyQuizDBHandler } from '../database';
import { SyncScreen, syncLocalDatabase } from '../database/DBSync';

export const getSurveyQuestions = async (): Promise<any> => {
  try {
    await responseLatency('GetSurveyQuestions', async () => {
      await syncLocalDatabase(SyncScreen.surveyQuestions, undefined, async () => {
        const response = await SurveyQuizDBHandler.getInstance().fetchDataHandler(null);
        if (response.data && response.data.length > 0) {
          store.dispatch(setQuestions(response.data));
        }
      });
    });
  } catch (error: any) {
    console.log('ERROR in get survey question:', error.message);
    throw error; // Re-throwing the error for the caller to handle
  }
};
