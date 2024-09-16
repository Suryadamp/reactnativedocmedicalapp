// Admin - ViewAppointment
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS, FONTS, SIZES, assets } from '../../../constants';
import { strings } from '../../../i18n';
import { RootStackParamList } from '../../../navigation/types';
import { RootState } from '../../../state';
import { setSelectPatient } from '../../../state/patients';

import { Box, AppContainer, CustomBottomSheet } from '../../../components';
import { IAppointmentListState } from '../helper/types';
import AppointmentFilterBottomSheet from '../components/appointment_filter';
import AppointmentItem from '../components/appointment_item';
import MenuBottomSheet from '../components/menu_bottom_sheet';
import StatusTrackBottomSheet from '../components/status_track_sheet';
import { trackStatusAppointment, getListOfAppointments } from '../../../service/AppointmentService';
import commonStyles from '../../../styles/Common.styles';
import { UsePermission } from '../../../hooks/usePermissionCheck';
import { permissionList } from '../../../constants/ApiConstants';
import { FlatList } from 'react-native';
import CustomActivityIndicator from '../../../components/CustomActivityIndicator';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const initialState: IAppointmentListState = {
  doctor: null,
  isFilterOpen: false,
  filterType: '',
  selectedDate: new Date(),
  selectedDateString: '',
  isShowMenuBottomSheet: false,
  isOpenTrackStatus: false,
  selectedAppointment: null,
  filterValue: '',
};

export const ViewAppointments = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { appointmentList } = useSelector((state: RootState) => state.appointmentList);
  const { patientList } = useSelector((state: RootState) => state.patients);
  const [loader, setLoader] = useState(false);
  const [loaderRefresh, setLoaderRefresh] = useState(false);
  const [page, setPage] = useState(2);
  const [totalPage, setTotalPage] = useState(2);
  const [state, setState] = useState<any>({
    ...initialState,
    appointments: [],
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, appointments: (appointmentList as any)?.data?.result }));
  }, [appointmentList]);

  const handleClearFilters = () => {
    const appointments = (appointmentList as any)?.data?.result;
    setState((prev) => ({
      ...prev,
      filterType: '',
      filterValue: '',
      appointments,
      isFilterOpen: false,
    }));
  };

  const handleApplyFilter = async (type: string, value: any) => {
    const appointmentLists = (appointmentList as any)?.data?.result;
    if (type === strings.displayText.doctor) {
      const appointments = appointmentLists.filter(
        (appointment: any) => appointment.doctor_id === value.doctor.id,
      );
      setState((prev) => ({
        ...prev,
        filterType: type,
        filterValue: value.doctor.name,
        appointments,
        isFilterOpen: false,
      }));
    } else if (type === strings.displayText.patient) {
      const appointments = appointmentLists.filter(
        (appointment: any) => appointment.patient_id === value.patient.id,
      );
      setState((prev) => ({
        ...prev,
        filterType: type,
        filterValue: value.patient.name,
        appointments,
        isFilterOpen: false,
      }));
    } else {
      const today = new Date();

      if (value.date === 'Last 1 Month') {
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 1);
        const appointments = appointmentLists.filter(
          (appointment: any) =>
            appointment.appoint_date >= lastMonth && appointment.appoint_date <= today,
        );
        setState((prev) => ({
          ...prev,
          filterType: type,
          appointments,
          filterValue: value.date,
          isFilterOpen: false,
        }));
      } else if (value.date === 'Last 1 Year') {
        const lastYear = new Date(today);
        lastYear.setFullYear(today.getFullYear() - 1);
        const appointments = appointmentLists.filter(
          (appointment: any) =>
            appointment.appoint_date >= lastYear && appointment.appoint_date <= today,
        );
        setState((prev) => ({
          ...prev,
          filterType: type,
          appointments,
          filterValue: value.date,
          isFilterOpen: false,
        }));
      } else if (value.date === 'Last 6 Month') {
        const lastMonth = new Date(today);
        lastMonth.setMonth(today.getMonth() - 6);
        const appointments = appointmentLists.filter(
          (appointment: any) =>
            appointment.appoint_date >= lastMonth && appointment.appoint_date <= today,
        );
        setState((prev) => ({
          ...prev,
          filterType: type,
          appointments,
          filterValue: value.date,
          isFilterOpen: false,
        }));
      }
    }
  };

  const onCancel = () => {
    navigation.navigate('CancelAppointment', {
      item: state.selectedAppointment,
      from: 'AdminAppointment',
    });

    setState((prev) => ({
      ...prev,
      isShowMenuBottomSheet: false,
    }));
  };

  const onInvoice = async () => {
    const patient = (patientList || []).find(
      (ptn) => ptn.id === state.selectedAppointment.patient_id,
    );
    if (patient) {
      await dispatch(setSelectPatient(patient));
      navigation.navigate('Bills & Payments', { from: 'AdminAppointment' });

      setState((prev) => ({
        ...prev,
        isShowMenuBottomSheet: false,
      }));
    }
  };

  const onReschedule = () => {
    navigation.navigate('RescheduleAppointment', {
      item: state.selectedAppointment,
      from: 'AdminAppointment',
    });

    setState((prev) => ({
      ...prev,
      isShowMenuBottomSheet: false,
    }));
  };

  const handleTrackStatus = (appointment: any) => {
    if (appointment?.status !== 2) {
      setState((prev) => ({
        ...prev,
        isOpenTrackStatus: true,
        selectedAppointment: appointment,
      }));
    }
  };

  const onUpdateStatus = async (appointmentId: string, type: string) => {
    await trackStatusAppointment(appointmentId, type)
      .then((res) => {
        if (res && res.success) {
          getListOfAppointments();
        }
      })
      .catch((error) => {
        console.log('Error', error);
        console.log(error);
      });
  };

  const handleAppointmentList = async () => {
    if (loader) return;
    setLoader(true);
    console.log(page, totalPage);
    if (page <= totalPage) {
      await getListOfAppointments({ start: page })
        .then((response) => {
          console.log('testtt', response?.data?.result);
          setState((prevState) => ({
            ...prevState,
            appointments: [...prevState.appointments, ...response?.data?.result],
          }));
          setTotalPage(Math.ceil(response.data?.totalRecords / 10));
          setPage(page + 1);
          setLoader(false);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
          setLoader(false);
        });
    } else {
      setLoader(false);
    }
  };

  const onRefresh = () => {
    getListOfAppointments();
    setPage(2);
    setTotalPage(2);
    console.log('redreshh');
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
          <Box style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            >
              <Image source={assets.HamburgerMenu} style={styles.icon} />
            </TouchableOpacity>
            <Text style={commonStyles.topTitleText}>{strings.displayText.appointmentList}</Text>
            {UsePermission(permissionList.mobileAppointmentsView) ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('SearchAppointment', { from: 'AdminAppointment' });
                }}
              >
                <Image source={assets.AddPlusBlue} style={styles.addIcon} />
              </TouchableOpacity>
            ) : (
              <Box />
            )}
          </Box>
        </Box>
        <Box style={styles.patientDetailsContainer}>
          <Box style={styles.patientContainer}>
            <Text style={styles.name}>
              {state.filterType ? `Results found (${state.appointments.length})` : 'Filters'}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setState((prev) => ({ ...prev, isFilterOpen: true }))}
              style={styles.justifyStyle}
            >
              <Image source={assets.filterBlack} style={styles.filterIcon} />
            </TouchableOpacity>
          </Box>
        </Box>
        {state.filterValue && (
          <Box style={styles.filterContainer}>
            <Text style={styles.filterValues}>{state.filterValue}</Text>
            <TouchableOpacity style={styles.cancelIcon} onPress={() => handleClearFilters()}>
              <MaterialCommunityIcons name="alpha-x" size={15} color="#000" />
            </TouchableOpacity>
          </Box>
        )}
        <FlatList
          data={state.appointments}
          keyExtractor={(item) => item.id.toString()} // Assuming id is a unique identifier
          renderItem={({ item }) => (
            <Box style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
              <AppointmentItem
                appointment={item}
                navigation={navigation}
                onTrackStatus={() => handleTrackStatus(item)}
                onMenu={() =>
                  setState((prev) => ({
                    ...prev,
                    isShowMenuBottomSheet: true,
                    selectedAppointment: item,
                  }))
                }
              />
            </Box>
          )}
          onEndReached={handleAppointmentList}
          onEndReachedThreshold={0.5}
          refreshing={loaderRefresh}
          onRefresh={onRefresh}
          ListFooterComponent={loader ? <CustomActivityIndicator loader={false} /> : null}
        />
        {/* <ScrollView >
          {state.appointments &&
            state.appointments.length > 0 &&
            state.appointments.map((appointment: any) => (
              <Box style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <AppointmentItem
                  key={`${appointment.id}`}
                  appointment={appointment}
                  navigation={navigation}
                  onTrackStatus={() => handleTrackStatus(appointment)}
                  onMenu={() =>
                    setState((prev) => ({
                      ...prev,
                      isShowMenuBottomSheet: true,
                      selectedAppointment: appointment,
                    }))
                  }
                />
              </Box>
            ))}
        </ScrollView> */}
      </AppContainer>
      {state.isFilterOpen && (
        <CustomBottomSheet
          openBSheet={state.isFilterOpen}
          snapPoints={['50%']}
          setSheetState={(value) => setState((prev) => ({ ...prev, isFilterOpen: value }))}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.filters}
        >
          <AppointmentFilterBottomSheet
            data={state.appointments}
            onApplyFilter={handleApplyFilter}
            onClearFilter={handleClearFilters}
          />
        </CustomBottomSheet>
      )}
      {state.isShowMenuBottomSheet && (
        <CustomBottomSheet
          openBSheet={state.isShowMenuBottomSheet}
          snapPoints={['40%']}
          setSheetState={(value) => setState((prev) => ({ ...prev, isShowMenuBottomSheet: value }))}
          enablePanDownToClose={false}
          backgroundStyle={styles.menuBsLayout}
          children={
            <MenuBottomSheet
              appointment={state.selectedAppointment}
              onReschedule={onReschedule}
              onCancel={onCancel}
              onInvoice={onInvoice}
            />
          }
          title="Options"
        />
      )}
      {state.isOpenTrackStatus && (
        <CustomBottomSheet
          openBSheet={state.isOpenTrackStatus}
          snapPoints={['100%']}
          setSheetState={(value) => setState((prev) => ({ ...prev, isOpenTrackStatus: value }))}
          enablePanDownToClose={false}
          backgroundStyle={styles.bsLayout}
          children={
            <StatusTrackBottomSheet
              appointment={state.selectedAppointment}
              onTrackStatus={onUpdateStatus}
            />
          }
          title="Patient Status Tracking"
        />
      )}
    </>
  );
};

export default ViewAppointments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  bsLayout: {
    padding: 20,
    width: '100%',
  },
  menuBsLayout: {
    width: '100%',
  },
  header: {
    justifyContent: 'center',
    marginTop: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  addIcon: {
    height: 20,
    width: 20,
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  selectedDate: {
    padding: 5,
    backgroundColor: COLORS.background.primary,
    borderRadius: 4,
  },
  patientDetailsContainer: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  patientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.black,
    fontStyle: 'normal',
    letterSpacing: -0.24,
  },
  filterIcon: {
    alignItems: 'center',
    height: 14,
    width: 14,
  },
  justifyStyle: {
    justifyContent: 'center',
  },
  filterContainer: {
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
    backgroundColor: '#EFEFEF',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  filterValues: {
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.black,
    fontStyle: 'normal',
    letterSpacing: -0.24,
  },
  cancelIcon: {
    paddingLeft: 5,
  },
});
