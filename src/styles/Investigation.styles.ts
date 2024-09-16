import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('1.5%'),
    paddingVertical: hp('0.7%'),
  },

  sectionContainer: {
    paddingVertical: hp('0.5%'),
    paddingHorizontal: hp('2%'),
  },
  section: {
    ...FONTS.text,
  },
  messageText: {
    ...FONTS.text,
    fontSize: isHpTablet('1.2%'),
    textAlign: 'center',
  },
  sectionBorderStyle: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 3,
    width: '30%',
  },
  noAppointment: {
    height: SIZES.screenHeight / 1.25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: isHpTablet('2%'),
  },
  nameArrow: { marginTop: hp('0.3%'), marginStart: SIZES.base },
  filterIcon: { alignItems: 'center', height: 14, width: 14 },
  line: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
  filterText: {
    marginStart: hp('2%'),
    marginTop: isHpTablet('1.5%'),
    fontSize: isHpTablet('1.4%'),
    color: COLORS.text,
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayMedium,
  },
  filterValue: {
    marginTop: isHpTablet('1.5%'),
    fontSize: isHpTablet('1.4%'),
    color: COLORS.text,
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayRegular,
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  accountIconStyle: {
    // marginTop: hp('0.5%'),
    // marginHorizontal: 5,
    // marginRight: hp('0.5%'),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accNameStyle: {
    // marginTop: isHpTablet('1.5%'),
    paddingLeft: 5,
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.Inter,
    fontWeight: '500',
    color: COLORS.black,
  },
  imageTouchStyle: {
    justifyContent: 'center',
  },
  viewStyle: {
    marginTop: hp('1.5%'),
  },
  clearText: {
    fontFamily: FONTS.Inter,
    fontSize: isHpTablet('1.4%'),
    fontWeight: '500',
    marginTop: hp('1.5%'),
    color: COLORS.text,
    marginHorizontal: hp('1%'),
  },
  labBkarStyle: {
    margin: isHpTablet('2%'),
  },
  testNameStyle: {
    color: COLORS.black_121212,
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    fontWeight: '600',
    lineHeight: isHpTablet('2%'),
    marginBottom: hp('1%'),
  },
  testTypeStyle: {
    color: COLORS.background.primary,
    fontSize: isHpTablet('1.4%'),
    fontWeight: '400',
    fontFamily: FONTS.SFProDisplayRegular,
    lineHeight: isHpTablet('1.6%'),
  },
  deleteIcon: {
    width: isHpTablet('2.5%'),
    height: isHpTablet('2.7%'),
    marginHorizontal: isHpTablet('1%'),
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },
  labBkarBoxStyle: {
    marginHorizontal: isHpTablet('1%'),
    marginVertical: isHpTablet('2%'),
    borderRadius: hp('0.5%'),
    width: isHpTablet('7%'),
    height: isHpTablet('7%'),
  },
  contentContainerStyle: {
    width: '100%',
    paddingHorizontal: hp('2%'),
  },
  commonStyle: {
    height: isHpTablet('2.5%'),
    width: isWpTablet('20%'),
  },
  secondWidth: {
    width: isWpTablet('60%'),
  },
  thirdWidth: {
    // width: isWpTablet('10%'),
  },
  boxMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: isWpTablet('3%'),
    backgroundColor: COLORS.background.white,
    // width: wp('90%'),
  },
  investigationText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet('1.8%'),
    color: COLORS.background.primary,
  },
  testListContainer: {
    height: hp('20%'),
  },
  testListDivider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: hp('0.5%'),
  },
});
