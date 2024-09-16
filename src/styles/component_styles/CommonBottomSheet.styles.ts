import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: isHpTablet('2%'),
  },
  buttonBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  boxStyle: {
    flex: 1,
    maxHeight: hp('35%'),
  },
  applyBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 10,
    height: isHpTablet('6.5%'),
    width: '100%',
  },
  applyTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: isHpTablet('2%'),
    color: COLORS.background.white,
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: hp('1%'),
  },
  selectedRadioText: {
    marginTop: hp('1%'),
    color: COLORS.background.primary,
    fontFamily: FONTS.SFProDisplayMedium,
    fontSize: isHpTablet('1.8%'),
  },
});
