import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Box } from '../../../../components';
import { COLORS } from '../../../../constants';
import styles from '../../../../styles/Appointment.styles';

interface CancelRadioGroupProps {
  options: any;
  selectedOption: any;
  onSelect: any;
}

const CancelRadioGroup = ({ options, selectedOption, onSelect }: CancelRadioGroupProps) => {
  return (
    <Box style={styles.mainContainer}>
      {options?.map(
        (
          option: {
            id: { toString: () => React.Key | null | undefined };
            value:
              | string
              | number
              | boolean
              | React.ReactElement<any, string | React.JSXElementConstructor<any>>
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | null
              | undefined;
          },
          index: React.Key | null | undefined,
        ): any => {
          return (
            <TouchableOpacity
              key={option?.id.toString()}
              activeOpacity={0.8}
              // paddingVertical={12}
              style={styles.cancelRadioButtoncontainer}
              onPress={() => onSelect(option?.id)}
            >
              <TouchableOpacity
                key={index}
                onPress={() => onSelect(option?.id)}
                style={styles.touchStyle}
              >
                <Box
                  style={[
                    styles.selectOptionContainerStyle,
                    {
                      borderColor:
                        selectedOption === option?.id
                          ? COLORS.background.primary
                          : COLORS.placeHolder,
                    },
                  ]}
                >
                  {selectedOption === option?.id && <Box style={styles.selectOptionStyle} />}
                </Box>
                <Text style={styles.optionTextStyle}>{option?.value}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        },
      )}
    </Box>
  );
};

export default CancelRadioGroup;
