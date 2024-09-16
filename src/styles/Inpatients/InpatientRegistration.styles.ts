// InpatientRegistration styles
import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: hp('2%'),
  },
  header: {
    justifyContent: 'center',
    paddingVertical: isHpTablet(1),
    borderBottomColor: COLORS.white_smoke,
    borderBottomWidth: 1,
  },
  menuIcon: {
    height: isHpTablet(2.3),
    width: isHpTablet(2.3),
    // justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp('1.5%'),
    paddingVertical: hp('0.7%'),
  },
  filterIcon: { alignItems: 'center', height: 14, width: 14 },
  line: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
  filterText: {
    marginStart: hp('2%'),
    marginTop: hp('1.5%'),
    fontSize: hp('1.4%'),
    color: COLORS.text,
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayMedium,
  },
  filterValue: {
    marginTop: hp('1.5%'),
    fontSize: hp('1.4%'),
    color: COLORS.text,
    fontWeight: '500',
    fontFamily: FONTS.SFProDisplayRegular,
  },
  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  imageTouchStyle: {
    justifyContent: 'center',
  },
  viewStyle: {
    marginTop: hp('1.5%'),
  },
  clearText: {
    fontFamily: FONTS.Inter,
    fontSize: hp('1.4%'),
    fontWeight: '500',
    marginTop: hp('1.5%'),
    color: COLORS.text,
    marginHorizontal: hp('1%'),
  },
  deleteIcon: { width: hp('2.5%'), height: hp('2.7%'), marginHorizontal: hp('1%') },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
  },
  labBkarBoxStyle: {
    marginHorizontal: hp('1%'),
    marginVertical: hp('2%'),
    borderRadius: hp('0.5%'),
    width: hp('7%'),
    height: hp('7%'),
  },
  contentContainerStyle: {
    width: '100%',
    paddingHorizontal: hp('2%'),
  },
  commonStyle: {
    height: hp('2.5%'),
    width: wp('22%'),
  },
  secondWidth: {
    width: wp('60%'),
  },
  thirdWidth: {
    width: wp('10%'),
  },
  boxMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    // marginVertical: hp('2%'),
    backgroundColor: COLORS.background.white,
  },
  boxSummaryContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: hp('3%'),
    backgroundColor: COLORS.background.white,
    paddingHorizontal: wp('1.5%'),
  },
  saveBtn: {
    width: '100%',
    height: isHpTablet('6.5%'), // Adjusted
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background.primary,
  },
  saveBtnText: {
    fontFamily: FONTS.Poppins,
    fontSize: isHpTablet('2%'), // Adjusted
    lineHeight: isHpTablet('2.2%'),
    fontWeight: '700',
    color: COLORS.background.white,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
  },
  boxContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp('2%'), // Adjusted
    borderBottomWidth: 1,
    paddingHorizontal: wp('5%'), // Adjusted
    borderColor: '#f1f1f1',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: isHpTablet(1),
  },
  inputStyle: {
    width: wp('90%'), // Adjusted
    height: isHpTablet('5.5%'), // Adjusted
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    color: '#343E42',
    fontStyle: 'normal',
    lineHeight: isHpTablet('1.8%'),
    alignContent: 'center',
  },
  inputNameTxtStyle: {
    width: wp('80%'), // Adjusted
    height: isHpTablet('5.5%'), // Adjusted
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    color: '#343E42',
    fontStyle: 'normal',
    lineHeight: isHpTablet('1.8%'),
    alignContent: 'center',
  },
  inputTxtStyle: {
    width: wp('90%'), // Adjusted
    height: isHpTablet('5.5%'), // Adjusted
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
    color: '#343E42',
    fontStyle: 'normal',
    lineHeight: 15,
    alignContent: 'center',
  },
  inputDisTxtStyle: {
    width: wp('90%'), // Adjusted
    height: isHpTablet('5.5%'), // Adjusted
    backgroundColor: '#F9F9F9',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
  },
  iconStyle: {
    width: wp('5%'),
    height: hp('2.5%'),
  },
  addIcon: {
    width: hp('3%'),
    height: hp('3%'),
  },
  plusIcon: {
    marginHorizontal: '3%',
    width: isWpTablet('8%'),
    height: isHpTablet('4%'), // Adjusted
    backgroundColor: '#EDF5FF',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    fontFamily: FONTS.h4.fontFamily,
    fontSize: isHpTablet('2%'), // Adjusted
    lineHeight: isHpTablet('2.2%'),
    justifyContent: 'center',
    color: COLORS.text,
  },
  labelTitle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('2%'),
    justifyContent: 'center',
    color: '#8A8A8A',
    marginBottom: hp('1%')
  },
  summaryContainer: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 3,
    paddingBottom: '3%',
    paddingHorizontal: wp('5%'),
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  detail: {
    paddingVertical: wp('2%'),
  },
  leftContainer: {
    width: wp('50%'),
  },
  rightContainer: {
    width: wp('50%'),
  },
  valueContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'), // Adjusted
    lineHeight: isHpTablet('2.2%'),
    justifyContent: 'center',
    color: COLORS.text,
    paddingLeft: isHpTablet('1%'),
  },
  title: {
    ...FONTS.h4,
    color: '#232323',
    paddingLeft: 10,
  },
  containerVitalItem: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  column1: {
    marginHorizontal: hp('1%'),
    marginVertical: hp('1%'),
    width: wp('45%'),
  },
  column2: {
    marginHorizontal: hp('1%'),
    marginVertical: hp('1%'),
    width: wp('45%'),
  },
  inputTxt1: {
    marginVertical: 8,
    height: isHpTablet('5.5%'),
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet('1.8%'),
  },
  descriptionStyle: {
    marginVertical: 8,
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    lineHeight: isHpTablet('1.8%'),
  },
  suffixStyle: {
    color: '#8A8A8A',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
  },
  addTxt: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    fontWeight: '700',
    color: COLORS.background.primary,
  },
  btnItem: {
    height: isHpTablet('6.5%'),
    marginVertical: 10,
    backgroundColor: '#F4F9FF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unitSizeText: {
    color: '#8A8A8A',
    fontSize: isHpTablet('1.5%'),
  },
  desScriptionBox: {
    marginVertical: hp('1%'),
    marginHorizontal: hp('1%'),
  },
  listContainer: {
    marginVertical: isHpTablet(1.5),
  },
});
