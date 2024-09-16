import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  handle: {
    paddingHorizontal: isWpTablet('2%'),
    paddingTop: isHpTablet('1%'),
    paddingBottom: isHpTablet('1%'),
  },
  handleIndicator: {
    width: isWpTablet('10%'),
    height: isHpTablet('0.7%'),
    borderRadius: isHpTablet('0.3%'),
    backgroundColor: '#CBD2D9',
  },
  backgroundStyle: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.gray,
    borderWidth: hp('0.3%'),
  },
  contentContainer: {
    paddingHorizontal: isWpTablet('3.5%'),
    paddingBottom: isHpTablet('2.5%'),
  },
  iOSBackdrop: {
    backgroundColor: COLORS.black,
    opacity: 0.5,
  },
  androidBackdrop: {
    backgroundColor: COLORS.black,
    opacity: 0.52,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: isHpTablet('2%'),
    borderBottomWidth: isHpTablet('0.1%'),
    borderColor: '#f1f1f1',
    // paddingHorizontal: wp('2%'),
  },
  titleText: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('2%'),
    lineHeight: isHpTablet('2.2%'),
    textAlign: 'center',
    color: COLORS.black_2D3339,
  },
  iconStyle: {
    width: isHpTablet('2.5%'), // Adjusted
    height: isHpTablet('2.5%'), // Adjusted
  },
});
