import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { isHpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  input: {
    width: wp(85),
    height: isHpTablet(7),
    fontSize: isHpTablet(2),
    lineHeight: hp(2.1),
  },
  textInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.5),
    tintColor: COLORS.background.primary,
  },
  errorBox: {
    flexDirection: 'row',
    color: 'red',
    marginRight: hp(5),
    fontSize: isHpTablet(1.7),
    fontFamily: FONTS.InterMedium,
    alignSelf: 'flex-end',
    height: hp(2.2),
  },
});
