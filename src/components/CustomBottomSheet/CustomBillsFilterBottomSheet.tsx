import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput, RadioButton } from 'react-native-paper';
import { AbstractButton, Box } from '../../components';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { ICustomFilterBottomSheetProps } from '../../@types/components';
import { ScrollView } from 'react-native-gesture-handler';
import { useDebounce } from '../../hooks/useLogs';
import { useNavigation } from '@react-navigation/native';
import { customLogger } from '../CustomLogger';
const CustomBillsFilterBottomSheet: React.FC<ICustomFilterBottomSheetProps> = ({
  handleClosePress,
  handleSelectedFilterType,
}) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('All');
  const options = ['Ip Bill', 'Room Rent', 'Op Bill', 'Lab Test Report', 'Pharmacy Bill'];
  const selectOptions = ['All', 'Pending', 'Paid Bills', 'Date Range'];
  const [selectedOption, setSelectedOption] = useState('');
  const [filterText, setFilterText] = useState('');
  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleApply = () => {
    handleSelectedFilterType?.(selectedOption);
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    handleLogs();
  };
  // Filter the options based on the filterText
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(filterText.toLowerCase()),
  );

  const renderTab = (tabName) => {
    const isSelected = tabName === selectedTab;
    return (
      <TouchableOpacity
        key={tabName}
        style={[styles.textStyle, isSelected ? styles.selectedBox : styles.normalBox]}
        onPress={() => handleTabClick(tabName)}
      >
        <Text style={isSelected ? styles.selectedText : styles.normalText}>{tabName}</Text>
      </TouchableOpacity>
    );
  };

  useDebounce(filterText, selectedOption, 1000);

  const handleLogs = () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    customLogger('event', routeName, selectedOption, 'Radio Button');
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.boxContainer}>
        <Text style={styles.titleText}>Filters</Text>
        <TouchableOpacity
          onPress={() => {
            handleClosePress?.();
          }}
        >
          <Image style={styles.closeXStyle} source={assets.CloseX} />
        </TouchableOpacity>
      </Box>
      <Box style={styles.divider} />
      <Box style={styles.boxStyle}>
        <Box style={styles.tabNameStyle}>
          <Box>{selectOptions?.map((tabName) => renderTab(tabName))}</Box>
          <Box>
            <Box style={styles.dividerStyle} />
          </Box>
        </Box>

        {selectedTab === 'All' ? (
          <Box>
            <Box marginLeft={20}>
              <TextInput
                label="Search"
                mode="outlined"
                placeholderTextColor={'grey'}
                placeholder={'Search'}
                style={styles.dosageInputTxt}
                outlineColor={COLORS.background.primary}
                activeOutlineColor={COLORS.background.primary}
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
            <Box style={{ flex: 1 }}>
              <ScrollView style={{ maxHeight: 150 }} showsVerticalScrollIndicator={true}>
                <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
                  {filteredOptions?.map((option, index) => (
                    <RadioButton.Item
                      mode="android"
                      label={option}
                      value={option}
                      position="leading"
                      key={index}
                      labelStyle={[
                        styles.selectedRadioText,
                        {
                          color:
                            selectedOption === option ? COLORS.background.primary : COLORS.text,
                        },
                      ]}
                      color={selectedOption === option ? COLORS.background.primary : COLORS.text}
                    />
                  ))}
                </RadioButton.Group>
              </ScrollView>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box style={styles.boxRadioStyle}>
              <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={true}>
                <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
                  {selectOptions?.map((option, index) =>
                    option === selectedTab ? (
                      <RadioButton.Item
                        mode="android"
                        label={option}
                        value={option}
                        position="leading"
                        key={index}
                        labelStyle={[
                          styles.selectedRadioText,
                          {
                            color:
                              selectedOption === option ? COLORS.background.primary : COLORS.text,
                          },
                        ]}
                        color={selectedOption === option ? COLORS.background.primary : COLORS.text}
                      />
                    ) : null,
                  )}
                </RadioButton.Group>
              </ScrollView>
            </Box>
          </Box>
        )}
      </Box>

      <Box style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={() => {
            setSelectedOption('');
            handleSelectedFilterType?.('All');
            handleClosePress?.();
          }}
          buttonStyle={styles.clearBtnStyle}
          textStyle={styles.clearTxtStyle}
        >
          Clear All
        </AbstractButton>
        <AbstractButton
          onPress={() => {
            handleApply?.();
            handleClosePress?.();
          }}
          buttonStyle={styles.applyBtnStyle}
          textStyle={styles.applyTxtStyle}
        >
          Apply
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default CustomBillsFilterBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
    paddingHorizontal: 5,
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

  boxStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 250,
  },
  centerColumnBox: { flexDirection: 'column', alignItems: 'center' },
  applyBtnStyle: {
    backgroundColor: COLORS.background.primary,
    borderRadius: 10,
    width: 150,
    height: 50,
  },
  clearBtnStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.background.primary,
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    height: 50,
  },
  applyTxtStyle: {
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: 15,
    color: COLORS.background.white,
    textAlign: 'center',
  },
  clearTxtStyle: {
    color: COLORS.black,
    fontFamily: FONTS.SFProDisplaySemibold,
    fontSize: 15,
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: COLORS.grey_E5E5E5,
    marginTop: 10,
  },
  textStyle: {
    width: 100,
    height: 40,
  },
  selectedBox: {
    backgroundColor: '#C7DEFF',
  },
  normalBox: {
    backgroundColor: COLORS.white,
  },
  selectedText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
    marginLeft: 20,
    color: COLORS.background.primary,
  },
  normalText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
    marginLeft: 20,
    color: COLORS.text,
  },
  dosageInputTxt: {
    width: SIZES.screenWidth * 0.6,
    height: 56,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  selectedRadioText: {
    // color: COLORS.background.primary,
    position: 'absolute',
    left: 55,
  },
  tabNameStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  dividerStyle: {
    height: '90%',
    width: 1,
    backgroundColor: '#909090',
  },
  boxRadioStyle: {
    flex: 1,
    width: 250,
  },
});
