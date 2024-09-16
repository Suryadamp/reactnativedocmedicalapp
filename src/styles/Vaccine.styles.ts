import { StyleSheet } from 'react-native';
import { SIZES, COLORS, FONTS } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  listContent: {
    paddingBottom: isHpTablet('2%'), // Add the desired bottom padding
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

  pateintDetailsContainer: {
    marginVertical: hp('1.5%'),
    marginHorizontal: hp('2%'),
  },
  pateintContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: FONTS.SFProDisplayBold,
    fontSize: isHpTablet('1.8%'),
    fontWeight: '600',
    color: COLORS.black,
    fontStyle: 'normal',
    letterSpacing: -0.24,
    marginBottom: hp('1%'),
  },
  iconStyle: {
    width: isWpTablet('10%'),
    height: isHpTablet('2.3%'),
  },
  divider: {
    borderBottomWidth: hp('0.1%'),
    borderColor: COLORS.grey_E5E5E5,
    marginTop: hp('1%'),
  },

  backgroundStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 2,
  },
  justifyStyle: {
    justifyContent: 'center',
  },
  inputTxtStyle: {
    height: isHpTablet('5.5%'),
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayMedium,
    lineHeight: isHpTablet('1.8%'),
    backgroundColor: COLORS.white,
  },
  cardContainer: {
    margin: hp('1%'),
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    borderWidth: hp('0.1%'),
    borderColor: COLORS.grey_D8D8D8,
    borderRadius: hp('1%'),
    overflow: 'hidden',
    marginTop: hp('1.4%'),
    shadowColor: COLORS.grey_FAFAFA,
  },
  prescriptionNo: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.white,
    fontSize: isHpTablet('1.6%'),
    fontWeight: 'bold',
  },
  date: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.white,
    fontSize: isHpTablet('1.4%'),
    fontWeight: 'bold',
  },
  prescriptionNoBold: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: isHpTablet('1.6%'),
    marginStart: hp('0.5%'),
    fontWeight: 'bold',
  },
  symptoms: {
    fontFamily: FONTS.SFProDisplayRegular,
    color: COLORS.black_252525,
    fontSize: isHpTablet('1.4%'),
    marginTop: hp('1%'),
  },
  iosShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  androidShadow: {
    elevation: hp('0.5%'),
    borderRadius: hp('1%'),
    borderWidth: 1,
  },
  statusImage: {
    justifyContent: 'center',
    marginVertical: hp('1.5%'),
    marginHorizontal: hp('2%'),
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  verticalDivider: {
    width: wp('0.2%'),
    height: '100%',
    backgroundColor: COLORS.grey_D8D8D8,
  },
  dose: {
    color: COLORS.text,
    fontSize: isHpTablet('2%'),
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplayBold,
  },
  successDose: {
    color: COLORS.black_121212,
    fontSize: hp('1.6%'),
    fontWeight: '600',
    fontFamily: FONTS.SFProDisplayBold,
  },
  dateText: {
    color: COLORS.grey_838383,
    fontSize: isHpTablet('1.6%'),
    fontWeight: '400',
    marginTop: hp('0.5%'),
    fontFamily: FONTS.SFProDisplayBold,
  },
  iconSize: {
    height: isHpTablet('3.5%'),
    marginLeft: isHpTablet('2%'),
  },

  titleDetailsContainer: {
    marginTop: hp('1%'),
    marginHorizontal: hp('2%'),
  },
  titleContainer: {
    fontSize: isHpTablet('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    marginHorizontal: hp('2%'),
    marginVertical: hp('1.5%'),
  },
  subContainer: {
    flexDirection: 'column',
    marginHorizontal: hp('2%'),
  },
  lightText: {
    color: COLORS.placeHolder,
    fontSize: isHpTablet('1.6%'),
    fontFamily: FONTS.SFProDisplayRegular,
    marginBottom: hp('0.5%'),
  },
  contentText: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('1.6%'),
    color: COLORS.black,
    fontStyle: 'normal',
    letterSpacing: -0.24,
  },
  commonStyle: {
    marginTop: hp('1%'),
    iconSize: isHpTablet('2%'),
  },
  contentContainerBox: {
    height: isHpTablet('5%'),
    width: isHpTablet('5%'),
    borderRadius: hp('0.8%'),
    marginTop: hp('0.5%'),
    backgroundColor: '#F1F9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailImageStyle: {
    height: isHpTablet('2%'),
    width: isHpTablet('2%'),
  },
  backGroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backGroundImageBox: {
    position: 'absolute',
    top: hp('16%'),
    left: wp('-10%'),
  },
  backGroundImageBoxTab: {
    position: 'absolute',
    bottom: wp('-9%'),
    right: wp('-5%'),
    transform: [{ rotate: '300deg' }, { scaleX: -1 }],
  },
});
