import { StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  errorBox: {
    flexDirection: 'row',
    color: 'red',
    marginRight: hp(5),
    fontSize: hp(1.7),
    lineHeight: hp(1.8),
    fontFamily: FONTS.InterMedium,
    alignSelf: 'flex-end',
    height: hp(2.2),
  },
  logoBox: {
    width: SIZES.screenWidth,
    paddingVertical: hp(6),
    marginTop: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpBtn: {
    backgroundColor: 'transparent',
    borderColor: COLORS.background.primary,
    borderWidth: 1,
    borderRadius: wp(1.7),
    height: isHpTablet(7.5),
    width: wp(85),
  },
  signInBtn: {
    backgroundColor: COLORS.background.primary,
    borderRadius: wp(1.7),
    height: isHpTablet(8),
    width: wp(85),
  },
  pswInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 4,
  },
  forgotPswTxt: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet(1.5),
    lineHeight: isHpTablet(1.7),
    color: COLORS.background.primary,
  },
  forgetPswBox: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: hp(5),
    height: hp(2.1),
  },
  logoDecTxt: {
    fontFamily: FONTS.Inter,
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet(1.6),
    letterSpacing: -0.48,
    color: COLORS.black,
  },
  logoText: {
    marginTop: 12,
    color: COLORS.background.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: hp(20),
  },
  topFlexBox: {
    height: hp(70),
    width: wp(100),
    alignItems: 'center',
    gap: hp(1),
  },
  bottomFlexBox: {
    height: hp(30),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  midFlexBox: {
    flex: 1,
    width: SIZES.screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInBtnTxt: {
    color: COLORS.white,
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet(2),
    lineHeight: isHpTablet(2.2),
  },
  signUpBtnTxt: {
    color: COLORS.background.primary,
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet(2),
    lineHeight: isHpTablet(2.2),
  },
});
