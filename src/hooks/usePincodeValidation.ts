// usePinCodeValidation
import { useState } from 'react';

const usePincodeValidation = () => {
  const [pincodeError, setPincodeError] = useState<string>('');

  const validatePincode = (pincode: string): boolean => {
    const reg = /^\d{4,6}\b/g;
    if (reg.test(pincode)) {
      setPincodeError('');
      return true;
    } else {
      setPincodeError('Enter proper pincode');
      return false;
    }
  };

  return { pincodeError, validatePincode };
};

export default usePincodeValidation;
