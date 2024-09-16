import { COLORS } from '../../../constants';
import { isHpTablet } from '../../../hooks/useDeviceCheck';
export const indicatorsCustomStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize: 20,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 6,
  stepStrokeCurrentColor: COLORS.background.primary,
  stepStrokeFinishedColor: COLORS.background.primary,
  separatorFinishedColor: COLORS.background.primary,
  separatorUnFinishedColor: COLORS.white_smoke,
  stepIndicatorFinishedColor: COLORS.background.primary,
  stepIndicatorUnFinishedColor: COLORS.white_smoke,
  stepIndicatorLabelFinishedColor: COLORS.white_smoke,
  stepIndicatorLabelUnFinishedColor: COLORS.white_smoke,
  labelColor: '#C5C5C5',
  labelSize: isHpTablet('1.6%'),
  currentStepLabelColor: COLORS.background.primary,
};

export const textInputThemeColors = {
  primary: COLORS.black,
  underlineColor: 'transparent',
  background: COLORS.background.secondary,
  onSurfaceVariant: '#8A8A8A',
};
