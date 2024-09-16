import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { AbstractButton, Box } from '..';
import { COLORS, FONTS } from '../../constants';
import { ICustomSymptomsBottomSheetProps } from '../../@types/components';
import { strings } from '../../i18n';
import { useSelector } from 'react-redux';
import { RootState } from '../../state';
import { useNavigation } from '@react-navigation/native';
import { customLogger } from '../CustomLogger';

const CustomSymptomsBottomSheet: React.FC<ICustomSymptomsBottomSheetProps> = ({
  handleClosePress,
  handleSelectedFilterType,
  setSheetState,
}) => {
  const navigation = useNavigation();
  const { prescriptionSymptomList } = useSelector(
    (state: RootState) => state.prescriptionSymptomList,
  );
  const [selectedOption, setSelectedOption] = useState('');

  const handleApply = () => {
    handleSelectedFilterType?.(selectedOption);
    setSheetState(true);
    handleLogs();
  };

  const handleOptionChange = (value: any) => {
    setSelectedOption(value);
  };

  const handleLogs = () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    customLogger('event', routeName, selectedOption, 'Radio Button');
  };

  return (
    <Box style={styles.container}>
      <Box>
        <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
          {prescriptionSymptomList?.map((option, index) => (
            <RadioButton.Item
              mode="android"
              label={option.symptom_name}
              value={option.symptom_name}
              key={index}
              labelStyle={[
                styles.selectedRadioText,
                {
                  color:
                    selectedOption === option.symptom_name
                      ? COLORS.background.primary
                      : COLORS.text,
                },
              ]}
              color={
                selectedOption === option.symptom_name ? COLORS.background.primary : COLORS.text
              }
            />
          ))}
        </RadioButton.Group>
      </Box>

      <Box style={styles.buttonBoxContainer}>
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

export default CustomSymptomsBottomSheet;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  buttonBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  closeXStyle: {
    width: 16,
    height: 16,
  },
  titleText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.black,
  },
  applyBtnStyle: {
    backgroundColor: COLORS.background.primary,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  applyTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: 15,
    color: COLORS.background.white,
    textAlign: 'center',
  },
  textStyle: {
    width: 100,
    height: 40,
  },
  selectedRadioText: {
    color: COLORS.background.primary,
  },
});
