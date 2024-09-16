// Admin - Appointment - Vitals
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { strings } from '../../../i18n';
import { RootState } from '../../../state';
import { RootStackParamList } from '../../../navigation/types';
import { getVitalsByDoctor, appointmentVitalsCreate } from '../../../service/VitalService';
import { AppContainer, Box, AbstractButton, CustomBottomSheet } from '../../../components';
import { showErrorSnackBar, showSuccessSnackBar } from '../../../util/AlertUtil';
import styles from '../../../styles/Inpatients/InpatientRegistration.styles';
import { formatDateBType } from '../../../util/DateUtil';

import InpatientLoader from '../../../components/InpatientLoader';
import InpatientVitalsItem from '../../../components/InpatientVitalItems';
import ListBottomSheet from '../../../sheets/Inpatients/ListBottomSheet';
import CustomHeader from '../../../components/CustomHeader';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

export const AppointmentVitals = ({ route, navigation }: Props) => {
  const appointmentId = route?.params?.appointmentId;
  const doctorId = route?.params?.doctorId;
  const { vitals } = useSelector((state: RootState) => state.inpatients);
  const { doctorVitals } = useSelector((state: RootState) => state.vitals);
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenVitals, setOpenVitalsSheet] = useState<boolean>(false);
  const [visibleVitals, setVisibleVitals] = useState<any>(doctorVitals);
  const [sheetVitals, setSheetVitals] = useState<any>(doctorVitals);
  const [state, setState] = useState({
    diagInfo: '',
    vitals: [],
  });

  useEffect(() => {
    getAllVitals();
    return () => {
      // dispatch(resetInpatientSelectedRoom());
    };
  }, [appointmentId, doctorId]);

  const getAllVitals = async () => {
    getVitalsByDoctor(doctorId).then((response) => {
      if (response.success) {
        setVisibleVitals(response.data);
        const vitalsIds = response.data.map((itm: any) => itm?.id);
        setSheetVitals(vitals.filter((item) => !vitalsIds.includes(item.id)));
        const dynamicStateObject = visibleVitals.reduce((item1: any, currentItem: any) => {
          item1.vital_id = currentItem?.id;
          item1.vital_name = currentItem?.name;
          item1.vital_value = '';
          item1.vital_date = formatDateBType(new Date(), 'DD/MM/YYYY hh:mm:ss A');
          return item1;
        }, {});
        setState((prev) => ({ ...prev, ...dynamicStateObject }));
        setIsLoading(false);
      }
    });
  };

  const handleChange = (vitals_master: any, value: any) => {
    const newVitals: any = [...state.vitals];
    // Check if the vitals_id exists or not
    const exits = newVitals.find((vital: any) => vital.vital_id == vitals_master.id);
    if (exits) {
      exits.vital_value = value;
      exits.vital_date = formatDateBType(new Date(), 'DD/MM/YYYY hh:mm:ss A');
    } else {
      newVitals.push({
        vital_id: vitals_master.id,
        vital_name: vitals_master.name,
        vital_value: value,
        vital_date: formatDateBType(new Date(), 'DD/MM/YYYY hh:mm:ss A'),
      });
    }
    setState((prev) => ({ ...prev, vitals: newVitals }));
  };

  const handleAddVitals = (item: any) => {
    setVisibleVitals([...visibleVitals, { ...item }]);
    setSheetVitals(sheetVitals.filter((shItm: any) => shItm.id !== item.id));
    setState((prev) => ({ ...prev, [item.id]: '' }));
    setOpenVitalsSheet(false);
  };

  const handleSave = async () => {
    setLoader(true);

    try {
      // const { diagInfo } = state;
      const response = await appointmentVitalsCreate({
        appointment_id: appointmentId,
        vitals: state.vitals,
      });
      if (response.success) {
        showSuccessSnackBar('Vitals created successfully');
        navigation.goBack();
        setLoader(false);
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
      // statusBarBgColor={COLORS.background.white}
      statusBarBgColor={'transparent'}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      <CustomHeader
        leftIcon="arrow-left"
        rightIconType="image"
        rightIcon=""
        onLeftIconPress={() => navigation.goBack()}
        title={strings.displayText.addVitals}
        permission={false}
      />
      {isLoading && <InpatientLoader />}
      {!isLoading && (
        <ScrollView>
          <Box style={styles.boxSummaryContainer}>
            <Text style={styles.title}>{strings.displayText.observation}</Text>
            <Box>
              <InpatientVitalsItem
                state={state}
                doctorVitals={visibleVitals}
                isShowAdd={sheetVitals.length > 0}
                onAdd={() => setOpenVitalsSheet(true)}
                onChange={handleChange}
              />
            </Box>
          </Box>
        </ScrollView>
      )}
      {!isLoading && (
        <Box style={styles.btnContainer}>
          <AbstractButton
            loader={loader}
            buttonStyle={styles.saveBtn}
            textStyle={styles.saveBtnText}
            onPress={handleSave}
          >
            {strings.displayText.save}
          </AbstractButton>
        </Box>
      )}
      {isOpenVitals && (
        <CustomBottomSheet
          openBSheet={isOpenVitals}
          snapPoints={['42%']}
          setSheetState={(data) => setOpenVitalsSheet(data)}
          backgroundStyle={styles.backgroundStyle}
          title="Options"
        >
          <ListBottomSheet
            items={sheetVitals}
            item={'test'}
            type="name"
            onChange={handleAddVitals}
          />
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default AppointmentVitals;
