import React from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FONTS, SIZES, assets } from '../../constants';
import { Box } from '../index';
import { useDebounce } from '../../hooks/useLogs';

interface Props {
  value?: string;
  label?: string;
  icon?: React.ReactNode;
  iconPosition?: string;
  error?: string;
  style?: any;
  onChangeText?: (value: string) => any;
  onBlur?: (value: any) => any;
  onFocus?: (value: any) => any;
  placeholder?: string;
  placeholderTextColor?: any;
  labelStyle?: any;
  inputOutContainer?: any;
  inputInsideContainer?: any;
  secureTextEntry?: any;
  autoCorrect?: any;
  autoCapitalize?: any;
  keyboardType?: any;
  editable?: any;
  showSoftInputOnFocus?: any;
  ref?: any;
  autoFocus?: boolean;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  horizontalScroll?: boolean;
}

const CustomSearchBar = (props: Props) => {
  const {
    style,
    onChangeText,
    value,
    placeholder,
    placeholderTextColor,
    autoCorrect,
    autoCapitalize,
    keyboardType,
    onFocus,
    onBlur,
    editable,
    showSoftInputOnFocus,
    ref,
    autoFocus,
    ...rest
  } = props;

  useDebounce(value, placeholder, 1000);

  return (
    <Box style={styles.searchbox}>
      <TouchableOpacity style={styles.searchIcon}>
        <Image source={assets.Search} />
      </TouchableOpacity>
      <TextInput
        style={[styles.textInput, style]}
        onChangeText={onChangeText}
        ref={ref}
        onBlur={onBlur}
        editable={editable}
        showSoftInputOnFocus={showSoftInputOnFocus}
        onFocus={onFocus}
        value={value}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'rgba(0,0,0,0.4)'}
        autoFocus={autoFocus}
        {...rest}
      />
    </Box>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  searchIcon: {
    padding: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbox: {
    width: SIZES.screenWidth / 1.2,
    height: SIZES.screenHeight / 14,
    backgroundColor: '#F2F2F2',
    borderRadius: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    width: '100%',
    color: '#8A8A8A',
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.216919,
    textAlignVertical: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding / 2,
  },
});
