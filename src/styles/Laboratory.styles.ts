import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  title: {
    color: '#2D3339',
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isHpTablet('2%'),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: isHpTablet('2%'),
    marginBottom: hp('0.6%'),
    marginTop: hp('0.2%'),
  },
  subtitle: {
    color: '#207DFF',
    fontFamily: FONTS.SFProDisplayRegular, // Make sure this font is linked in your React Native project
    fontSize: isHpTablet('1.6%'), // px is assumed, so just the number
    fontStyle: 'normal',
    fontWeight: '400',
  },
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

  pateintDetailsContainer: {
    marginLeft: hp('2%'),
  },
  pateintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginHorizontal: hp('2%'),
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isHpTablet('1.8%'),
    fontWeight: '600',
    color: COLORS.black,
    fontStyle: 'normal',
    letterSpacing: -0.24,
  },

  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  sectionTitle: {
    fontSize: isHpTablet('1.7%'),
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.background.primary,
  },
  nameText: {
    marginLeft: isHpTablet('0.5%'),
    fontSize: isHpTablet('1.8%'),
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayMedium,
    color: '#2D3339',
  },
  userIcon: {
    height: isHpTablet('1.6%'),
  },
  userFontIcon: {
    marginHorizontal: hp('0.4%'),
    alignSelf: 'center',
  },
  yearText: {
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayMedium,
  },
  labCommonStyles: {
    marginTop: hp('1%'),
  },
  verticalDivider: {
    width: hp('0.1%'),
    height: hp('3%'),
    backgroundColor: COLORS.placeHolder,
    marginTop: hp('0.5%'),
  },
  smallVerticalDivider: {
    width: hp('0.1%'),
    height: hp('1.6%'),
    backgroundColor: COLORS.placeHolder,
    marginHorizontal: hp('0.5%'),
  },
  dateDay: {
    color: 'white',
    fontSize: isHpTablet('1.5%'),
    fontWeight: '500',
    fontFamily: FONTS.Inter,
  },
  dateMonth: {
    fontSize: isHpTablet('1.4%'),
    fontWeight: '400',
    color: COLORS.placeHolder,
    textAlign: 'center',
    fontFamily: FONTS.Inter,
    marginTop: hp('0.5%'),
  },
  nametext: {
    fontSize: isHpTablet('1.8%'),
    fontWeight: '500',
    lineHeight: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayMedium,
  },
  optext: {
    fontSize: isHpTablet('1.6%'),
    fontWeight: '400',
    lineHeight: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayRegular,
  },
  viewText: {
    fontSize: isHpTablet('1.5%'),
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.white,
  },
  viewBox: {
    display: 'flex',
    borderRadius: hp('0.3%'),
    borderWidth: 1,
    backgroundColor: COLORS.background.primary,
    borderColor: COLORS.background.primary,
    height: isHpTablet('4%'),
    width: isWpTablet('15%'),
    alignItems: 'center', // Center text vertically
    justifyContent: 'center',
  },
  pointsOneTextRed: {
    fontSize: isHpTablet('1.6%'),
    color: COLORS.red_FD002E,
    fontWeight: '600',
    alignSelf: 'center',
  },
  pointsOneTextBlack: {
    fontSize: isHpTablet('1.6%'),
    color: COLORS.text,
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplaySemibold,
    alignSelf: 'center',
  },
  pointsOneTextGreen: {
    fontSize: isHpTablet('1.6%'),
    color: COLORS.green,
    fontWeight: '600',
    alignSelf: 'center',
  },
  pointsTwoText: {
    fontSize: isHpTablet('1.6%'),
    color: COLORS.grey_949494,
    fontWeight: '400',
    alignSelf: 'center',
    fontFamily: FONTS.SFProDisplayRegular,
  },
  dayBoxStyle: {
    backgroundColor: COLORS.text,
    borderRadius: hp('3%'),
    height: isHpTablet('4%'),
    width: isHpTablet('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('0.4%'),
  },
  labReportIconStyle: {
    height: isHpTablet('1.5%'),
    marginLeft: hp('0.2%'),
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    borderBottomColor: COLORS.ligth_gray,
    borderBottomWidth: 1,
  },
  resultName: {
    color: '#707070',
    textAlign: 'center',
    fontSize: isHpTablet('1.8%'),
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: hp('0.12%'),
    lineHeight: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayRegular,
  },
  resultValue: {
    color: '#121212',
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.8%'),
    fontStyle: 'normal',
    fontWeight: '600',
  },
  resultValueAbnormal: {
    color: COLORS.red_FD002E,
    textAlign: 'center',
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.8%'),
    fontStyle: 'normal',
    fontWeight: '600',
  },
  resultReference: {
    color: COLORS.grey_949494,
    fontSize: isHpTablet('1.4%'),
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: FONTS.SFProDisplayRegular,
  },
  labBottomContainer: {
    height: '100%',
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  buttonBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  boxStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 250,
  },
  centerColumnBox: { flexDirection: 'column', alignItems: 'center' },
  applyBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: hp('1%'),
    width: '45%',
    height: isHpTablet('6.5%'),
  },
  clearBtnStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.background.primary,
    borderWidth: 1,
    borderRadius: hp('1%'),
    width: '45%',
    height: isHpTablet('6.5%'),
  },
  applyTxtStyle: { color: COLORS.white, fontSize: isHpTablet('2%'), fontWeight: '600' },
  clearTxtStyle: { color: COLORS.text, fontSize: isHpTablet('2%'), fontWeight: '600' },
  textStyle: {
    width: wp('20%'),
    height: hp('5%'),
  },
  selectedBox: {
    justifyContent: 'center',
    backgroundColor: '#C7DEFF',
  },
  normalBox: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  selectedText: {
    fontSize: isHpTablet('1.6%'),
    fontWeight: '500',
    marginLeft: hp('2%'),
    color: COLORS.background.primary,
  },
  normalText: {
    fontSize: isHpTablet('1.6%'),
    fontWeight: '500',
    marginLeft: hp('2%'),
    color: COLORS.text,
  },
  dosageInputTxt: {
    width: wp('60%'),
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    backgroundColor: 'white',
    fontSize: isHpTablet('1.8%'),
    lineHeight: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayRegular,
  },
  selectedRadioText: {
    // color: COLORS.background.primary,
    fontSize: isHpTablet('1.8%'),
    position: 'absolute',
    left: isHpTablet('8%'),
  },
  tabNameStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  dividerStyle: {
    height: '90%',
    width: 1,
    backgroundColor: '#EFEFEF',
  },
  boxRadioStyle: {
    flex: 1,
    width: 250,
  },
});
