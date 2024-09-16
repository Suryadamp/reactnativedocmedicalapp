import React, { useState } from 'react';
import { TextInput, Text } from 'react-native-paper';
import { COLORS } from '../../constants';
import styles from '../../styles/component_styles/CustomInput.styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDebounce } from '../../hooks/useLogs';

interface CustomTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  errorText?: string;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'phone-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  maxLength?: number;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
  placeholder?: string;
  ref?: React.RefObject<React.ElementRef<typeof TextInput>>;
  rightIcon?: string;
}

const CustomTextInput = React.forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      label,
      value,
      onChangeText,
      secureTextEntry = false,
      errorText,
      keyboardType = 'default',
      maxLength,
      returnKeyType = 'done',
      onSubmitEditing,
      placeholder,
      rightIcon,
      ...rest
    },
    ref,
  ) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
    };

    useDebounce(value, label, 1000, 'input');
    useDebounce(errorText, label, 1000, 'error');

    return (
      <>
        <TextInput
          label={label}
          mode="outlined"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          style={styles.input}
          outlineColor={COLORS.background.primary}
          activeOutlineColor={COLORS.background.primary}
          theme={{
            colors: {
              primary: COLORS.gray,
              background: COLORS.background.white,
            },
            roundness: wp(1.8),
          }}
          right={
            secureTextEntry ? (
              <TextInput.Icon
                style={styles.textInputIcon}
                iconColor={COLORS.background.primary}
                icon={isPasswordVisible ? 'eye' : 'eye-off'}
                onPress={togglePasswordVisibility}
              />
            ) : rightIcon ? (
              <TextInput.Icon
                style={styles.textInputIcon}
                iconColor={COLORS.background.primary}
                icon={rightIcon}
                onPress={togglePasswordVisibility}
              />
            ) : null
          }
          {...rest}
          ref={ref}
        />
        <Text style={styles.errorBox}>{errorText && errorText}</Text>
      </>
    );
  },
);

export default CustomTextInput;
