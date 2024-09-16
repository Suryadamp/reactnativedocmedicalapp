import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Platform, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ICustomEditPetientBottomSheetProps } from '../../@types/components';
import { AbstractButton, Box } from '../../components';
import { COLORS, FONTS, SIZES } from '../../constants';
import { strings } from '../../i18n';
import { getPatientsList, updatePatientsDetails } from '../../service/Patients';
import CustomRadioGroup from '../CustomRadioButton/CustomRadioButton';
import { RootState } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../CustomBottomSheet';
import CustomDateBottomSheet from '../CustomBottomSheet/CustomDateBottomSheet';
import CustomSelectBottomSheet from '../CustomBottomSheet/CustomSelectBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { showErrorSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import { setTempPatientList } from '../../state/patients';
import { PatientDBHandler } from '../../database';
import styles from '../../styles/component_styles/PatientBottomSheet.styles';
import { formatDateBType } from '../../util/DateUtil';
import { isHpBottomTablet, isHpTablet } from '../../hooks/useDeviceCheck';
import { UIBottomSheet } from './BottomSheet';

const PatientForm = ({
  title,
  age,
  mobile,
  address,
  patientsMobile,
  patientsEmail,
  dateOfBirth,
  patientsFullName,
  scheduleOptions,
  loader,
  setAge,
  bloodGroup,
  selectedScheduleOption,
  setIsTitleOpen,
  setTitle,
  setIsDateOpen,
  setIsBloodOpen,
  setDateOfBirth,
  setPatientsEmail,
  setPatientsFullName,
  setBloodGroup,
  setPatientsMobile,
  handleConfirm,
  handleDurationChange,
  sheetRef,
  setAddress,
}: any) => {
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
              editable={false}
              outlineColor={COLORS.shade_of_gray_D6D6D6}
              activeOutlineColor={COLORS.background.primary}
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
                  style={styles.iconSize}
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
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onSubmitEditing={handleSubmit}
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
              editable={false}
              activeOutlineColor={COLORS.background.primary}
              onChangeText={(_value) => {
                setDateOfBirth(_value);
              }}
              onPressIn={() => {
                setIsDateOpen(true);
              }}
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
                  icon="calendar-outline"
                />
              }
            />
          </TouchableOpacity>
          <TextInput
            label={'age*'}
            mode="outlined"
            value={`${age}`}
            placeholderTextColor={COLORS.gray}
            style={styles.ageInputTxtStyle}
            outlineStyle={{ borderWidth: 1 }}
            outlineColor={COLORS.shade_of_gray_D6D6D6}
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
              editable={false}
              style={styles.ageInputTxtStyle}
              outlineColor={COLORS.shade_of_gray_D6D6D6}
              activeOutlineColor={COLORS.background.primary}
              onChangeText={(_value) => {
                setBloodGroup(_value);
              }}
              onPressIn={() => {
                setIsBloodOpen(true);
              }}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
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
          outlineStyle={{ borderWidth: 1 }}
          outlineColor={COLORS.shade_of_gray_D6D6D6}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(_value) => {
            setPatientsEmail(_value);
          }}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onSubmitEditing={handleSubmit}
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
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onSubmitEditing={handleSubmit}
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
          outlineStyle={{ borderWidth: 1 }}
          outlineColor={COLORS.shade_of_gray_D6D6D6}
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

        <Box style={styles.buttonBoxContainer}>
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

const CustomEditPatientBottomSheet: React.FC<ICustomEditPetientBottomSheetProps> = ({
  handleClosePress,
  editDetails,
  isEditOpen,
  setIsEditOpen,
}) => {
  const dispatch = useDispatch();
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const { userId, mobile } = useSelector((state: RootState) => state.users);
  const scheduleOptions = commonVariable[0]?.gender;
  const [title, setTitle] = useState({});
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

  useEffect(() => {
    setTitle({ value: editDetails?.title } || {});
    setPatientsFullName(editDetails?.name || '');
    // setMobile(editDetails?.mobile || '');
    setPatientsEmail(editDetails?.email || '');
    setPatientsMobile(editDetails?.patient_mobile || editDetails?.mobile || '');
    setAge(editDetails?.age || '');
    setSelectedScheduleOption(editDetails?.sex || '');
    setDateOfBirth(editDetails?.dob || '');
    setAddress(editDetails?.area || editDetails?.address || '');
    setBloodGroup({ value: editDetails?.blood_group } || {});
  }, [editDetails]);

  const handleConfirm = async () => {
    if (patientsFullName && mobile && patientsEmail && bloodGroup && address && age) {
      if (patientsMobile.length < 10) {
        showErrorSnackBar('Mobile digits must be 10.');
        return;
      }
      setLoader(true);
      if (editDetails?.uhid) {
        const patientData = {
          id: null,
          uuid: null,
          title: title?.value,
          mobile: patientsMobile,
          name: patientsFullName,
          user_mobile: mobile,
          email: patientsEmail,
          dob: dateOfBirth ?? null,
          age,
          area: address,
          sex: selectedScheduleOption,
          blood_group: bloodGroup?.id,
        };
        try {
          console.log("patientData", patientData);
          await updatePatientsDetails(editDetails?.id, patientData).then(async (res) => {
            console.log('res', res);
            if (res && res.success) {
              // setPatientsFullName('');
              // setMobile('');
              // setPatientsEmail('');
              showSuccessSnackBar('Updated successfully');
              await getPatientsList();
              handleClosePress?.();
            }
          });
        } catch (error) {
          console.log('ERROR', error);
          console.log(error);
        }
      } else {
        const patientData: any = {
          id: editDetails?.id,
          title: title?.value,
          mobile: patientsMobile,
          name: patientsFullName,
          email: patientsEmail,
          dob: dateOfBirth,
          age,
          address,
          sex: selectedScheduleOption,
          blood_group: bloodGroup?.value,
        };
        try {
          await PatientDBHandler.getInstance().insertOfflinePatient(patientData).then(async () => {
            // setPatientsFullName('');
            // setMobile('');
            // setPatientsEmail('');
            if (userId) {
              const localPatients: any = await PatientDBHandler.getInstance().fetchDataHandler({ user_id: userId });
              dispatch(setTempPatientList(localPatients));
              showSuccessSnackBar('Update Successfully.');
              handleClosePress?.();
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
      setLoader(false);
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
      // showSnackBar('Some required fields are missing');
    }
  };
  const handleDurationChange = (value: any) => {
    setSelectedScheduleOption(value);
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
        openBSheet={isEditOpen}
        snapPoints={[
          Platform.OS === 'ios' ? `${isHpBottomTablet(12.8, 2.8)}` : `${isHpBottomTablet(9.5)}`,
        ]}
        setSheetState={setIsEditOpen}
        enablePanDownToClose={false}
        backgroundStyle={styles.backgroundStyle}
        title="Edit Patient Details"
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
          handleDurationChange={handleDurationChange}
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
          snapPoints={[Platform.OS === 'ios' ? '42%' : '40%']}
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

export default CustomEditPatientBottomSheet;

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//   },
//   boxContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   buttonBoxContainer: {
//     // flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 10,
//     marginTop: 10,
//   },
//   closeXStyle: {
//     width: 16,
//     height: 16,
//   },
//   titleText: {
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 20,
//     lineHeight: 24,
//     textAlign: 'center',
//     color: COLORS.black,
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderColor: COLORS.grey_E5E5E5,
//     marginTop: 5,
//   },
//   inputTxtStyle: {
//     // width: SIZES.screenWidth * 0.9,
//     height: 50,
//     marginVertical: 5,
//     backgroundColor: COLORS.white,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 12,
//   },
//   nameInputTxtStyle: {
//     width: SIZES.screenWidth * 0.585,
//     height: 50,
//     marginVertical: 5,
//     backgroundColor: COLORS.white,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 12,
//   },
//   mrsInputTxtStyle: {
//     width: SIZES.screenWidth * 0.285,
//     height: 50,
//     marginVertical: 5,
//     backgroundColor: COLORS.white,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 12,
//   },
//   birthInputTxtStyle: {
//     width: SIZES.screenWidth * 0.52,
//     height: 50,
//     marginVertical: 5,
//     backgroundColor: COLORS.white,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 12,
//   },
//   ageInputTxtStyle: {
//     width: SIZES.screenWidth * 0.35,
//     height: 50,
//     marginVertical: 5,
//     padding: 0,
//     backgroundColor: COLORS.white,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 12,
//   },

//   confirmBtnStyle: {
//     backgroundColor: COLORS.background.primary,
//     borderRadius: 10,
//     height: 50,
//     width: SIZES.screenWidth * 0.9,
//   },
//   backgroundStyle: {
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.gray,
//     borderWidth: 2,
//   },
//   confirmTxtStyle: {
//     fontFamily: FONTS.SFProDisplaySemibold,
//     fontSize: 15,
//     color: COLORS.background.white,
//     textAlign: 'center',
//   },
// });
