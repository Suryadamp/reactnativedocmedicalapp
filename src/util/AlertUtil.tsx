import Snackbar from 'react-native-snackbar';
import { customLogger } from '../components/CustomLogger';

export function showSnackBar(message: string, options = {}) {
  customLogger('snackbar', 'screen', message);
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    ...options,
  });
}

export function showErrorSnackBar(message: string, options = {}) {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    textColor: '#fff',
    backgroundColor: '#cc0000',
    ...options,
  });
}

export function showSuccessSnackBar(message: string) {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    textColor: '#fff',
    backgroundColor: '#4BB543',
  });
}

export { Snackbar };
