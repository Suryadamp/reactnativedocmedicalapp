// SurveyQuestionItem styles
import { StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../../constants';
import { isHpTablet, isWpTablet } from '../../hooks/useDeviceCheck';

export default StyleSheet.create({
  container: {
    width: isWpTablet(90),
    height: isHpTablet(15),
  },
  content: {
    flexDirection: 'row',
  },
  title: {
    fontSize: isHpTablet('2.5%'),
    lineHeight: isHpTablet('3.2%'),
    paddingBottom: isHpTablet('2%'),
    fontFamily: FONTS.SFProDisplayBold,
    fontWeight: '700',
    color: COLORS.dark_gray,
    width: isWpTablet('72%'),
    paddingRight: isWpTablet('5%'),
    paddingVertical: isHpTablet('2%'),
  },
  statusImage: {
    marginRight: 8,
  },
  checkRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  chartTxt: {
    fontSize: 13,
    color: COLORS.black,
  },
  autoText: {
    fontSize: 13,
    color: COLORS.black,
  },
});
