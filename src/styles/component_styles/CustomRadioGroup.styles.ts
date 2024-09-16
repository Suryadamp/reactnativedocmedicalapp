import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  touchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectOptionContainerStyle: {
    height: isHpTablet('2.2%'),
    width: isHpTablet('2.2%'),
    borderRadius: isHpTablet('1.5%'),
    borderWidth: hp('0.2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectOptionStyle: {
    height: isHpTablet('1.2%'),
    width: isHpTablet('1.2%'),
    borderRadius: isHpTablet('0.6%'),
    backgroundColor: COLORS.background.primary,
  },
  optionTextStyle: {
    marginLeft: hp('1.0%'),
    color: COLORS.text,
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
  },
  resultTextStyle: {
    marginLeft: hp('3.5%'),
    color: COLORS.background.primary,
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
  },
  marginVertical: {
    margin: hp('1.2%'),
  },
  container: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: hp('1%'),
    marginVertical: hp('1%'),
  },
  outerCircle: {
    height: isHpTablet('2.5%'),
    width: isHpTablet('2.5%'),
    borderRadius: isHpTablet('2%'),
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOuterCircle: {
    borderColor: COLORS.background.primary, // Green color for selected state
  },
  innerCircle: {
    height: isHpTablet('1.2%'),
    width: isHpTablet('1.2%'),
    borderRadius: isHpTablet('0.6%'),
    backgroundColor: COLORS.background.primary,
  },
  text: {
    marginLeft: hp('0.8%'),
  },
  buttonBoxContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  boxStyle: {
    height: 250,
  },
  applyBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: isHpTablet('1%'),
    height: isHpTablet('6.5%'),
    width: '45%',
  },
  applyTxtStyle: { color: COLORS.white, fontSize: isHpTablet('2%'), fontWeight: '600' },
  clearBtnStyle: {
    backgroundColor: COLORS.background.white,
    borderColor: COLORS.background.primary,
    borderWidth: 2,
    borderRadius: isHpTablet('1%'),
    height: isHpTablet('6.5%'),
    width: '45%',
  },
  clearTxtStyle: {
    color: COLORS.text,
    fontSize: isHpTablet('2%'),
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplaySemibold,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },
  dosageInputTxt: {
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    backgroundColor: 'white',
    borderRadius: hp('0.8%'),
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isHpTablet('1.8%'),
    lineHeight: isHpTablet('2.2%'),
  },
  searchDoctorInput: {
    marginTop: isHpTablet('1.5%'),
  },
  docBottomContainer: { marginVertical: isHpTablet('1%') },
  docBottomTouchStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: isHpTablet('1.5%'),
  },
});
