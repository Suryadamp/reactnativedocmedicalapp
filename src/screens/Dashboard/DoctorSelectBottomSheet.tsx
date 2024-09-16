import { StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS, FONTS, assets } from '../../constants';
import { strings } from '../../i18n';
import { ScrollView } from 'react-native-gesture-handler';
import { AbstractButton, Box } from '../../components';
import { TouchableOpacity } from 'react-native';
import styles from '../../styles/component_styles/CustomRadioGroup.styles';

const DoctorSelectBottomSheet: React.FC<any> = ({ options, navigation, handleClosePress }) => {
  const [selectedOption, setSelectedOption] = useState<any>({});
  const [filterText, setFilterText] = useState('');
  const filteredOptions = options?.filter((option: any) =>
    option?.name?.toLowerCase().includes(filterText.toLowerCase()),
  );

  const handleApply = () => {
    navigation.navigate('BookAppointment', { item: selectedOption });
    handleClosePress?.();
  };

  const handleOptionChange = (option: Object) => {
    setSelectedOption(option);
  };

  return (
    <Box style={styles.docBottomContainer}>
      <Box style={styles.boxStyle}>
        <Box height={'100%'}>
          <Box>
            <TextInput
              label="Search"
              mode="outlined"
              placeholderTextColor={'grey'}
              placeholder={'Search'}
              style={styles.dosageInputTxt}
              outlineColor={COLORS.shade_of_gray_D6D6D6}
              activeOutlineColor={COLORS.background.primary}
              right={
                <TextInput.Icon
                  style={styles.searchDoctorInput}
                  iconColor={'#A7A7A7'}
                  icon={filterText.length > 0 ? assets.CloseX : assets.SearchGrey}
                  onPress={() => setFilterText('')}
                  size={filterText.length > 0 ? 22 : 22}
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
          <ScrollView style={{ height: '100%' }}>
            <Box>
              {filteredOptions?.map(
                (
                  option: {
                    id: { toString: () => React.Key | null | undefined };
                    name:
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
                    <TouchableOpacity key={index} onPress={() => handleOptionChange(option)}>
                      <Box key={option?.id.toString()} style={styles.docBottomTouchStyle}>
                        <Text
                          style={[
                            styles.optionTextStyle,
                            {
                              color:
                                selectedOption?.id === option?.id
                                  ? COLORS.background.primary
                                  : COLORS.text,
                            },
                          ]}
                        >
                          {option?.name}
                        </Text>
                        <Box
                          style={[
                            styles.selectOptionContainerStyle,
                            {
                              borderColor:
                                selectedOption?.id === option?.id
                                  ? COLORS.background.primary
                                  : COLORS.placeHolder,
                            },
                          ]}
                        >
                          {selectedOption?.id === option?.id && (
                            <Box style={styles.selectOptionStyle} />
                          )}
                        </Box>
                      </Box>
                      <Box style={styles.divider} />
                    </TouchableOpacity>
                  );
                },
              )}
            </Box>
          </ScrollView>
        </Box>
      </Box>

      <Box style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={() => {
            setSelectedOption('');
          }}
          buttonStyle={styles.clearBtnStyle}
          textStyle={styles.clearTxtStyle}
        >
          {strings.displayText.clearAll}
        </AbstractButton>
        <AbstractButton
          onPress={() => {
            handleApply?.();
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

export default DoctorSelectBottomSheet;
