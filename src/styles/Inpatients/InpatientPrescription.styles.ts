import { Platform, StyleSheet } from 'react-native';

import { SIZES, COLORS, FONTS } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  scrollViewStyle: { marginHorizontal: 20 },
  scrollViewContainer: { flexGrow: 1, paddingBottom: 150 },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    justifyContent: 'center',
    paddingVertical: isHpTablet(1),
    borderBottomColor: COLORS.white_smoke,
    borderBottomWidth: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },

  noAppointment: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    marginTop: 150,
  },
  name: { fontFamily: FONTS.SFProDisplayRegular, color: COLORS.black_252525, fontSize: 16 },
  line: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
  filterText: {
    marginStart: 20,
    marginTop: hp('1.7%'),
    // fontSize: 10,
    fontSize: hp('1.2%'),
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.text,
    fontWeight: '500',
  },
  filterValue: {
    marginTop: hp('1.7%'),
    fontSize: hp('1.2%'),
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.text,
    fontWeight: '500',
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  accountIconStyle: {
    margin: 8,
    alignSelf: 'center',
  },
  accNameStyle: {
    alignSelf: 'center',
    fontSize: hp('1.4%'),
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.text,
    fontWeight: '500',
  },
  imageTouchStyle: {
    justifyContent: 'center',
  },
  viewStyle: {
    marginTop: 15,
  },
  clearText: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: hp('1.2%'),
    fontWeight: '500',
    marginTop: 15,
    color: COLORS.text,
    marginHorizontal: 10,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    width: '100%',
  },
  cardContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.green_C2F5E7,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 14,
    shadowColor: COLORS.green_C2F5E7,
    backgroundColor: COLORS.green_E6FFF8,
  },
  selfCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EAF3FF',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: hp('1.4%'),
    shadowColor: '#EAF3FF',
    backgroundColor: '#EAF3FF',
  },
  prescriptionNo: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.white,
    // fontSize: 12,
    fontSize: hp('1.2%'),
    fontWeight: 'bold',
  },
  date: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.white,
    fontSize: hp('1%'),
    fontWeight: 'bold',
  },
  prescriptionNoBold: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: hp('1.2%'),
    marginStart: hp('0.5%'),
    fontWeight: 'bold',
  },
  symptoms: { fontFamily: FONTS.Inter, color: COLORS.text, fontSize: hp('1.1%'), marginTop: 10 },
  iosShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  androidShadow: {
    elevation: 5,
  },
  doctorImage: {
    justifyContent: 'center',
    width: hp('6%'),
    height: hp('6%'),
    borderRadius: 48,
    marginVertical: 5,
  },
  imageStyle: {
    height: hp('1.5%'),
    width: hp('1.5%'),
    tintColor: COLORS.background.white,
  },
  doctorName: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: hp('1.2%'),
    fontWeight: 'bold',
  },
  bsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 21,
  },
  bsIcon: {
    width: hp('2%'),
    height: hp('2%'),
  },
  eyeIcon: { height: hp('2%') },
  bsDeleteName: {
    color: COLORS.danger,
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: hp('1.5%'),
    lineHeight: hp('2.1%'),
    fontStyle: 'normal',
    fontWeight: '500',
    marginStart: hp('1.5%'),
  },
  bsName: {
    color: '#121212',
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: hp('1.5%'),
    lineHeight: hp('2.1%'),
    fontStyle: 'normal',
    fontWeight: '500',
    marginStart: hp('1.5%'),
  },
  bsLayout: {
    padding: 20,
    width: '100%',
  },
  cardMediContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  medicineText: {
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.black,
    fontSize: hp('1.8%'),
    lineHeight: hp('3%'),
  },
  doseText: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.greyText,
    fontSize: hp('1.6%'),
    lineHeight: hp('3%'),
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(247,247,247,1.0)',
    alignContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    fontFamily: FONTS.SFProDisplaySemibold,
    color: COLORS.background.primary,
  },
  mediImageStyle: {
    height: hp('1.5%'),
    width: hp('1.5%'),
  },
  marginStartStyle: {
    marginStart: 10,
  },

  addPrescriptionHeader: {
    // backgroundColor: COLORS.grey,
    display: 'flex',
  },
  addPrescriptionTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    // marginHorizontal: 10,
  },
  topBarTitle: {
    ...FONTS.h4,
    // width: '75%',
    marginStart: 20,
    color: COLORS.text,
  },
  icon: {
    height: 15,
    width: 20,
  },
  addIcon: {
    height: 25,
    width: 25,
  },
  sectionContainer: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  section: {
    ...FONTS.text,
  },
  messageText: {
    ...FONTS.text,
    fontSize: 8,
    textAlign: 'center',
    width: 300,
  },
  sectionBorderStyle: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
    width: '30%',
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.background.white,
    left: 10,
    top: 1,
    paddingHorizontal: 1,
    zIndex: 999,
    paddingStart: 5,
    paddingEnd: 5,
    fontSize: 12,
    color: COLORS.text,
  },
  unitsLabel: {
    position: 'absolute',
    backgroundColor: COLORS.background.white,
    left: 6,
    top: -8,
    paddingStart: 5,
    paddingEnd: 5,
    paddingHorizontal: 1,
    zIndex: 999,
    fontSize: 12,
    color: COLORS.text,
  },
  foodsLabel: {
    position: 'absolute',
    backgroundColor: COLORS.background.white,
    left: 30,
    top: -4,
    paddingStart: 5,
    paddingEnd: 5,
    paddingHorizontal: 1,
    zIndex: 999,
    fontSize: 12,
    color: COLORS.text,
  },
  scheduleLabel: {
    position: 'absolute',
    backgroundColor: COLORS.background.white,
    left: 8,
    top: -8,
    paddingStart: 5,
    paddingEnd: 5,
    paddingHorizontal: 1,
    zIndex: 999,
    fontSize: 12,
    color: COLORS.text,
  },
  addRemovefrequency: {
    position: 'absolute',
    width: 90,
    height: 38,
    right: 30,
    top: 273,
    backgroundColor: '#8A8A8A',
    borderRadius: 100,
  },
  circleMinus: {
    flex: 1,
    position: 'absolute',
    width: 25,
    height: 25,
    right: 88,
    top: 279,
    backgroundColor: COLORS.background.white,
    borderRadius: 12.5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  circlePlus: {
    flex: 1,
    position: 'absolute',
    width: 25,
    height: 25,
    right: 37,
    top: 279,
    backgroundColor: COLORS.background.white,
    borderRadius: 12.5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  frequencyCountLabel: {
    flex: 1,
    position: 'absolute',
    width: 20,
    height: 20,
    right: 65,
    top: 280,
    color: COLORS.background.white,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    height: 45,
    borderColor: COLORS.background.primary,
    backgroundColor: COLORS.background.white,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  foodplaceholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  selectedFoodTextStyle: {
    fontSize: 14,
    marginStart: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  iconFoodStyle: {
    width: 8,
    height: 8,
  },
  addPrescriptionNoAppointment: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appointmentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  medicineInputTxt: {
    width: SIZES.screenWidth - 36,
    height: 45,
    marginVertical: 5,
    marginTop: 20,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
  },
  dosageInputTxt: {
    width: SIZES.screenWidth * 0.6,
    height: hp('5.5%'),
    marginVertical: hp('0.5'),
    fontSize: hp('1.6%'),
    lineHeight: hp('2%'),
    fontFamily: FONTS.SFProDisplayRegular,
    backgroundColor: COLORS.background.white,
  },
  unitInputTxt: {
    width: SIZES.screenWidth * 0.28,
    height: hp('5.5%'),
    fontSize: hp('1.6%'),
    lineHeight: hp('2%'),
    fontFamily: FONTS.SFProDisplayRegular,
    backgroundColor: COLORS.background.white,
  },
  dosageIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },

  unitInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
  frequency: {
    width: SIZES.screenWidth - 36,
    height: 45,
    marginVertical: 5,
    backgroundColor: COLORS.background.white,
    marginTop: 10,
    color: 'red',
  },
  frequencyIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
  scheduleInputTxt: {
    width: SIZES.screenWidth * 0.9,
    height: hp('5.5%'),
    marginVertical: hp('0.5'),
    fontSize: hp('1.6%'),
    lineHeight: hp('2%'),
    fontFamily: FONTS.SFProDisplayRegular,
    backgroundColor: COLORS.background.white,
    marginTop: 5,
  },
  scheduleInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
  collapsedViewContainer: {
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    marginVertical: hp('0.5'),
    // width: SIZES.screenWidth * 0.9,
    borderColor: COLORS.background.primary,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  startDateContainer: {
    justifyContent: 'center',
    height: hp('2.5%'),
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    marginStart: hp('1%'),
    borderColor: COLORS.background.primary,
  },
  dateView: {
    flexDirection: 'row',
    marginTop: hp('1%'),
  },
  dateText: {
    fontSize: hp('1.2%'),
    flexWrap: 'wrap',
    paddingStart: hp('0.5%'),
    paddingEnd: hp('0.5%'),
    color: '#231F20',
    fontFamily: FONTS.SFProDisplayRegular,
  },
  slotsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    flexWrap: 'wrap',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  slotTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 20,
  },

  slotName: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.black,
    marginHorizontal: 5,
  },
  selectedSlotName: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: COLORS.background.primary,
    marginHorizontal: 5,
  },
  AvailableSlotsText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.green,
    marginTop: 5,
  },
  slotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    paddingHorizontal: 5,
    paddingVertical: 2,
    height: 26,
  },
  foodDropdown: {
    height: 42,
    borderColor: COLORS.lightGray,
    borderWidth: 2,
    borderRadius: 8,
    padding: 11,
    marginVertical: 3,
    marginHorizontal: 20,
  },
  selectedSlotBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    margin: 3,
    borderRadius: 8,
    marginVertical: 7,
    backgroundColor: COLORS.background.primary,
  },
  slotBoxText: {
    fontSize: SIZES.base,
    color: COLORS.placeHolder,
  },
  selectedSlotText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.extraSmall,
    color: COLORS.background.white,
    marginTop: 2,
    padding: 2,
  },
  unCheckIcon: {
    width: 12,
    height: 12,
    marginHorizontal: 2,
  },
  btnContainer: {
    width: '100%',
    marginVertical: hp('2%'),
    marginHorizontal: hp('1%'),
    alignItems: 'center',
  },
  bookSlotBtn: {
    width: '90%',
    height: hp('6.5%'),
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.primary,
  },
  deleteReminderBtn: {
    width: '90%',
    height: hp('6.5%'),
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.red_FF434F,
  },
  bookSlotBtnText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: SIZES.medium,
    color: COLORS.background.white,
    textAlign: 'center',
  },
  inputTxtStyle: {
    width: SIZES.screenWidth * 0.9,
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
  },
  timeSlotsBoxStyle: {
    height: hp('3%'),
    width: wp('14%'),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.white_smoke,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('1.1%'),
    backgroundColor: COLORS.background.white,
  },
  timeSlotTextStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.screenHeight * 0.012,
    color: COLORS.black_231F20,
  },
  medicineAdviceBoxStyle: {
    height: hp('3%'),
    width: wp('25%'),
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.background.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('1%'),
  },
  medicineAdviceTextStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: SIZES.screenHeight * 0.012,
    // marginHorizontal: 10,
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_231F20,
  },
  marginTopStyle: {
    marginTop: hp('2.5%'),
  },
  marginTopBoxStyle: {
    marginTop: hp('2%'),
  },
  durationStyle: {
    marginTop: hp('1.5%'),
    color: COLORS.text,
    marginBottom: hp('0.5%'),
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: hp('1.6%'),
  },
  chevrenIconStyle: { marginTop: 5 },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },
  reminderText: {
    marginTop: 3,
    fontWeight: '700',
    fontSize: hp('1.5%'),
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.black,
  },
  buttonBoxContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    top: Platform.OS === 'ios' ? SIZES.screenHeight / 1.1 : hp('92%'),
  },
  addBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 10,
    height: hp('5.5%'),
  },
  applyTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: hp('1.7%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  saveText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: hp('1.5%'),
    color: COLORS.background.primary,
  },
  addPreMarginTop: {
    height: hp('2.5%'),
  },
  addPreMarginHr: {
    height: wp('4%'),
  },
  collapsedViewText: {
    color: COLORS.text,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: hp('1.5%'),
    lineHeight: hp('2.0%'),
    // marginTop: hp('0.5'),
  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: '2%',
  },
  title: {
    fontSize: 16,
    color: '#232323',
    paddingHorizontal: 10,
  },
  trashTitle: {
    fontSize: 16,
    color: '#FE0000',
    paddingHorizontal: 10,
  },
  bsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.white_smoke,
    borderBottomWidth: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },
});