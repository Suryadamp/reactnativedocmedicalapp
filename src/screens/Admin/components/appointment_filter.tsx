// Admin - Appointment Filter
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput, RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { RootState } from '../../../state';
import { AbstractButton, Box } from '../../../components';
import { COLORS, FONTS } from '../../../constants';
import { strings } from '../../../i18n';
import { isHpTablet } from '../../../hooks/useDeviceCheck';
import { customLogger } from '../../../components/CustomLogger';
import { useNavigation } from '@react-navigation/native';

export const AppointmentFilterBottomSheet: React.FC<any> = ({ onClearFilter, onApplyFilter }) => {
  const { doctorsList } = useSelector((state: RootState) => state.doctors);
  const { patientList } = useSelector((state: RootState) => state.patients);

  const dateRangeOptions = [
    strings.displayText.last1Month,
    strings.displayText.last6Month,
    strings.displayText.last1Year,
    // strings.displayText.custom,
  ];
  const selectOptions = [
    strings.displayText.doctor,
    strings.displayText.patient,
    strings.displayText.date,
  ];
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(strings.displayText.doctor);
  const [filteredOptions, setFilterOptions] = useState(doctorsList[0].data);
  const [selectedOption, setSelectedOption] = useState({
    doctor: null,
    patient: null,
    date: null,
  });
  const [filterText, setFilterText] = useState('');
  const [dateRangeFilterText] = useState('');

  const handleTabClick = (tabName: string) => {
    if (tabName === strings.displayText.doctor) {
      setFilterOptions(doctorsList[0].data);
    } else if (tabName === strings.displayText.patient) {
      setFilterOptions(patientList);
    } else if (tabName === strings.displayText.appointmentDate) {
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
    if (selectedTab === strings.displayText.doctor) {
      setSelectedOption({
        doctor: value,
        patient: null,
        date: null,
      });
    } else if (selectedTab === strings.displayText.patient) {
      setSelectedOption({
        doctor: null,
        patient: value,
        date: null,
      });
    } else if (selectedTab === strings.displayText.date) {
      setSelectedOption({
        doctor: null,
        patient: null,
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

  const handleSearch = async (type: string) => {
    if (type === 'patient') {
      setFilterOptions(
        patientList.filter((patient) =>
          patient.name.toLowerCase().includes(filterText.toLowerCase()),
        ),
      );
    } else if (type === 'doctor') {
      setFilterOptions(
        doctorsList[0].data.filter((doctor) =>
          doctor.name.toLowerCase().includes(filterText.toLowerCase()),
        ),
      );
    }
  };

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
        {selectedTab === strings.displayText.doctor ? (
          <Box style={{ flex: 1 }}>
            {/* <Box marginLeft={20}>
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
                onSubmitEditing={() => handleSearch('doctor')}
              />
            </Box> */}
            <Box>
              <ScrollView style={{ maxHeight: '100%' }} showsVerticalScrollIndicator={false}>
                <RadioButton.Group value={selectedOption.doctor} onValueChange={handleOptionChange}>
                  {filteredOptions?.map((option, index) => (
                    <RadioButton.Item
                      mode="android"
                      label={option?.name}
                      value={option}
                      position="leading"
                      key={index}
                      labelStyle={[
                        styles.selectedRadioText,
                        {
                          color:
                            selectedOption?.doctor?.id == option?.id
                              ? COLORS.background.primary
                              : COLORS.text,
                        },
                      ]}
                      color={
                        selectedOption?.doctor?.id == option?.id
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
            <ScrollView style={{ maxHeight: '100%' }} showsVerticalScrollIndicator={false}>
              <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption.date}>
                {dateRangeFilteredOptions?.map((option, index) => (
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
                          selectedOption.date === option ? COLORS.background.primary : COLORS.text,
                      },
                    ]}
                    color={selectedOption.date === option ? COLORS.background.primary : COLORS.text}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Box>
        ) : (
          <Box style={{ flex: 1 }}>
            {/* <Box marginLeft={20}>
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
                onSubmitEditing={() => handleSearch('patient')}
              />
            </Box> */}
            <Box>
              <ScrollView style={{ maxHeight: '100%' }} showsVerticalScrollIndicator={false}>
                <RadioButton.Group
                  value={selectedOption.patient}
                  onValueChange={handleOptionChange}
                >
                  {filteredOptions?.map((option, index) => (
                    <RadioButton.Item
                      mode="android"
                      label={option?.name}
                      value={option}
                      position="leading"
                      key={index}
                      labelStyle={[
                        styles.selectedRadioText,
                        {
                          color:
                            selectedOption?.patient?.id == option?.id
                              ? COLORS.background.primary
                              : COLORS.text,
                        },
                      ]}
                      color={
                        selectedOption?.patient?.id == option?.id
                          ? COLORS.background.primary
                          : COLORS.text
                      }
                    />
                  ))}
                </RadioButton.Group>
              </ScrollView>
            </Box>
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

export default AppointmentFilterBottomSheet;

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
    height: isHpTablet('35%'),
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
    // width: isWpTablet('90%'),
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
