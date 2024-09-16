import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import { AbstractButton, Box } from '../../components';
import { COLORS } from '../../constants';
import { ICustomBillPayFilterBottomSheetProps } from '../../@types/components';
import { strings } from '../../i18n';
import styles from '../../styles/component_styles/CommonBottomSheet.styles';
import { useNavigation } from '@react-navigation/native';
import { customLogger } from '../CustomLogger';
const CustomBillsFilterBottomSheet: React.FC<ICustomBillPayFilterBottomSheetProps> = ({
  handleClosePress,
  handleSelectedFilterType,
  setSheetState,
}) => {
  const navigation = useNavigation();
  const selectOptions = ['All', 'Pending', 'Paid', 'Custom'];
  const [selectedOption, setSelectedOption] = useState('All');

  const handleApply = () => {
    handleSelectedFilterType?.(selectedOption);
    handleLogs();
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
    <Box style={styles.container}>
      <Box style={styles.boxStyle}>
        <Box>
          <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
            {selectOptions?.map((option, index) => (
              <>
                <RadioButton.Item
                  mode="android"
                  label={option}
                  value={option}
                  key={index}
                  style={{ marginHorizontal: -14, marginRight: -22 }}
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

      <Box marginTop={10} style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={() => {
            handleApply?.();
            handleClosePress?.();
          }}
          disabled={selectedOption === 'Custom'}
          buttonStyle={styles.applyBtnStyle}
          textStyle={styles.applyTxtStyle}
        >
          {strings.displayText.apply}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default CustomBillsFilterBottomSheet;
