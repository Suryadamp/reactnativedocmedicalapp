// Styles - Checkbox
import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';
import { isWpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  checkIcon: {
    marginRight: isWpTablet(2),
  },
  labelTxt: {
    fontSize: 15,
    color: COLORS.black,
  },
});
