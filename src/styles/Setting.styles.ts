import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants';
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
  header: {
    backgroundColor: COLORS.white,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp('1.5%'),
  },
  topBarTitle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2.2%'),
    lineHeight: isHpTablet('2.4%'),
    width: '85%',
  },
  content: {
    paddingTop: isHpTablet('1%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isHpTablet('1.6%'),
    backgroundColor: COLORS.grey,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isHpTablet('1.5%'),
  },
  menuTitle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'), // 16px
    lineHeight: isHpTablet('2%'),
    marginHorizontal: hp('0.6%'),
    letterSpacing: -0.3,
    color: COLORS.darkBlue,
  },
  menuItem: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'), // 16px
    lineHeight: isHpTablet('2%'),
    marginHorizontal: hp('0.6%'),
    letterSpacing: -0.3,
    color: COLORS.darkBlue,
  },
  deleteAccounttem: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'), // 16px
    lineHeight: isHpTablet('2%'),
    marginHorizontal: hp('0.6%'),
    letterSpacing: -0.3,
    color: COLORS.danger,
  },
});
