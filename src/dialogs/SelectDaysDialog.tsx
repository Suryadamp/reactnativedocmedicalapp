import React, { useState } from 'react';
import { Text, Modal, TouchableOpacity } from 'react-native';
import { Box } from '../components';
import { COLORS, FONTS, SIZES } from '../constants';
import { TextInput } from 'react-native-paper';
import { showSnackBar } from '../util/AlertUtil';

const DaysWeeks = [
  {
    value: '1',
    name: 'Weeks',
  },
  {
    value: '2',
    name: 'Days',
  },
  {
    value: '3',
    name: 'Year',
  },
];

interface DaysWeek {
  value?: string;
  name: string;
}

const Days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'St'];

const SelectDaystDialog = ({ visible, title, onClose, result }) => {
  const [isDaysWeeksFocus, setDaysWeeksFocus] = useState(false);
  const [selecteddayWeekItem, setSelectedDayWeekItem] = useState<DaysWeek | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);
  const [days, setDays] = useState(0);
  const [inputDays, setInputDays] = useState<string>('');

  const renderFoodLabel = () => {
    return (
      <Text
        style={[styles.daysWeekLable, isDaysWeeksFocus && { color: COLORS.background.primary }]}
      >
        Select
      </Text>
    );
  };

  const handleSelectSlot = (slot: string) => {
    const selectedIndex = selectedDay.indexOf(slot);
    let newSelectedItems = [];
    if (selectedIndex === -1) {
      newSelectedItems = [...selectedDay, slot];
    } else {
      selectedDay.splice(selectedIndex, 1);
      newSelectedItems = [...selectedDay];
    }
    setSelectedDay(newSelectedItems);
  };

  const addDays = () => {
    setDays(days + 1);
  };

  const removeDays = () => {
    if (days > 0) {
      setDays(days - 1);
    }
  };

  const setResult = () => {
    const data = {
      specific_days: selectedDay,
      interval_days: days,
      duration_count: inputDays,
      interval: selecteddayWeekItem?.value,
    };
    if (parseInt(inputDays, 10) > 0) {
      if (title === 'Select Days') {
        if (inputDays) {
          result({
            value: inputDays + ' ' + selecteddayWeekItem?.name,
            data: data,
          });
        } else {
          showAlert();
        }
      } else if (title === 'Pick Days') {
        if (selectedDay && inputDays && selecteddayWeekItem) {
          result({
            value: selectedDay.join(',') + ' - ' + inputDays + ' ' + selecteddayWeekItem?.name,
            data: data,
          });
        } else {
          showAlert();
        }
      } else if (title === 'Interval Days') {
        if (days && inputDays && selecteddayWeekItem) {
          result({
            value:
              'Every ' + ' ' + days + ' days' + ' - ' + inputDays + ' ' + selecteddayWeekItem?.name,
            data: data,
          });
        } else {
          showAlert();
        }
      }
    } else {
      showAlert();
    }
  };

  const showAlert = () => {
    showSnackBar('Please enter all the fields');
  };

  const closeAndRemoveData = () => {
    const data = {
      specific_days: [],
      interval_days: '',
      duration_count: '',
      interval: '',
    };
    result({
      value: '',
      data: data,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <Box style={styles.container}>
        <Box style={styles.dialog}>
          <Text style={styles.title}>{title}</Text>
          {title === 'Interval Days' && (
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              marginHorizontal={30}
              marginTop={20}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  removeDays();
                }}
              >
                <Box
                  width={25}
                  height={25}
                  backgroundColor={COLORS.gray}
                  borderRadius={12.5}
                  alignItems="center"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Text>-</Text>
                </Box>
              </TouchableOpacity>
              <Text style={styles.textStyle}>Every</Text>
              <Box
                borderColor={COLORS.background.primary}
                borderRadius={6}
                borderWidth={1}
                alignItems="center"
                alignContent="center"
                justifyContent="center"
                paddingHorizontal={10}
                paddingVertical={2}
              >
                <Text style={styles.textStyle}>{days}</Text>
              </Box>
              <Text style={styles.textStyle}>Days</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  addDays();
                }}
              >
                <Box
                  width={25}
                  height={25}
                  backgroundColor={COLORS.background.primary}
                  borderRadius={12.5}
                  alignItems="center"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Text>+</Text>
                </Box>
              </TouchableOpacity>
            </Box>
          )}
          {title === 'Pick Days' && (
            <Box
              flexDirection="row"
              flexWrap={'wrap'}
              marginHorizontal={15}
              alignItems={'center'}
              marginTop={20}
            >
              {[...Array(Days.length)].map((ele, index) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      handleSelectSlot(Days[index]);
                    }}
                  >
                    <Box
                      key={index.toString()}
                      style={
                        selectedDay.find((item) => item === Days[index]) != null
                          ? styles.selectedDaysBox
                          : styles.daysBox
                      }
                    >
                      <Text
                        style={
                          selectedDay.find((item) => item === Days[index]) != null
                            ? styles.selectedDaysBoxText
                            : styles.daysBoxText
                        }
                      >
                        {Days[index]}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </Box>
          )}
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginHorizontal={30}
            marginTop={20}
          >
            <Text style={styles.textStyle}>Duration</Text>
            <TextInput
              mode="outlined"
              placeholderTextColor={'grey'}
              placeholder={'0'}
              keyboardType="numeric"
              value={inputDays}
              onChangeText={(val) => setInputDays(val)}
              style={styles.dosageInputTxt}
              outlineColor={COLORS.background.primary}
              activeOutlineColor={COLORS.background.primary}
              theme={{
                colors: {
                  primary: COLORS.gray,
                  underlineColor: 'transparent',
                  background: COLORS.background.secondary,
                },
                roundness: 5,
              }}
            />
            <Box width={SIZES.screenWidth * 0.28} marginTop={5}>
              {renderFoodLabel()}
              {/* <Dropdown
                style={[styles.foodDropdown, { borderColor: COLORS.background.primary }]}
                placeholderStyle={styles.foodplaceholderStyle}
                selectedTextStyle={styles.selectedFoodTextStyle}
                itemTextStyle={styles.selectedFoodTextStyle}
                iconStyle={styles.iconFoodStyle}
                data={DaysWeeks}
                valueField={'name'}
                placeholder={!isDaysWeeksFocus ? 'Select' : '...'}
                value={selecteddayWeekItem}
                onFocus={() => setDaysWeeksFocus(true)}
                onBlur={() => setDaysWeeksFocus(false)}
                onChange={(item) => {
                  setSelectedDayWeekItem(item);
                  setDaysWeeksFocus(false);
                }}
                labelField={'name'}
              /> */}
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            marginHorizontal={30}
            marginTop={20}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                closeAndRemoveData();
              }}
            >
              <Text style={styles.textButton}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginStart: 20 }}
              activeOpacity={0.8}
              onPress={() => {
                setResult();
              }}
            >
              <Text style={styles.textButton}>SET</Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '80%',
    paddingBottom: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 15,
    paddingVertical: 13,
    paddingHorizontal: 10,
    backgroundColor: COLORS.background.primary,
    color: COLORS.white,
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: COLORS.background.primary,
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  circleMinus: {
    flex: 1,
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 12.5,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  DaysContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  textStyle: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: SIZES.small,
    color: COLORS.black,
    marginTop: 2,
  },
  daysWeekLable: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 6,
    top: -5,
    paddingStart: 5,
    paddingEnd: 5,
    paddingHorizontal: 1,
    zIndex: 999,
    fontSize: 9,
    color: COLORS.text,
  },
  foodDropdown: {
    height: 35,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    padding: 11,
    margin: 3,
  },
  foodplaceholderStyle: {
    fontSize: SIZES.small,
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  selectedFoodTextStyle: {
    fontSize: SIZES.small,
  },
  iconFoodStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    height: 15,
    width: 20,
  },
  textButton: {
    color: COLORS.background.primary,
    fontSize: 12,
    fontFamily: FONTS.SFProDisplayRegular,
  },
  daysContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    flexWrap: 'wrap',
    marginHorizontal: 15,
    alignItems: 'center',
  },
  daysTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 20,
  },
  daysBoxText: {
    fontSize: SIZES.extraSmall,
    color: COLORS.placeHolder,
  },
  selectedDaysBoxText: {
    fontSize: SIZES.extraSmall,
    color: COLORS.white,
  },
  daysBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.background.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  selectedDaysBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: COLORS.background.primary,
    borderColor: COLORS.background.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dosageInputTxt: {
    backgroundColor: 'white',
    fontSize: SIZES.small,
    height: 30,
    maxWidth: 70,
    textAlign: 'center',
  },
};

export default SelectDaystDialog;
