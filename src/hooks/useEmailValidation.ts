// useEmailValidation
import { useState } from 'react';

const useEmailValidation = () => {
  const [emailError, setEmailError] = useState<string>('');

  const validateEmail = (email: string): boolean => {
    const emailReg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/; // eslint-disable-line

    if (emailReg.test(email) && email.length > 0) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Please enter the valid email');
      return false;
    }
  };

  return { emailError, validateEmail };
};

export default useEmailValidation;
