import { Platform, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {},
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('1.5%'),
    justifyContent: 'space-between',
  },
  noAppointment: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: isHpTablet('2%'),
  },
  imageTouchStyle: { height: hp('20%'), width: hp('15%') },
  noDataFond: {
    marginTop: hp('0.5%'),
    fontSize: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayMedium,
    fontWeight: '500',
    color: '#231F20',
  },
  accountIconStyle: {
    margin: hp('0.8%'),
    alignSelf: 'center',
  },
  accNameStyle: {
    marginTop: hp('0.5%'),
    fontSize: isHpTablet('2.2%'),
    fontWeight: '500',
    color: '#231F20',
  },
  userIconHeight: {
    height: isHpTablet('2.2%')
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: hp('0.5%'),
  },
  cardContainer: {
    marginTop: hp('1%'),
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: hp('2%'),
  },
  medicineText: {
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.black,
    fontSize: isHpTablet('1.8%'),
    marginVertical: hp('0.2%'),
  },
  doseText: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black,
    fontSize: isHpTablet('1.6%'),
    marginVertical: hp('0.2%'),
  },
  line: {
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
    marginTop: hp('1%'),
  },
  sectionHeader: {
    paddingHorizontal: isHpTablet('2%'),
    paddingVertical: isHpTablet('1.5%'),
    backgroundColor: 'rgba(247,247,247,1.0)',
    alignContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: isHpTablet('1.8%'),
    fontWeight: 'bold',
    color: COLORS.background.primary,
  },
  marginTopStyle: {
    marginTop: hp('1.5%'),
  },
  buttonBoxContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    top: Platform.OS === 'ios' ? SIZES.screenHeight / 1.1 : SIZES.screenHeight / 1.1,
  },
  reminderText: {
    marginTop: hp('0.3%'),
    fontSize: isHpTablet('1.9%'),
    fontFamily: FONTS.Inter,
    color: COLORS.background.primary,
  },
  icon: {
    width: isHpTablet('4.1%'),
    height: isHpTablet('2.45%'),
    marginTop: hp('0.3%'),
  },
  titleDetailsContainer: {
    marginTop: hp('1%'),
    marginHorizontal: hp('2%'),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    marginHorizontal: isHpTablet('2%'),
    marginVertical: isHpTablet('1.2%'),
  },
  subContainer: {
    flexDirection: 'column',
    marginHorizontal: hp('2%'),
  },
  lightText: {
    color: '#AAAAAA',
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
  },
  contentText: {
    marginTop: hp('0.5%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.6%'),
    fontWeight: '600',
    color: COLORS.black,
    fontStyle: 'normal',
    letterSpacing: -0.24,
  },
  bookSlotBtnText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  bookSlotBtn: {
    width: '90%',
    height: isHpTablet('6.5%'),
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
    backgroundColor: COLORS.background.primary,
  },
  contentContainerBox: {
    height: isHpTablet('5%'),
    width: isHpTablet('5%'),
    borderRadius: isHpTablet('0.8%'),
    marginTop: isHpTablet('0.2%'),
    backgroundColor: '#F1F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailImageStyle: {
    height: hp('2%'),
    width: hp('2%'),
  },
  commonStyle: {
    marginTop: isHpTablet('1%'),
    iconSize: isHpTablet('2%'),
  },
  reminderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.grey_FAFAFA,
    paddingHorizontal: hp('1.5%'),
    paddingVertical: hp('1%'),
    marginTop: hp('0.5%'),
  },
  trackActivityContainer: {
    flex: 1,
    backgroundColor: COLORS.background.white,
    flexDirection: 'column',
  },
  IconImg: { height: hp('2.1'), width: hp('3.1') },
  doctorCard: {
    overflow: 'hidden',
    height: hp('22%'),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    margin: hp('1%'),
  },
  doctorImg: {
    width: hp('24%'),
    height: hp('25.5%'),
    position: 'absolute',
    right: hp('-8%'),
    bottom: hp('-5.5%'),
  },
  /* Track activity styles */
  activityTitle: {
    color: COLORS.text,
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.65%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('1.5%'),
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: hp('1%'),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: hp('0.6%'),
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    marginBottom: hp('0.4%'),
  },
  emptyCircle: {
    width: hp('2.4%'),
    height: hp('2.4%'),
    borderRadius: hp('1.2%'),
    borderWidth: 1,
    borderColor: 'grey',
  },

  /* Medication card styles */
  buttonContainer: {
    paddingRight: hp('1.2%'),
  },
  medicationIcon: {
    height: hp('2.5%'),
    width: hp('2.8%'),
    marginHorizontal: hp('0.8%'),
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: hp('1%'),
    paddingHorizontal: hp('1%'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp('0.4%'),
    },
    shadowOpacity: Platform.OS ==='ios'? isHpTablet('0.021'): hp('0.25%'),
    shadowRadius: hp('3.84%'),
    elevation: hp('0.5%'),
    margin: hp('1%'),
  },
  MedicationCard: {
    paddingHorizontal: hp('0.5%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexShrink: 0,
    marginRight: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationInfoContainer: {
    flex: 1,
    padding: hp('1.5%'),
    borderLeftColor: '#DDD',
    borderLeftWidth: 1,
  },
  medicationName: {
    fontFamily: FONTS.InterMedium,
    color: COLORS.text,
    letterSpacing: 0.3,
    fontSize: isHpTablet('2%'),
    marginBottom: hp('0.2%'),
  },
  medicationTime: {
    fontFamily: FONTS.Inter,
    color: COLORS.text,
    fontSize: isHpTablet('1.7%'),
    marginBottom: hp('0.2%'),
  },
  medicationDays: {
    fontSize: isHpTablet('1.3%'),
    fontFamily: FONTS.Inter,
    color: COLORS.text,
  },
  logButton: {
    width: hp('8.2%'),
    height: hp('3.3%'),
    backgroundColor: '#007bff',
    borderRadius: hp('0.5%'),
  },
  logButtonText: {
    color: '#ffffff',
    fontSize: isHpTablet('1.2%'),
    fontFamily: FONTS.InterBold,
  },

  /* Contact us card */
  title: {
    fontSize: isHpTablet('2.1%'),
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.background.primary,
    lineHeight: hp('2.5%'),
    letterSpacing: -0.5,
  },
  button: {
    backgroundColor: COLORS.background.primary,
    width: hp('8.5%'),
    height: hp('3.3%'),
    borderRadius: hp('0.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.InterBold,
    fontSize: isHpTablet('1.3%'),
    lineHeight: isHpTablet('1.3%'),
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  circleTickIcon: {
    width: hp('3.4%'),
    height: hp('3.4%'),
  },
  weekDayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('11.2%'),
    width: hp('5.8%'),
    marginVertical: hp('1%'),
  },
  selectedBorder: {
    borderColor: '#CDCDCD',
    borderWidth: 1,
    borderTopRightRadius: hp('3%'),
    borderTopLeftRadius: hp('3%'),
    borderBottomRightRadius: hp('3%'),
    borderBottomLeftRadius: hp('3%'),
  },
  dayLabel: {
    fontSize: isHpTablet('1.7%'),
    marginBottom: hp('2%'),
    color: '#232323',
    fontFamily: FONTS.InterBold,
  },
  progressBarContainer: {
    width: hp('3%'),
    height: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: '100%',
    borderRadius: hp('0.5%'),
    backgroundColor: 'blue',
    // The width will be set dynamically to reflect the progress
  },
  circularBarHeight: {
    height: hp('3.5%'),
    width: hp('0.5%'),
  },
});
