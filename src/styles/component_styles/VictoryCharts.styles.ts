import { Platform, StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../constants';
import { isHpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  AxisTickLabel: {
    padding: 2,
    angle:  Platform.OS === 'ios' ?  25: 25,
    textAnchor: 'start',
  },
  lineDataBox: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  lineDataRenderBoxmain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineDataRenderBoxSub: {
    width: 20,
    height: 10,
    borderRadius: 15,
    marginEnd: 10,
  },
  lineDataRenderBoxText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: isHpTablet('1.6%'),
    color: COLORS.text,
    marginEnd: 10,
  },
});
