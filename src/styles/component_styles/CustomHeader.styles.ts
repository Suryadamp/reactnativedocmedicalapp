import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  headerContainer: {
    height: isHpTablet('7%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: SIZES.screenWidth,
    paddingVertical: isHpTablet('1%'),
    paddingHorizontal: isWpTablet('4%'),
    borderColor: COLORS.white_smoke,
  },
  addContainer: {
    width: isWpTablet('7%'),
    height: isHpTablet('3.2%'),
    backgroundColor: '#EDF5FF',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: isWpTablet('2'),
    height: isHpTablet('2.2'),
  },
  imageStyle: {
    width: isWpTablet('2'),
    height: isHpTablet('1'),
  },
  titleStyle: {
    fontSize: isHpTablet('2.2%'),
    lineHeight: isHpTablet('2.8%'),
    fontFamily: FONTS.SFProDisplay_w700,
    color: COLORS.text,
  },
  pressedArea: {
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
  },
  rightText: {
    fontWeight: '700',
    marginStart: isHpTablet('2%'),
    justifyContent: 'center',
    color: COLORS.background.primary,
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.8%'),
  },
});
