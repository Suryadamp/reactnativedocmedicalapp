// Inpatient Filter
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput, RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { RootState } from '../../state';
import { AbstractButton, Box } from '../../components';
import { COLORS, FONTS, SIZES } from '../../constants';
import { strings } from '../../i18n';
import { useNavigation } from '@react-navigation/native';
import { customLogger } from '../../components/CustomLogger';

export const FilterBottomSheet: React.FC<any> = ({
  filterType,
  filterValues,
  onClearFilter,
  onApplyFilter,
}) => {
  const navigation = useNavigation();
  const { inpatientList } = useSelector((state: RootState) => state.inpatients);

  const dateRangeOptions = [
    strings.displayText.last1Month,
    strings.displayText.last6Month,
    strings.displayText.last1Year,
    strings.displayText.custom,
  ];
  const selectOptions = [
    strings.displayText.uhidNumber,
    strings.displayText.ipNo,
    strings.displayText.date,
  ];
  const [selectedTab, setSelectedTab] = useState(strings.displayText.uhidNumber);
  const [filteredOptions, setFilterOptions] = useState(inpatientList);
  const [selectedOption, setSelectedOption] = useState({
    uhid: filterType == 'uhid' ? filterValues[0] : null,
    ipNo: filterType == 'ipNo' ? filterValues[0] : null,
    date: filterType == 'date' ? filterValues[0] : null,
  });
  const [filterText, setFilterText] = useState('');
  const [dateRangeFilterText] = useState('');

  const handleTabClick = (tabName: string) => {
    if (tabName === strings.displayText.uhidNumber) {
      setFilterOptions(inpatientList);
      ('');
    } else if (tabName === strings.displayText.ipNo) {
      setFilterOptions(inpatientList);
    } else if (tabName === strings.displayText.date) {
    }
    setSelectedTab(tabName);
  };

  const handleApply = () => {
    onApplyFilter?.(selectedTab, selectedOption);
    handleLogs();
  };

  const setEmptyData = () => {
    setSelectedOption({
      doctor: null,
      patient: null,
      date: null,
    });
  };

  const handleOptionChange = (value: any) => {
    if (selectedTab === strings.displayText.uhidNumber) {
      setSelectedOption({
        uhid: value,
        ipNo: null,
        date: null,
      });
    } else if (selectedTab === strings.displayText.ipNo) {
      setSelectedOption({
        uhid: null,
        ipNo: value,
        date: null,
      });
    } else if (selectedTab === strings.displayText.date) {
      setSelectedOption({
        uhid: null,
        ipNo: null,
        date: value,
      });
    }
  };

  const dateRangeFilteredOptions = dateRangeOptions.filter((option) =>
    option.toLowerCase().includes(dateRangeFilterText.toLowerCase()),
  );

  const renderTab = (tabName: string) => {
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

  console.log('filterValues', filterValues);
  console.log('filteredOptions', filteredOptions);

  const handleLogs = () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    customLogger('event', routeName, selectedOption, 'Radio Button');
  };
  return (
    <Box style={styles.container}>
      <Box style={styles.boxStyle}>
        <Box style={styles.tabNameStyle}>
          <Box>{selectOptions?.map((tabName) => renderTab(tabName))}</Box>
          <Box>
            <Box style={styles.dividerStyle} />
          </Box>
        </Box>
        {selectedTab === strings.displayText.uhidNumber ? (
          <Box>
            <Box marginLeft={20}>
              <TextInput
                label={strings.displayText.search}
                mode="outlined"
                placeholderTextColor={'grey'}
                placeholder={strings.displayText.search}
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
            <Box>
              <ScrollView style={{ maxHeight: 150 }} showsVerticalScrollIndicator={false}>
                <RadioButton.Group value={selectedOption?.uhid} onValueChange={handleOptionChange}>
                  {filteredOptions?.map((option, index) => (
                    <RadioButton.Item
                      mode="android"
                      label={option?.uhid}
                      value={option.uhid}
                      position="leading"
                      key={index}
                      labelStyle={[
                        styles.selectedRadioText,
                        {
                          color:
                            selectedOption?.uhid == option?.uhid ||
                            filterValues.includes(option?.uhid)
                              ? COLORS.background.primary
                              : COLORS.text,
                        },
                      ]}
                      color={
                        selectedOption?.uhid == option?.uhid || filterValues.includes(option?.uhid)
                          ? COLORS.background.primary
                          : COLORS.text
                      }
                    />
                  ))}
                </RadioButton.Group>
              </ScrollView>
            </Box>
          </Box>
        ) : selectedTab === strings.displayText.date ? (
          <Box style={{ flex: 1 }} marginTop={10}>
            <ScrollView style={{ maxHeight: 150 }} showsVerticalScrollIndicator={false}>
              <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption.date}>
                {dateRangeFilteredOptions?.map((option, index) => (
                  <RadioButton.Item
                    label={option}
                    value={option}
                    mode="android"
                    position="leading"
                    key={index}
                    labelStyle={[
                      styles.selectedRadioText,
                      {
                        color:
                          selectedOption.date === option || filterValues.includes(option)
                            ? COLORS.background.primary
                            : COLORS.text,
                      },
                    ]}
                    color={
                      selectedOption.date === option || filterValues.includes(option)
                        ? COLORS.background.primary
                        : COLORS.text
                    }
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Box>
        ) : (
          <Box style={{ flex: 1 }}>
            <ScrollView style={{ maxHeight: 150 }} showsVerticalScrollIndicator={false}>
              <RadioButton.Group value={selectedOption.ipNo} onValueChange={handleOptionChange}>
                {filteredOptions?.map((option, index) => (
                  <RadioButton.Item
                    label={option?.ip_no}
                    value={option.ip_no}
                    mode="android"
                    position="leading"
                    key={index}
                    labelStyle={[
                      styles.selectedRadioText,
                      {
                        color:
                          selectedOption?.ipNo == option?.ip_no ||
                          filterValues.includes(option?.ip_no)
                            ? COLORS.background.primary
                            : COLORS.text,
                      },
                    ]}
                    color={
                      selectedOption?.ipNo == option?.ip_no || filterValues.includes(option.ip_no)
                        ? COLORS.background.primary
                        : COLORS.text
                    }
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Box>
        )}
      </Box>

      <Box style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={() => {
            setEmptyData();
            onClearFilter();
          }}
          buttonStyle={styles.clearBtnStyle}
          textStyle={styles.clearTxtStyle}
        >
          {strings.displayText.clearAll}
        </AbstractButton>
        <AbstractButton
          onPress={handleApply}
          buttonStyle={styles.applyBtnStyle}
          textStyle={styles.applyTxtStyle}
        >
          {strings.displayText.apply}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    marginTop: 10,
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    width: '45%',
    height: 45,
  },
  clearBtnStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.background.primary,
    borderWidth: 1,
    borderRadius: 10,
    width: '45%',
    height: 45,
  },
  applyTxtStyle: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
  clearTxtStyle: { color: COLORS.text, fontSize: 12, fontWeight: '600' },
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
    width: SIZES.screenWidth * 0.55,
    height: 40,
    marginVertical: 5,
    backgroundColor: 'white',
    fontSize: 14,
  },
  selectedRadioText: {
    // color: COLORS.background.primary,
    fontSize: 14,
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
    backgroundColor: '#EFEFEF',
  },
  boxRadioStyle: {
    flex: 1,
    width: 250,
  },
});
