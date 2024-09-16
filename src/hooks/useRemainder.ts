import { useState, useCallback, useEffect } from 'react';
import { getRemainderList, Remainder } from '../service/RemainderService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state';
import { setSelectPatient } from '../state/patients';

type NavigationType = StackNavigationProp<RootStackParamList>;

export const useRemainder = (navigation: NavigationType) => {
  // States for managing UI elements
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [noRemainder, setNoRemainder] = useState(false);
  const [remainderList, setRemainderList] = useState<Record<string, Remainder[]> | undefined>();
  const [filterType, setFilterType] = useState<string>('All');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const { selectedPatient } = useSelector((state: RootState) => state.patients);

  // Fetching reminders
  const fetchReminders = useCallback(async () => {
    if (!selectedPatient) {
      return;
    }

    try {
      const response = await getRemainderList(selectedPatient.id, filterType, startDate, endDate);
      if (response?.data?.length > 0) {
        const groupedItems: Record<string, Remainder[]> = {};
        response.data?.forEach((item: Remainder) => {
          if (!groupedItems[item.symptom_name]) {
            groupedItems[item.symptom_name] = [];
          }
          groupedItems[item.symptom_name].push(item);
        });
        setRemainderList(groupedItems);
        setNoRemainder(false);
      } else {
        setRemainderList(null);
        setNoRemainder(true);
      }
    } catch (error) {
      console.error('Error fetching remainders:', error);
    }
  }, [endDate, filterType, selectedPatient, startDate]);

  // Function to handle patient selection
  const handleSelectPatient = useCallback(
    (patient: any) => {
      dispatch(setSelectPatient(patient));
      fetchReminders();
    },
    [dispatch, fetchReminders],
  );

  // Function to handle navigation actions
  const handleNavigation = useCallback(
    (action: string, params?: any) => {
      switch (action) {
        case 'back':
          navigation.goBack();
          break;
        // case 'details':
        //   navigation.navigate('RemainderDetailsScreen', params);
        //   break;
        // case 'create':
        //   navigation.navigate('CreateRemainderScreen');
        //   break;
        // case 'edit':
        //   navigation.navigate('EditRemainderScreen', params);
        //   break;
        // case 'patientProfile':
        //   navigation.navigate('PatientProfileScreen', params);
        //   break;
        // case 'settings':
        //   navigation.navigate('SettingsScreen');
        //   break;
        // case 'help':
        //   navigation.navigate('HelpScreen');
        //   break;
        // default:
        //   console.warn('Unhandled navigation action:', action);
        //   break;
      }
    },
    [navigation],
  );

  // Function to handle opening and closing modals
  const handleOpenClose = useCallback((modalName: string, state: boolean) => {
    switch (modalName) {
      case 'main':
        setIsOpen(state);
        break;
      case 'select':
        setIsSelectOpen(state);
        break;
      case 'calendar':
        setIsCalendarOpen(state);
        break;
      default:
        break;
    }
  }, []);

  // Effect to fetch reminders when selectedPatient changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchReminders();
    });

    return unsubscribe;
  }, [navigation, selectedPatient, fetchReminders]);

  return {
    isOpen,
    isSelectOpen,
    isCalendarOpen,
    noRemainder,
    remainderList,
    fetchReminders,
    handleOpenClose,
    handleSelectPatient,
    handleNavigation,
    selectedPatient,
    setIsSelectOpen,
    setFilterType,
    setStartDate,
    setEndDate,
    setIsOpen,
  };
};
