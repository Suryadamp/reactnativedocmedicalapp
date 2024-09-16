import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import { AbstractButton, Box } from '..';
import { COLORS, FONTS, assets } from '../../constants';
import { ICustomSymptomBottomSheetProps } from '../../@types/components';
import { strings } from '../../i18n';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../../styles/component_styles/CustomPrescriptionBottomSheet.styles';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { Platform } from 'react-native';
import { useDebounce } from '../../hooks/useLogs';
import { useNavigation } from '@react-navigation/native';
import { customLogger } from '../CustomLogger';

const CustomSelectBottomSheet: React.FC<ICustomSymptomBottomSheetProps> = ({
  type,
  selectOptions,
  handleClosePress,
  handleSelectedFilterType,
}) => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('');
  const [filterText, setFilterText] = useState('');
  const inputRef = useRef<typeof TextInput | null>(null);
  const option_name: any =
    type === 'Select Symptoms' ? 'symptom_name' : type === 'value' ? 'value' : 'name';

  const filteredOptions = selectOptions.filter((option: any) =>
    option[option_name].toLowerCase().includes(filterText.toLowerCase()),
  );

  const handleApply = () => {
    handleSelectedFilterType?.(selectedOption);
    handleLogs();
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  //#region hooks
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);
  //#endregion

  //#region callbacks
  const handleOnFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = Platform.OS === 'ios';
  }, [shouldHandleKeyboardEvents]);
  const handleOnBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);
  //#endregion
  useDebounce(filterText, type, 1000);

  const handleLogs = () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    customLogger('event', routeName, selectedOption, 'Radio Button');
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.boxStyle}>
        <Box height={'100%'}>
          <Box>
            <TextInput
              ref={inputRef}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              label="Search"
              mode="outlined"
              placeholderTextColor={'grey'}
              placeholder={'Search'}
              style={styles.dosageInputTxt}
              outlineColor={COLORS.shade_of_gray_D6D6D6}
              outlineStyle={{ borderWidth: 1 }}
              activeOutlineColor={COLORS.background.primary}
              right={
                <TextInput.Icon
                  style={styles.searchDoctorInput}
                  iconColor={'#A7A7A7'}
                  icon={filterText.length > 0 ? assets.CloseX : assets.SearchGrey}
                  onPress={() => setFilterText('')}
                  size={filterText.length > 0 ? 15 : 22}
                />
              }
              theme={{
                colors: {
                  primary: COLORS.gray,
                  underlineColor: 'transparent',
                  background: COLORS.background.secondary,
                },
              }}
              value={filterText}
              onChangeText={(text) => setFilterText(text)}
            />
          </Box>
          <ScrollView showsVerticalScrollIndicator={false}>
            <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
              {filteredOptions?.map((option: any) => (
                <React.Fragment key={option.id}>
                  <RadioButton.Item
                    mode="android"
                    style={styles.itemStyle}
                    label={option[option_name]}
                    value={option} // Assuming symptom_name is unique
                    key={option.id}
                    labelStyle={[
                      styles.selectedRadioText,
                      {
                        color:
                          selectedOption[option_name] === option[option_name]
                            ? COLORS.background.primary
                            : COLORS.text,
                      },
                    ]}
                    uncheckedColor={COLORS.gray}
                    color={
                      selectedOption[option_name] === option[option_name]
                        ? COLORS.background.primary
                        : COLORS.text
                    }
                  />
                  {/* <Box style={styles.divider} /> */}
                </React.Fragment>
              ))}
            </RadioButton.Group>
          </ScrollView>
        </Box>
      </Box>

      <Box style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={() => {
            setSelectedOption('');
            handleClosePress?.();
          }}
          buttonStyle={styles.clearBtnStyle}
          textStyle={styles.clearTxtStyle}
        >
          {'Clear All'}
        </AbstractButton>
        <AbstractButton
          onPress={() => {
            handleApply?.();
            handleClosePress?.();
          }}
          buttonStyle={styles.applyBtnStyle}
          textStyle={styles.applyTxtStyle}
        >
          {strings.displayText.apply}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default CustomSelectBottomSheet;

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     justifyContent: 'center',
//   },
//   boxContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   buttonBoxContainer: {
//     marginTop: 10,
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   closeXStyle: {
//     width: 16,
//     height: 16,
//   },
//   boxStyle: {
//     height: 250,
//   },
//   applyBtnStyle: {
//     backgroundColor: COLORS.background.primary,
//     borderRadius: 10,
//     height: 50,
//     width: '45%',
//   },
//   applyTxtStyle: {
//     color: COLORS.background.white,
//     fontSize: 15,
//     fontWeight: '600',
//     fontFamily: FONTS.SFProDisplaySemibold,
//   },
//   clearBtnStyle: {
//     backgroundColor: COLORS.background.white,
//     borderColor: COLORS.background.primary,
//     borderWidth: 2,
//     borderRadius: 10,
//     height: 50,
//     width: '45%',
//   },
//   clearTxtStyle: {
//     color: COLORS.text,
//     fontSize: 15,
//     fontWeight: '600',
//     fontFamily: FONTS.SFProDisplaySemibold,
//   },
//   divider: {
//     borderBottomWidth: 1,
//     borderColor: COLORS.grey_E5E5E5,
//     marginTop: 10,
//   },
//   textStyle: {
//     width: 100,
//     height: 40,
//   },
//   selectedRadioText: {
//     color: COLORS.background.primary,
//   },
//   dosageInputTxt: {
//     height: 45,
//     marginVertical: 5,
//     backgroundColor: 'white',
//     borderRadius: 8,
//   },
//   searchDoctorInput: {
//     marginTop: 15,
//   },
// });
