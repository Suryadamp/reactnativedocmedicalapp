import Snackbar from 'react-native-snackbar';
import { COLORS } from '../constants';

const SnackbarUtil = {
  showError(message: string) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: COLORS.red_FF434F,
      textColor: '#FFFFFF',
      // ... other Snackbar configurations ...
    });
  },
  // ... other Snackbar related functions ...
};

export default SnackbarUtil;
