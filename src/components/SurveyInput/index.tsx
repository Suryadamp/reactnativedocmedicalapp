// Survey Input
import React, { useState } from 'react';
import { TextInput, Text } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { COLORS } from '../../constants';
import styles from '../../styles/component_styles/SurveyInput.styles';
import { TouchableOpacity } from 'react-native';

interface SurveyInputProps {
  label?: string;
  value: string;
  type: string;
  errorText?: string;
  editable: boolean;
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
  placeholder?: string;
  rightIcon?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  onClickCalendar?: () => void;
  onClickList?: () => void;
  onClickTime?: () => void;
}

const SurveyInput = (props: SurveyInputProps) => {
  const {
    label,
    value,
    type,
    errorText,
    keyboardType = 'default',
    maxLength,
    returnKeyType = 'done',
    placeholder,
    // rightIcon,
    onClickList,
    onClickCalendar,
    onChangeText,
    onSubmitEditing,
    ...rest
  } = props;
  console.log('editable', rest.editable);
  const [isAutoFocus, setAutoFocus] = useState(false);

  const handleClick = () => {
    console.log('handleClick');
    setAutoFocus(true);
    if (!rest.editable) {
      if (
        (type === 'datepicker' || type === 'datetimepicker' || type === 'timepicker') &&
        onClickCalendar
      ) {
        onClickCalendar();
      } else if ((type === 'select' || type === 'multiselect') && onClickList) {
        onClickList();
      }
    } else {
      setAutoFocus(true);
    }
  };

  return (
    <TouchableOpacity onPress={handleClick} activeOpacity={0.8}>
      <TextInput
        label={label}
        mode="outlined"
        value={value}
        autoFocus={isAutoFocus}
        keyboardType={keyboardType}
        maxLength={maxLength}
        returnKeyType={returnKeyType}
        placeholder={placeholder}
        showSoftInputOnFocus={rest.editable}
        style={styles.input}
        multiline={type === 'textarea'}
        outlineColor={COLORS.gray}
        outlineStyle={{ borderWidth: 1.5 }}
        activeOutlineColor={COLORS.background.primary}
        onPressOut={() => setAutoFocus(false)}
        onPressIn={handleClick}
        onSubmitEditing={onSubmitEditing}
        right={
          type === 'datepicker' || type === 'datetimepicker' || type === 'timepicker' ? (
            <TextInput.Icon
              // style={styles.textInputIcon}
              color={COLORS.grey_CACACA}
              icon="calendar"
              onPress={onClickCalendar}
            />
          ) : type === 'select' || type === 'multiselect' ? (
            <TextInput.Icon
              // style={styles.textInputIcon}
              color={COLORS.grey_CACACA}
              icon="chevron-down"
              onPress={onClickList}
            />
          ) : null
        }
        theme={{
          colors: {
            primary: COLORS.gray,
            background: COLORS.background.white,
          },
          roundness: wp(1.8),
        }}
        onChangeText={onChangeText}
        {...rest}
      />
      <Text style={styles.errorBox}>{errorText && errorText}</Text>
    </TouchableOpacity>
  );
};

export default SurveyInput;
