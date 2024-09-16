// SurveyInput styles
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { COLORS, FONTS } from '../../constants';
import { isHpTablet, isWpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  input: {
    // width: isWpTablet('90%'), // Adjusted
    height: isHpTablet('6.5%'), // Adjusted
    backgroundColor: COLORS.white,
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 12,
    color: '#343E42',
    lineHeight: 15,
  },
  textInputIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.5),
    tintColor: COLORS.white_smoke,
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
  iconStyle: {
    width: 2,
    height: 2,
  },
});
