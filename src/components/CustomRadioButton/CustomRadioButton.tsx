import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../constants';
import Box from '../Box';
import styles from '../../styles/component_styles/CustomRadioGroup.styles';
import { formatDateBType } from '../../util/DateUtil';
import { customLogger } from '../CustomLogger';
import { useNavigation } from '@react-navigation/native';

interface CustomRadioGroupProps {
  options: any;
  selectedOption: any;
  onSelect: any;
  result?: string;
  direction?: any;
}

function isDateValue(date: any) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const dateValue = date;

  return dateRegex.test(dateValue);
}

const CustomRadioGroup = ({
  options,
  selectedOption,
  onSelect,
  result,
  direction,
}: CustomRadioGroupProps) => {
  const navigation = useNavigation();
  const handleLogs = () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    customLogger('event', routeName, selectedOption, 'Radio Button');
  };
  return (
    <View style={{ flexDirection: direction ? direction : 'column' }}>
      {options?.map((option: any, index: number) => (
        <Box
          flex={1}
          flexDirection="column"
          marginVertical={styles.marginVertical.margin}
          key={index?.toString()}
        >
          <TouchableOpacity
            key={index}
            onPress={() => {
              onSelect(option?.id);
              handleLogs();
            }}
            style={styles.touchStyle}
            hitSlop={{ bottom: 5, top: 5, left: 50, right: 15 }}
          >
            <View
              style={[
                styles.selectOptionContainerStyle,
                {
                  borderColor:
                    selectedOption === option?.id ? COLORS.background.primary : COLORS.placeHolder,
                },
              ]}
            >
              {selectedOption === option?.id && <View style={styles.selectOptionStyle} />}
            </View>
            <Text style={styles.optionTextStyle}>{option?.value}</Text>
          </TouchableOpacity>
          {selectedOption === option?.id && index !== 0 && result?.length !== 0 && (
            <Text style={styles.resultTextStyle}>
              {isDateValue(result) ? formatDateBType(new Date(result), 'DD/MM/yyyy') : result}
            </Text>
          )}
        </Box>
      ))}
    </View>
  );
};

export default CustomRadioGroup;
