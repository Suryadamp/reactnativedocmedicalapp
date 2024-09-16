import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { AbstractButton, AppContainer, Box } from '../../../../components';
import { COLORS, FONTS, SIZES, assets } from '../../../../constants';
import { RootStackParamList } from '../../../../navigation/types';
import {
  getAppointmentSlots,
  getDoctorAvaibleDays,
  getListOfAppointments,
  rescheduleAppointment,
} from '../../../../service/AppointmentService';
import { PurposeItem } from '../../../../state/appointments/purposesOfAppointment';
import { convertDateToString, convertMomentToDate } from '../../../../util/DateUtil';
import SuccessCard from '../../BookAppointment/SuccessCard';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { showErrorSnackBar, showSnackBar } from '../../../../util/AlertUtil';
import { RootState } from '../../../../state';
import { useSelector } from 'react-redux';
import styles from '../../../../styles/Appointment.styles';
import InpatientLoader from '../../../../components/InpatientLoader';
import CustomHeader from '../../../../components/CustomHeader';
import { strings } from '../../../../i18n';
import { useScrollEndDetection } from '../../../../hooks/useLogs';

interface NavigateProps {
  navigation: any;
  route: any;
}
type Props = NativeStackScreenProps<RootStackParamList> | NavigateProps;

const slots = [
  {
    id: 1,
    shift: 'Morning',
    shifIcon: assets.Sunfog,
    bookedSlots: null,
    slotSplit: 12,
  },
  {
    id: 2,
    shift: 'Afternoon',
    shifIcon: assets.Sun,
    bookedSlots: null,
    slotSplit: 12,
  },
  {
    id: 3,
    shift: 'Evening',
    shifIcon: assets.Evening,
    bookedSlots: null,
    slotSplit: 12,
  },
];

interface BottomsheetTitleProps {
  title: string;
  subtitle: string;
}

export const BottomsheetTitle: React.FC<BottomsheetTitleProps> = ({ title, subtitle }) => {
  return (
    <Box flex={1}>
      <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: FONTS.SFProDisplayBold }}>
        {title}
      </Text>
      <Box alignSelf="center" width={'75%'}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Box>
    </Box>
  );
};

const RescheduleAppointment = ({ navigation, route }: Props) => {
  const item = route.params?.item;
  const { handleScroll } = useScrollEndDetection();
  const { appConfiguration } = useSelector((state: RootState) => state.commonvariables);
  const { mobile, userId } = useSelector((state: RootState) => state.users);
  const [slotsArr] = useState(slots);
  const [slotsData, setSlotsData] = useState<any>(slots);
  const [showModal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [bookLoader, setBookLoader] = useState(false);
  const [consultationForItem, setconsultationForItem] = useState<PurposeItem | null>(null);
  const [selectedSlotItem, setSelectedSlotItem] = useState(slots[0]);
  const [selectedSlotData, setSelectedSlotData] = useState([]);
  const [selectSlot, setSelectSlot] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDateString, setSelectedDateString] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newAptData, setNewAptData] = useState();

  useEffect(() => {
    if (selectedDateString == null) {
      const dateString = convertDateToString(new Date());
      setSelectedDateString(dateString);
    }
  }, [selectedDateString]);

  const handleSelectSlot = (slot: string) => {
    setSelectSlot(slot);
  };

  const handleClose = () => {
    setShowModal(!showModal);
  };

  function handleDateSelected(date: moment.Moment) {
    const dateString = convertMomentToDate(date);
    setSelectedDate(new Date(dateString));
    setSelectedDateString(dateString);
  }

  const getAppointmentSlotsList = async () => {
    try {
      if (selectedDateString && item?.doctor_id && item?.purpose_id) {
        setLoader(true);
        const result = await getAppointmentSlots(
          item?.doctor_id,
          item?.purpose_id,
          selectedDateString,
        );

        if (result?.data) {
          setSlotsData(result?.data);
          setSelectedSlotItem(slots[0]);
          const morningData = result?.data?.morning || [];
          setSelectedSlotData(morningData);
        }
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AppointmentInfo = ({ title, name, id, type }: any) => {
    return (
      <Box justifyContent="center" alignContent="center">
        <Box marginHorizontal={20} marginVertical={10}>
          <Text style={{ fontSize: 14, fontFamily: FONTS.SFProDisplayMedium, color: '#8A8A8A' }}>
            {title}
          </Text>
          <Box display="flex" flexDirection="row" marginVertical={5}>
            {type === 'Ionicons' ? (
              <Ionicons
                style={{ alignSelf: 'center', marginRight: 10 }}
                name="person-outline"
                size={12}
                color={COLORS.text}
              />
            ) : type === 'MaterialCommunityIcons' ? (
              <MaterialCommunityIcons
                style={{ alignSelf: 'center', marginRight: 10 }}
                name="calendar-blank-outline"
                size={12}
                color={COLORS.text}
              />
            ) : (
              <Image
                source={assets.NounSmell}
                style={{
                  height: 12,
                  width: 12,
                  alignSelf: 'center',
                  marginRight: 10,
                  tintColor: COLORS.text,
                }}
              />
            )}
            {id ? (
              <Text
                style={{ fontSize: 12, fontFamily: FONTS.SFProDisplayRegular, color: COLORS.text }}
              >{`${name}  (${id})`}</Text>
            ) : (
              <Text
                style={{ fontSize: 12, fontFamily: FONTS.SFProDisplayRegular, color: COLORS.text }}
              >
                {name}{' '}
              </Text>
            )}
          </Box>
        </Box>
        <Box style={styles.divider} marginBottom={5} />
      </Box>
    );
  };

  const handleSelectTime = (data: any) => {
    let shiftData = [];

    if (data?.shift === 'Afternoon') {
      shiftData = slotsData.aftrnoon || [];
    } else if (data?.shift === 'Morning') {
      shiftData = slotsData.morning || [];
    } else if (data?.shift === 'Evening') {
      shiftData = slotsData.evening || [];
    } else {
      shiftData = slotsData.night || [];
    }

    setSelectedSlotData(shiftData);
  };

  const doctorAvaibleDays = async () => {
    try {
      const result = await getDoctorAvaibleDays(item?.doctor_id);
      if (result?.data?.available_dates) {
        setAvailableDates(result.data.available_dates);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAppointment = async () => {
    setBookLoader(true);
    if (!selectSlot?.id) {
      setBookLoader(false);
      showErrorSnackBar('Please select the slot.');
      return;
    } else {
      if (checked) {
        appointmentReschedule();
      } else {
        setBookLoader(false);
        setChecked(true);
      }
    }
  };

  const appointmentReschedule = async () => {
    const data = {
      appoint_id: item?.id,
      doctor_id: item?.doctor_id,
      user_id: userId,
      patient_id: item?.patient_id,
      purpose_id: item?.purpose_id,
      slot_id: selectSlot?.id,
      appoint_date: selectedDateString,
      slot_label: selectSlot?.slot_name,
      status: 3,
      // mobile: mobile,
      type: item?.type,
    };

    await rescheduleAppointment(data)
      .then((res) => {
        const aptData = {
          appoint_id: res?.data?.op_no,
          appoint_date: res?.data?.appoint_date,
          slot_label: data?.slot_label ?? '-',
        };
        setBookLoader(false);
        setNewAptData(aptData as any);
        setShowModal(true);
        getListOfAppointments();
        setChecked(false);
      })
      .catch((error) => {
        setBookLoader(false);
        console.log(error);
      });
  };

  useEffect(() => {
    doctorAvaibleDays();
  }, []);

  useEffect(() => {
    if (selectedDateString) {
      setSelectedSlotData([]);
      getAppointmentSlotsList();
    }
  }, [selectedDateString, consultationForItem]);

  return (
    <AppContainer
    statusBarBgColor={COLORS.transparent}
      statusBarStyle={'dark-content'}
      style={styles.container}
    >
      {/* <StatusBar backgroundColor={COLORS.background.secondary} barStyle={'dark-content'} /> */}
      <CustomHeader
        leftIcon={'arrow-left'}
        title={strings.displayText.rescheduleAppointment}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      {/* <Box style={styles.header}>
        <Box style={styles.topBar}>
          <TouchableOpacity
            style={{ padding: 1 }}
            hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
            activeOpacity={0.8}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={assets.backArrowBlack} style={commonStyles.menuIcon} />
          </TouchableOpacity>
          <Text style={commonStyles.topTitleText}>Reschedule Appointment</Text>
          <Box style={styles.titleContainer} />
        </Box>
      </Box> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <Box>
          <Box style={styles.cardContainer}>
            <Box style={styles.imageContainer}>
              <Image
                source={item?.doctorImage ? item?.doctorImage : assets.ProfileImage}
                style={styles.doctorImage}
              />
            </Box>
            <Box style={styles.detailsContainer}>
              <Box style={styles.docDetails}>
                <Box style={styles.nameContainer}>
                  <Text style={styles.name}>{item?.doctor_name}</Text>
                  <Text style={styles.category}>
                    {item?.department?.split('-')[0] ?? 'Cardiologist- Civil Surgeon'}
                  </Text>
                  <Box style={styles.options}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                      <Box style={styles.timeContainer}>
                        <Text style={styles.timeText}>10.00AM - 05.30 PM</Text>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <>
            <AppointmentInfo
              title="Patient Name"
              name={item?.patient_name ?? '-'}
              id={item?.uhid ?? '-'}
              type={'Ionicons'}
            />
            <AppointmentInfo
              title="Consultation For"
              name={item?.purpose ?? '-'}
              type={'MaterialCommunityIcons'}
            />
            <AppointmentInfo
              title="Existing Date & Time"
              name={`${item?.appoint_date ?? ''} - ${item?.slot_label ?? ''}`}
            />
          </>
          {checked ? (
            <AppointmentInfo
              title="New Date & Time"
              name={`${selectedDateString ?? ''} - ${selectSlot?.label ?? ''}`}
              type={'MaterialCommunityIcons'}
            />
          ) : (
            <>
              <Box style={styles.aboutContainer}>
                <Box marginHorizontal={18}>
                  <Text style={styles.name}>Choose Your Slot</Text>
                </Box>
                <CalendarStrip
                  scrollable
                  style={{ paddingVertical: 20, height: 108, marginTop: 10 }}
                  minDate={new Date()}
                  onDateSelected={(date) => handleDateSelected(date)}
                  selectedDate={selectedDate}
                  calendarHeaderStyle={styles.CalendarStripHeaderStyle}
                  dateNameStyle={{ color: COLORS.black }}
                  dateNumberStyle={styles.calenderDateNumberStyle}
                  highlightDateNumberStyle={styles.calenderHighlightDateNumberStyle}
                  highlightDateContainerStyle={styles.calenderHighlightDateContainerStyle}
                  highlightDateNameStyle={{ color: COLORS.background.white }}
                  disabledDateNumberStyle={styles.calenderDisableDateNumberStyle}
                  dayContainerStyle={{ height: 60 }}
                  dayComponentHeight={60}
                  datesWhitelist={availableDates}
                />
              </Box>
              {!appConfiguration[0]?.token_appointment_enable && (
                <>
                  <Box style={styles.divider} marginBottom={10} />
                  <FlatList
                    style={{ width: SIZES.screenWidth }}
                    data={slotsArr}
                    onScroll={handleScroll}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedSlotItem(item);
                          handleSelectTime(item);
                        }}
                        key={item?.id.toString()}
                      >
                        <Box
                          style={styles.slotTitleContainer}
                          marginHorizontal={SIZES.screenWidth / 22}
                        >
                          <Image
                            source={item.shifIcon}
                            style={[
                              styles.slotIcon,
                              {
                                tintColor:
                                  selectedSlotItem.id === item.id
                                    ? COLORS.background.primary
                                    : COLORS.black,
                              },
                            ]}
                          />
                          <Text
                            style={[
                              styles.slotName,
                              selectedSlotItem.id === item.id && styles.selectedSlotName,
                            ]}
                          >
                            {item.shift}
                          </Text>
                        </Box>
                      </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                  <Box style={styles.divider} marginTop={10} />
                  <Box style={styles.slotsContainer}>
                    {selectedSlotData?.map((ele: any, index) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          key={index.toString()}
                          disabled={ele?.appoint_id === null ? false : true}
                          onPress={() => {
                            handleSelectSlot(ele);
                          }}
                        >
                          <Box
                            key={index.toString()}
                            style={
                              ele?.appoint_id !== null
                                ? styles.selectedBookedSlotBox
                                : selectSlot?.id === ele?.id
                                  ? styles.selectedSlotBox
                                  : styles.slotBox
                            }
                          >
                            <MaterialCommunityIcons
                              name={
                                ele?.appoint_id !== null || selectSlot?.id === ele?.id
                                  ? 'check-circle'
                                  : 'circle-outline'
                              }
                              size={12}
                              color={
                                ele?.appoint_id !== null || selectSlot?.id === ele?.id
                                  ? COLORS.background.white
                                  : '#8A8A8A'
                              }
                            />
                            <Text
                              style={
                                ele?.appoint_id !== null ||
                                selectedSlotItem.bookedSlots === index ||
                                selectSlot?.id === ele?.id
                                  ? styles.selectedSlotText
                                  : styles.slotBoxText
                              }
                            >
                              {ele?.label}
                            </Text>
                          </Box>
                        </TouchableOpacity>
                      );
                    })}
                  </Box>

                  <>
                    {loader ? (
                      <InpatientLoader />
                    ) : (
                      <>
                        {selectedSlotData?.length === 0 && (
                          <Box flex={1} alignItems="center" justifyContent="center" height={70}>
                            <Text style={styles.noSlots}>No Slot(s) Available</Text>
                          </Box>
                        )}
                      </>
                    )}
                  </>
                </>
              )}
            </>
          )}
        </Box>
      </ScrollView>
      <Box style={styles.btnContainer}>
        <Box display="flex" flexDirection="row">
          <MaterialCommunityIcons
            style={{ alignSelf: 'center', marginRight: 5 }}
            name="check-circle"
            size={13}
            color={'#17CF9D'}
          />
          <Text style={styles.viewBill}>Bill Paid</Text>
        </Box>
        <Box width={'75%'}>
          <AbstractButton
            loader={bookLoader}
            onPress={checkAppointment}
            buttonStyle={styles.bookSlotBtn}
            textStyle={styles.bookSlotBtnText}
          >
            Confirm Appointment
          </AbstractButton>
        </Box>
      </Box>
      {showModal && (
        <Box>
          <SuccessCard
            close={handleClose}
            appointmentData={newAptData}
            navigation={navigation}
            navigationFrom={route?.params?.from || 'My Appointments'}
            title="Rescheduled"
          />
        </Box>
      )}
    </AppContainer>
  );
};

export default RescheduleAppointment;
