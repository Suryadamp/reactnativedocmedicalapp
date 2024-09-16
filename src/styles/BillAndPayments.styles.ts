import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  scrollViewStyle: { marginHorizontal: isHpTablet('2%') },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    justifyContent: 'center',
    marginTop: isHpTablet('1%'),
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('1.5%'),
    paddingVertical: hp('0.7%'),
  },
  billContainer: {
    flex: 1,
    marginTop: hp('0.9%'),
  },
  line: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: hp('0.1%'),
    // marginHorizontal: hp('2%')
  },

  advanceTitle: {
    fontWeight: '700',
    marginStart: isHpTablet('2%'),
    justifyContent: 'center',
    color: COLORS.background.primary,
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.8%'),
  },
  ScrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundTextStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFlexStyle: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: hp('0.1%'),
    borderColor: COLORS.grey_E5E5E5,
  },
  marginStyle: { margin: hp('0.5%') },
  cardContainer: {
    margin: hp('0.3%'),
    display: 'flex',
    flexDirection: 'row',
  },
  seperator: {
    marginLeft: isHpTablet('1.8%'),
    width: 2,
  },
  card: {
    flex: 1,

    overflow: 'hidden',
  },

  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
  },
  nameStyle: {
    marginTop: hp('0.5%'),
    fontFamily: FONTS.Inter,
    fontSize: isHpTablet('1.6%'),
    color: COLORS.darkBlue,
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: hp('0.5%'),
  },
  monthStyle: {
    fontFamily: FONTS.Inter,
    fontSize: isHpTablet('1.2%'),
    color: COLORS.placeHolder,
    fontWeight: '400',
    marginBottom: hp('0.8%'),
    marginHorizontal: hp('0.6%'),
  },
  billNoStyle: {
    fontFamily: FONTS.Inter,
    fontSize: isHpTablet('1.5%'),
    color: COLORS.placeHolder,
    fontWeight: '400',
    marginBottom: hp('0.8%'),
  },
  cardTitleStyle: {
    fontFamily: FONTS.Inter,
    fontSize: isHpTablet('1.8%'),
    color: COLORS.text,
    fontWeight: '600',
  },

  verticalDivider: {
    width: wp('10%'), // Adjust the width of the vertical line
    height: '100%', // Set the height to make it vertical
    backgroundColor: 'red',
    transform: [{ rotate: '90deg' }], // Correct the transform property
  },
  payBtnStyle: {
    alignSelf: 'flex-end',
    borderRadius: isHpTablet('0.4%'),
    width: isWpTablet('20%'),
    height: isHpTablet('4%'),
  },
  bookAgainTxtStyle: {
    color: COLORS.white,
    fontSize: isHpTablet('1.5%'),
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplayMedium,
  },
  billBoxStyle: {
    display: 'flex',
  },
  dayBoxStyle: {
    backgroundColor: COLORS.text,
    borderRadius: isHpTablet('2%'),
    height: isHpTablet('4%'),
    width: isHpTablet('4%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isHpTablet('0.4%'),
    // marginLeft: hp('-0.3%'),
  },
  dayStyle: {
    color: 'white',
    fontSize: isHpTablet('1.5%'),
    fontWeight: '500',
    fontFamily: FONTS.Inter,
  },
  amountTxtStyle: {
    textAlign: 'center',
    marginBottom: isHpTablet('2.5%'),
    fontSize: isHpTablet('1.8%'),
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.black,
  },
  filterIconStyle: {
    justifyContent: 'center',
  },
  yearMarginStyle: {
    marginLeft: isHpTablet('2%'),
    marginBottom: isHpTablet('1%'),
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.Inter,
    fontWeight: '500',
    color: COLORS.black_2D3339,
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: hp('0.2%'),
  },
  marginTopStyle: {
    marginTop: 15,
    fontSize: 13,
    fontFamily: FONTS.Inter,
    fontWeight: '500',
  },
  accountIconStyle: {
    marginTop: isHpTablet('0.5%'),
    marginHorizontal: isHpTablet('0.4%'),
    alignSelf: 'center',
  },
  accNameStyle: {
    marginTop: isHpTablet('0.5%'),
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.Inter,
    color: COLORS.black,
  },
  accountBoxIconStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: isHpTablet('2.5%'),
  },
  topBarTitle: {
    ...FONTS.h5,
    justifyContent: 'center',
    color: COLORS.text,
  },
  icon: {
    height: 15,
    width: 20,
    justifyContent: 'center',
  },

  inputTxtStyle: {
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    color: COLORS.text,
    fontSize: isHpTablet('1.8%'),
    lineHeight: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayMedium,
    backgroundColor: COLORS.white,
  },
  uhidInputTxtStyle: {
    width: SIZES.screenWidth * 0.5,
    height: isHpTablet('5.5%'),
    marginVertical: isHpTablet('0.5%'),
    color: COLORS.text,
    fontSize: isHpTablet('1.8%'),
    lineHeight: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayMedium,
    backgroundColor: COLORS.white,
  },
  mobileInputTxtStyle: {
    width: SIZES.screenWidth * 0.36,
    height: isHpTablet('5.5%'),
    marginVertical: hp('0.5%'),
    color: COLORS.text,
    fontSize: isHpTablet('1.8%'),
    lineHeight: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayMedium,
    backgroundColor: COLORS.white,
  },
  bottomFlexBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',

    bottom: Platform.OS === 'ios' ? SIZES.screenHeight / 55 : SIZES.screenHeight / 80,
  },
  payBtn: {
    backgroundColor: COLORS.background.primary,
    borderRadius: isHpTablet('1%'),
    height: isHpTablet('6.5%'),
  },
  iconStyle: {
    marginTop: hp('1%'),
  },
  numberText: {
    textAlign: 'right',
    color: '#838383',
    fontSize: isHpTablet('1.2%'),
    fontFamily: FONTS.SFProDisplayRegular,
    marginHorizontal: hp('0.4'),
  },
  payText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  currencyIocn: {
    height: isHpTablet('1.8%'),
  },
  successIcon: {
    height: isHpTablet('4%'),
    width: isHpTablet('4%'),
    alignSelf: 'center',
  },
  SuccessArrowIcon: {
    height: isHpTablet('2%'),
    width: isHpTablet('8%'),
    alignSelf: 'center',
  },
  moneyText: {
    color: COLORS.background.white,
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
  },
  hospitalNameText: {
    color: COLORS.background.white,
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayBold,
  },
  paymentStatusText: {
    textAlign: 'center',
    fontSize: isHpTablet('1.5%'),
    fontFamily: FONTS.SFProDisplayMedium,
  },
  titleText: {
    marginVertical: isHpTablet('1%'),
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black,
  },
  subTitleText: {
    marginBottom: isHpTablet('1.5%'),
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.black,
  },
  transHospitalBox: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: isHpTablet('1.5%'),
    marginVertical: isHpTablet('1%'),
    justifyContent: 'space-between',
  },
});
