// AddInpatient
import React, { useState, useRef, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

import { strings } from '../../i18n';
import { RootState } from '../../state';
import { RootStackParamList } from '../../navigation/types';
import { COLORS } from '../../constants';
import { setInpatientItem, IPatient, IDoctor, resetStateItem } from '../../state/inpatients';
import {
  inpatientSetIpNo,
  inpatientCreate,
  getInpatientList,
} from '../../service/InpatientService';
import {
  AppContainer,
  Box,
  AbstractButton,
  CustomBottomSheet,
  CustomHeader,
} from '../../components';
import { showErrorSnackBar, showSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import styles from '../../styles/Inpatients/InpatientRegistration.styles';
import InpatientRegistration from '../../forms/InpatientRegistration';
import ListBottomSheet from '../../sheets/Inpatients/ListBottomSheet';
import DateTimeBottomSheet from '../../sheets/Inpatients/DateTimeBottomSheet';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const AddInpatient = ({ navigation }: Props) => {
  const sheetRef = useRef<BottomSheet>(null);

  const dispatch = useDispatch();
  const { item } = useSelector((state: RootState) => state.inpatients);
  const { patientList } = useSelector((state: RootState) => state.patients);
  const { doctorsList } = useSelector((state: RootState) => state.doctors);
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);

  const ipTypes = commonVariable[0]?.ip_type;

  const [loader, setLoader] = useState(false);
  const [isOpenPatientSheet, setOpenPatientSheet] = useState(false);
  const [isOpenDoctorSheet, setOpenDoctorSheet] = useState(false);
  const [isOpenIpTypeSheet, setOpenIpTypeSheet] = useState(false);
  const [isOpenDoa, setOpenDoaSheet] = useState(false);

  useEffect(() => {
    setIpNo();

    return () => {
      dispatch(resetStateItem());
    };
  }, []);

  const setIpNo = async () => {
    await inpatientSetIpNo();
  };

  const handleChange = (name: any, value: any) => {
    dispatch(setInpatientItem({ name, value }));
  };

  const handleChangePatient = (patient: IPatient) => {
    dispatch(setInpatientItem({ name: 'patient', value: patient }));
    setOpenPatientSheet(false);
    sheetRef.current?.close();
  };

  const handleChangeDoctor = (doctor: IDoctor) => {
    dispatch(setInpatientItem({ name: 'doctor', value: doctor }));
    setOpenDoctorSheet(false);
    sheetRef.current?.close();
  };

  const handleChangeIpType = (ipType: any) => {
    dispatch(setInpatientItem({ name: 'ipType', value: ipType }));
    setOpenIpTypeSheet(false);
    sheetRef.current?.close();
  };

  const handleChangeDoa = (date: string) => {
    dispatch(setInpatientItem({ name: 'doa', value: date }));
    setOpenDoaSheet(false);
    sheetRef.current?.close();
  };

  const handleAddPatient = () => {
    navigation.navigate('PatientRegistration', { from: 'AddInpatient' });
  };
  const handleNavigateRoom = () => {
    navigation.navigate('InpatientRoomList', { from: 'AddInpatient' });
  };

  const handleSave = async () => {
    setLoader(true);
    const { patient, doctor, ipType, roomDetail, ...rest } = item;

    try {
      const response = await inpatientCreate({
        ...rest,
        bed: (roomDetail && roomDetail.roomId) || '',
        patient_id: patient?.id,
        doctor_id: doctor?.id,
        ip_type: ipType?.id,
      });

      if (response.success) {
        setLoader(false);
        showSuccessSnackBar('Inpatient created successfully');
        getInpatientList();
        navigation.navigate('Admissions');
        dispatch(resetStateItem());
      } else if (response.data.errors) {
        showErrorSnackBar(response.data.message);
        setTimeout(() => {
          setLoader(false);
        }, 6000);
      }
    } catch (err: any) {
      showErrorSnackBar(err.message);

      setTimeout(() => {
        setLoader(false);
      }, 6000);
    }
  };

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon={'arrow-left'}
        hasDivider
        title={strings.displayText.admissionRegistration}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={
                navigation.getState().type === 'drawer'
                  ? assets.HamburgerMenu
                  : assets.backArrowBlack
              }
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={[commonStyles.topTitleText]}>
            {strings.displayText.admissionRegistration}
          </Text>
          <TouchableOpacity activeOpacity={0.8}>
            {/* <Image source={assets.AddPlusBlue} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box style={styles.boxMainContainer}>
            <InpatientRegistration
              {...item}
              onClickPatient={() => setOpenPatientSheet(true)}
              onClickDoa={() => setOpenDoaSheet(true)}
              onClickDoctor={() => setOpenDoctorSheet(true)}
              onClickIpType={() => setOpenIpTypeSheet(true)}
              onClickWardNo={handleNavigateRoom}
              onChange={handleChange}
              onAddPatient={handleAddPatient}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
      {item.patient && item.doctor && item.ipType && item.roomDetail && (
        <Box style={styles.btnContainer}>
          <AbstractButton
            loader={loader}
            onPress={handleSave}
            buttonStyle={styles.saveBtn}
            textStyle={styles.saveBtnText}
          >
            {strings.displayText.save}
          </AbstractButton>
        </Box>
      )}

      {isOpenPatientSheet && (
        <CustomBottomSheet
          openBSheet={isOpenPatientSheet}
          snapPoints={[Platform.OS === 'ios' ? '45%' : '40%']}
          setSheetState={setOpenPatientSheet}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={strings.displayText.selectPatient}
        >
          <ListBottomSheet items={patientList} item={item.patient} onChange={handleChangePatient} />
        </CustomBottomSheet>
      )}
      {isOpenIpTypeSheet && (
        <CustomBottomSheet
          openBSheet={isOpenIpTypeSheet}
          snapPoints={[Platform.OS === 'ios' ? '45%' : '40%']}
          setSheetState={setOpenIpTypeSheet}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={strings.displayText.selectIpType}
        >
          <ListBottomSheet
            items={ipTypes}
            item={item.ipType}
            type="value"
            onChange={handleChangeIpType}
          />
        </CustomBottomSheet>
      )}
      {isOpenDoctorSheet && (
        <CustomBottomSheet
          openBSheet={isOpenDoctorSheet}
          snapPoints={[Platform.OS === 'ios' ? '45%' : '42%']}
          setSheetState={setOpenDoctorSheet}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={strings.displayText.selectDoctor}
        >
          <ListBottomSheet
            items={doctorsList ? doctorsList[0]?.data : []}
            item={item.doctor}
            onChange={handleChangeDoctor}
          />
        </CustomBottomSheet>
      )}
      {isOpenDoa && (
        <CustomBottomSheet
          openBSheet={isOpenDoa}
          // snapPoints={[Platform.OS === 'ios' ? '70%' : `${isHpBottomTablet(9.3)}`]}
          snapPoints={['72%']}
          enableDynamicSizing
          setSheetState={setOpenDoaSheet}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={strings.displayText.pickDateAndTime}
        >
          <DateTimeBottomSheet onChange={handleChangeDoa} />
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default AddInpatient;
