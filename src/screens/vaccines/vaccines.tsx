import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import {
  AppContainer,
  Box,
  CustomDataNotFound,
  CustomHeader,
  PatientBottomSheet,
} from '../../components';
import { COLORS, assets, SIZES } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import VaccineCardItem from './VaccinesCardItem';
import { getVaccinesList } from '../../service/VaccineService';
import { showSnackBar } from '../../util/AlertUtil';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import VaccinesFilterBottomSheet from '../../components/CustomBottomSheet/CustomVaccinesFilterBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomCalenderBottomSheet from '../../components/CustomBottomSheet/CustomCalenderBottomSheet';
import { strings } from '../../i18n';
import { DrawerActions } from '@react-navigation/routers';
import { TextInput } from 'react-native-paper';
import styles from '../../styles/Vaccine.styles';
import commonStyles from '../../styles/Common.styles';
import InpatientLoader from '../../components/InpatientLoader';
import { isHpBottomTablet } from '../../hooks/useDeviceCheck';
import { useScrollEndDetection } from '../../hooks/useLogs';
import { SyncScreen, useSyncLocalDatabase } from '../../database/DBSync';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

type DateType = {
  startDate: string;
  endDate: string;
};

interface VaccineMaster {
  addon_period_count: string;
  addon_period_type: string;
  id: number;
  name: string;
  period_count: string;
  period_type: string;
}

interface VaccineDetails {
  vaccine_chart: readonly any[] | null | undefined;
  due_date: string;
  given_date: string | null;
  head_cr: string;
  height: string;
  patient_id: string;
  reminder_sent: string | null;
  reminder_sent_at: string | null;
  vaccine_id: string;
  vaccine_master: VaccineMaster;
  weight: string;
}

const Vaccines = ({ navigation }: Props) => {
  useSyncLocalDatabase(SyncScreen.vaccines);
  const { handleScroll } = useScrollEndDetection();
  const [vaccineList, setVaccineList] = useState<VaccineDetails[] | []>([]);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const [isOpen, setIsOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const [isCalenderOpen, setIsCalenderIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateType>();
  const [selectedFilterType, setSelectedFilterType] = useState('All');

  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);

  // BottomSheet Callbacks
  const handleClosePress = useCallback(() => {
    setIsOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleCalenderClosePress = useCallback(() => {
    setIsCalenderIsOpen(false);
    sheetRef.current?.close();
  }, []);

  const getVaccines = async (
    filter: string,
    date: { startDate: string | null; endDate: string | null },
  ) => {
    try {
      const resp = await getVaccinesList(selectedPatient?.id, filter, date);
      if (resp?.data[0]?.vaccine_chart?.length > 0) {
        setVaccineList(resp.data[0].vaccine_chart);
      } else {
        setVaccineList([]);
        // showSnackBar('No data found');
      }
      setLoading(false);
    } catch (error) {
      setVaccineList([]);
      setLoading(false);
      // showSnackBar('Error fetching vaccines');
    }
  };

  const handleSelectedFilterType = (filterType: string) => {
    if (typeof filterType === 'string') {
      setSelectedFilterType(filterType);

      getVaccines(filterType, {
        startDate: null,
        endDate: null,
      });
    } else {
      setSelectedFilterType('Custom');
      setDateRange(filterType);
      getVaccines('Custom', filterType);
    }
  };

  useEffect(() => {
    if (selectedPatient?.id) {
      getVaccines('All', {
        startDate: null,
        endDate: null,
      });
    }
  }, [selectedPatient?.id]);

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* <Box style={styles.container}> */}
      {/* <StatusBar backgroundColor={COLORS.background.white} barStyle={'dark-content'} /> */}
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Image source={assets.HamburgerMenu} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>{strings.displayText.vaccines}</Text>
          <Box width={10} />
        </Box>
        <Box style={styles.divider} />
      </Box> */}
      <CustomHeader
        leftIcon="menu"
        onLeftIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title={strings.displayText.vaccines}
        hasDivider
      />
      <Box>
        <Box style={styles.pateintDetailsContainer}>
          <Box style={styles.pateintContainer}>
            <Text style={styles.name}>{strings.displayText.patientDetails}</Text>
          </Box>
        </Box>
        <Box justifyContent="center" alignContent="center" marginHorizontal={20}>
          <TouchableOpacity onPress={() => setIsPatientOpen(true)}>
            <TextInput
              label={strings.displayText.patientsName}
              mode="outlined"
              placeholderTextColor={COLORS.gray}
              placeholder={strings.displayText.search}
              style={styles.inputTxtStyle}
              value={selectedPatient?.name}
              // disabled={true}
              editable={false}
              outlineColor={COLORS.white_smoke}
              activeOutlineColor={COLORS.grey_838383}
              theme={{
                colors: {
                  primary: COLORS.gray,
                  underlineColor: 'transparent',
                  background: COLORS.background.secondary,
                },
              }}
              // Add an icon at the end of the TextInput
              right={
                <TextInput.Icon
                  style={styles.iconStyle}
                  iconColor={COLORS.black}
                  disabled={true}
                  icon="chevron-down"
                  onPress={() => setIsPatientOpen(true)}
                />
              }
              onPressIn={() => setIsPatientOpen(true)}
            />
          </TouchableOpacity>
        </Box>
      </Box>
      <Box style={styles.pateintDetailsContainer}>
        <TouchableOpacity
          style={styles.pateintContainer}
          activeOpacity={0.8}
          hitSlop={{ bottom: 10, top: 10, left: 10, right: 10 }}
          onPress={() => setIsOpen(true)}
        >
          <Text style={styles.name}>
            {selectedFilterType}
            {selectedFilterType === 'Custom' ? (
              <Text>
                {' ('}
                {dateRange?.startDate} - {dateRange?.endDate} {')'}
              </Text>
            ) : null}
          </Text>
          <Box style={styles.justifyStyle}>
            <Image source={assets.filterBlack} style={commonStyles.filterIcon} />
          </Box>
        </TouchableOpacity>
        <Box height={SIZES.screenHeight / 1.4}>
          {isLoading && <InpatientLoader />}
          {!isLoading && vaccineList.length > 0 && (
            <FlatList
              // style={styles.scrollViewStyle}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              contentContainerStyle={styles.listContent}
              keyExtractor={(_item, index) => index.toString()}
              data={vaccineList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('VaccineDetail', { item: item });
                  }}
                >
                  <VaccineCardItem item={item} key={index?.toString()} />
                </TouchableOpacity>
              )}
            />
          )}
          {!isLoading && vaccineList.length === 0 && <CustomDataNotFound type="noOrderFound" />}
        </Box>
      </Box>
      {isPatientOpen && <PatientBottomSheet isOpen={isPatientOpen} setIsOpen={setIsPatientOpen} />}
      {isOpen && (
        <CustomBottomSheet
          openBSheet={isOpen}
          snapPoints={['60%']}
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          enableDynamicSizing
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.filters}
        >
          <VaccinesFilterBottomSheet
            handleSelectedFilterType={handleSelectedFilterType}
            handleClosePress={handleClosePress}
            setSheetState={setIsCalenderIsOpen}
          />
        </CustomBottomSheet>
      )}
      {isCalenderOpen && (
        <CustomBottomSheet
          openBSheet={isCalenderOpen}
          // snapPoints={[`${isHpBottomTablet(9.5)}`]}
          snapPoints={['72%']}
          enableDynamicSizing
          setSheetState={setIsCalenderIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.selectDate}
        >
          <CustomCalenderBottomSheet
            handleSelectedFilterType={handleSelectedFilterType}
            handleClosePress={handleCalenderClosePress}
            handleParentClosePress={handleClosePress}
          />
        </CustomBottomSheet>
      )}
      {/* </Box> */}
    </AppContainer>
  );
};

export default Vaccines;
