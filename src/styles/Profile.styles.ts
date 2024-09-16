import { StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  changeBtn: {
    height: isHpTablet('4%'),
    width: isHpTablet('14%'),
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  separator: {
    borderBottomColor: COLORS.background.secondary,
    marginVertical: hp('1%'),
    borderBottomWidth: hp('0.2%'),
  },
  userDetailSection: {
    flexDirection: 'row',
    gap: isHpTablet('1.5%'),
    marginVertical: isHpTablet('1.5%'),
    justifyContent: 'space-around',
  },
  descTxt: {
    color: COLORS.text,
    fontFamily: FONTS.SFProDisplay_w400,
    fontSize: isHpTablet('1.5%'),
    letterSpacing: wp('0.05'),
  },
  cardtitle: {
    fontFamily: FONTS.SFProDisplay_w600,
    fontSize: isHpTablet('1.5'),
    letterSpacing: wp('0.05'),
    marginVertical: hp('0.5%'),
  },
  userDetailCard: {
    padding: isHpTablet('3%'),
    width: isWpTablet('35%'),
    height: isHpTablet('15%'),
    backgroundColor: COLORS.blue_F3F8FF,
    borderRadius: hp('1%'),
  },
  userIdTxt: {
    color: COLORS.background.primary,
    fontFamily: FONTS.InterBold,
    fontSize: isHpTablet('1.9'),
  },
  uhidNo: {
    fontFamily: FONTS.SFProDisplay_w400,
    fontSize: isHpTablet('1.5'),
    marginVertical: isHpTablet('1%'),
  },
  qrcodeImg: {},
  qrcodeSection: {
    paddingVertical: isHpTablet('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeTxt: {
    color: COLORS.background.primary,
    fontSize: isHpTablet('1.7'),
    fontFamily: FONTS.SFProDisplayRegular,
    marginTop: isHpTablet('0.6%')
  },
  userName: {
    color: COLORS.black,
    fontFamily: FONTS.InterBold,
    fontWeight: '600',
    fontSize: isHpTablet('1.8'),
  },
  userIcon: { marginRight: isHpTablet('1%') },
  userNamesStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeUserSecion: {
    paddingHorizontal: hp('2%'),
    height: isHpTablet('6%'),
    backgroundColor: COLORS.background.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    padding: 15,
  },
  title: {
    ...FONTS.h4,
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('2.2%'),
    fontWeight: '600',
    color: COLORS.black,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 20,
    ...FONTS.h4,
  },
  iconStyle: { height: isHpTablet(3), width: isHpTablet(3) },
});
