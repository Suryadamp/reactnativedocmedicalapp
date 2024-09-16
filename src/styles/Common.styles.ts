import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  menuIcon: {
    // height: 22,
    height: hp(2.3),
    width: hp(2.3),
    justifyContent: 'center',
  },
  topTitleText: {
    justifyContent: 'center',
    color: COLORS.text,
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2.2%'),
    lineHeight: isHpTablet('2.4%'),
  },
  filterIcon: { alignItems: 'center', height: hp(1.8), width: hp(1.8) },
  userIcon: {
    height: isWpTablet('3.2%'),
  },
  divider: {
    borderBottomWidth: hp('0.1%'),
    borderColor: COLORS.grey_E5E5E5,
  },
});
