// State - Survey
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICompletedQuestion {
  question_id: string;
  question: string;
  answer: any;
}

interface IQuestionItem {
  id: string;
  question_id: string | number;
  parent_question_id?: string;
  question: string;
  data_type: string;
  options?: string;
  maxSize?: number;
}

interface BaseClinical {
  questionList: IQuestionItem[];
  completedQuestions: ICompletedQuestion[];
}

const initialState: BaseClinical = {
  questionList: [],
  completedQuestions: [],
};

const baselineClinicalSlice = createSlice({
  name: 'baselineclinical',
  initialState,
  reducers: {
    resetState: () => initialState,
    setQuestions: (state, { payload }: PayloadAction<IQuestionItem[]>) => {
      state.questionList = payload;
    },
    setCompletedQuestion: (state, { payload }: PayloadAction<ICompletedQuestion>) => {
      const items = [...state.completedQuestions];
      items.push(payload);
      state.completedQuestions = items;
    },
    setCompletedQuestions: (state, { payload }: PayloadAction<ICompletedQuestion[]>) => {
      state.completedQuestions = payload;
    },
    resetCompletedQuestions: (state) => {
      state.completedQuestions = [];
    },
  },
});

export const {
  resetState,
  setCompletedQuestion,
  setCompletedQuestions,
  setQuestions,
  resetCompletedQuestions,
} = baselineClinicalSlice.actions;

export default baselineClinicalSlice.reducer;
