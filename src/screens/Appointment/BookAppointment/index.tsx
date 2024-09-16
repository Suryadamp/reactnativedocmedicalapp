import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Platform, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AbstractButton, AppContainer, Box, PatientBottomSheet } from '../../../components';
import { COLORS, FONTS, SIZES, assets } from '../../../constants';
import { RootStackParamList } from '../../../navigation/types';
import {
  bookNewAppointment,
  getAppointmentSlots,
  getCheckAppointments,
  getDoctorAvaibleDays,
  getListOfAppointments,
} from '../../../service/AppointmentService';
import { RootState } from '../../../state';
import { PurposeItem } from '../../../state/appointments/purposesOfAppointment';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import CustomSelectBottomSheet from '../../../components/CustomBottomSheet/CustomSelectBottomSheet';
import { strings } from '../../../i18n';
import { getPatientsList } from '../../../service/Patients';
import { setTempPatientList } from '../../../state/patients';
import styles from '../../../styles/Appointment.styles';
import { showErrorSnackBar, Snackbar } from '../../../util/AlertUtil';
import { handleRazorPayment } from '../../../util/CommonFunctions';
import { convertDateToString, convertMomentToDate } from '../../../util/DateUtil';
import PaymentSummaryBottomSheet from './PaymentSummaryBottomSheet';
import SuccessCard from './SuccessCard';
import { isHpTablet, isHpBottomTablet } from '../../../hooks/useDeviceCheck';
import InpatientLoader from '../../../components/InpatientLoader';
import CustomHeader from '../../../components/CustomHeader';
import IconButton from '../../../components/IconButton';
import { useScrollEndDetection } from '../../../hooks/useLogs';

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
      <Text
        style={{
          textAlign: 'center',
          fontSize: isHpTablet('2.2'),
          fontFamily: FONTS.SFProDisplayBold,
          lineHeight: 20,
        }}
      >
        {title}
      </Text>
      <Box alignSelf="center" width={'80%'}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </Box>
    </Box>
  );
};

const BookAppointment = ({ navigation, route }: Props) => {
  const { handleScroll } = useScrollEndDetection();
  const { item, bookAgain, type, navigationFrom } = route.params;
  const { permissions } = useSelector((state: RootState) => state.users);
  const bookType = type ? (type[0]?.group_name === 'Consultation Fee' ? 1 : 2) : bookAgain?.type;
  const docItem = item ? item : bookAgain;
  const doctorChargeData = type ? type[0] : bookAgain?.doctor_charge;
  const doctorId = item?.id ? item?.id : bookAgain?.doctor_id;
  const dispatch = useDispatch();
  const { mobile } = useSelector((state: any) => state.auth);
  const { purposeList } = useSelector((state: RootState) => state.purposesOfAppointment);
  const { selectedPatient } = useSelector((state: RootState) => state.patients);
  const { appConfiguration, commonVariable } = useSelector(
    (state: RootState) => state.commonvariables,
  );
  const { roles } = useSelector((state: RootState) => state.users);
  const [slotsArr] = useState(slots);
  const [slotsData, setSlotsData] = useState<any>(slots);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
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
  const snapPoints = ['50%'];

  // BottomSheet Hooks
  const sheetRef = useRef<BottomSheet>(null);

  // BottomSheet Callbacks
  const handleClosePress = useCallback(() => {
    setIsConsultOpen(false);
    sheetRef.current?.close();
  }, []);

  const handleSummaryClosePress = useCallback(() => {
    setIsSummaryOpen(false);
    sheetRef.current?.close();
  }, []);

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
      if (selectedDateString && doctorId && consultationForItem?.id) {
        setLoader(true);
        const result = await getAppointmentSlots(
          doctorId,
          consultationForItem?.id,
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

  const handleBookSlot = () => {
    const paymentItems = {
      description: commonVariable[0]?.op_bill,
      amount: doctorChargeData?.price,
      name: selectedPatient?.name,
    };
    setBookLoader(true);
    handleRazorPayment(paymentItems)
      .then(async (result) => {
        setBookLoader(true);
        if (result.success) {
          const data = selectedPatient?.uhid
            ? {
              doctor_id: doctorId,
              purpose_id: consultationForItem?.id,
              patient_id: selectedPatient?.id,
              slot_label: selectSlot?.slot_name ?? '',
              slot_id: selectSlot?.id ?? '',
              // department: commonVariable[0]?.op_bill,
              appoint_date: selectedDateString,
              status: 1,
              items: [doctorChargeData?.id],
              transaction_id: result.response?.razorpay_payment_id,
              transaction_by: 'Razorpay',
              type: bookType,
            }
            : {
              doctor_id: doctorId,
              purpose_id: consultationForItem?.id,
              patient_id: null,
              slot_label: selectSlot?.slot_name ?? '',
              slot_id: selectSlot?.id ?? '',
              // department: commonVariable[0]?.op_bill,
              appoint_date: selectedDateString,
              status: 1,
              items: [doctorChargeData?.id],
              transaction_id: result.response?.razorpay_payment_id,
              transaction_by: 'Razorpay',
              user_mobile: mobile,
              title: selectedPatient?.title,
              name: selectedPatient?.name,
              age: selectedPatient?.age,
              sex: selectedPatient?.sex,
              dob: selectedPatient?.dob,
              mobile: selectedPatient?.mobile,
              blood_group: selectedPatient?.blood_group,
              email: selectedPatient?.email,
              area: selectedPatient?.address,
              type: bookType,
            };

          bookNewAppointment(data)
            .then(async (res) => {
              if (res?.data?.op_no) {
                if (selectedPatient?.uhid === undefined) {
                  console.error("need to implement patient delete");
                  // await Patient.deletePatient(selectedPatient?.id);
                  // const localPatients: any = await Patient.getPatientByUserId(userId);
                  // dispatch(setTempPatientList(localPatients));
                  await getPatientsList();
                }
                const aptData = {
                  appoint_id: res?.data?.op_no,
                  appoint_date: res?.data?.appoint_date,
                  slot_label: data?.slot_label ?? '-',
                  patientName: selectedPatient?.name,
                  price: doctorChargeData?.price,
                };
                setNewAptData(aptData as any);
                setShowModal(true);
                getListOfAppointments({ patient_id: data?.patient_id });
                setBookLoader(false);
              } else {
                setBookLoader(false);
                console.log('Error:', res?.data);
              }
            })
            .catch((err) => {
              console.log(err);
              setBookLoader(false);
            });
        } else {
          // Payment failed, access result.error
          console.log('Error:', result.error?.code, result.error?.description);

          setBookLoader(false);
        }
      })
      .catch((error) => {
        // Handle unexpected errors
        showErrorSnackBar('Payment Canceled');
        setBookLoader(false);
        console.log('Unexpected error:', error);
      });
  };

  const checkAppointment = async () => {
    setBookLoader(true);
    if (consultationForItem == null) {
      setBookLoader(false);
      showErrorSnackBar('Please select Consultation For');
      return;
    }
    if (selectedPatient == null) {
      setBookLoader(false);
      showErrorSnackBar('Please select patient name');
      return;
    }

    await getCheckAppointments(selectedPatient?.id, doctorId, selectedDateString)
      .then((resp) => {
        if (resp.data == null) {
          if (doctorChargeData?.price) {
            handleBookSlot();
            setIsSummaryOpen(false);
          } else {
            showErrorSnackBar('Doctor fees must be greater than zero');
          }
        } else if (resp.data.message != null) {
          showErrorSnackBar(
            'An appointment is already booked for this patient on the specified date',
            {
              duration: Snackbar.LENGTH_INDEFINITE,
              action: {
                text: 'Close',
                textColor: '#fff',
                onPress: () => { },
              },
            },
          );
          // showSnackBar(resp.data.message);
        } else if (resp.data.errors != null) {
          showErrorSnackBar(resp?.data?.errors, {
            duration: Snackbar.LENGTH_INDEFINITE,
            action: {
              text: 'Close',
              textColor: '#fff',
              onPress: () => { },
            },
          });
        }
        setBookLoader(false);
      })
      .catch(() => {
        setBookLoader(false);
      });
  };

  const handleSelectedSymptomType = (selectedData: any) => {
    setconsultationForItem(selectedData);
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

  const paymentSummaryData: any = {
    selectedDateString,
    slotLabel: selectSlot?.label,
    name: `${selectedPatient?.name ?? '-'}(${selectedPatient?.uhid ?? ''})`,
    hosptialDetails: 'Kcm',
    price: doctorChargeData?.price,
  };

  const doctorAvaibleDays = async () => {
    try {
      const result = await getDoctorAvaibleDays(doctorId);
      if (result?.data?.available_dates) {
        setAvailableDates(result.data.available_dates);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (doctorId) {
      doctorAvaibleDays();
    }
  }, [doctorId]);

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
        title={strings.displayText.bookAppointment}
        hasDivider
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
          <Text style={commonStyles.topTitleText}>Book Appointment</Text>
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
              {/* <Image source={item.doctorImage} style={styles.doctorImage} /> */}
              {/* <CustomUserAvatar
                bgColor={COLORS.green}
                size={70}
                // style={styles.avatar}
                name={item.user?.name}
              /> */}
              <Image
                source={docItem?.doctorImage ? docItem?.doctorImage : assets.ProfileImage}
                style={styles.doctorImage}
              />
            </Box>
            <Box style={styles.detailsContainer}>
              <Box style={styles.docDetails}>
                <Box style={styles.nameContainer}>
                  <Text style={styles.name}>
                    {docItem?.name ? docItem?.name : docItem?.doctor_name}
                  </Text>
                  <Text style={styles.category}>
                    {docItem?.department?.split('-')[0] ?? 'Cardiologist- Civil Surgeon'}
                  </Text>
                  {/* <Text style={styles.name}>{item.doctor}</Text>
                    <Text style={styles.category}>Cardio Specialist</Text> */}
                  <Box style={styles.options}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
                      <Box style={styles.timeContainer}>
                        <Text style={styles.timeText}>10.00AM - 05.30 PM</Text>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box justifyContent="center" alignContent="center" marginHorizontal={20} marginTop={20}>
            <TouchableOpacity onPress={() => setIsConsultOpen(true)}>
              <TextInput
                label={'Consultation For'}
                mode="outlined"
                placeholderTextColor={COLORS.gray}
                placeholder={strings.displayText.search}
                style={styles.inputTxtStyle}
                value={consultationForItem ? consultationForItem?.name : ''}
                // disabled={true}
                editable={false}
                outlineColor={COLORS.shade_of_gray_D6D6D6}
                activeOutlineColor={COLORS.grey_838383}
                onPressIn={() => setIsConsultOpen(true)}
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
                  />
                }
              />
            </TouchableOpacity>
          </Box>
          <Box style={styles.pateintDetailsContainer}>
            <Box style={styles.pateintContainer}>
              <Text style={styles.name}>Patient Details</Text>
              {/* <Text style={styles.addPatient}>Add Patient</Text> */}
              {!roles.includes('patient') && permissions.includes('mobile_add_patient') && (
                <Box style={styles.addContainer}>
                  <IconButton
                    name="plus"
                    iconColor={COLORS.background.primary}
                    size={isHpTablet('2.2')}
                    onClick={() => {
                      navigation.navigate('PatientRegistration', { from: 'BookAppointment' });
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box justifyContent="center" alignContent="center" marginHorizontal={20}>
            <TouchableOpacity onPress={() => setIsOpen(true)}>
              <TextInput
                label={strings.displayText.patientsName}
                mode="outlined"
                placeholderTextColor={COLORS.gray}
                placeholder={strings.displayText.search}
                style={styles.inputTxtStyle}
                value={selectedPatient?.name}
                // disabled={true}
                editable={false}
                outlineColor={COLORS.shade_of_gray_D6D6D6}
                activeOutlineColor={COLORS.grey_838383}
                onPressIn={() => setIsOpen(true)}
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
                  />
                }
              />
            </TouchableOpacity>
          </Box>
          <Box style={styles.aboutContainer}>
            <Box>
              <Text style={styles.name}>Choose Your Slot</Text>
            </Box>
            <CalendarStrip
              scrollable
              style={styles.calendarStripStyle}
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
              dayContainerStyle={{ height: styles.commonCalenderStripStyle.height }}
              dayComponentHeight={styles.commonCalenderStripStyle.height}
              datesWhitelist={availableDates}
            />
          </Box>
          <Box style={styles.divider} marginBottom={10} />
          {!appConfiguration[0]?.token_appointment_enable && (
            <>
              <FlatList
                style={{ width: SIZES.screenWidth }}
                data={slotsArr}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSlotItem(item);
                      handleSelectTime(item);
                    }}
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
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
              />
              <Box style={styles.divider} marginTop={10} />
              <Box style={styles.slotsContainer}>
                {selectedSlotData?.map((ele: any, index) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
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
                          style={{ marginBottom: 2 }}
                          name={
                            ele?.appoint_id !== null || selectSlot?.id === ele?.id
                              ? 'check-circle'
                              : 'circle-outline'
                          }
                          size={isHpTablet('1.2%')}
                          color={
                            ele?.appoint_id !== null || selectSlot?.id === ele?.id
                              ? COLORS.background.white
                              : '#8A8A8A'
                          }
                        />
                        {/* <Image
                      source={
                        ele?.appoint_id !== null ||
                        selectedSlotItem.bookedSlots === index ||
                        selectSlot?.id === ele?.id
                          ? assets.CheckSlot
                          : assets.UnCheck
                      }
                      style={styles.unCheckIcon}
                    /> */}
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
        </Box>
      </ScrollView>
      <Box style={styles.btnContainer}>
        <Box>
          <Text style={styles.appointmentPrice}>₹ {doctorChargeData?.price ?? 0}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIsSummaryOpen(true)}>
            <Text style={styles.viewBill}>View Bill</Text>
          </TouchableOpacity>
        </Box>
        <Box width={'75%'}>
          <AbstractButton
            loader={bookLoader}
            onPress={checkAppointment}
            buttonStyle={styles.bookSlotBtn}
            textStyle={styles.bookSlotBtnText}
          >
            Confirm & Pay
          </AbstractButton>
        </Box>
      </Box>
      {showModal && (
        <Box>
          <SuccessCard
            close={handleClose}
            appointmentData={newAptData}
            navigation={navigation}
            navigationFrom={navigationFrom}
          />
        </Box>
      )}
      {isOpen && <PatientBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isConsultOpen && (
        <CustomBottomSheet
          openBSheet={isConsultOpen}
          snapPoints={['42%']}
          setSheetState={setIsConsultOpen}
          enablePanDownToClose={false}
          backgroundStyle={styles.backgroundStyle}
          title={strings.displayText.selectSymptoms}
        >
          <CustomSelectBottomSheet
            type={'name'}
            selectOptions={purposeList ?? []}
            handleSelectedFilterType={handleSelectedSymptomType}
            handleClosePress={handleClosePress}
          />
        </CustomBottomSheet>
      )}
      {isSummaryOpen && (
        <CustomBottomSheet
          openBSheet={isSummaryOpen}
          // snapPoints={[Platform.OS === 'ios' ? '52%' : `${isHpBottomTablet(6.8, 2.2)}`]}
          snapPoints={['50%']}
          setSheetState={setIsSummaryOpen}
          enablePanDownToClose={false}
          enableDynamicSizing
          backgroundStyle={styles.backgroundStyle}
          boxContainerStyle={styles.boxContainerStyle}
          contentContainerStyle={styles.contentContainerStyle}
          title={
            <BottomsheetTitle
              title="Payment Summary"
              subtitle="Review Details of this transaction and hit confirm & pay to Proceed"
            />
          }
        >
          <PaymentSummaryBottomSheet
            paymentSummaryData={paymentSummaryData}
            checkAppointment={checkAppointment}
          />
        </CustomBottomSheet>
      )}
    </AppContainer>
  );
};

export default BookAppointment;
