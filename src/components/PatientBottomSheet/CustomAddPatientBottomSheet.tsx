import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { AbstractButton, Box } from '..';
import { COLORS, SIZES } from '../../constants';
import { strings } from '../../i18n';
import CustomRadioGroup from '../CustomRadioButton/CustomRadioButton';
import { RootState } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import CustomBottomSheet from '../CustomBottomSheet';
import CustomDateBottomSheet from '../CustomBottomSheet/CustomDateBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomSelectBottomSheet from '../CustomBottomSheet/CustomSelectBottomSheet';
import { showErrorSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import { setTempPatientList } from '../../state/patients';
import { PatientDBHandler } from '../../database';
import styles from '../../styles/component_styles/PatientBottomSheet.styles';
import { formatDateBType } from '../../util/DateUtil';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';
import { Platform, TouchableOpacity, Keyboard } from 'react-native';
import { UIBottomSheet } from './BottomSheet';

interface ICommonOption {
  id: string;
  value: string;
}

interface IPatientForm {
  title: ICommonOption | {};
  age: string;
  mobile: string;
  address: string;
  patientsMobile: string;
  patientsEmail: string;
  dateOfBirth: string;
  patientsFullName: string;
  scheduleOptions: string[];
  loader: boolean;
  bloodGroup: ICommonOption;
  selectedScheduleOption: string;
  setSelectedScheduleOption: (data: string) => void;
  setIsTitleOpen: (data: boolean) => void;
  setTitle: (data: string) => void;
  setIsDateOpen: (data: boolean) => void;
  setIsBloodOpen: (data: boolean) => void;
  setDateOfBirth: (data: string) => void;
  setPatientsEmail: (data: string) => void;
  setBloodGroup: (data: string) => void;
  setAge: (data: string) => void;
  setAddress: (data: string) => void;
  setPatientsMobile: (data: string) => void;
  setPatientsFullName: (data: string) => void;
  handleConfirm: () => void;
}

const PatientForm = ({
  sheetRef,
  title,
  mobile,
  age,
  address,
  patientsMobile,
  patientsEmail,
  dateOfBirth,
  patientsFullName,
  scheduleOptions,
  loader,
  bloodGroup,
  selectedScheduleOption,
  setSelectedScheduleOption,
  setIsTitleOpen,
  setTitle,
  setIsDateOpen,
  setDateOfBirth,
  setPatientsEmail,
  setBloodGroup,
  setAge,
  setAddress,
  setPatientsMobile,
  setPatientsFullName,
  handleConfirm,
  setIsBloodOpen,
}: IPatientForm) => {
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (sheetRef && sheetRef.current) {
        sheetRef.current.collapse();
      }
    });

    // Clean up listeners
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  /* bottomsheet keyboard start */
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  const handleOnFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = Platform.OS === 'ios';
  }, [shouldHandleKeyboardEvents]);

  const handleOnBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);

  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);
  /* bottomsheet keyboard end */

  const handleDurationChange = (value: any) => {
    setSelectedScheduleOption(value);
  };

  const handleSubmit = () => {
    sheetRef.current.collapse();
  };

  const themeColors = {
    primary: COLORS.black,
    underlineColor: 'transparent',
    background: COLORS.background.secondary,
  };

  return (
    <Box style={styles.container}>
      <Box height={'100%'}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsTitleOpen(true);
            }}
          >
            <TextInput
              label={'Title'}
              mode="outlined"
              value={title?.value}
              placeholderTextColor={COLORS.gray}
              style={styles.mrsInputTxtStyle}
              outlineColor={COLORS.shade_of_gray_D6D6D6}
              activeOutlineColor={COLORS.background.primary}
              editable={false}
              onChangeText={(_value) => {
                setTitle(_value);
              }}
              onPressIn={() => {
                setIsTitleOpen(true);
              }}
              theme={{
                colors: themeColors,
                roundness: SIZES.padding * 0.8,
              }}
              right={
                <TextInput.Icon
                  iconColor={COLORS.black}
                  disabled={true}
                  size={styles.iconSize.height}
                  icon="chevron-down"
                />
              }
            />
          </TouchableOpacity>
          <TextInput
            label={`${strings.displayText.fullName}*`}
            mode="outlined"
            value={patientsFullName}
            placeholderTextColor={COLORS.gray}
            style={styles.nameInputTxtStyle}
            outlineStyle={{ borderWidth: 1 }}
            outlineColor={COLORS.shade_of_gray_D6D6D6}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(_value) => {
              setPatientsFullName(_value);
            }}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onSubmitEditing={handleSubmit}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
          />
        </Box>
        <TextInput
          label={`${strings.displayText.mobile}*`}
          mode="outlined"
          placeholderTextColor={COLORS.gray}
          style={styles.inputTxtStyle}
          value={mobile}
          keyboardType="numeric"
          outlineColor={COLORS.shade_of_gray_D6D6D6}
          activeOutlineColor={COLORS.background.primary}
          // onChangeText={(_value) => {
          //   setMobile(_value);
          // }}
          disabled={true}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />

        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsDateOpen(true);
            }}
          >
            <TextInput
              label={'Date of Birth'}
              mode="outlined"
              value={dateOfBirth}
              placeholderTextColor={COLORS.gray}
              style={styles.birthInputTxtStyle}
              outlineColor={COLORS.shade_of_gray_D6D6D6}
              activeOutlineColor={COLORS.background.primary}
              onChangeText={(_value) => {
                setDateOfBirth(_value);
              }}
              onPressIn={() => {
                setIsDateOpen(true);
              }}
              onSubmitEditing={handleSubmit}
              editable={false}
              theme={{
                colors: themeColors,
                roundness: SIZES.padding * 0.8,
              }}
              right={
                <TextInput.Icon
                  iconColor={COLORS.black}
                  disabled={true}
                  size={styles.iconSize.height}
                  icon="calendar-outline"
                />
              }
            />
          </TouchableOpacity>
          <TextInput
            label={'age*'}
            mode="outlined"
            value={age}
            placeholderTextColor={COLORS.gray}
            style={styles.ageInputTxtStyle}
            outlineColor={COLORS.shade_of_gray_D6D6D6}
            outlineStyle={{ borderWidth: 1 }}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(_value) => {
              setAge(_value);
            }}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onSubmitEditing={handleSubmit}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
          />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box margin={10} height={40} width={SIZES.screenWidth * 0.5}>
            <CustomRadioGroup
              options={scheduleOptions}
              selectedOption={selectedScheduleOption}
              onSelect={handleDurationChange}
              // result={}
              direction={'row'}
            />
          </Box>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setIsBloodOpen(true);
            }}
          >
            <TextInput
              label={'Blood Group*'}
              mode="outlined"
              value={bloodGroup?.value}
              placeholderTextColor={COLORS.gray}
              style={styles.ageInputTxtStyle}
              outlineColor={COLORS.shade_of_gray_D6D6D6}
              editable={false}
              activeOutlineColor={COLORS.background.primary}
              onChangeText={(_value) => {
                setBloodGroup(_value);
              }}
              onPressIn={() => {
                setIsBloodOpen(true);
              }}
              onSubmitEditing={handleSubmit}
              theme={{
                colors: themeColors,
                roundness: SIZES.padding * 0.8,
              }}
              right={
                <TextInput.Icon
                  style={styles.iconSize}
                  iconColor={COLORS.black}
                  disabled={true}
                  size={styles.iconSize.height}
                  icon="chevron-down"
                />
              }
            />
          </TouchableOpacity>
        </Box>

        <TextInput
          label={`${strings.displayText.patientEmail}`}
          mode="outlined"
          value={patientsEmail}
          placeholderTextColor={COLORS.gray}
          style={styles.inputTxtStyle}
          outlineColor={COLORS.shade_of_gray_D6D6D6}
          outlineStyle={{ borderWidth: 1 }}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(_value) => {
            setPatientsEmail(_value);
          }}
          onSubmitEditing={handleSubmit}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />
        <TextInput
          label={strings.displayText.patientMobile}
          mode="outlined"
          value={patientsMobile}
          placeholderTextColor={COLORS.gray}
          style={styles.inputTxtStyle}
          outlineStyle={{ borderWidth: 1 }}
          outlineColor={COLORS.shade_of_gray_D6D6D6}
          activeOutlineColor={COLORS.background.primary}
          keyboardType="numeric"
          onChangeText={(_value) => {
            setPatientsMobile(_value);
          }}
          onSubmitEditing={handleSubmit}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />
        <TextInput
          label={'Address*'}
          mode="outlined"
          value={address}
          placeholderTextColor={COLORS.gray}
          style={styles.inputTxtStyle}
          outlineColor={COLORS.shade_of_gray_D6D6D6}
          outlineStyle={{ borderWidth: 1 }}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(_value) => {
            setAddress(_value);
          }}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onSubmitEditing={handleSubmit}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />

        <Box style={styles.addButtonBoxContainer}>
          <AbstractButton
            onPress={() => {
              handleConfirm();
            }}
            loader={loader}
            buttonStyle={styles.confirmBtnStyle}
            textStyle={styles.confirmTxtStyle}
          >
            {strings.displayText.confirm}
          </AbstractButton>
        </Box>
      </Box>
    </Box>
  );
};

const CustomAddPatientBottomSheet: React.FC<any> = ({
  handleClosePress,
  isAddOpen,
  setIsAddOpen,
}) => {
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const { userId, mobile } = useSelector((state: RootState) => state.users);
  const [title, setTitle] = useState<ICommonOption | {}>({});
  const [patientsFullName, setPatientsFullName] = useState('');
  // const [mobile, setMobile] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState({});
  const [patientsEmail, setPatientsEmail] = useState('');
  const [patientsMobile, setPatientsMobile] = useState('');
  const [selectedScheduleOption, setSelectedScheduleOption] = useState('');
  const [address, setAddress] = useState('');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const [isBloodOpen, setIsBloodOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const scheduleOptions = commonVariable[0]?.gender;
  const titles = commonVariable[0]?.titles;
  const bloodgroups = commonVariable[0]?.blood_groups;
  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);
  // BottomSheet Callbacks
  const handleDateClosePress = useCallback(() => {
    setIsDateOpen(false);
    // sheetRef.current?.close();
  }, []);
  const handleTitleClosePress = useCallback(() => {
    setIsTitleOpen(false);
    // sheetRef.current?.close();
  }, []);
  const handleBloodClosePress = useCallback(() => {
    setIsBloodOpen(false);
    // sheetRef.current?.close();
  }, []);

  const handleConfirm = async () => {
    if (patientsFullName && mobile && patientsEmail && bloodGroup && address && age) {
      if (patientsMobile.length < 10) {
        showErrorSnackBar('Mobile digits must be 10.');
        return;
      }
      setLoader(true);
      try {
        const patientData: any = {
          id: 0,
          title: title?.id,
          name: patientsFullName,
          // mobile,
          user_id: userId,
          mobile: patientsMobile,
          email: patientsEmail,
          dob: dateOfBirth,
          age,
          sex: selectedScheduleOption,
          blood_group: bloodGroup?.id,
          address,
        };

        await PatientDBHandler.getInstance().insertOfflinePatient(patientData).then(async () => {
          const localPatients: any = await PatientDBHandler.getInstance().fetchDataHandler({ user_id: userId });
          dispatch(setTempPatientList(localPatients));
          setLoader(false);
          setTimeout(() => {
            showSuccessSnackBar('Patient Create Successfully.');
            handleClosePress?.();
            handleRemove();
          }, 1000);
          setLoader(false);
        });
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      const fields = {
        patientsFullName: !patientsFullName && 'Patient name',
        mobile: !mobile && 'Mobile',
        patientsEmail: !patientsEmail && 'Email',
        bloodGroup: !bloodGroup && 'Blood group',
        address: !address && 'Address',
        age: !age && 'Age',
      };
      const missingField = Object.entries(fields).find(([_, message]) => message);
      if (missingField) {
        showErrorSnackBar(`Please enter ${missingField[1]}.`);
      }
    }
  };

  const handleRemove = () => {
    setTitle({ id: '', value: '' });
    setPatientsFullName('');
    // setMobile('');
    setPatientsEmail('');
    setAddress('');
    setAge('');
    setDateOfBirth('');
    setPatientsMobile('');
    setBloodGroup({ id: '', value: '' });
    setSelectedScheduleOption('');
  };

  const handleDateSelect = (date: string) => {
    console.log('date', date);
    setDateOfBirth(formatDateBType(date, 'DD/MM/yyyy'));
  };
  const handleSelectedTitle = (data: string) => {
    setTitle(data);
  };
  const handleSelectedBloodType = (data: string) => {
    setBloodGroup(data);
  };

  return (
    <>
      <UIBottomSheet
        sheetRef={sheetRef}
        openBSheet={isAddOpen}
        snapPoints={[
          Platform.OS === 'ios' ? `${isHpBottomTablet(12.7, 2.9)}` : `${isHpBottomTablet(9.5)}`,
        ]}
        // snapPoints={['70%']}
        enablePanDownToClose={false}
        // enableDynamicSizing
        setSheetState={setIsAddOpen}
        backgroundStyle={styles.backgroundStyle}
        title="Add Patient Details"
      >
        <PatientForm
          sheetRef={sheetRef}
          title={title}
          mobile={mobile}
          address={address}
          age={age}
          bloodGroup={bloodGroup}
          patientsMobile={patientsMobile}
          patientsEmail={patientsEmail}
          dateOfBirth={dateOfBirth}
          patientsFullName={patientsFullName}
          scheduleOptions={scheduleOptions}
          loader={loader}
          selectedScheduleOption={selectedScheduleOption}
          setSelectedScheduleOption={setSelectedScheduleOption}
          setIsTitleOpen={setIsTitleOpen}
          setTitle={setTitle}
          setIsDateOpen={setIsDateOpen}
          setDateOfBirth={setDateOfBirth}
          setPatientsEmail={setPatientsEmail}
          setBloodGroup={setBloodGroup}
          setIsBloodOpen={setIsBloodOpen}
          setAge={setAge}
          setAddress={setAddress}
          handleConfirm={handleConfirm}
          setPatientsMobile={setPatientsMobile}
          setPatientsFullName={setPatientsFullName}
        />
      </UIBottomSheet>

      {isDateOpen && (
        <CustomBottomSheet
          openBSheet={isDateOpen}
          snapPoints={[Platform.OS === 'ios' ? '70%' : `${isHpBottomTablet(9.5)}`]}
          setSheetState={setIsDateOpen}
          // enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title="Date of Birth"
        >
          <CustomDateBottomSheet
            handleSelectedFilterType={handleDateSelect}
            handleClosePress={handleDateClosePress}
          />
        </CustomBottomSheet>
      )}
      {isTitleOpen && (
        <CustomBottomSheet
          openBSheet={isTitleOpen}
          snapPoints={['42%']}
          setSheetState={setIsTitleOpen}
          backgroundStyle={styles.backgroundStyle}
          title="Select Title"
        >
          <CustomSelectBottomSheet
            type={'value'}
            selectOptions={titles}
            handleSelectedFilterType={handleSelectedTitle}
            handleClosePress={handleTitleClosePress}
          />
        </CustomBottomSheet>
      )}
      {isBloodOpen && (
        <CustomBottomSheet
          openBSheet={isBloodOpen}
          snapPoints={['42%']}
          setSheetState={setIsBloodOpen}
          backgroundStyle={styles.backgroundStyle}
          title="Select Blood Group"
        >
          <CustomSelectBottomSheet
            type={'value'}
            selectOptions={bloodgroups}
            handleSelectedFilterType={handleSelectedBloodType}
            handleClosePress={handleBloodClosePress}
          />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default CustomAddPatientBottomSheet;
