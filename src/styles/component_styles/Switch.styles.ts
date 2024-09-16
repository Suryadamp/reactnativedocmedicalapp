// Styles - Switch
import { StyleSheet } from 'react-native';

import { isWpTablet, isHpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  boxContainer: {
    width: isWpTablet(12),
    height: isHpTablet(3.2),
    borderRadius: 16,
  },
  backgroundGradient: {
    borderRadius: 16,
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  headGradient: {
    width: isWpTablet(6),
    height: isHpTablet(3.1),
    borderRadius: 15,
  },
  labelTxt: {
    paddingHorizontal: isWpTablet(2),
  },
});
