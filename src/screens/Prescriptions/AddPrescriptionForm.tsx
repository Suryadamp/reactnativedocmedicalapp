import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { AbstractButton, AppContainer, Box, CustomHeader } from '../../components';
import { COLORS, SIZES, assets } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { convertDateToString, formatDateBType } from '../../util/DateUtil';
import CustomRadioGroup from '../../components/CustomRadioButton/CustomRadioButton';
import {
  addNewPrescription,
  updatePrescription,
  updatePrescriptionDosage,
  createAppointmentPrescription,
} from '../../service/PrescriptionService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state';
import { PrescriptionSymptoms } from '../../state/prescriptions/prescriptionSymptoms';
import {
  PrescriptionProducts,
  setPrescriptionAction,
} from '../../state/prescriptions/prescriptionProduct';
import {
  Snackbar,
  showErrorSnackBar,
  showSnackBar,
  showSuccessSnackBar,
} from '../../util/AlertUtil';
import { strings } from '../../i18n';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import CustomSelectBottomSheet from '../../components/CustomBottomSheet/CustomSelectBottomSheet';
import CustomDateBottomSheet from '../../components/CustomBottomSheet/CustomDateBottomSheet';
import CustomScheduleBottomSheet from '../../components/CustomBottomSheet/CustomScheduleBottomSheet';
import CustomTimeBottomSheet from '../../components/CustomBottomSheet/CustomTimeBottomSheet';
import CustomAdviceMedicineBottomSheet from '../../components/CustomBottomSheet/CustomAdviceMedicineBottomSheet';
import CustomDeleteReminderBottomSheet from '../../components/CustomBottomSheet/CustomDeleteReminderBottomSheet';
import {
  reminderUpdate as addRemoveReminder,
  reminderUpdate,
} from '../../service/RemainderService';
import styles from '../../styles/Prescription.styles';
import commonStyles from '../../styles/Common.styles';
import { UsePermission } from '../../hooks/usePermissionCheck';
import { permissionList } from '../../constants/ApiConstants';
import { isHpBottomTablet, isHpTablet } from '../../hooks/useDeviceCheck';

interface NavigateProps {
  navigation?: any;
  route?: any;
  header?: string;
}
type Props = NavigateProps;

interface Unit {
  value?: string;
  name: string;
}

const AddPrescriptionForm = ({ navigation, route, header }: Props) => {
  const dispatch = useDispatch();
  const { prescriptionSymptomList } = useSelector(
    (state: RootState) => state.prescriptionSymptomList,
  );
  const { prescriptionProductList, prescriptionAction } = useSelector(
    (state: RootState) => state.prescriptionProductList,
  );
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const appointmentId = route?.params?.appointmentId || '';
  const item = route?.params?.item;
  var reminder = route?.params?.reminder;
  const patient = route?.params?.patient;
  const updatePatientData = route?.params?.item?.selectedItem;
  const from = route?.params?.from || '';
  const patientId = (item?.patient_id ? item?.patient_id : selectedPatient?.id) || patient?.id;
  const prescId = item?.selectedItem?.prescription_id
    ? item?.selectedItem?.prescription_id
    : item?.presc_id
      ? item?.presc_id
      : reminder?.prescription_id;

  const access = reminder
    ? reminder?.access === undefined
      ? true
      : reminder?.access
    : item?.access === undefined
      ? true
      : item?.access;
  const symptom = { id: reminder?.symptom_id, symptom_name: reminder?.symptom_name };
  const medicineDeitals = reminder ? symptom : item?.symtom;

  const renderScheduleLabel = () => {
    return (
      <Text
        style={[styles.scheduleLabel, !isScheduleCollapsed && { color: COLORS.background.primary }]}
      >
        {strings.displayText.schedule}
      </Text>
    );
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isUnitsOpen, setIsUnitsOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isDeleteReminderOpen, setIsDeleteReminderOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isMediAdviceOpen, setIsMediAdviceOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [symptomsItem, setSymptomsItem] = useState<PrescriptionSymptoms | null>(null);
  const [productItem, setProductItem] = useState<PrescriptionProducts | null>(null);
  const [unitsItem, setUnitsItem] = useState<Unit | null>(null);
  const [isScheduleCollapsed, setIsScheduleCollapsed] = useState(true);
  const [selectedScheduleOption, setSelectedScheduleOption] = useState('');
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTitle, setScheduleTitle] = useState<string>('');
  const [scheduleValueResult, setScheduleValueResult] = useState<string>('');
  const [dosage, setDosage] = useState<string>('');
  const [dateSelectType, setDateSelectType] = useState<string>('');
  const [freqResult, setFreqResult] = useState({
    freq: '',
    freq_time: '',
    freq_time_type: '',
  });
  const [schedDataResult, setSchedDataResult] = useState({
    interval_days: '',
    duration_count: '',
    interval: '',
    custom_date: '',
    specific_days: [],
  });

  const Units = commonVariable[0]?.units;
  const times = commonVariable[0]?.dosage_timings;
  const scheduleOptions = commonVariable[0]?.duration_type;
  const [medicineAdvice, setMedicineAdvice] = useState('Medication Advice');
  const [timeSlots, setTimeSlots] = useState(times);
  const [timeSlotsIndex, setTimeSlotsIndex] = useState(0);
  const [isSwitchEnabled, setSwitchEnabled] = useState(reminder?.is_remainder);

  const snapPoints = ['42%'];
  const snapPointsTwo = Platform.OS === 'ios' ? ['70%'] : ['68%'];
  const snapPointsThree = ['50%'];
  const snapPointsFour = ['40%'];
  const snapPointsRemider = ['40%'];

  if (scheduleDate === null || scheduleDate?.length === 0) {
    const dateString = convertDateToString(new Date());
    setScheduleDate(dateString);
  }

  useEffect(() => {
    if (reminder) {
      const symptomData = { id: reminder?.symptom_id, symptom_name: reminder?.symptom_name };
      setSymptomsItem(symptomData);
      const product = { id: reminder?.product_id, name: reminder?.productname };
      setProductItem(product);
      setDosage(reminder?.dosage);
      const unit = { value: reminder?.units, name: reminder?.units };
      setUnitsItem(unit);
      setFreqResult({
        freq: reminder?.freq,
        freq_time: reminder?.freq_time,
        freq_time_type: reminder?.freq_time_type,
      });
      setScheduleDate(reminder?.start_date);
      setSelectedScheduleOption(reminder?.duration_type);
      setSchedDataResult({
        interval_days: reminder?.duration?.interval_days,
        duration_count: reminder?.duration?.duration_count,
        interval: reminder?.duration?.interval,
        custom_date: reminder?.duration?.custom_date,
        specific_days: reminder?.duration?.specific_days,
      });
      const jsonObject = JSON.parse(reminder?.dosage_time);
      const timeList = jsonObject?.map((time: any) => time?.slice(0, 5));
      setTimeSlots(timeList ?? []);
      setSwitchEnabled(reminder?.is_remainder);
    }
  }, [reminder]);

  useEffect(() => {
    if (updatePatientData) {
      const symptomList = {
        id: updatePatientData?.symptom?.id ?? '',
        symptom_name: updatePatientData?.symptom?.symptom_name ?? '',
      };
      setSymptomsItem(symptomList);
      const product = {
        id: updatePatientData?.product?.id ?? '',
        name: updatePatientData?.product?.name ?? '',
      };
      setProductItem(product);
      setDosage(updatePatientData?.dosage);
      const unit = {
        // value: updatePatientData?.units?.id ?? '',
        name: updatePatientData?.units ?? '',
      };
      setUnitsItem(unit);
      setFreqResult({
        freq: updatePatientData?.freq ?? '',
        freq_time: updatePatientData?.freq_time ?? '',
        freq_time_type: updatePatientData?.freq_time_type ?? '',
      });
      setMedicineAdvice(updatePatientData?.freq ?? 'Medice Advice');
      setScheduleDate(updatePatientData?.start_date);
      setSelectedScheduleOption(updatePatientData?.duration_type);
      setSchedDataResult({
        interval_days: updatePatientData?.interval_days ?? '',
        duration_count: updatePatientData?.duration_count ?? '',
        interval: updatePatientData?.interval ?? '',
        custom_date: updatePatientData?.custom_date ?? '',
        specific_days: updatePatientData?.specific_days ?? '',
      });

      const timeList = updatePatientData?.dosage_time?.map((time: any) => time?.slice(0, 5));
      setTimeSlots(timeList ?? []);
    } else {
      setScheduleDate(formattedDate);
    }
  }, [updatePatientData]);

  useEffect(() => {
    return () => {
      setSymptomsItem(null);
      setProductItem(null);
      setDosage('');
      setUnitsItem(null);
      setMedicineAdvice('');
      setSelectedScheduleOption('');
    };
  }, []);

  const addReminderCall = async () => {
    await reminderUpdate(isSwitchEnabled, reminder?.prescription_id, reminder?.id)
      .then((resp) => {
        if (resp) {
          if (resp?.success === true) {
            showSuccessSnackBar(strings.displayText.success);
          } else {
            showErrorSnackBar(strings.displayText.service_error);
          }
        } else {
          showErrorSnackBar(strings.displayText.service_error);
        }
      })
      .catch((_err: any) => {
        showErrorSnackBar(strings.displayText.service_error);
      });
  };

  const handleSwitch = () => {
    if (isSwitchEnabled === 1) {
      reminder.is_remainder = 0;
      setSwitchEnabled(0);
    } else {
      reminder.is_remainder = 1;
      setSwitchEnabled(1);
    }
    addReminderCall();
  };

  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);

  // BottomSheet Callbacks
  const handleClosePress = useCallback(() => {
    setIsOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleReminderClosePress = useCallback(() => {
    setIsDeleteReminderOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleProductClosePress = useCallback(() => {
    setIsProductOpen(false);
    sheetRef.current?.close();
  }, []);
  const handleUnitsClosePress = useCallback(() => {
    setIsUnitsOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleDateClosePress = useCallback(() => {
    setIsDateOpen(false);
    sheetRef.current?.close();
    setDateSelectType('');
  }, []);

  const handleScheduleClosePress = useCallback(() => {
    setIsScheduleOpen(false);
    // handleCloseAndRemoveData();
    sheetRef.current?.close();
  }, []);

  const handleTimeClosePress = useCallback(() => {
    setIsTimeOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleMediAdviceClosePress = useCallback(() => {
    setIsMediAdviceOpen(false);
    sheetRef.current?.close();
  }, []);

  const toggleCollapsible = () => {
    setIsScheduleCollapsed(!isScheduleCollapsed);
  };

  const hanldeDeleteReminderOpen = () => {
    setIsDeleteReminderOpen(true);
  };

  const formatText = (text: string) => {
    // Remove existing hyphens and then insert hyphens between letters
    const formatted = text.replace(/-/g, '').split('').join('-');
    return formatted?.slice(0, 7);
  };

  const handleDurationChange = (value: React.SetStateAction<string>) => {
    setSelectedScheduleOption(value);
    setScheduleValueResult('');

    if (value === 'everyday') {
      setScheduleTitle('Select Days');
      setIsScheduleOpen(true);
    } else if (value === 'specific_days') {
      setScheduleTitle('Specific Days');
      setIsScheduleOpen(true);
    } else if (value === 'interval_days') {
      setScheduleTitle('Interval Days');
      setIsScheduleOpen(true);
    } else if (value === 'custom_date') {
      setDateSelectType('Custom date');
      setIsDateOpen(true);
    } else if (value === 'forever') {
      setSchedDataResult({
        interval_days: '',
        duration_count: '',
        interval: '',
        custom_date: '',
        specific_days: [],
      });
    }
  };

  const handleFreqCallback = (result: any) => {
    setMedicineAdvice(result.freq);
    setFreqResult({
      freq: result.freq,
      freq_time: result.freq_time?.label,
      freq_time_type: result.freq_time_type,
    });
  };

  const handleDosageTextChange = (text: string) => {
    const formatted = formatText(text);
    setDosage(formatted);
    const dosageArray = formatted?.split('-').map(Number);

    // Filter out the time slots where the corresponding value in dosageArray is not equal to 0
    const resultTimeSlots = formatted
      ? times?.filter((_, index) => dosageArray[index] >= 1 && dosageArray[index] <= 9)
      : times;
    setTimeSlots(resultTimeSlots);
  };

  const handleSelectedSymptomType = (selectedData: any) => {
    setSymptomsItem(selectedData);
  };
  const handleSelectedProductType = (selectedData: any) => {
    setProductItem(selectedData);
  };
  const handleSelectedUnitsType = (selectedData: any) => {
    setUnitsItem(selectedData);
  };
  const handleSelectedDate = (dateString: any) => {
    if (dateSelectType === 'Start Date') {
      setScheduleDate(dateString);
    } else {
      setScheduleValueResult(dateString);
      // setCustomDate(dateString);
      setSchedDataResult({
        interval_days: '',
        duration_count: '',
        interval: '',
        custom_date: dateString,
        specific_days: [],
      });
    }
  };

  const handleSelectedData = (selectedData: any) => {
    if (selectedData.value === '') {
      setSelectedScheduleOption('');
    }
    setScheduleValueResult(selectedData.value);
    setSchedDataResult({
      interval_days: selectedData?.data?.interval_days,
      duration_count: selectedData?.data?.duration_count?.label,
      interval: selectedData?.data?.interval?.label,
      custom_date: '',
      specific_days: selectedData?.data?.specific_days,
    });
  };

  const handleDeleteReminder = async () => {
    await addRemoveReminder(0, reminder?.prescription_id, reminder?.id)
      .then((resp) => {
        if (resp) {
          if (resp?.success === true) {
            handleBack();
            showSuccessSnackBar(strings.displayText.reminder_success);
          } else {
            showErrorSnackBar(strings.displayText.service_error);
          }
        } else {
          showErrorSnackBar(strings.displayText.service_error);
        }
      })
      .catch((_err) => {
        showErrorSnackBar(strings.displayText.service_error);
      });
  };

  // NextScreen
  const handleBack = () => {
    // if (reminder) {
    //   route?.params?.onGoBack(reminder);
    // } else {
    if (route?.params?.from === 'AdminAppointment') {
      navigation.navigate('PrescriptionList', { from: 'AdminAppointment' });
    } else {
      navigation.goBack();
    }
    // }
  };

  const handleStateRemove = () => {
    setSymptomsItem(undefined);
    setProductItem(undefined);
    setUnitsItem(undefined);
    setDosage('');
    setSelectedScheduleOption('');
    setFreqResult({
      freq: '',
      freq_time: '',
      freq_time_type: '',
    });
    setSchedDataResult({
      interval_days: '',
      duration_count: '',
      interval: '',
      custom_date: '',
      specific_days: [],
    });
  };

  const handleTimeSlotPress = (index: number, timeSlot: any) => {
    console.log('timeSlot', timeSlot);
    setIsTimeOpen(true);
    setTimeSlotsIndex(index);
  };

  const handleSelectedTimeData = (selectedData: any) => {
    // Update the value for the pressed time slot
    const updatedTimeSlots = [...timeSlots];
    // For demonstration purposes, I'm updating the time slot to "Selected"
    updatedTimeSlots[timeSlotsIndex] = selectedData?.value;
    setTimeSlots(updatedTimeSlots);
    setTimeSlotsIndex(0);
  };

  const convertTo12HourFormat = (time: string): string => {
    // Check if the time is already in "12:00 AM/PM" format
    if (time.includes('AM') || time.includes('PM')) {
      return time;
    }

    // Convert 24-hour format to 12-hour format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12; // 0 should be converted to 12
    return `${adjustedHour}:${minutes} ${period}`;
  };

  const handleAddMedicine = () => {
    const fields = {
      symptoms: !(symptomsItem?.id || medicineDeitals?.id) && 'Symptoms Name',
      product: !productItem && 'Medicine Name',
      dosage: !dosage && 'Dosage',
      units: !unitsItem && 'Units',
      timeSlots: !timeSlots && 'Time Slots',
      scheduleOption: !selectedScheduleOption && 'Schedule',
    };
    const missingField = Object.entries(fields).find(([_, message]) => message);
    if (missingField) {
      showErrorSnackBar(`Please enter ${missingField[1]}.`);
      return;
    }

    setLoader(true);
    if (prescId) {
      if (!access) {
        const newData = {
          // id: null,
          // patient_id: patientId,
          // prescription_product_id: item?.selectedItem?.id,
          dosage_time: timeSlots,
        };
        updatePrescriptionDosage(item?.selectedItem?.id, newData)
          .then((res) => {
            if (res?.message === 'Success') {
              dispatch(setPrescriptionAction(!prescriptionAction));
              if (from === 'RemainderList') {
                navigation.navigate('Reminders', {
                  screen: 'Reminders',
                });
              } else {
                navigation.navigate('Prescriptions', {
                  screen: 'Prescriptions',
                });
              }
              handleStateRemove();
            }
            setLoader(false);
            showSuccessSnackBar(res?.message);
          })
          .catch((err) => {
            setLoader(false);
            showErrorSnackBar(err);
          });
      } else {
        const newData = {
          // id: null,
          // patient_id: patientId,
          prescription_product_id: reminder ? reminder.id : item?.selectedItem?.id,
          symptom_id: medicineDeitals ? medicineDeitals?.id : symptomsItem?.id,
          product_id: productItem?.id,
          dosage: dosage,
          units: unitsItem?.name,
          freq: freqResult.freq,
          freq_time: freqResult.freq_time,
          freq_time_type: freqResult.freq_time_type,
          start_date: scheduleDate,
          duration_type: selectedScheduleOption,
          duration: schedDataResult,
          dosage_time: timeSlots,
        };
        updatePrescription(prescId, newData)
          .then((res) => {
            if (res?.data) {
              dispatch(setPrescriptionAction(!prescriptionAction));
              if (reminder) {
                handleBack();
              } else {
                navigation.navigate('Prescriptions', {
                  screen: 'Prescriptions',
                });
              }
            }
            setLoader(false);
            showSuccessSnackBar(res?.message);
          })
          .catch((err) => {
            setLoader(false);
            showErrorSnackBar(err);
          });
      }
    } else {
      const newData = {
        // id: null,
        patient_id: patientId,
        // presc_id: presc_id ?? null,
        symptom_id: medicineDeitals ? medicineDeitals?.id : symptomsItem?.id,
        product_id: productItem?.id,
        dosage: dosage,
        units: unitsItem?.name,
        freq: freqResult.freq,
        freq_time: freqResult.freq_time,
        freq_time_type: freqResult.freq_time_type,
        start_date: scheduleDate,
        duration_type: selectedScheduleOption,
        duration: schedDataResult,
        dosage_time: timeSlots,
      };
      addNewPrescription(newData)
        .then((res) => {
          console.log('res', res);
          if (res?.data) {
            dispatch(setPrescriptionAction(!prescriptionAction));
            if (from === 'RemainderList') {
              navigation.navigate('Reminders');
            } else if (appointmentId) {
              navigation.navigate('Prescriptions', {
                appointmentId,
              });
            } else {
              navigation.navigate('Prescriptions', {
                screen: 'Prescriptions',
              });
            }
          }
          setLoader(false);
          showSuccessSnackBar('Prescription created successfully.');
        })
        .catch((err) => {
          setLoader(false);
          showErrorSnackBar(err);
        });
    }
  };
  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon="arrow-left"
        hasDivider
        title={
          reminder
            ? strings.displayText.edit_reminder
            : header
              ? header
              : updatePatientData
                ? strings.displayText.editMedicine
                : strings.displayText.addMedicine
        }
        rightIcon={reminder ? 'Save' : ''}
        rightIconType={reminder ? 'text' : ''}
        permission={UsePermission(permissionList.mobilePrescriptionAdd)}
        onLeftIconPress={handleBack}
        onRightIconPress={handleAddMedicine}
      />
      {/* <Box style={styles.addPrescriptionHeader}>
        <Box style={styles.addPrescriptionTopBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ padding: 1 }}
            onPress={() => {
              handleBack();
            }}
          >
            <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>
            {reminder
              ? strings.displayText.edit_reminder
              : header
                ? header
                : updatePatientData
                  ? strings.displayText.editMedicine
                  : strings.displayText.addMedicine}
          </Text>
          <Box>
            {reminder ? (
              <TouchableOpacity onPress={handleAddMedicine}>
                <Text style={styles.saveText}>save</Text>
              </TouchableOpacity>
            ) : null}
          </Box>
        </Box>
      </Box> */}
      {/* <Box marginTop={5} style={styles.divider} /> */}
      <ScrollView>
        <Box alignItems="center" marginTop={20}>
          {reminder && (
            <Box
              width={SIZES.screenWidth - 56}
              flexDirection="row"
              justifyContent="space-between"
              marginBottom={20}
            >
              <Text style={styles.reminderText}>{strings.displayText.reminder}</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                hitSlop={{ left: 70, right: 50, top: 10, bottom: 15 }}
                onPress={() => {
                  handleSwitch();
                }}
              >
                {isSwitchEnabled === 1 && (
                  <Image source={assets.SwitchEnabled} style={{ height: 20, width: 34 }} />
                )}
                {isSwitchEnabled === 0 && (
                  <Image source={assets.SwitchDisabled} style={{ height: 20, width: 34 }} />
                )}
              </TouchableOpacity>
            </Box>
          )}
          <Box width={SIZES.screenWidth * 0.9}>
            <TouchableOpacity
              onPress={() => setIsOpen(true)}
              disabled={!!medicineDeitals?.symptom_name || !access}
            >
              <TextInput
                label={strings.displayText.symptomName}
                mode="outlined"
                placeholderTextColor={COLORS.gray}
                placeholder={strings.displayText.search}
                style={styles.inputTxtStyle}
                value={
                  medicineDeitals
                    ? medicineDeitals?.symptom_name
                    : symptomsItem
                      ? symptomsItem?.symptom_name
                      : ''
                }
                disabled={!!medicineDeitals?.symptom_name || !access}
                editable={false}
                outlineColor={COLORS.shade_of_gray_D6D6D6}
                activeOutlineColor={COLORS.background.primary}
                onPressIn={() => setIsOpen(true)}
                // Add an icon at the end of the TextInput
                right={
                  <TextInput.Icon
                    style={styles.iconStyle}
                    iconColor={COLORS.black}
                    disabled={true}
                    icon="chevron-down"
                  />
                }
                theme={{
                  colors: {
                    primary: COLORS.gray,
                    underlineColor: 'transparent',
                    background: COLORS.background.secondary,
                  },
                  roundness: SIZES.padding * 0.9,
                }}
              />
            </TouchableOpacity>
          </Box>
          <Box width={SIZES.screenWidth * 0.9} marginTop={styles.addPreMarginTop.height}>
            <TouchableOpacity onPress={() => setIsProductOpen(true)} disabled={!access}>
              <TextInput
                label={strings.displayText.medicineName}
                mode="outlined"
                placeholderTextColor={COLORS.gray}
                placeholder={strings.displayText.search}
                style={styles.inputTxtStyle}
                value={productItem ? productItem?.name : ''}
                editable={false}
                outlineColor={COLORS.shade_of_gray_D6D6D6}
                activeOutlineColor={COLORS.background.primary}
                onPressIn={() => setIsProductOpen(true)}
                disabled={!access}
                // Add an icon at the end of the TextInput
                right={
                  <TextInput.Icon
                    style={styles.iconStyle}
                    iconColor={COLORS.black}
                    disabled={true}
                    icon="chevron-down"
                    onPress={() => setIsProductOpen(true)}
                  />
                }
                theme={{
                  colors: {
                    primary: COLORS.gray,
                    underlineColor: 'transparent',
                    background: COLORS.background.secondary,
                  },
                  roundness: SIZES.padding * 0.9,
                }}
              />
            </TouchableOpacity>
          </Box>
          {/* </TouchableOpacity> */}
          {/* <Box width={SIZES.screenWidth - 36} > */}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width={SIZES.screenWidth * 0.9}
            marginTop={styles.addPreMarginTop.height}
          >
            <Box width={SIZES.screenWidth * 0.25}>
              <TextInput
                label={strings.displayText.dosage}
                mode="outlined"
                placeholderTextColor={'grey'}
                placeholder={'0-0-0-0'}
                style={styles.dosageInputTxt}
                underlineColorAndroid="transparent"
                outlineColor={COLORS.shade_of_gray_D6D6D6}
                activeOutlineColor={COLORS.background.primary}
                value={dosage}
                disabled={!access}
                onChangeText={(text) => handleDosageTextChange(text)}
                outlineStyle={{ borderWidth: 1 }}
                keyboardType="numeric"
                maxLength={7}
                theme={{
                  colors: {
                    primary: COLORS.gray,
                    underlineColor: 'transparent',
                    background: COLORS.background.secondary,
                  },
                  roundness: SIZES.padding * 0.9,
                }}
              />
            </Box>
            <Box>
              <TouchableOpacity onPress={() => setIsUnitsOpen(true)} disabled={!access}>
                <TextInput
                  label={strings.displayText.units}
                  mode="outlined"
                  placeholderTextColor={COLORS.gray}
                  placeholder={strings.displayText.search}
                  style={styles.unitInputTxt}
                  value={unitsItem ? unitsItem?.name : ''}
                  editable={false}
                  outlineColor={COLORS.shade_of_gray_D6D6D6}
                  activeOutlineColor={COLORS.background.primary}
                  disabled={!access}
                  onPressIn={() => setIsUnitsOpen(true)}
                  // Add an icon at the end of the TextInput
                  right={
                    <TextInput.Icon
                      style={styles.iconStyle}
                      iconColor={COLORS.black}
                      disabled={true}
                      icon="chevron-down"
                    />
                  }
                  theme={{
                    colors: {
                      primary: COLORS.gray,
                      underlineColor: 'transparent',
                      background: COLORS.background.secondary,
                    },
                    roundness: SIZES.padding * 0.9,
                  }}
                />
              </TouchableOpacity>
            </Box>
            {/* </TouchableOpacity> */}
          </Box>
        </Box>
        {/* </Box> */}
        <Box
          display="flex"
          flexDirection="row"
          marginHorizontal={styles.addPreMarginHr.height}
          marginTop={styles.addPreMarginTop.height}
        >
          {timeSlots?.map((timeSlot, index) => (
            <TouchableOpacity key={index} onPress={() => handleTimeSlotPress(index, timeSlot)}>
              <Box style={styles.timeSlotsBoxStyle}>
                <Text style={styles.timeSlotTextStyle}>{convertTo12HourFormat(timeSlot)}</Text>
              </Box>
            </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={() => setIsMediAdviceOpen(true)} disabled={!access}>
            <Box
              style={[
                styles.medicineAdviceBoxStyle,
                {
                  borderColor:
                    medicineAdvice === 'Before Food' ||
                    medicineAdvice === 'with Food' ||
                    medicineAdvice === 'After Food'
                      ? COLORS.background.primary
                      : COLORS.white_smoke,
                },
              ]}
            >
              <Text
                style={[
                  styles.medicineAdviceTextStyle,
                  {
                    color:
                      medicineAdvice === 'Before Food' ||
                      medicineAdvice === 'with Food' ||
                      medicineAdvice === 'After Food'
                        ? COLORS.background.primary
                        : COLORS.text,
                  },
                ]}
              >
                {medicineAdvice}
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box alignItems="center">
          {isScheduleCollapsed ? (
            <TouchableOpacity
              onPress={() => {
                toggleCollapsible();
              }}
              disabled={!access}
              activeOpacity={0.8}
              style={styles.marginTopStyle}
            >
              <TextInput
                // label={strings.displayText.schedule}
                mode="outlined"
                placeholder={strings.displayText.selectSchedule}
                editable={false}
                value={
                  selectedScheduleOption
                    ? selectedScheduleOption
                    : strings.displayText.select_schedule
                }
                // textColor="grey"
                placeholderTextColor={COLORS.gray}
                style={styles.scheduleInputTxt}
                outlineColor={COLORS.shade_of_gray_D6D6D6}
                activeOutlineColor={COLORS.background.primary}
                onPressIn={() => {
                  toggleCollapsible();
                }}
                disabled={!access}
                right={
                  <TextInput.Icon
                    disabled={true}
                    style={styles.iconStyle}
                    iconColor={COLORS.black}
                    icon="chevron-down"
                    onPress={() => {
                      if (access) {
                        toggleCollapsible();
                      }
                    }}
                  />
                }
                onPressIn={() => {
                  if (access) {
                    toggleCollapsible();
                  }
                }}
                theme={{
                  colors: {
                    primary: COLORS.gray,
                    underlineColor: 'transparent',
                    background: COLORS.background.secondary,
                  },
                  roundness: SIZES.padding * 0.9,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                toggleCollapsible();
              }}
              activeOpacity={0.8}
              // style={styles.marginTopBoxStyle}
            >
              <Box width={SIZES.screenWidth * 0.9} style={styles.marginTopStyle}>
                {renderScheduleLabel()}
                <Box style={styles.collapsedViewContainer}>
                  <Box style={styles.dateContainer}>
                    <Box style={styles.dateView}>
                      <Text style={styles.collapsedViewText}>{strings.displayText.startDate}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setDateSelectType('Start Date');
                          setIsDateOpen(true);
                        }}
                        hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
                        activeOpacity={0.8}
                      >
                        <Box style={styles.startDateContainer}>
                          <Text style={styles.dateText}>
                            {formatDateBType(scheduleDate, 'DD/MM/yyyy')}
                          </Text>
                        </Box>
                      </TouchableOpacity>
                    </Box>
                    <Icon
                      name="chevron-up"
                      size={23}
                      color="#8A8A8A"
                      style={styles.chevrenIconStyle}
                    />
                  </Box>
                  <Text style={styles.durationStyle}>{strings.displayText.duration}</Text>
                  <CustomRadioGroup
                    options={scheduleOptions}
                    selectedOption={selectedScheduleOption}
                    onSelect={handleDurationChange}
                    result={scheduleValueResult}
                  />
                </Box>
              </Box>
            </TouchableOpacity>
          )}
        </Box>
      </ScrollView>

      <Box style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={reminder ? hanldeDeleteReminderOpen : handleAddMedicine}
          loader={loader}
          disabled={reminder && !UsePermission(permissionList.mobileReminderDelete)}
          buttonStyle={[
            styles.addBtnStyle,
            { backgroundColor: reminder ? COLORS.red_FF434F : COLORS.background.primary },
          ]}
          textStyle={styles.applyTxtStyle}
        >
          {reminder
            ? strings.displayText.delete_reminder
            : updatePatientData
              ? strings.displayText.updatePrescription
              : strings.displayText.createPrescription}
        </AbstractButton>
      </Box>

      {isOpen && (
        <CustomBottomSheet
          openBSheet={isOpen}
          snapPoints={snapPoints}
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.selectSymptoms}
        >
          <CustomSelectBottomSheet
            type={strings.displayText.selectSymptoms}
            selectOptions={prescriptionSymptomList}
            handleSelectedFilterType={handleSelectedSymptomType}
            handleClosePress={handleClosePress}
          />
        </CustomBottomSheet>
      )}
      {isProductOpen && (
        <CustomBottomSheet
          openBSheet={isProductOpen}
          snapPoints={snapPoints}
          setSheetState={setIsProductOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.selectMedicine}
        >
          <CustomSelectBottomSheet
            type={strings.displayText.selectMedicine}
            selectOptions={prescriptionProductList}
            handleSelectedFilterType={handleSelectedProductType}
            handleClosePress={handleProductClosePress}
          />
        </CustomBottomSheet>
      )}
      {isUnitsOpen && (
        <CustomBottomSheet
          openBSheet={isUnitsOpen}
          snapPoints={['42%']}
          setSheetState={setIsUnitsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.selectUnits}
        >
          <CustomSelectBottomSheet
            type={strings.displayText.selectUnits}
            selectOptions={Units}
            handleSelectedFilterType={handleSelectedUnitsType}
            handleClosePress={handleUnitsClosePress}
          />
        </CustomBottomSheet>
      )}
      {isDateOpen && (
        <CustomBottomSheet
          openBSheet={isDateOpen}
          snapPoints={snapPointsTwo}
          setSheetState={setIsDateOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={
            dateSelectType === 'Start Date'
              ? strings.displayText.selectDates
              : strings.displayText.customDate
          }
        >
          <CustomDateBottomSheet
            handleSelectedFilterType={handleSelectedDate}
            handleClosePress={handleDateClosePress}
          />
        </CustomBottomSheet>
      )}
      {isTimeOpen && (
        <CustomBottomSheet
          openBSheet={isTimeOpen}
          snapPoints={snapPointsFour}
          setSheetState={setIsTimeOpen}
          enablePanDownToClose={true}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.setTime}
        >
          <CustomTimeBottomSheet
            value={timeSlots[timeSlotsIndex]}
            handleSelectedFilterType={handleSelectedTimeData}
            handleClosePress={handleTimeClosePress}
          />
        </CustomBottomSheet>
      )}
      {isMediAdviceOpen && (
        <CustomBottomSheet
          openBSheet={isMediAdviceOpen}
          // snapPoints={[Platform.OS === 'ios' ? '50%' : `${isHpBottomTablet(6.8, 2)}`]}
          snapPoints={['50%']}
          setSheetState={setIsMediAdviceOpen}
          enablePanDownToClose={true}
          enableDynamicSizing
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.medicationAdvice}
        >
          <CustomAdviceMedicineBottomSheet
            type={strings.displayText.medicationAdvice}
            handleSelectedFilterType={handleFreqCallback}
            handleClosePress={handleMediAdviceClosePress}
          />
        </CustomBottomSheet>
      )}
      {isScheduleOpen && (
        <CustomBottomSheet
          openBSheet={isScheduleOpen}
          snapPoints={scheduleTitle === 'Select Days' ? snapPointsFour : snapPointsThree}
          setSheetState={setIsScheduleOpen}
          enablePanDownToClose={true}
          backgroundStyle={styles.backgroundStyle}
          title={scheduleTitle}
        >
          <CustomScheduleBottomSheet
            type={scheduleTitle}
            handleSelectedFilterType={handleSelectedData}
            handleClosePress={handleScheduleClosePress}
          />
        </CustomBottomSheet>
      )}
      {isDeleteReminderOpen && (
        <CustomBottomSheet
          openBSheet={isDeleteReminderOpen}
          snapPoints={snapPointsRemider}
          setSheetState={setIsDeleteReminderOpen}
          enablePanDownToClose={true}
          backgroundStyle={styles.backgroundStyle}
        >
          <CustomDeleteReminderBottomSheet
            handleDelete={handleDeleteReminder}
            handleClosePress={handleReminderClosePress}
          />
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default AddPrescriptionForm;
