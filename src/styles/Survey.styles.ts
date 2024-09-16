// Survey styles
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { COLORS, FONTS, SIZES } from '../constants';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  header: {
    justifyContent: 'center',
    paddingVertical: isHpTablet(1),
    borderBottomColor: COLORS.white_smoke,
    borderBottomWidth: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isHpTablet('1.5%'),
    paddingVertical: isHpTablet('0.7%'),
  },
  topBarTitle: {
    ...FONTS.h5,
    fontFamily: FONTS.SFProDisplayMedium,
    paddingTop: isHpTablet('1%'),
    justifyContent: 'center',
    fontWeight: '600',
    color: COLORS.text,
  },
  buttonBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  exitBtnStyle: {
    backgroundColor: COLORS.lightRed,
    borderRadius: isHpTablet('1%'),
    marginVertical: isHpTablet('2%'),
    height: isHpTablet('6.5%'),
    width: SIZES.screenWidth * 0.9,
    marginRight: isWpTablet('2%'),
  },
  previousBtnStyle: {
    backgroundColor: COLORS.gray,
    borderRadius: isHpTablet('1%'),
    marginVertical: isHpTablet('2%'),
    height: isHpTablet('6.5%'),
    width: SIZES.screenWidth * 0.45,
    marginRight: isWpTablet('2%'),
  },
  confirmBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: isHpTablet('1%'),
    marginVertical: isHpTablet('2%'),
    height: isHpTablet('6.5%'),
    width: SIZES.screenWidth * 0.45,
  },
  confirmTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  exitTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  previousTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.black_121212,
    textAlign: 'center',
  },
  icon: {
    height: isHpTablet('2.2%'),
    width: isHpTablet('2.2%'),
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: isWpTablet('5%'),
    marginVertical: isHpTablet('2%'),
    justifyContent: 'flex-start',
    flex: 1,
  },
  summaryContent: {
    marginHorizontal: isWpTablet('5%'),
    marginVertical: isHpTablet('2%'),
    flex: 1,
  },
  summaryItem: {
    width: isWpTablet('100%'),
    paddingVertical: isHpTablet('1%'),
  },
  question: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('2%'),
    fontWeight: '600',
    color: COLORS.black,
  },
  answer: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('2%'),
    fontWeight: '400',
    color: COLORS.black,
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: isHpTablet('0.2%'),
  },
  boxContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: isHpTablet('2%'), // Adjusted
    borderBottomWidth: 1,
    paddingHorizontal: isWpTablet('5%'), // Adjusted
    borderColor: '#f1f1f1',
  },
  contentContainerStyle: {
    paddingHorizontal: isWpTablet('2%'),
  },
  thank: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.large,
    fontWeight: '500',
    color: '#32CE95',
    textAlign: 'center',
    paddingHorizontal: isWpTablet('5%'),
    paddingVertical: isWpTablet('2%'),
  },
  info: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'),
    lineHeight: isHpTablet('2.5%'),
    fontWeight: '400',
    color: '#828282',
    textAlign: 'center',
    paddingHorizontal: isWpTablet('5%'),
  },
  summaryInfo: {
    flexDirection: 'column',
  },
  summaryTitle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.large,
    fontWeight: '700',
    color: COLORS.black,
    paddingTop: isHpTablet('3%'),
    paddingBottom: isHpTablet('2%'),
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: isHpTablet('10%'),
    marginHorizontal: isWpTablet('3%'),
    width: '90%',
  },
  iconStyle: {
    borderRadius: isHpTablet('3%'),
    height: isHpTablet('4.5%'),
    width: isHpTablet('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '7%',
  },
  separator: {
    marginVertical: 5,
    height: hp('4.5%'),
    width: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitleStyle: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.9%'),
    lineHeight: isHpTablet('2.6%'),
    color: '#0D141C',
    fontWeight: '600',
    marginTop: hp('1%'),
  },
  cardInfoStyle: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.8%'),
    lineHeight: isHpTablet('2%'),
    color: '#4F7396',
    fontWeight: '600',
    marginTop: hp('1%'),
  },
});
