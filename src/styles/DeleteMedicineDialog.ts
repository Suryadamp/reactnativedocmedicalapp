import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet, isWpTablet } from '../hooks/useDeviceCheck';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 4,
    width: '80%',
    paddingBottom: hp('2%'),
  },
  title: {
    backgroundColor: COLORS.background.primary,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3.5%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    color: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.8%'),
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    marginTop: hp('1%'),
    paddingHorizontal: wp('3.5%'),
  },
  cancelText: {
    color: COLORS.black,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
  },
  cancelBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    width: isWpTablet('18%'),
    height: isHpTablet('3.5%'),
    justifyContent: 'center',
    marginEnd: hp('1%'),
    borderRadius: hp('0.6%'),
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
  },
  deleteText: {
    color: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
  },
  deleteBtnStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    width: isWpTablet('18%'),
    height: isHpTablet('3.5%'),
    justifyContent: 'center',
    marginEnd: hp('1%'),
    borderRadius: hp('0.6%'),
    borderColor: COLORS.danger,
    backgroundColor: COLORS.danger,
  },
  cancelBtnStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    width: isWpTablet('18%'),
    height: isHpTablet('3.5%'),
    justifyContent: 'center',
    marginEnd: hp('1%'),
    borderRadius: hp('0.6%'),
    borderColor: COLORS.danger,
    backgroundColor: COLORS.danger,
  },
  contentText: {
    color: COLORS.greyText,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3.5%'),
    marginTop: hp('1%'),
  },
  closeIcon: {
    height: isHpTablet('2%'),
    width: isHpTablet('2%'),
  },
  indicator: {
    paddingLeft: isWpTablet('1.5%'),
  },
});
