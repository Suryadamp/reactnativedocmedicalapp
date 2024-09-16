import { useState } from 'react';

const usePasswordValidation = () => {
  const [passwordError, setPasswordError] = useState<string>('');

  const validatePassword = (password: string): boolean => {
    if (password.length > 0) {
      setPasswordError('');
      return true;
    } else {
      setPasswordError('Password must not be empty');
      return false;
    }
  };

  return { passwordError, validatePassword };
};

export default usePasswordValidation;
