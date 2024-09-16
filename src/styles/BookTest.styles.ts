import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import { isHpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    justifyContent: 'center',
    marginTop: hp('1%'),
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('1.5%'),
    paddingVertical: hp('0.7%'),
  },
  title: {
    color: '#2D3339',
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.8%'),
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: isHpTablet('1.8%'),
    marginBottom: hp('0.6%'),
    marginTop: hp('0.2%'),
  },
  subtitle: {
    color: '#207DFF',
    fontFamily: FONTS.SFProDisplayRegular, // Make sure this font is linked in your React Native project
    fontSize: isHpTablet('1.5%'), // px is assumed, so just the number
    fontStyle: 'normal',
    fontWeight: '400',
  },
  icon: {
    height: isHpTablet('2.2%'),
    width: isHpTablet('2.2%'),
    justifyContent: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },

  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  inputTxtStyle: {
    color: '#343E42',
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.6%'),
    fontStyle: 'normal',
    lineHeight: isHpTablet('1.8%'),
    alignContent: 'center',
    height: isHpTablet('5.5%'),
    marginTop: isHpTablet('1%'),
  },
  bottomFlexBox: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    top: Platform.OS === 'ios' ? SIZES.screenHeight / 1.1 : hp('92%'),
  },
  payBtn: {
    backgroundColor: COLORS.background.primary,
    borderRadius: isHpTablet('1%'),
    height: isHpTablet('6.5%'),
  },
  btnTextStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  accountBoxIconStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  accountIconStyle: {
    marginTop: hp('0.5%'),
    marginHorizontal: hp('0.4%'),
    alignSelf: 'center',
  },
  accNameStyle: {
    // marginTop: isHpTablet('1%'),
    paddingLeft: 5,
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.Inter,
    color: COLORS.black,
  },
  flatBoxStyle: {
    marginVertical: hp('1.5%'),
    height: '62%',
  },
  amountBoxStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountTxtStyle: {
    color: COLORS.background.primary,
    fontSize: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayMedium,
  },
  testAddTxtStyle: {
    color: COLORS.text,
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayMedium,
  },
  labBkarBoxStyle: {
    // margin: 20,
    marginVertical: isHpTablet('2%'),
    borderRadius: isHpTablet('0.5%'),
    width: isHpTablet('7%'),
    height: isHpTablet('7%'),
  },
  labBkarStyle: {
    margin: isHpTablet('2%'),
  },
  testNameStyle: {
    color: COLORS.black_121212,
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    fontWeight: '600',
    lineHeight: isHpTablet('2.2%'),
  },
  testTypeStyle: {
    color: COLORS.background.primary,
    fontSize: isHpTablet('1.4%'),
    fontWeight: '400',
    fontFamily: FONTS.SFProDisplayRegular,
    lineHeight: isHpTablet('1.8%'),
  },
  testAmountStyle: {
    color: COLORS.black_121212,
    fontSize: isHpTablet('1.6%'),
    fontWeight: '400',
    fontFamily: FONTS.SFProDisplayRegular,
    lineHeight: isHpTablet('2.5%'),
  },
  plusBoxStyle: {
    borderWidth: hp('0.2%'),
    borderColor: COLORS.grey_CACACA,
    borderRadius: isHpTablet('0.4%'),
    backgroundColor: COLORS.background.white,
    height: isHpTablet('3%'),
    width: isHpTablet('3%'),
    // marginHorizontal: hp('0.5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusTxtStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: isHpTablet('1.65%'),
    color: COLORS.black,
  },
  contentContainerStyle: {
    width: '100%',
    paddingHorizontal: hp('2%'),
  },
  deleteIcon: {
    width: isHpTablet('2.5%'),
    height: isHpTablet('2.7%'),
    marginHorizontal: isHpTablet('1%'),
  },
  searchDoctorInput: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  commonStyle: {
    height: isHpTablet('2.5%'),
    width: wp('23%'),
  },
  secondWidth: {
    width: wp('60%'),
  },
  thirdWidth: {
    width: wp('10%'),
  },
  testListContainer: {
    height: hp('20%'),
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp('2%'),
  },
  testListDivider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: hp('0.5%'),
  },
  orderSumBottomFlexBox: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    top: Platform.OS === 'ios' ? SIZES.screenHeight / 1.25 : hp('85%'),
  },

  orderSumAccountIconStyle: {
    // margin: hp('0.8%'),
    // height: isHpTablet('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    height: hp('2%'),
  },
  orderSumContentContainerStyle: {
    paddingHorizontal: hp('2%'),
    paddingBottom: hp('1%'),
    width: '100%',
  },
  patientDetailsSubBoxStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: hp('2%'),
    marginVertical: hp('0.5%'),
  },
  patientSubTxtStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    color: COLORS.grey_969696,
    lineHeight: isHpTablet('1.8%'),
    marginBottom: hp('0.5%'),
  },
  widthOne: {
    width: wp('20%'),
  },
  widthTwo: {
    width: wp('10%'),
  },
  widthThree: {
    width: wp('70%'),
  },
  patientDetailTitleStyle: { fontSize: isHpTablet('1.8%'), fontFamily: FONTS.SFProDisplayBold },
  patientBoxStyle: {
    // height: '25%',
    marginHorizontal: hp('2%'),
    marginBottom: hp('1%'),
    borderWidth: 1,
    borderColor: COLORS.white_smoke,
    borderRadius: hp('0.3%'),
  },
  patienBoxTextStyle: {
    marginHorizontal: hp('2%'),
    marginVertical: hp('0.5%'),
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_121212,
  },
  selectTestStyle: {
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayBold,
    color: COLORS.text,
  },
  totalAmountStyle: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.6%'),
    alignSelf: 'center',
    color: COLORS.text,
  },
  agreeTextStyle: {
    fontSize: isHpTablet('1.4%'),
    fontFamily: FONTS.SFProDisplaySemibold,
    color: COLORS.grey_969696,
  },
  termsTxtStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.background.primary,
  },
  testBoxStyle: {
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: hp('0.3%'),
    marginVertical: hp('1%'),
  },
  orderSumTestNameStyle: {
    fontSize: isHpTablet('1.8%'),
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.text,
  },

  testPreparationStyle: {
    fontSize: isHpTablet('1.6%'),
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayMedium,
    color: COLORS.text,
    textDecorationLine: 'underline',
  },
  showTextStyle: {
    fontSize: isHpTablet('1.3%'),
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.dim_grey,
    marginHorizontal: hp('1%'),
    marginVertical: hp('0.5%'),
  },
  orderSumDeleteIcon: { width: isHpTablet('2%'), height: isHpTablet('2%') },
  boxContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp('1.6%'),
  },
  btnText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  textBoxStyle: {
    width: hp('0.8%'),
    height: hp('0.8%'),
    borderRadius: hp('0.4%'),
    backgroundColor: 'black',
    marginHorizontal: hp('1%'),
    marginVertical: hp('0.6%'),
  },
});
