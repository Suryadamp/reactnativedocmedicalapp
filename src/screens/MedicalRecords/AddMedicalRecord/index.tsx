// AddMedicalRecord
import { Image, Text, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';

import { COLORS, SIZES } from '../../../constants';
import { strings } from '../../../i18n';
import { RootStackParamList } from '../../../navigation/types';
import { convertDateToString } from '../../../util/DateUtil';
import { RootState } from '../../../state';
import { showErrorSnackBar, showSuccessSnackBar } from '../../../util/AlertUtil';
import styles from '../../../styles/MedicalRecords.styles';
import { isHpBottomTablet } from '../../../hooks/useDeviceCheck';
import { formatDateBType } from '../../../util/DateUtil';

import {
  Box,
  AppContainer,
  CustomBottomSheet,
  CustomDateBottomSheet,
  AbstractButton,
  CustomHeader,
} from '../../../components';
import { SvgIcon } from '../../../constants/SvgIcon';
import FileBottomSheet from './FileBottomSheet';
import { createMedicalRecord, getMedicalRecords } from '../../../service/MedicalRecordService';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const checkPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 30) {
      // Android 11 and higher
      let isStorageManager = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE &&
          PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
      );
      if (isStorageManager) {
        return true;
      } else {
        // Request for the permission
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
            // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          isStorageManager = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
            // PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          );
          console.log('isStorageManager', isStorageManager);
          return isStorageManager;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    } else {
      // Below Android 11
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return true;
  }
};

export const AddMedicalRecord = ({ route, navigation }: Props) => {
  const appointment = route?.params?.appointment;
  const setMedicalRecords = route?.params?.setMedicalRecords;
  const { selectedPatient } = useSelector((state: RootState) => state.patients);

  const [state, setState] = useState<any>({
    loader: false,
    type: '',
    patientId: selectedPatient?.id,
    files: [],
    createdOn: '',
    title: '',
    isDateOpen: false,
    isOpenFileOption: false,
  });

  useEffect(() => {
    checkPermission().then((isPermission) => {
      if (!isPermission) {
        showErrorSnackBar('Please enable the permission to upload the files');
      }
    });
  }, []);

  const themeColors = {
    primary: COLORS.black,
    underlineColor: 'transparent',
    background: COLORS.background.secondary,
    onSurfaceVariant: COLORS.text,
  };

  const handleDateSelect = (date: string) => {
    const dateString = convertDateToString(date);
    setState((prev: any) => ({ ...prev, createdOn: formatDateBType(dateString, 'DD/MM/yyyy') }));
  };

  const handleDateClosePress = useCallback(() => {
    setState((prev: any) => ({ ...prev, isDateOpen: false }));
  }, []);

  const handleSubmitRecord = async () => {
    setState((prev: any) => ({ ...prev, loader: true }));
    if (state.files.length === 0) {
      showErrorSnackBar('Please upload the files');
      setState((prev: any) => ({ ...prev, loader: false }));
    } else {
      // const dateObject = new Date(state.createdOn);
      // const day = dateObject.getDate().toString().padStart(2, '0');
      // const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      // const year = dateObject.getFullYear();

      // Format the date as "DD/MM/YYYY"
      // const formattedDate = `${day}/${month}/${year}`;
      const formData = new FormData();
      formData.append('title', state.title);
      formData.append('appoint_id', appointment.id);
      formData.append('patient_id', appointment.patient_id);
      formData.append('type', state.type);

      for (let i = 0; i < state.files.length; i++) {
        formData.append('userfile[]', {
          name: state.files[i].name,
          type: state.files[i].type,
          uri: state.files[i].uri,
        });
      }
      if (state.createdOn) {
        formData.append('date_created', state.createdOn);
      }
      console.log('formData', formData);

      try {
        const resp = await createMedicalRecord(formData);
        console.log('resp', resp);
        showSuccessSnackBar('Updated medical records successfully');
        setState((prev: any) => ({ ...prev, loader: false }));
        getMedicalRecords(appointment.id).then((response: any) => {
          setMedicalRecords(response.data);
        });
        navigation.goBack();
      } catch (err) {
        const error = err as Error;
        showErrorSnackBar(error?.message);
      }
    }
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
              hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={commonStyles.topTitleText}>{strings.displayText.addRecord}</Text>
            </View>
          </Box>
        </Box> */}
        <CustomHeader
          leftIcon="arrow-left"
          onLeftIconPress={() => navigation.goBack()}
          title={strings.displayText.addRecord}
          hasDivider
        />
        <Box style={styles.content}>
          <Box style={styles.flexRow}>
            <TouchableOpacity activeOpacity={0.8}>
              <TextInput
                label={'Record for'}
                mode="outlined"
                value={appointment?.patient_name}
                placeholderTextColor={COLORS.gray}
                style={styles.inputTxtStyle}
                disabled
                outlineColor={COLORS.white_smoke}
                activeOutlineColor={COLORS.background.primary}
                editable={false}
                onChangeText={(_value) => {
                  setState((prev: any) => ({ ...prev }));
                }}
                theme={{
                  colors: themeColors,
                  roundness: SIZES.padding * 0.8,
                }}
                right={
                  <TextInput.Icon
                    style={{ width: 18, height: 18 }}
                    disabled={true}
                    icon="chevron-down"
                  />
                }
              />
            </TouchableOpacity>
            <Box style={styles.titleContainer}>
              <TextInput
                label="Title"
                mode="outlined"
                placeholderTextColor={'grey'}
                style={styles.inputTxtStyle}
                outlineColor={COLORS.white_smoke}
                activeOutlineColor={COLORS.background.primary}
                theme={{
                  colors: themeColors,
                  roundness: SIZES.padding * 0.8,
                }}
                value={state.title}
                onChangeText={(text) => setState((prev: any) => ({ ...prev, title: text }))}
              />
            </Box>
          </Box>
          <Box style={styles.topDivider} />
          <Box style={styles.typeContainer}>
            <Text style={styles.typeLabel}>Type of record</Text>
            <Box style={styles.typeFlex}>
              <Box style={styles.typeFlexItem}>
                <TouchableOpacity
                  style={styles.typeBtnStyle}
                  onPress={() => setState((prev: any) => ({ ...prev, type: 'report' }))}
                >
                  <SvgIcon
                    name={state.type !== 'report' ? 'MedicalReportIcon' : 'MedicalActiveReportIcon'}
                  />
                  <Text
                    style={state.type !== 'report' ? styles.typeTitLabel : styles.typeActTitLabel}
                  >
                    Report
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box style={styles.typeFlexItem}>
                <TouchableOpacity
                  style={styles.typeBtnStyle}
                  onPress={() => setState((prev: any) => ({ ...prev, type: 'prescription' }))}
                >
                  <SvgIcon
                    name={
                      state.type !== 'prescription'
                        ? 'MedicalPrescriptionIcon'
                        : 'MedicalActivePrescriptionIcon'
                    }
                  />
                  <Text
                    style={
                      state.type !== 'prescription' ? styles.typeTitLabel : styles.typeActTitLabel
                    }
                  >
                    Prescription
                  </Text>
                </TouchableOpacity>
              </Box>
              <Box style={styles.typeFlexItem}>
                <TouchableOpacity
                  style={styles.typeBtnStyle}
                  onPress={() => setState((prev: any) => ({ ...prev, type: 'invoice' }))}
                >
                  <SvgIcon
                    name={
                      state.type !== 'invoice' ? 'MedicalInvoiceIcon' : 'MedicalActiveInvoiceIcon'
                    }
                  />
                  <Text
                    style={state.type !== 'invoice' ? styles.typeTitLabel : styles.typeActTitLabel}
                  >
                    Invoice
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
          <Box style={styles.middleDivider} />
          <Box style={styles.createdOnCnt}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setState((prev: any) => ({ ...prev, isDateOpen: true }))}
            >
              <TextInput
                label={'Record created on'}
                mode="outlined"
                value={state.createdOn}
                placeholderTextColor={COLORS.gray}
                style={styles.inputTxtStyle}
                outlineColor={COLORS.white_smoke}
                activeOutlineColor={COLORS.background.primary}
                editable={false}
                onChangeText={(_value) => {
                  setState((prev: any) => ({ ...prev, createdOn: _value }));
                }}
                onPressIn={() => setState((prev: any) => ({ ...prev, isDateOpen: true }))}
                theme={{
                  colors: themeColors,
                  roundness: SIZES.padding * 0.8,
                }}
                right={
                  <TextInput.Icon
                    icon={'calendar-month'}
                    color="#8A8A8A"
                    style={{ marginTop: 15 }}
                  />
                }
              />
            </TouchableOpacity>
          </Box>
          <ScrollView style={styles.bottomContainer}>
            <Box style={styles.filesContainer}>
              {state.files &&
                state.files.map((file: any) => (
                  <Box>
                    {file.type === 'application/pdf' ? (
                      <Box style={styles.pdfContainer}>
                        <Pdf source={{ uri: file.fileCopyUri }} style={styles.pdfStyle} />
                      </Box>
                    ) : (
                      <Box style={styles.imgPreview}>
                        <Image source={file} style={styles.fileImage} />
                      </Box>
                    )}
                  </Box>
                ))}
              <TouchableOpacity
                style={styles.addFile}
                onPress={() => setState((prev: any) => ({ ...prev, isOpenFileOption: true }))}
              >
                <Text style={styles.plusText}>+</Text>
                <Text style={styles.addText}>Add more pages</Text>
              </TouchableOpacity>
            </Box>
          </ScrollView>
        </Box>
        <Box marginTop={10} style={styles.buttonBoxContainer}>
          <AbstractButton
            buttonStyle={styles.applyBtnStyle}
            textStyle={styles.applyTxtStyle}
            loader={state.loader}
            onPress={handleSubmitRecord}
          >
            {strings.displayText.uploadRecord}
          </AbstractButton>
        </Box>
        {state.isDateOpen && (
          <CustomBottomSheet
            openBSheet={state.isDateOpen}
            snapPoints={[
              // Platform.OS === 'ios' ? isHpBottomTablet(87, 1.7) : `${isHpBottomTablet(9.5)}`,
              '80%',
            ]}
            enableDynamicSizing
            setSheetState={(value) => setState((prev: any) => ({ ...prev, isDateOpen: value }))}
            enablePanDownToClose={false}
            backgroundStyle={styles.backgroundStyle}
            title="Select Date"
          >
            <CustomDateBottomSheet
              handleSelectedFilterType={handleDateSelect}
              handleClosePress={handleDateClosePress}
            />
          </CustomBottomSheet>
        )}
        {state.isOpenFileOption && (
          <CustomBottomSheet
            openBSheet={state.isOpenFileOption}
            // snapPoints={[`${isHpBottomTablet(4)}`]}
            snapPoints={['40%']}
            setSheetState={(value) =>
              setState((prev: any) => ({ ...prev, isOpenFileOption: value }))
            }
            enableDynamicSizing
            enablePanDownToClose={false}
            backgroundStyle={styles.menuBsLayout}
            title="Options"
          >
            <FileBottomSheet files={state.files} onSetState={setState} />
          </CustomBottomSheet>
        )}
      </AppContainer>
    </>
  );
};

export default AddMedicalRecord;
