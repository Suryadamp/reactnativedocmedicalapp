import { useState } from 'react';

const usePhoneValidation = () => {
  const [phoneError, setPhoneError] = useState<string>('');

  const validatePhone = (phone: string): boolean => {
    if (phone.length === 10) {
      setPhoneError('');
      return true;
    } else if (phone.length > 0 && phone.length < 10) {
      setPhoneError('Mobile number must be 10 digits');
      return false;
    } else {
      setPhoneError('Mobile number must not be empty');
      return false;
    }
  };

  return { phoneError, validatePhone };
};

export default usePhoneValidation;
