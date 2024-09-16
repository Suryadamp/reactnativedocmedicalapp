import { Text, TouchableOpacity, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { TextInput, RadioButton } from 'react-native-paper';
import { AbstractButton, Box } from '../../components';
import { COLORS, FONTS, SIZES } from '../../constants';
import { ICustomFilterBottomSheetProps } from '../../@types/components';
import { ScrollView } from 'react-native-gesture-handler';
import { getCurrentDateSlash } from '../../util/DateUtil';
import { strings } from '../../i18n';
import styles from '../../styles/Laboratory.styles';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { customLogger } from '../../components/CustomLogger';
import { useNavigation } from '@react-navigation/native';
const LabFilterBottomSheet: React.FC<ICustomFilterBottomSheetProps> = ({
  handleClosePress,
  handleSelectedFilterType,
  data,
}) => {
  const dateRangeOptions = [
    strings.displayText.today,
    strings.displayText.last1Month,
    strings.displayText.last6Month,
    strings.displayText.last1Year,
    strings.displayText.custom,
  ];
  const navigation = useNavigation();
  const selectOptions = [strings.displayText.date];
  const [selectedTab, setSelectedTab] = useState(strings.displayText.date);
  const [selectedOption, setSelectedOption] = useState({
    testData: '',
    date: '',
    dateRange: '',
  });
  const [filterText, setFilterText] = useState('');
  const [dateRangeFilterText] = useState('');
  const [currentdate] = useState(getCurrentDateSlash());
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

  const handleTabClick = (tabName: any) => {
    setSelectedTab(tabName);
  };

  const handleApply = () => {
    handleSelectedFilterType?.(selectedOption);
    handleLogs();
  };

  const setEmptyData = () => {
    setSelectedOption({
      testData: '',
      date: '',
      dateRange: '',
    });
  };

  const handleOptionChange = (value: any) => {
    if (selectedTab === strings.displayText.all) {
      setSelectedOption({
        ...selectedOption,
        testData: value,
        date: selectedOption.date,
        dateRange: selectedOption.dateRange,
      });
    } else if (selectedTab === strings.displayText.today) {
      setSelectedOption({
        ...selectedOption,
        testData: selectedOption.testData,
        date: value,
        dateRange: selectedOption.dateRange,
      });
    } else if (selectedTab === strings.displayText.date) {
      setSelectedOption({
        ...selectedOption,
        testData: selectedOption.testData,
        date: selectedOption.date,
        dateRange: value,
      });
    }
  };

  // Filter the options based on the filterText
  const filteredOptions = data?.filter((option: any) =>
    option?.name?.toLowerCase().includes(filterText.toLowerCase()),
  );

  const dateRangeFilteredOptions = dateRangeOptions.filter((option) =>
    option.toLowerCase().includes(dateRangeFilterText.toLowerCase()),
  );

  const renderTab = (tabName: any) => {
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

  const handleLogs = () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    customLogger('event', routeName, selectedOption, 'Radio Button');
  };

  return (
    <>
      <Box style={styles.labBottomContainer}>
        <Box style={styles.boxStyle}>
          <Box style={styles.tabNameStyle}>
            <Box>{selectOptions?.map((tabName) => renderTab(tabName))}</Box>
            <Box>
              <Box style={styles.dividerStyle} />
            </Box>
          </Box>

          {selectedTab === strings.displayText.date ? (
            <Box style={{ flex: 1 }} marginTop={10}>
              <ScrollView style={{ maxHeight: 150 }} showsVerticalScrollIndicator={false}>
                <RadioButton.Group
                  onValueChange={handleOptionChange}
                  value={selectedOption.dateRange}
                >
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
                            selectedOption.dateRange === option
                              ? COLORS.background.primary
                              : COLORS.text,
                        },
                      ]}
                      color={
                        selectedOption.dateRange === option
                          ? COLORS.background.primary
                          : COLORS.text
                      }
                    />
                  ))}
                </RadioButton.Group>
              </ScrollView>
            </Box>
          ) : (
            <Box>
              <Box style={styles.boxRadioStyle}>
                <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
                  <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption.date}>
                    {selectOptions?.map((option, index) =>
                      option === selectedTab ? (
                        <RadioButton.Item
                          mode="android"
                          label={currentdate}
                          value={currentdate}
                          position="leading"
                          key={index}
                          labelStyle={[
                            styles.selectedRadioText,
                            {
                              color:
                                selectedOption.date === option
                                  ? COLORS.background.primary
                                  : COLORS.text,
                            },
                          ]}
                          color={
                            selectedOption.date === option ? COLORS.background.primary : COLORS.text
                          }
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
              setEmptyData;
              handleSelectedFilterType?.(strings.displayText.all);
              handleClosePress?.();
            }}
            buttonStyle={styles.clearBtnStyle}
            textStyle={styles.clearTxtStyle}
          >
            {strings.displayText.clearAll}
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
    </>
  );
};

export default LabFilterBottomSheet;

// const styles = StyleSheet.create({
//   container: {
//     // height: '100%',
//     justifyContent: 'center',
//     // marginTop: 10,
//   },
//   buttonBoxContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   boxStyle: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     height: 250,
//   },
//   centerColumnBox: { flexDirection: 'column', alignItems: 'center' },
//   applyBtnStyle: {
//     backgroundColor: COLORS.background.primary,
//     borderRadius: 10,
//     width: '45%',
//     height: 45,
//   },
//   clearBtnStyle: {
//     backgroundColor: COLORS.white,
//     borderColor: COLORS.background.primary,
//     borderWidth: 1,
//     borderRadius: 10,
//     width: '45%',
//     height: 45,
//   },
//   applyTxtStyle: { color: COLORS.white, fontSize: 12, fontWeight: '600' },
//   clearTxtStyle: { color: COLORS.text, fontSize: 12, fontWeight: '600' },
//   divider: {
//     borderBottomWidth: 1,
//     borderColor: COLORS.grey_E5E5E5,
//     marginTop: 10,
//   },
//   textStyle: {
//     width: 100,
//     height: 40,
//   },
//   selectedBox: {
//     backgroundColor: '#C7DEFF',
//   },
//   normalBox: {
//     backgroundColor: COLORS.white,
//   },
//   selectedText: {
//     fontSize: 12,
//     fontWeight: '500',
//     marginTop: 10,
//     marginLeft: 20,
//     color: COLORS.background.primary,
//   },
//   normalText: {
//     fontSize: 12,
//     fontWeight: '500',
//     marginTop: 10,
//     marginLeft: 20,
//     color: COLORS.text,
//   },
//   dosageInputTxt: {
//     width: SIZES.screenWidth * 0.55,
//     height: 46,
//     marginVertical: 5,
//     backgroundColor: 'white',
//     fontSize: 14,
//   },
//   selectedRadioText: {
//     // color: COLORS.background.primary,
//     fontSize: 14,
//     position: 'absolute',
//     left: 55,
//   },
//   tabNameStyle: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   dividerStyle: {
//     height: '90%',
//     width: 1,
//     backgroundColor: '#EFEFEF',
//   },
//   boxRadioStyle: {
//     flex: 1,
//     width: 250,
//   },
// });
