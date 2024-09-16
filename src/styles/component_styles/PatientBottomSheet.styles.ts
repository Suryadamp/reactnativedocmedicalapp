import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: hp('0.2%'),
  },
  container: {
    height: '100%',
  },
  searchInput: {
    width: '100%',
    height: isHpTablet('5.2%'),
    marginVertical: 5,
    backgroundColor: 'white',
    fontSize: isHpTablet('1.6%'),
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayMedium,
    lineHeight: isHpTablet('1.8%'),
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBoxContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingTop: hp('1%'),
  },
  boxStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: SIZES.screenHeight / 3.8,
  },
  addBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: isHpTablet('1%'),
    height: isHpTablet('6.5%'),
    width: SIZES.screenWidth * 0.9,
  },
  applyTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: hp('0.5%'),
  },
  boxRadioStyle: {
    flex: 1,
    width: 250,
  },
  nameTextStyle: {
    fontSize: isHpTablet('1.6%'),
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayMedium,
    lineHeight: isHpTablet('1.8%'),
    marginBottom: hp('1%'),
    color: COLORS.text,
  },
  noTextStyle: {
    fontSize: isHpTablet('1.4%'),
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayRegular,
    lineHeight: isHpTablet('1.6%'),
    marginBottom: hp('1%'),
    color: COLORS.text,
  },
  editTxtStyle: {
    fontSize: isHpTablet('1.4%'),
    fontWeight: '400',
    fontFamily: FONTS.SFProDisplayRegular,
    lineHeight: isHpTablet('1.6%'),
    color: COLORS.background.primary,
  },
  selectBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1.5%'),
    marginBottom: hp('1%'),
  },
  selectTextBoxStyle: {
    height: isHpTablet('4%'),
    width: isHpTablet('4%'),
    backgroundColor: 'black',
    borderRadius: isHpTablet('3%'),
  },
  selectTextStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    color: COLORS.white,
    marginTop: isHpTablet('0.8%'),
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isHpTablet('1.6%'),
  },
  selectMarginLeftStyle: {
    marginLeft: hp('2%'),
  },
  iconMarginStyle: {
    marginLeft: isHpTablet('1%'),
    height: isHpTablet('1.4%'),
  },
  addButtonBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: hp('1%'),
    marginTop: hp('1%'),
  },
  inputTxtStyle: {
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet('1.8%'),
  },
  nameInputTxtStyle: {
    width: SIZES.screenWidth * 0.585,
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet('1.8%'),
  },
  mrsInputTxtStyle: {
    width: SIZES.screenWidth * 0.285,
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    padding: 0,
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet('1.8%'),
  },
  birthInputTxtStyle: {
    width: SIZES.screenWidth * 0.52,
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet('1.8%'),
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
  },
  ageInputTxtStyle: {
    width: SIZES.screenWidth * 0.35,
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    padding: 0,
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet('1.8%'),
  },

  confirmBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: hp('1%'),
    height: isHpTablet('6.5%'),
    width: SIZES.screenWidth * 0.9,
  },
  confirmTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  iconSize: {
    height: isHpTablet('2.5%'),
    width: isHpTablet('2.5%'),
  },
  closeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  searchDoctorInput: {
    marginTop: hp('1.5%'),
  },
});
