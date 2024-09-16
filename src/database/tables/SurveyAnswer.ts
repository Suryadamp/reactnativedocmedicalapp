/* eslint-disable @typescript-eslint/no-unused-vars */
import { DBHandler, DBSync, LastSyncTime } from '../DBSync';

export class SurveyAnswersDbSync extends DBSync {
  public format(surveyAns: Array<{ [key: string]: any }>): Promise<any> {
    var data: Array<Array<any>> = [];
    for (var ptr in surveyAns) {
      for (var index in surveyAns[ptr]) {
        data.push([surveyAns[ptr].id, surveyAns[ptr].question_id, surveyAns[ptr].answer]);
      }
    }

    return Promise.resolve(data);
  }

  async syncDB(_lastSyncTime: LastSyncTime): Promise<Array<any> | null> {
    /* var payload: DbSyncPostParams = {
      table_name: DBTables.remainders,
      count: lastSyncTime.count,
      date_time: lastSyncTime.time,
      patient_id: lastSyncTime.patient_id,
    };
    var records: any = await this.fetch(payload);
    console.log('records', records.data.reminders.data);
    if (records?.data?.reminders?.data) {
      return await this.format(records.data.reminders.data);
    } */
    return Promise.resolve(null);
  }
}

export class SurveyAnswersDBHandler extends DBHandler {
  private static instance: SurveyAnswersDBHandler;

  protected dbSync: DBSync = new SurveyAnswersDbSync();
  protected tableName: string = 'survey_answers';
  protected columns: { [key: string]: string } = {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    question_id: 'INTEGER',
    answer: 'TEXT',
    user_id: 'TEXT',
  };

  public static getInstance(): SurveyAnswersDBHandler {
    if (!SurveyAnswersDBHandler.instance) {
      SurveyAnswersDBHandler.instance = new SurveyAnswersDBHandler();
    }

    return SurveyAnswersDBHandler.instance;
  }

  public async addNewSurveyAnswers(item: { [key: string]: any }) {
    var record: Array<any> = [item.id, item.question_id, item.answer, item.user_id];
    await this.insertRecord(record);
  }

  public async deleteSurveyAnswers(id: number) {
    await this.deleteRecord([id]);
  }

  public async updateSurveyAnswers(id: string, item: { [key: string]: any }) {
    var record: Array<any> = [item.question_id, item.answer, item.user_id];
    await this.updateRecord(id, record);
  }

  public async fetchDataHandler() {
    const dbResponse: any = await this.getAllRecords();
    var surveyAnswersList: Array<any> = dbResponse.map((row: any) => row);
    return { data: surveyAnswersList };
  }
}
