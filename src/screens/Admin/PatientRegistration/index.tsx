// Patient Registration
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { ScrollView } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import StepIndicator from 'react-native-step-indicator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, FONTS, SIZES } from '../../../constants';
import { strings } from '../../../i18n';
import { RootState } from '../../../state';
import { setSelectPatient } from '../../../state/patients';
import { showErrorSnackBar, showSnackBar, Snackbar } from '../../../util/AlertUtil';
import { RootStackParamList } from '../../../navigation/types';
import { createNewPatient, getPatientsList } from '../../../service/Patients';
import { setInpatientItem } from '../../../state/inpatients';

import usePhoneValidation from '../../../hooks/usePhoneValidation';
import useEmailValidation from '../../../hooks/useEmailValidation';
import usePincodeValidation from '../../../hooks/usePincodeValidation';
import { isHpBottomTablet } from '../../../hooks/useDeviceCheck';

import {
  Box,
  CustomBottomSheet,
  CustomSelectBottomSheet,
  CustomDateBottomSheet,
  AbstractButton,
  AppContainer,
  CustomHeader,
} from '../../../components';
import { indicatorsCustomStyles } from '../helper/styles';
import { stepperLabels } from '../helper/constants';
import { IPatientState } from '../helper/types';
import PersonalInfo from './Personal';
import ContactInfo from './Contact';
import SuccessCard from './SuccessCard';
import { isHpTablet } from '../../../hooks/useDeviceCheck';
import { formatDateBType } from '../../../util/DateUtil';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const initialState: IPatientState = {
  selectedTab: 1,
  isTitleOpen: false,
  isBloodOpen: false,
  isRelationTypeOpen: false,
  isDateOpen: false,
  loader: false,
  isCreateChart: false,
  title: '',
  name: '',
  dob: '',
  age: '',
  email: '',
  relationName: '',
  relationType: '',
  mobile: '',
  sex: 1,
  bloodGroup: '',
  addressLine1: '',
  addressLine2: '',
  pincode: '',
  area: '',
  district: '',
  country: '',
  state: '',
  isVaccCreated: false,
  isUseAccAddress: false,
  showModal: false,
  uhid: '',
  image: '',
  errors: [],
};

export const PatientRegistration = ({ navigation, route }: Props) => {
  const navigateFrom = route?.params?.from;
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const [state, setState] = useState<IPatientState>(initialState);
  const { phoneError, validatePhone } = usePhoneValidation();
  const { emailError, validateEmail } = useEmailValidation();
  const { pincodeError, validatePincode } = usePincodeValidation();
  const dispatch = useDispatch();
  const sheetRef = useRef<BottomSheet>(null);
  const titles = useMemo(() => commonVariable[0]?.titles, [commonVariable]);
  const bloodGroups = useMemo(() => commonVariable[0]?.blood_groups, [commonVariable]);
  const relationTypeOptions = useMemo(() => commonVariable[0]?.relations_type, [commonVariable]);

  useEffect(() => {
    setState(initialState);

    return () => {
      setState(initialState);
    };
  }, []);

  // BottomSheet Callbacks
  const handleDateClosePress = useCallback(() => {
    setState((prev) => ({ ...prev, isDateOpen: false }));
    sheetRef.current?.close();
  }, []);

  const handleTitleClosePress = useCallback(() => {
    setState((prev) => ({ ...prev, isTitleOpen: false }));
    sheetRef.current?.close();
  }, []);

  const handleBloodClosePress = useCallback(() => {
    setState((prev) => ({ ...prev, isBloodOpen: false }));
    sheetRef.current?.close();
  }, []);

  const handleRelationTypeClosePress = useCallback(() => {
    setState((prev) => ({ ...prev, isRelationTypeOpen: false }));
    sheetRef.current?.close();
  }, []);

  const handleNext = async () => {
    const { title, dob, sex, name, addressLine1, pincode, mobile, email, bloodGroup, age, image } =
      state;
    if (state.selectedTab === 1) {
      if (!name) {
        showErrorSnackBar('Please enter the name.');
        return;
      }
      if (!validatePhone(mobile)) {
        showErrorSnackBar('Please fill the valid mobile.');
        return;
      }
      if (!validateEmail(email)) {
        showErrorSnackBar('Please fill the valid email.');
        return;
      }
      setState((prev) => ({ ...prev, selectedTab: 2 }));
    } else if (state.selectedTab === 2) {
      if (!addressLine1) {
        showErrorSnackBar('Please fill the address');
        return;
      }

      if (!validatePincode(pincode)) {
        showErrorSnackBar('Please fill the valid pincode.');
        return;
      }
      setState((prev) => ({ ...prev, selectedTab: 3 }));
    } else if (state.selectedTab === 3) {
      try {
        try {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('name', name);
          formData.append('mobile', mobile);
          formData.append('email', email);
          // formData.append('dob', dob);
          if (dob) {
            formData.append('dob', dob);
          }
          formData.append('age', age);
          formData.append('sex', sex);
          if (image) {
            formData.append('image', {
              uri: image.uri,
              type: image.type,
              name: image.fileName,
            });
          }
          formData.append('user_mobile', mobile);
          formData.append('blood_group', bloodGroup);
          // setState((prev) => ({ ...prev, loader: true }));
          await createNewPatient(formData).then(async (res: any) => {
            // console.log('res', res);
            if (res.data && res.success && res.data.patient_id) {
              setState((prev) => ({
                ...prev,
                uhid: res.data.patient_id,
                generatedId: res.data.id,
                showModal: true,
                loader: false,
              }));
            } else {
              showErrorSnackBar(res.errors);
              // handleRemove();
              return;
            }
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  const handleRemove = () => {
    setState(initialState);
  };

  const handleClose = async () => {
    setState((prev) => ({ ...prev, loader: true }));
    if (navigateFrom === 'BookAppointment') {
      await getPatientsList();
      const selectdPatient: any = {
        patient_mobile: state.mobile || '',
        id: state.generatedId,
        name: state.name,
        mobile: state.mobile,
        age: state.age,
        dob: state.dob,
        email: state.email,
        sex: state.sex,
        title: state.title,
        uhid: state.uhid,
      };
      await dispatch(setSelectPatient(selectdPatient));
      navigation.goBack();
    } else if (navigateFrom === 'AddInpatient') {
      dispatch(
        setInpatientItem({ name: 'patient', value: { id: state.generatedId, name: state.name } }),
      );
      navigation.goBack();
    } else {
      navigation.navigate('Dashboard');
    }
    setState((prev) => ({ ...prev, loader: false, showModal: false }));
  };

  const handleHeaderNavigation = () => {
    if (state.selectedTab === 1) {
      navigation.goBack();
    } else {
      setState((prev) => ({ ...prev, selectedTab: state.selectedTab - 1 }));
    }
  };

  const renderStepIndicator = ({ stepStatus }: any): any => {
    let name = 'checkbox-blank-circle';
    let color = COLORS.white;

    if (stepStatus === 'finished') {
      name = 'check-bold';
      color = COLORS.white;
    } else if (stepStatus === 'current') {
      name = 'checkbox-blank-circle';
    }

    return <MaterialCommunityIcons name={name} size={10} color={color} />;
  };

  return (
    <>
      <AppContainer
        statusBarBgColor={COLORS.transparent}
        statusBarStyle="dark-content"
        style={styles.container}
      >
        {/* Header & title section */}
        <Box style={styles.header}>
          <CustomHeader
            leftIcon="arrow-left"
            rightIconType="image"
            rightIcon=""
            hasDivider
            onLeftIconPress={() => navigation.goBack()}
            title={strings.displayText.patientRegistration}
            permission={false}
          />
          <Box style={{ marginVertical: 10 }}>
            <StepIndicator
              customStyles={indicatorsCustomStyles}
              stepCount={3}
              currentPosition={state.selectedTab - 1}
              renderStepIndicator={renderStepIndicator}
              labels={stepperLabels}
            />
          </Box>
          {/* <Box style={styles.divider} /> */}
        </Box>
        {state.showModal && (
          <Box>
            <SuccessCard
              onClose={handleClose}
              patientData={{ name: state.name, uhid: state.uhid }}
              navigation={navigation}
            />
          </Box>
        )}
        {state.selectedTab === 1 && (
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            enabled
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollViewStyle}
              contentContainerStyle={styles.scrollViewContainer}
            >
              <PersonalInfo
                {...state}
                isEdit
                phoneError={phoneError}
                emailError={emailError}
                onChange={setState}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        )}
        {state.selectedTab === 2 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <ContactInfo {...state} isEdit pincodeError={pincodeError} onChange={setState} />
          </ScrollView>
        )}
        {state.selectedTab === 3 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <PersonalInfo {...state} isEdit={false} onChange={setState} />
            <ContactInfo {...state} isEdit={false} onChange={setState} />
          </ScrollView>
        )}
        <Box style={styles.buttonBoxContainer}>
          <AbstractButton
            onPress={handleNext}
            loader={state.loader}
            buttonStyle={styles.confirmBtnStyle}
            textStyle={styles.confirmTxtStyle}
          >
            {state.selectedTab !== 3 ? 'Continue' : 'Confirm & Create Account'}
          </AbstractButton>
        </Box>
      </AppContainer>
      {state.isDateOpen && (
        <CustomBottomSheet
          openBSheet={state.isDateOpen}
          // snapPoints={[Platform.OS === 'ios' ? '70%' : `${isHpBottomTablet(9.5)}`]}
          snapPoints={['70%']}
          enableDynamicSizing
          setSheetState={(data) => setState((prev) => ({ ...prev, isDateOpen: data }))}
          backgroundStyle={styles.backgroundStyle}
          title="Date of Birth"
        >
          <CustomDateBottomSheet
            handleSelectedFilterType={(data) =>
              setState((prev) => ({ ...prev, dob: formatDateBType(data, 'DD/MM/yyyy') }))
            }
            handleClosePress={handleDateClosePress}
          />
        </CustomBottomSheet>
      )}
      {state.isTitleOpen && (
        <CustomBottomSheet
          openBSheet={state.isTitleOpen}
          snapPoints={['42%']}
          setSheetState={(data) => setState((prev) => ({ ...prev, isTitleOpen: data }))}
          backgroundStyle={styles.backgroundStyle}
          title="Select Title"
        >
          <CustomSelectBottomSheet
            type={'value'}
            selectOptions={titles}
            handleSelectedFilterType={(title) => setState((prev) => ({ ...prev, title: title.id }))}
            handleClosePress={handleTitleClosePress}
          />
        </CustomBottomSheet>
      )}
      {state.isBloodOpen && (
        <CustomBottomSheet
          openBSheet={state.isBloodOpen}
          snapPoints={['42%']}
          setSheetState={(data) => setState((prev) => ({ ...prev, isBloodOpen: data }))}
          backgroundStyle={styles.backgroundStyle}
          title="Select Blood Group"
        >
          <CustomSelectBottomSheet
            type={'value'}
            selectOptions={bloodGroups}
            handleSelectedFilterType={(data) =>
              setState((prev) => ({ ...prev, bloodGroup: data.id }))
            }
            handleClosePress={handleBloodClosePress}
          />
        </CustomBottomSheet>
      )}
      {state.isRelationTypeOpen && (
        <CustomBottomSheet
          openBSheet={state.isRelationTypeOpen}
          snapPoints={['42%']}
          setSheetState={(data) => setState((prev) => ({ ...prev, isRelationTypeOpen: data }))}
          backgroundStyle={styles.backgroundStyle}
          title="Select Relation Type"
        >
          <CustomSelectBottomSheet
            type={'value'}
            selectOptions={relationTypeOptions}
            handleSelectedFilterType={(data) =>
              setState((prev) => ({ ...prev, relationType: data.id }))
            }
            handleClosePress={handleRelationTypeClosePress}
          />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default PatientRegistration;

const styles = StyleSheet.create({
  scrollViewContainer: { flexGrow: 1 },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  header: {
    justifyContent: 'center',
    paddingVertical: isHpTablet(1),
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  topBarTitle: {
    ...FONTS.h4,
    color: '#232323',
    textAlign: 'center',
  },
  icon: {
    height: 22,
    width: 22,
    justifyContent: 'center',
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  buttonBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  confirmBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 10,
    height: 50,
    width: SIZES.screenWidth * 0.9,
  },
  confirmTxtStyle: { color: COLORS.white, fontSize: 15, fontFamily: FONTS.InterMedium },
  scrollViewStyle: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: 0.3,
    elevation: 8,
    borderColor: COLORS.white,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 15 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
  },
});
