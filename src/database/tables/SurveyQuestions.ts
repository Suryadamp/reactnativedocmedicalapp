import { commonApiUrls } from '../../constants/ApiConstants';
import ApiUtil from '../../util/ApiUtil';
import { DBHandler, DBSync, LastSyncTime } from '../DBSync';

export class SurveyQuizDbSync extends DBSync {
  public format(surveyQuiz: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var ptr in surveyQuiz) {
      data.push([
        surveyQuiz[ptr].id,
        surveyQuiz[ptr].question_id,
        surveyQuiz[ptr].data_type,
        surveyQuiz[ptr].question,
        surveyQuiz[ptr].options || null,
        surveyQuiz[ptr].condition_type || null,
        surveyQuiz[ptr].conditions || null,
      ]);
    }
    return Promise.resolve(data);
  }

  async syncDB(lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    var records: any = await ApiUtil.getWithToken(commonApiUrls.surveyQuestions);
    if (records?.data) {
      return await this.format(records.data);
    }
    return Promise.resolve(null);
  }
}

export class SurveyQuizDBHandler extends DBHandler {
  private static instance: SurveyQuizDBHandler;

  protected dbSync: DBSync = new SurveyQuizDbSync();
  protected tableName: string = 'survey_questions';
  protected columns: { [key: string]: string } = {
    // "appointmentId": "INTEGER PRIMARY KEY AUTOINCREMENT",
    id: 'TEXT',
    question_id: 'INTEGER',
    data_type: 'TEXT',
    question: 'TEXT',
    options: 'TEXT',
    condition_type: 'TEXT',
    conditions: 'TEXT',
  };

  public async syncToLocal(): Promise<void> {
    var lastSyncTime = await this.lastSyncTime();
    if (lastSyncTime) {
      await this.truncate();
      var records = await this.dbSync.syncDB(lastSyncTime);
      if (records != null) {
        for (var i in records) {
          this.insertRecord(records[i]);
        }
      }
    }
  }

  public static getInstance(): SurveyQuizDBHandler {
    if (!SurveyQuizDBHandler.instance) {
      SurveyQuizDBHandler.instance = new SurveyQuizDBHandler();
    }

    return SurveyQuizDBHandler.instance;
  }

  public async fetchDataHandler(filter: any) {
    if (this.supportOffline) {
      const dbResponse: any = await this.getAllRecords();
      let surveyQuiz = dbResponse.map((row: any) => row);
      return { data: surveyQuiz };
    } else {
      return await ApiUtil.getWithToken(commonApiUrls.surveyQuestions);
    }
  }
}
