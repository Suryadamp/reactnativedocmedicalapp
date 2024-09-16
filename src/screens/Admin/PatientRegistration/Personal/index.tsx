// Personal
import { Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';
import { COLORS, SIZES } from '../../../../constants';
import { RootState } from '../../../../state';
import { Box, CustomRadioGroup } from '../../../../components';
import { SvgIcon } from '../../../../constants/SvgIcon';
import styles from '../../../../styles/PatientRegistartion.styles';

interface IPersonalInfo {
  isEdit: boolean;
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
  country: string;
  state: string;
  image: string;
  isVaccCreated: boolean;
  isUseAccAddress: boolean;
  emailError?: string;
  phoneError?: string;
  onChange: (data: any) => any;
}

export const PersonalInfo = (props: IPersonalInfo) => {
  const { commonVariable } = useSelector((state: RootState) => state.commonvariables);
  const {
    name,
    title,
    mobile,
    email,
    dob,
    age,
    sex,
    bloodGroup,
    relationName,
    relationType,
    image,
    isVaccCreated,
    isEdit,
    emailError,
    phoneError,
    onChange,
  } = props;
  const genderOptions = commonVariable[0]?.gender;
  const [imageUri, setImageUri] = useState(image);

  const handleChange = (fieldName: string, value: any) => {
    onChange((prev: any) => ({ ...prev, [fieldName]: value }));
  };

  const selectImage = () => {
    if (isEdit) {
      launchImageLibrary(
        {
          selectionLimit: 1,
          mediaType: 'photo',
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            setImageUri(response?.assets[0]);
            handleChange('image', response?.assets[0]);
          }
        },
      );
    }
  };

  const themeColors = {
    primary: COLORS.black,
    underlineColor: 'transparent',
    background: COLORS.background.secondary,
    onSurfaceVariant: '#8A8A8A',
  };

  return (
    <Box style={styles.content}>
      <Box style={styles.flexRow}>
        {isEdit && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              isEdit ? handleChange('isTitleOpen', true) : null;
            }}
          >
            <TextInput
              label={'Title'}
              mode="outlined"
              value={title}
              placeholderTextColor={COLORS.gray}
              style={styles.mrsInputTxtStyle}
              outlineColor={COLORS.white_smoke}
              activeOutlineColor={COLORS.background.primary}
              editable={false}
              onChangeText={(_value) => {
                handleChange('title', _value);
              }}
              disabled={!isEdit}
              onPressIn={() => {
                handleChange('isTitleOpen', true);
              }}
              theme={{
                colors: themeColors,
                roundness: SIZES.padding * 0.8,
              }}
              right={
                <TextInput.Icon
                  style={{ width: 18, height: 18 }}
                  disabled={true}
                  icon="chevron-down"
                  onPress={() => {
                    isEdit ? handleChange('isTitleOpen', true) : null;
                  }}
                />
              }
            />
          </TouchableOpacity>
        )}
        <Box>
          <TextInput
            label={'Name*'}
            mode="outlined"
            value={isEdit ? name : `${title}.${name}`}
            editable={isEdit}
            placeholderTextColor={COLORS.grey_838383}
            // style={styles.mrsInputTxtStyle}
            style={isEdit ? styles.nameInputTxtStyle : styles.disableNameTxtStyle}
            // style={ styles.disableNameTxtStyle}
            outlineColor={COLORS.white_smoke}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(_value) => {
              handleChange('name', _value);
            }}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
          />
        </Box>
        {!imageUri && (
          <Box style={styles.selectImage}>
            <TouchableOpacity onPress={selectImage}>
              <Avatar.Icon size={50} style={styles.avatarImage} icon="account" />
              <Box style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <SvgIcon name={isEdit ? 'PlusIcon' : ''} />
              </Box>
            </TouchableOpacity>
          </Box>
        )}
        {imageUri && (
          <Box style={styles.selectImage}>
            <Avatar.Image source={imageUri} size={50} style={styles.avatarImage} icon="account" />
          </Box>
        )}
      </Box>
      {/* <Box style={styles.flexRow}> */}
      <TextInput
        label={'Mobile*'}
        mode="outlined"
        value={mobile}
        editable={isEdit}
        error={Boolean(phoneError)}
        placeholderTextColor={COLORS.gray}
        outlineColor={COLORS.white_smoke}
        style={[
          isEdit ? styles.inputTxtStyle : styles.disableInputTxtStyle,
          ,
          { marginVertical: 5 },
        ]}
        activeOutlineColor={COLORS.background.primary}
        onChangeText={(_value) => {
          handleChange('mobile', _value);
        }}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      {/* <Box style={styles.flexRow}> */}
      <TextInput
        label={'Email*'}
        mode="outlined"
        value={email}
        editable={isEdit}
        placeholderTextColor={COLORS.gray}
        error={Boolean(emailError)}
        outlineColor={COLORS.white_smoke}
        style={[isEdit ? styles.inputTxtStyle : styles.disableInputTxtStyle, { marginVertical: 5 }]}
        activeOutlineColor={COLORS.background.primary}
        onChangeText={(_value) => {
          handleChange('email', _value);
        }}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      <Box style={styles.flexRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            isEdit ? handleChange('isDateOpen', true) : null;
          }}
        >
          <TextInput
            label={'DOB*'}
            mode="outlined"
            value={dob}
            placeholderTextColor={COLORS.gray}
            style={isEdit ? styles.birthInputTxtStyle : styles.disableDobTxtStyle}
            outlineColor={COLORS.white_smoke}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(_value) => {
              handleChange('dob', _value);
            }}
            disabled={!isEdit}
            onPressIn={() => {
              handleChange('isDateOpen', true);
            }}
            editable={false}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
            right={
              <TextInput.Icon
                style={{ width: 30, height: 30 }}
                disabled={true}
                icon="calendar-outline"
                onPress={() => {
                  isEdit ? handleChange('isDateOpen', true) : null;
                }}
              />
            }
          />
        </TouchableOpacity>
        <TextInput
          label={'Age*'}
          mode="outlined"
          value={age}
          placeholderTextColor={COLORS.gray}
          editable={isEdit}
          style={isEdit ? styles.ageInputTxtStyle : styles.disableAgeInputTxtStyle}
          outlineColor={COLORS.white_smoke}
          activeOutlineColor={COLORS.background.primary}
          onChangeText={(_value) => {
            handleChange('age', _value);
          }}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
        />
      </Box>
      <Box style={styles.flexRow}>
        <Box marginVertical={10} marginHorizontal={15} height={40} width={SIZES.screenWidth * 0.5}>
          <CustomRadioGroup
            options={genderOptions}
            selectedOption={sex}
            onSelect={(_value: any) => {
              isEdit ? handleChange('sex', _value) : null;
            }}
            direction={'row'}
          />
        </Box>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            isEdit ? handleChange('isBloodOpen', true) : null;
          }}
        >
          <TextInput
            label={'Blood group*'}
            mode="outlined"
            value={bloodGroup}
            placeholderTextColor={COLORS.gray}
            style={isEdit ? styles.ageInputTxtStyle : styles.disableAgeInputTxtStyle}
            outlineColor={COLORS.white_smoke}
            editable={false}
            activeOutlineColor={COLORS.background.primary}
            onChangeText={(_value) => {
              handleChange('bloodGroup', _value);
            }}
            onPressIn={() => {
              isEdit ? handleChange('isBloodOpen', true) : null;
            }}
            theme={{
              colors: themeColors,
              roundness: SIZES.padding * 0.8,
            }}
            right={
              <TextInput.Icon
                style={{ width: 20, height: 20 }}
                disabled={true}
                icon="chevron-down"
                onPress={() => {
                  isEdit ? handleChange('isBloodOpen', true) : null;
                }}
              />
            }
          />
        </TouchableOpacity>
      </Box>
      {/* <Box style={styles.flexRow}> */}
      <TextInput
        label={'Relation name*'}
        mode="outlined"
        value={relationName}
        editable={isEdit}
        placeholderTextColor={COLORS.gray}
        outlineColor={COLORS.white_smoke}
        style={[isEdit ? styles.inputTxtStyle : styles.disableInputTxtStyle, { marginVertical: 5 }]}
        activeOutlineColor={COLORS.background.primary}
        onChangeText={(_value) => {
          handleChange('relationName', _value);
        }}
        theme={{
          colors: themeColors,
          roundness: SIZES.padding * 0.8,
        }}
      />
      {/* </Box> */}
      {/* <Box style={styles.flexRow}> */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ marginVertical: 5 }}
        onPress={() => {
          isEdit ? handleChange('isRelationTypeOpen', true) : null;
        }}
      >
        <TextInput
          label={'Relation Type*'}
          mode="outlined"
          value={relationType}
          placeholderTextColor={COLORS.gray}
          style={isEdit ? styles.inputTxtStyle : styles.disableInputTxtStyle}
          outlineColor={COLORS.white_smoke}
          activeOutlineColor={COLORS.background.primary}
          editable={false}
          onPressIn={() => {
            isEdit ? handleChange('isRelationTypeOpen', true) : null;
          }}
          onChangeText={(_value) => {
            handleChange('relationType', _value);
          }}
          theme={{
            colors: themeColors,
            roundness: SIZES.padding * 0.8,
          }}
          right={
            <TextInput.Icon
              style={{ width: 18, height: 18 }}
              disabled={true}
              icon="chevron-down"
              onPress={() => {
                isEdit ? handleChange('isRelationTypeOpen', true) : null;
              }}
            />
          }
        />
      </TouchableOpacity>
      {/* </Box> */}
      <Box style={styles.flexRow}>
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => {
            isEdit ? handleChange('isVaccCreated', !isVaccCreated) : null;
          }}
        >
          <MaterialCommunityIcons
            name={isVaccCreated ? 'checkbox-marked' : 'checkbox-blank-outline'}
            color={isVaccCreated ? COLORS.background.primary : COLORS.white_smoke}
            size={25}
            style={styles.statusImage}
          />
          <Text style={isEdit ? styles.chartTxt : styles.chartDisableTxt}>
            Create Vaccination Chart
          </Text>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
