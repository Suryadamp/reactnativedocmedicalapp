// Styles - Switch
import { StyleSheet } from 'react-native';

import { isWpTablet, isHpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  iconContainer: {
    // width: isWpTablet('5%'),
    // height: isHpTablet('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSize: {
    height: isHpTablet('2.2%'),
    width: isWpTablet('5%'),
  },
  imageSize: {
    height: isHpTablet('2.9%'),
    width: isWpTablet('4.5%'),
  },
  editImageSize: {
    height: 18,
    width: 18,
  },
});
