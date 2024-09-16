import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { AbstractButton, Box } from '../../components';
import { COLORS, FONTS, assets } from '../../constants';
import { ICustomBillPayFilterBottomSheetProps } from '../../@types/components';
import { strings } from '../../i18n';
import styles from '../../styles/component_styles/CustomPrescriptionBottomSheet.styles';
import { useNavigation } from '@react-navigation/native';
import { customLogger } from '../CustomLogger';

const CustomFilterBottomSheet: React.FC<ICustomBillPayFilterBottomSheetProps> = ({
  selectOptions,
  handleClosePress,
  handleSelectedFilterType,
  setSheetState,
}) => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(selectOptions?.[0] || '');

  const handleApply = () => {
    handleSelectedFilterType?.(selectedOption);
    handleLogs()
  };

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    if (value === 'Custom') {
      setSheetState(true);
    }
  };


  const handleLogs = () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    customLogger('event', routeName, selectedOption, 'Radio Button');
  };

  return (
    <Box style={styles.scheduleContainer}>
      <Box style={styles.filterBoxStyle}>
        <Box>
          <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
            {selectOptions?.map((option, index) => (
              <>
                <RadioButton.Item
                  mode="android"
                  label={option}
                  value={option}
                  style={{ marginHorizontal: -14, marginRight: -22 }}
                  key={index}
                  labelStyle={[
                    styles.selectedRadioText,
                    {
                      color: selectedOption === option ? COLORS.background.primary : COLORS.text,
                    },
                  ]}
                  color={selectedOption === option ? COLORS.background.primary : COLORS.text}
                />
                <Box style={styles.divider} />
              </>
            ))}
          </RadioButton.Group>
        </Box>
      </Box>

      <Box marginBottom={10} style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={() => {
            handleApply?.();
            handleClosePress?.();
          }}
          disabled={selectedOption === 'Custom'}
          buttonStyle={styles.filterApplyBtnStyle}
          textStyle={styles.filterApplyTxtStyle}
        >
          {strings.displayText.apply}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default CustomFilterBottomSheet;
