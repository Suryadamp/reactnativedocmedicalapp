/* eslint-disable react-hooks/exhaustive-deps */
// Survey
import { Image, ScrollView, Text } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';

import { COLORS, assets } from '../../constants';
import { RootStackParamList } from '../../navigation/types';
import { SurveyAnswersDBHandler } from '../../database/tables/SurveyAnswer';

import {
  Box,
  CustomBottomSheet,
  CustomDateBottomSheet,
  AbstractButton,
  AppContainer,
  CustomHeader,
} from '../../components';

import styles from '../../styles/Survey.styles';
import { RootState } from '../../state/rootReducer';
import SurveyQuestionItem from '../../components/SurveyQuestionItem';
import ListSheet from '../../sheets/survey/ListSheet';
import MultiListSheet from '../../sheets/survey/MultiListSheet';
import DateTimeBottomSheet from '../../sheets/Inpatients/DateTimeBottomSheet';
import {
  setCompletedQuestion,
  setCompletedQuestions,
  resetCompletedQuestions,
} from '../../state/survey/baseline_clinical';
import { SvgIcon } from '../../constants/SvgIcon';
import { formatDateBType } from '../../util/DateUtil';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

function getConditionValue(question: any, completedQuestions: any[]) {
  let conditionQuestion = completedQuestions.find(
    (ques) => ques.question_id === question.parent_question_id,
  );

  if (!conditionQuestion) {
    return false;
  } else {
    switch (question.condition_type) {
      case 'equal':
        return `${conditionQuestion.answer}` === question.conditions;
      case 'not_equal':
        return conditionQuestion.answer !== question.conditions;
      case 'greater':
        return Number(conditionQuestion.answer) > Number(question.conditions);
      case 'lesser':
        return conditionQuestion.answer < question.conditions;
      case 'includes_any':
        console.log(
          'question.conditions',
          question.conditions,
          conditionQuestion.answer,
          conditionQuestion.answer.includes(question.conditions),
        );
        return conditionQuestion.answer.includes(question.conditions);
      case 'includes_only':
        return conditionQuestion.answer.includes(question.conditions);
      case 'between':
        const [value1, value2] = question.split(',');
        return value1 < conditionQuestion.answer > value2;
      case 'custom':
        return true;

      default:
        return false;
    }
  }
}

const SummarySection = ({ completedQuestions }: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {completedQuestions.length > 0 &&
        completedQuestions.map((item: any) => (
          <Box style={styles.cardContainer}>
            <Box style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <Box style={styles.iconStyle}>
                <SvgIcon name="SurveyReviewIcon" />
                <Image source={assets.Line} style={styles.separator} />
              </Box>
              <Box style={styles.card}>
                <Box>
                  <Text style={styles.cardTitleStyle}>{item.question}</Text>
                  <Text style={styles.cardInfoStyle}>{item.answer || 'Nil'}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
    </ScrollView>
  );
};

export const Survey = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.users);
  const { questionList, completedQuestions } = useSelector(
    (state: RootState) => state.baselineclinical,
  );
  const [isOpenCalendar, setOpenCalendar] = useState<boolean>(false);
  const [isOpenDateTimePicker, setOpenDateTimePicker] = useState<boolean>(false);
  const [isOpenTimePicker, setOpenTimePicker] = useState<boolean>(false);
  const [isOpenList, setOpenList] = useState<boolean>(false);
  const [isOpenMultiList, setOpenMultiList] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [options, setOptions] = useState([]);
  const [nextLoader, setNextLoader] = useState(false);
  const [prevLoader, setPrevLoader] = useState(false);
  const [question, setQuestion] = useState(questionList ? questionList[0] : null);
  const [answer, setAnswer] = useState<string | number>('');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    getCompletedQuestions();

    return () => {
      dispatch(resetCompletedQuestions());
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setQuestion(questionList ? questionList[0] : null);
    }, []),
  );

  const getCompletedQuestions = async () => {
    const answeredQues = await SurveyAnswersDBHandler.getInstance().fetchDataHandler();
  };

  const handleClickCalendar = (item: any) => {
    setSelectedQuestion(item);
    if (item.data_type === 'datetimepicker') {
      setOpenDateTimePicker(true);
    } else if (item.data_type === 'timepicker') {
      setOpenTimePicker(true);
    } else {
      setOpenCalendar(true);
    }
  };

  const handleClickList = (item: any) => {
    setSelectedQuestion(item);
    setOpenList(true);
    setOptions(item.options.split(','));
  };

  const handleClickMultiList = (item: any) => {
    setSelectedQuestion(item);
    setOpenMultiList(true);
    setOptions(item.options.split(','));
  };

  const handleChangeDate = (value: any) => {
    setOpenCalendar(false);
    setAnswer(formatDateBType(value, 'DD/MM/yyyy'));
  };

  const handleChangeDateTime = (value: any) => {
    setOpenDateTimePicker(false);
    setAnswer(value);
  };

  const handleChangeTime = (date: any) => {
    setOpenTimePicker(false);
    setAnswer(moment(date).format('h:mm:ss A'));
  };

  const handleChangeList = (name: string, value: any) => {
    setOpenList(false);
    setAnswer(value);
  };

  const handleChangeMultiList = (name: string, value: any) => {
    setOpenMultiList(false);
    setAnswer(value);
  };

  const calculateAutomatic = (nextQuestion: any, updatedCompletedQuestion: any[]) => {
    const [question_id1, operator, question_id2] = nextQuestion.conditions.split(',');
    const question1 = updatedCompletedQuestion.find((qus) => question_id1 === `${qus.question_id}`);
    const question2 = updatedCompletedQuestion.find((qus) => question_id2 === `${qus.question_id}`);
    let calculatedAnswer: any = '';
    if (operator == '-') {
      const question1_answer = question1?.answer;
      const question2_answer = question2?.answer;
      const [day1, month1, year1] = question1_answer.split('/');
      const [day2, month2, year2] = question2_answer.split('/');
      const question1_date = new Date(parseInt(year1), parseInt(month1) - 1, parseInt(day1));
      const question2_date = new Date(parseInt(year2), parseInt(month2) - 1, parseInt(day2));
      if (!isNaN(question1_date.getTime()) && !isNaN(question2_date.getTime())) {
        console.log('question1_date', question1_date);
        console.log('question2_date', question2_date);
        // Calculate the difference in milliseconds
        const differenceInMs = Math.abs(question1_date - question2_date);

        // Convert milliseconds to days
        calculatedAnswer = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
      } else {
        calculatedAnswer = question1?.answer - question2?.answer;
      }
    }
    setQuestion(nextQuestion);
    setAnswer(calculatedAnswer);
  };

  const getNextQuestion = (nextQuestion) => {
    if (nextQuestion) {
      if (nextQuestion.parent_question_id || nextQuestion.condition_type) {
        const updatedCompletedQuestion = [...completedQuestions, { ...question, answer }];
        const isShowQuestion = getConditionValue(nextQuestion, updatedCompletedQuestion);
        if (nextQuestion.condition_type == 'automatic') {
          calculateAutomatic(nextQuestion, updatedCompletedQuestion);
        } else if (isShowQuestion) {
          setQuestion(nextQuestion);
          setAnswer('');
        } else {
          const nextQuest = questionList.find(
            (ques) => ques.question_id === nextQuestion.question_id + 1,
          );
          getNextQuestion(nextQuest);
        }
      } else {
        setQuestion(nextQuestion);
        setAnswer('');
      }
    }
  };

  const handleNext = async () => {
    setNextLoader(true);
    const existQuestion = completedQuestions.find(
      (que) => que.question_id === question?.question_id,
    );
    if (existQuestion) {
      dispatch(setCompletedQuestions([...completedQuestions, { ...existQuestion, answer }]));
      await SurveyQuestionsAnswers.update(question?.question_id, answer, userId)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log('Error in Survey insert', error.message);
        });
    } else {
      dispatch(setCompletedQuestion({ ...question, answer }));
      await SurveyAnswersDBHandler.getInstance()
        .addNewSurveyAnswers({
          question_id: question?.question_id,
          answer,
          user_id: userId,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log('Error in Survey insert', error.message);
        });
    }

    const nextQuestion = questionList.find((ques) => ques.question_id === question.question_id + 1);
    if (nextQuestion) {
      getNextQuestion(nextQuestion);
    } else {
      setQuestion(null);
      setAnswer('');
      setIsCompleted(true);
    }
    setNextLoader(false);
  };

  const handlePrevious = async () => {
    setPrevLoader(true);
    if (!question || question.question_id === 1) {
      if (navigation.getState().type === 'drawer') {
        navigation.dispatch(DrawerActions.openDrawer());
      }
    } else {
      const prevQuestion = completedQuestions[completedQuestions.length - 1];
      dispatch(
        setCompletedQuestions(
          completedQuestions.filter((ques) => ques.question_id !== prevQuestion.question_id),
        ),
      );
      setQuestion(prevQuestion);
      setAnswer(prevQuestion.answer);
    }
    setPrevLoader(false);
  };

  const handleChange = (item: any, value: string | number) => {
    setQuestion(item);
    setAnswer(value);
  };

  const handleSubmit = () => {
    dispatch(resetCompletedQuestions());
    navigation.navigate('Dashboard');
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle="dark-content"
        style={styles.container}
      >
        {/* Header & title section */}
        {/* <Box style={styles.header}>
          <Box style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (navigation.getState().type === 'drawer') {
                  navigation.dispatch(DrawerActions.openDrawer());
                }
              }}
            >
              <Image source={assets.HamburgerMenu} style={styles.icon} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.topBarTitle}>Baseline Clinical Data</Text>
            </View>
          </Box>
          {/* <Box style={{ marginVertical: 10 }}>
            <StepIndicator
              customStyles={indicatorsCustomStyles}
              stepCount={3}
              currentPosition={1}
              renderStepIndicator={renderStepIndicator}
              // labels={stepperLabels}
            />
          </Box> */}
        {/* <Box style={styles.divider} /> */}
        {/*  </Box> */}
        <CustomHeader
          leftIcon="menu"
          onLeftIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          title="Baseline Clinical Data"
        />
        {isCompleted && !question && (
          <Box style={styles.summaryContent}>
            <Box style={styles.summaryInfo}>
              <Box alignItems="center">
                <SvgIcon name="SurveySuccessIcon" />
              </Box>
              <Text style={styles.thank}>Grateful for your survey</Text>
              <Text style={styles.info}>
                Your survey responses are prepared for submission. Please review the completed
                survey responses before submitting.
              </Text>
            </Box>
            <Text style={styles.summaryTitle}>Survey Summary</Text>
            <SummarySection completedQuestions={completedQuestions} />
          </Box>
        )}
        {question && (
          <Box style={styles.content}>
            <SurveyQuestionItem
              item={question}
              value={answer}
              onChange={handleChange}
              onClickList={() => handleClickList(question)}
              onClickMultiList={() => handleClickMultiList(question)}
              onClickCalendar={() => handleClickCalendar(question)}
            />
          </Box>
        )}
        {isCompleted && !question ? (
          <Box style={styles.buttonBoxContainer}>
            <AbstractButton
              buttonStyle={[styles.exitBtnStyle, { backgroundColor: COLORS.background.primary }]}
              textStyle={[styles.exitTxtStyle]}
              disabled={completedQuestions.length === 0}
              onPress={handleSubmit}
            >
              Submit & Close
            </AbstractButton>
          </Box>
        ) : (
          <Box style={styles.buttonBoxContainer}>
            <AbstractButton
              loader={prevLoader}
              buttonStyle={styles.previousBtnStyle}
              textStyle={styles.previousTxtStyle}
              disabled={
                completedQuestions.length === 0 || Boolean(question && question.question_id === 1)
              }
              onPress={handlePrevious}
            >
              Previous
            </AbstractButton>
            <AbstractButton
              loader={nextLoader}
              buttonStyle={styles.confirmBtnStyle}
              textStyle={styles.confirmTxtStyle}
              onPress={handleNext}
            >
              {'Next'}
            </AbstractButton>
          </Box>
        )}
      </AppContainer>
      {isOpenDateTimePicker && (
        <CustomBottomSheet
          openBSheet={isOpenDateTimePicker}
          snapPoints={['70%']}
          setSheetState={setOpenDateTimePicker}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={'Pick the date and time'}
        >
          <DateTimeBottomSheet onChange={handleChangeDateTime} />
        </CustomBottomSheet>
      )}
      {isOpenCalendar && (
        <CustomBottomSheet
          openBSheet={isOpenCalendar}
          snapPoints={['65%']}
          setSheetState={setOpenCalendar}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={'Pick the date'}
        >
          <CustomDateBottomSheet handleSelectedFilterType={handleChangeDate} />
        </CustomBottomSheet>
      )}
      {isOpenTimePicker && (
        <DateTimePickerModal
          // date={currentDate.toDate()}
          isVisible={isOpenTimePicker}
          mode="time"
          onConfirm={handleChangeTime}
          onChange={handleChangeTime}
          onCancel={() => setOpenTimePicker(false)}
        />
      )}
      {isOpenList && (
        <CustomBottomSheet
          openBSheet={isOpenList}
          snapPoints={['42%']}
          setSheetState={setOpenList}
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={'Select the options'}
        >
          <ListSheet
            items={options}
            name={selectedQuestion.question_id}
            onChange={handleChangeList}
          />
        </CustomBottomSheet>
      )}
      {isOpenMultiList && (
        <CustomBottomSheet
          openBSheet={isOpenMultiList}
          snapPoints={['42%']}
          setSheetState={setOpenMultiList}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={'Select the options'}
        >
          <MultiListSheet
            items={options}
            name={selectedQuestion.question_id}
            data={answer}
            onChange={handleChangeMultiList}
          />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default Survey;
