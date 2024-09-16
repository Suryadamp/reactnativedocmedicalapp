import BottomSheet from '@gorhom/bottom-sheet';
import { DrawerActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import {
  AppContainer,
  Box,
  CustomDataNotFound,
  CustomHeader,
  PatientBottomSheet,
} from '../../../components';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import { COLORS, SIZES, assets } from '../../../constants';
import { strings } from '../../../i18n';
import { RootStackParamList } from '../../../navigation/types';
import { RootState } from '../../../state';
import { AppointmentDetails } from '../../../state/appointments/appointments';
import styles from '../../../styles/Appointment.styles';
import AppointmentCard from './AppointmentCard';
import SupportBottomSheet from './SupportBottomSheet';
import CommonStyles from '../../../styles/Common.styles';
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons';
import { getListOfAppointments } from '../../../service/AppointmentService';
import { UsePermission } from '../../../hooks/usePermissionCheck';
import { permissionList } from '../../../constants/ApiConstants';
import InpatientLoader from '../../../components/InpatientLoader';
import { isHpBottomTablet } from '../../../hooks/useDeviceCheck';
import AppointmentFilterBottomSheet from '../../Admin/components/appointment_filter';
import CustomIconButton from '../../../components/IconButton';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const ViewAppointment = ({ navigation }: Props) => {
  const { appointmentList }: any = useSelector((state: RootState) => state.appointmentList);
  const { appConfiguration }: any = useSelector((state: RootState) => state.commonvariables);
  const { roles }: any = useSelector((state: RootState) => state.users);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const [appointmentData, setAppointmentData] = useState([]);
  const [setselectedAptItem, setsetselectedAptItem] = useState<AppointmentDetails>();
  const [selectedTab, setSelectedTab] = useState(1);
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  const [isOpen, setIsOpen] = useState(false);
  const [isPatientOpen, setIsPatientOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isOpenFilter, setOpenFilterSheet] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<any>([]);
  const [filterType, setFilterType] = useState<any>([]);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = [`${isHpBottomTablet(5, 1.9)}`];

  // BottomSheet Callbacks
  const handlePressBs = useCallback(() => {
    sheetRef.current?.close();
    setIsOpen(false);
  }, []);

  // Filter past and upcoming appointments
  const pastAppointments = useMemo(
    () =>
      appointmentData?.filter(
        (appointment: any) => appointment.appoint_date < formattedCurrentDate,
      ),
    [appointmentData],
  );
  const upcomingAppointments = useMemo(
    () =>
      appointmentData?.filter(
        (appointment: any) => appointment.appoint_date >= formattedCurrentDate,
      ),
    [appointmentData],
  );

  const sortByDsc = useCallback(() => {
    if (appointmentList && appointmentList?.data?.result?.length > 0) {
      const data = appointmentList?.data?.result;
      const sortedData: any = [...data].sort(
        (a: any, b: any) => new Date(b.appoint_date).getTime() - new Date(a.appoint_date).getTime(),
      );
      setAppointmentData(sortedData);
    } else {
      setAppointmentData([]);
    }
    setLoading(false);
  }, [appointmentList]);

  useEffect(() => {
    sortByDsc();
  }, [sortByDsc, appointmentList, selectedTab]);

  useEffect(() => {
    getListOfAppointments({ patient_id: selectedPatient?.id });
    setLoading(false);
  }, [selectedPatient?.id]);

  const handleApplyFilter = (tabName: string, option: any) => {
    if (tabName == 'Patient' && option.patient) {
      setAppointmentData(
        appointmentList.data.result.filter(
          (appointment: any) => appointment.patient_id == option.patient.id,
        ),
      );
      // setU(inpatientList.filter((inpatient) => inpatient.uhid == option.uhid));
      setFilterValues([option?.patient?.name]);
      setFilterType('Patient');
      setOpenFilterSheet(false);
    } else if (tabName == 'Doctor') {
      setAppointmentData(
        appointmentList.data.result.filter(
          (appointment: any) => appointment.doctor_id == option.doctor.id,
        ),
      );
      setOpenFilterSheet(false);
      setFilterValues([option?.name]);
      setFilterType('Doctor');
    } else {
      const today = new Date();

      if (option.date === 'Last 1 Year') {
        const lastYear = new Date(today);
        lastYear.setMonth(today.getFullYear() - 1);
        setAppointmentData(
          appointmentList.data.result.filter(
            (appointment: any) =>
              appointment.appoint_date >= lastYear && appointment.appoint_date <= lastYear,
          ),
        );
      } else if (option.date === 'Last 6 Month') {
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 6);
        setAppointmentData(
          appointmentList.data.result.filter(
            (appointment: any) =>
              appointment.appoint_date >= lastMonth && appointment.appoint_date <= lastMonth,
          ),
        );
      } else if (option.date === 'Last 1 Month') {
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        setAppointmentData(
          appointmentList.data.result.filter(
            (appointment: any) =>
              appointment.appoint_date >= lastMonth && appointment.appoint_date <= lastMonth,
          ),
        );
      }
      setOpenFilterSheet(false);
      setFilterValues([option.date]);
      setFilterType(option.date);
    }
  };

  const handleClearFilters = () => {
    sortByDsc();
    setFilterValues([]);
    setOpenFilterSheet(false);
  };

  const BsContent = (
    <>
      {(Number(setselectedAptItem?.status) === 1 || Number(setselectedAptItem?.status) === 3) && (
        <>
          {!appConfiguration[0]?.token_appointment_enable &&
            UsePermission(permissionList.mobileAppointmentsReschedule) && (
              <>
                <TouchableOpacity
                  style={styles.bsItem}
                  onPress={() => {
                    handlePressBs();
                    navigation.navigate('RescheduleAppointment', { item: setselectedAptItem });
                    handlePressBs();
                  }}
                >
                  <Image source={assets.Calendar2} style={styles.bsIcon} />
                  <Text style={styles.bsName}>Reschedule Appointment</Text>
                  {/* <Text style={styles.txtComingSoon}>coming soon</Text> */}
                </TouchableOpacity>
                <Box style={styles.divider} />
              </>
            )}
          {UsePermission(permissionList.mobileAppointmentsCancel) && (
            <>
              <TouchableOpacity
                style={styles.bsItem}
                onPress={() => {
                  // handleCancelApointment();
                  navigation.navigate('CancelAppointment', { item: setselectedAptItem });
                  handlePressBs();
                }}
              >
                {/* <Image source={assets.CalendarX} style={styles.bsIcon} /> */}
                <FontAwesome name={'calendar-times-o'} size={15} color={COLORS.black} />
                <Text style={styles.bsName}>Cancel Appointment</Text>
              </TouchableOpacity>
              <Box style={styles.divider} />
            </>
          )}
          {UsePermission(permissionList.mobileAppointmentsInvoice) && (
            <>
              <TouchableOpacity
                style={styles.bsItem}
                onPress={() => {
                  // handleCancelApointment();
                  // handlePressBs();
                }}
              >
                <Image source={assets.InvoiceIcon} style={styles.bsIcon} />
                <Text style={styles.bsName}>Invoice</Text>
                <Text style={styles.txtComingSoon}>coming soon</Text>
              </TouchableOpacity>
              <Box style={styles.divider} />
            </>
          )}
        </>
      )}
      {UsePermission(permissionList.mobileAppointmentsSupport) && (
        <TouchableOpacity
          style={styles.bsItem}
          onPress={() => {
            handlePressBs();
            setIsSupportOpen(true);
          }}
        >
          {/* <Image source={assets.Headset} style={styles.bsIcon} /> */}
          <MaterialCommunityIcons name={'headset'} size={15} color={COLORS.black} />
          <Text style={styles.bsName}>Support</Text>
        </TouchableOpacity>
      )}
    </>
  );

  function handleMoreMenuPress(item: AppointmentDetails): void {
    setIsOpen(true);
    setsetselectedAptItem(item);
  }

  return (
    <AppContainer
      statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* Header & title section */}
      <CustomHeader
        leftIcon="menu"
        rightIconType="icon"
        rightIcon="plus"
        onRightIconPress={() => navigation.navigate('SearchAppointment')}
        onLeftIconPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        title={strings.displayText.my_appointments}
        permission={UsePermission(permissionList.mobileAppointmentsAdd)}
      />
      <Box style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.tabTextContainer}
          onPress={() => {
            setSelectedTab(1);
          }}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.selectedSection,
              selectedTab === 1 ? styles.selectedSection : styles.unSelectedSection,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabTextContainer}
          onPress={() => {
            setSelectedTab(2);
          }}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.selectedSection,
              selectedTab === 2 ? styles.selectedSection : styles.unSelectedSection,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </Box>
      {roles.includes('patient') || roles.includes('doctor') ? (
        <Box marginTop={20} marginHorizontal={20}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 15, bottom: 15, left: 20, right: 20 }}
            onPress={() => {
              setIsPatientOpen(true);
            }}
          >
            <Box style={styles.accountBoxIconStyle}>
              <IconButton
                style={styles.accountIconStyle}
                name="account"
                size={CommonStyles.userIcon.height}
                color={COLORS.background.primary}
              />
              <Text style={styles.accNameStyle}>{selectedPatient?.name}</Text>
            </Box>
          </TouchableOpacity>
        </Box>
      ) : (
        <>
          {(selectedTab == 1 ? upcomingAppointments.length > 0 : pastAppointments.length > 0) && (
            <Box style={styles.filterContainer}>
              {filterValues.length > 0 ? (
                <Text>
                  {`${strings.displayText.resultsFound} `}
                  <Text style={styles.countStyle}>
                    (
                    {`${selectedTab === 1 ? upcomingAppointments.length : pastAppointments.length}`}
                    )
                  </Text>
                </Text>
              ) : (
                <Text style={styles.filterText}>{strings.displayText.filters}</Text>
              )}
              {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOpenFilterSheet(true)}
              hitSlop={{ left: 25, bottom: 25, top: 25, right: 25 }}
              style={{ justifyContent: 'center' }}
            >
              <Image source={assets.filterBlack} style={styles.filterIcon} />
            </TouchableOpacity> */}
              <CustomIconButton
                name="tune-variant"
                hitSlop={{ left: 50, bottom: 25, top: 15, right: 50 }}
                size={styles.filterIcon.height}
                onClick={() => setOpenFilterSheet(true)}
              />
            </Box>
          )}
          {filterValues.length > 0 && (
            <Box style={styles.clearContainer}>
              <Text
                style={styles.filterApplied}
              >{`${strings.displayText.filtersApplied} ${filterValues.join(',')}`}</Text>
              <TouchableOpacity
                hitSlop={{ top: 5, bottom: 5, left: 50, right: 50 }}
                onPress={handleClearFilters}
              >
                <Text style={styles.clearAll}>{strings.displayText.clearAll}</Text>
              </TouchableOpacity>
            </Box>
          )}
        </>
      )}
      <Box style={styles.appointmentContainer}>
        {isLoading && <InpatientLoader />}
        {!isLoading && selectedTab === 1 && upcomingAppointments.length === 0 && (
          <CustomDataNotFound type="appointments" />
        )}
        {!isLoading && selectedTab === 2 && pastAppointments.length === 0 && (
          <CustomDataNotFound type="appointments" />
        )}
        {!isLoading && (upcomingAppointments.length > 0 || pastAppointments.length > 0) && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewStyle}
            contentContainerStyle={styles.scrollViewContainer}
          >
            <Box style={{ width: SIZES.screenWidth }} marginTop={10}>
              {selectedTab === 1
                ? upcomingAppointments.map((item: AppointmentDetails, index: number) => (
                    <AppointmentCard
                      item={item}
                      openBSheet={handleMoreMenuPress}
                      tabNo={selectedTab}
                      key={index.toString()}
                      navigation={navigation}
                      isAdmin={!roles.includes('patient') && !roles.includes('doctor')}
                    />
                  ))
                : pastAppointments.map((item: AppointmentDetails, index: number) => (
                    <AppointmentCard
                      item={item}
                      openBSheet={handleMoreMenuPress}
                      tabNo={selectedTab}
                      key={index.toString()}
                      navigation={navigation}
                      isAdmin={!roles.includes('patient') && !roles.includes('doctor')}
                    />
                  ))}
            </Box>
          </ScrollView>
        )}
      </Box>
      {isPatientOpen && <PatientBottomSheet isOpen={isPatientOpen} setIsOpen={setIsPatientOpen} />}
      {isOpen && (
        <CustomBottomSheet
          openBSheet={isOpen}
          snapPoints={
            Number(setselectedAptItem?.status) === 1 || Number(setselectedAptItem?.status) === 3
              ? Platform.OS === 'ios'
                ? ['40%']
                : snapPoints
              : Platform.OS === 'ios'
                ? ['16%']
                : [`${isHpBottomTablet(2.5)}`]
          }
          setSheetState={setIsOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.bsLayout}
          // contentContainerStyle={styles.contentContainerStyle}
          children={BsContent}
          title="Options"
        />
      )}
      {isSupportOpen && (
        <CustomBottomSheet
          openBSheet={isSupportOpen}
          snapPoints={['15%']}
          setSheetState={setIsSupportOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.bsLayout}
          children={<SupportBottomSheet />}
          title="Need Support ?"
        />
      )}
      {isOpenFilter && (
        <CustomBottomSheet
          openBSheet={isOpenFilter}
          snapPoints={['70%']}
          enableDynamicSizing
          setSheetState={(data) => setOpenFilterSheet(data)}
          backgroundStyle={styles.backgroundStyle}
          title="Filters"
        >
          <AppointmentFilterBottomSheet
            data={selectedTab === 1 ? upcomingAppointments : pastAppointments}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilters}
          />
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default ViewAppointment;
