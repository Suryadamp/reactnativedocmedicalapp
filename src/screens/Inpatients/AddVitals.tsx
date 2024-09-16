/* eslint-disable react-hooks/exhaustive-deps */
// Inpatient - Vitals
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import { strings } from '../../i18n';
import { RootState } from '../../state';
import { RootStackParamList } from '../../navigation/types';
import { COLORS } from '../../constants';
import { inpatientVitalsCreate, getDoctorVitals } from '../../service/InpatientService';
import {
  AppContainer,
  Box,
  AbstractButton,
  CustomBottomSheet,
  CustomHeader,
} from '../../components';
import { showErrorSnackBar, showSnackBar, showSuccessSnackBar } from '../../util/AlertUtil';
import styles from '../../styles/Inpatients/InpatientRegistration.styles';
import InpatientLoader from '../../components/InpatientLoader';
import InpatientVitalsItem from '../../components/InpatientVitalItems';
import ListBottomSheet from '../../sheets/Inpatients/ListBottomSheet';
import { formatDateBType } from '../../util/DateUtil';

interface NavigateProps {
  navigation: any;
  route: any;
}

type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

export const InpatientVitals = ({ route, navigation }: Props) => {
  const ipAdmissionId = route?.params?.ipAdmissionId;
  const { vitals, doctorVitals, selectedInpatient } = useSelector(
    (state: RootState) => state.inpatients,
  );
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenVitals, setOpenVitalsSheet] = useState<boolean>(false);
  const [visibleVitals, setVisibleVitals] = useState<any>(doctorVitals);
  const [sheetVitals, setSheetVitals] = useState<any>(doctorVitals);
  const [state, setState] = useState({
    diagInfo: '',
    vitals: [],
  });
  // const dispatch = useDispatch();

  useEffect(() => {
    if (ipAdmissionId) {
      getVitals();
    }
    return () => {
      // dispatch(resetInpatientSelectedRoom());
    };
  }, []);

  const getVitals = async () => {
    getDoctorVitals(selectedInpatient?.ip_admissions?.doctor_id).then((response) => {
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
      const response = await inpatientVitalsCreate({
        ip_admission_id: ipAdmissionId,
        vitals: state.vitals,
      });

      if (response.success) {
        navigation.goBack();
        showSuccessSnackBar('Vitals created successfully');
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

  const handleChangeInfo = (diagInfo: string) => {
    setState((prev) => ({ ...prev, diagInfo }));
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
        title={strings.displayText.addVitals}
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
              style={commonStyles.menuIcon}
            />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.addVitals}</Text>
          <TouchableOpacity activeOpacity={0.8}>
            {/* <Image source={assets.AddPlusBlue} style={styles.addIcon} />
          </TouchableOpacity>
        </Box>
      </Box> */}
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
                onChangeDiagInfo={handleChangeInfo}
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
          snapPoints={['45%']}
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

export default InpatientVitals;
