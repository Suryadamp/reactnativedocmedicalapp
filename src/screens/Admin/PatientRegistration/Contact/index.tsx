// Contact
import React from 'react';
import { TextInput } from 'react-native-paper';

import { COLORS, SIZES } from '../../../../constants';
import { Box } from '../../../../components';
import styles from '../../../../styles/PatientRegistartion.styles';

interface IContactInfo {
  selectedTab: number;
  isTitleOpen: boolean;
  isBloodOpen: boolean;
  isRelationTypeOpen: boolean;
  isDateOpen: boolean;
  loader: boolean;
  isCreateChart: boolean;
  title: string;
  name: string;
  dob: string;
  age: string;
  email: string;
  relationName: string;
  mobile: string;
  sex: number;
  bloodGroup: string;
  relationType: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  area: string;
  district: string;
  state: string;
  country: string;
  isVaccCreated: boolean;
  isUseAccAddress: boolean;
  isEdit: boolean;
  pincodeError?: string;
  onChange: (data: any) => any;
}

export const ContactInfo = (props: IContactInfo) => {
  const {
    pincodeError,
    addressLine1,
    addressLine2,
    pincode,
    area,
    state,
    country,
    district,
    isEdit,
    onChange,
  } = props;
  const themeColors = {
    primary: COLORS.black,
    underlineColor: 'transparent',
    background: COLORS.background.secondary,
    onSurfaceVariant: '#8A8A8A',
  };

  const handleChange = (name: string, value: any) => {
    onChange((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <Box style={styles.contentFlex}>
      {/* <Box style={styles.contentFlexRow}> */}
      <TextInput
        label={'Address Line 1*'}
        mode="outlined"
        value={addressLine1}
        placeholderTextColor={COLORS.gray}
        outlineColor={COLORS.white_smoke}
        style={isEdit ? styles.contentInputTxtStyle : styles.inputDisTxtStyle}
        editable={isEdit}
        activeOutlineColor={COLORS.background.primary}
        onChangeText={(_value) => {
          handleChange('addressLine1', _value);
        }}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      {/* <Box style={styles.contentFlexRow}> */}
      <TextInput
        label={'Address Line 2'}
        mode="outlined"
        value={addressLine2}
        placeholderTextColor={COLORS.gray}
        outlineColor={COLORS.white_smoke}
        style={isEdit ? styles.contentInputTxtStyle : styles.inputDisTxtStyle}
        editable={isEdit}
        activeOutlineColor={COLORS.background.primary}
        onChangeText={(_value) => {
          handleChange('addressLine2', _value);
        }}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      {/* <Box style={styles.contentFlexRow}> */}
      <TextInput
        label={'Pincode*'}
        mode="outlined"
        value={pincode}
        placeholderTextColor={COLORS.gray}
        error={Boolean(pincodeError)}
        outlineColor={COLORS.white_smoke}
        style={isEdit ? styles.contentInputTxtStyle : styles.inputDisTxtStyle}
        editable={isEdit}
        activeOutlineColor={COLORS.background.primary}
        onChangeText={(_value) => {
          handleChange('pincode', _value);
        }}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      {/* <Box style={styles.contentFlexRow}> */}
      <TextInput
        label={'Area'}
        mode="outlined"
        value={area}
        placeholderTextColor={COLORS.gray}
        outlineColor={COLORS.white_smoke}
        editable={false}
        disabled
        style={styles.inputDisTxtStyle}
        activeOutlineColor={COLORS.background.primary}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      {/* <Box style={styles.contentFlexRow}> */}
      <TextInput
        label={'District'}
        mode="outlined"
        value={district}
        editable={false}
        disabled
        style={styles.inputDisTxtStyle}
        placeholderTextColor={COLORS.gray}
        outlineColor={COLORS.white_smoke}
        activeOutlineColor={COLORS.background.primary}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      {/* <Box style={styles.contentFlexRow}> */}
      <TextInput
        label={'State'}
        mode="outlined"
        value={state}
        editable={false}
        disabled
        placeholderTextColor={COLORS.gray}
        outlineColor={COLORS.white_smoke}
        style={styles.inputDisTxtStyle}
        activeOutlineColor={COLORS.background.primary}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      {/* <Box style={styles.contentFlexRow}> */}
      <TextInput
        label={'Country'}
        mode="outlined"
        value={country}
        editable={false}
        disabled
        placeholderTextColor={COLORS.gray}
        outlineColor={COLORS.white_smoke}
        style={styles.inputDisTxtStyle}
        activeOutlineColor={COLORS.background.primary}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
    </Box>
  );
};

export default ContactInfo;

// const styles = StyleSheet.create({
//   content: {
//     flex: 1,
//     // marginHorizontal: 20,
//   },
//   flexRow: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: SIZES.screenWidth,
//     marginVertical: 5,
//   },
//   inputTxtStyle: {
//     width: SIZES.screenWidth * 0.9,
//     height: 50,
//     backgroundColor: COLORS.white,
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 12,
//   },
//   inputDisTxtStyle: {
//     width: SIZES.screenWidth * 0.9,
//     height: 50,
//     backgroundColor: '#F9F9F9',
//     fontFamily: FONTS.SFProDisplayRegular,
//     fontSize: 12,
//   },
// });
