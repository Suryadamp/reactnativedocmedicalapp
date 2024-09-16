import { StyleSheet } from 'react-native';
import {  COLORS, FONTS } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flex: 1,
    color: COLORS.black,
    width: '100%',
  },
  avatar: {
    height: isHpTablet('7%'),
    width: isHpTablet('7%'),
    borderRadius: isHpTablet('7%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#121212',
    fontFamily: FONTS.SFProDisplay_w700,
    fontSize: isHpTablet('3.5%'),
    letterSpacing: hp('0.1%'),
    alignContent: 'center',
    textTransform: 'capitalize',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: isHpTablet('1.5%'),
    fontStyle: 'normal',
  },
  viewText: {
    color: '#207DFF',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.4%'),
    lineHeight: 15,
    letterSpacing: -0.32,
    alignContent: 'center',
  },
  arrow: {
    height: 12,
    width: 6,
    alignContent: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  drawerItemList: {
    flex: 1,
    paddingTop: 10,
  },
  drawerLabelStyle: {
    fontFamily: FONTS.SFProDisplayMedium,
    // fontSize: 14,
    fontSize: isHpTablet('1.6%'),
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: -0.16,
    right: 15,
  },
  drawerIconStyle: { height: 22, width: 22 },
  drawerArrowIcon: {
    // height: 12,
    height: isHpTablet('1.4%'),
    // width: 6,
    width: isHpTablet('0.8%'),
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
  },
  txtComingSoon: {
    alignSelf: 'center',
    position: 'absolute',
    color: COLORS.green_00B347,
    fontSize: isHpTablet('1%'),
    // fontSize: 8,
    right: 25,
    borderRadius: 6,
    borderWidth: 0.5,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderColor: COLORS.green_CFFED6,
    backgroundColor: COLORS.green_CFFED6,
  },
});
