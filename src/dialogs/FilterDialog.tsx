import React, { useEffect, useState } from 'react';
import { Image, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Box } from '../components';
import { COLORS, FONTS, SIZES, assets } from '../constants';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';

const FiltertDialog = ({ visible, onClose, callback, closeDialog }) => {
  const [selectedFilterOption, setSelectedFilterOption] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    handleConfirm(new Date());
    handleEndDateConfirm(new Date());
  }, []);

  const onPress = (values: React.SetStateAction<string>) => {
    setSelectedFilterOption(values);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: string | number | Date) => {
    if (date instanceof Date) {
      const dateString = date.toISOString().split('T')[0]; // Extract date portion
      setStartDate(dateString);
    } else {
      const convertedDate = new Date(date);
      const dateString = convertedDate.toISOString().split('T')[0]; // Extract date portion
      setStartDate(dateString);
    }
    hideDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date: string | number | Date) => {
    if (date instanceof Date) {
      const dateString = date.toISOString().split('T')[0]; // Extract date portion
      setEndDate(dateString);
    } else {
      const convertedDate = new Date(date);
      const dateString = convertedDate.toISOString().split('T')[0]; // Extract date portion
      setEndDate(dateString);
    }
    hideEndDatePicker();
  };

  const callbackData = {
    option: selectedFilterOption,
    startDate: startDate,
    endDate: endDate,
  };

  const handleSubmit = () => {
    callback(callbackData);
  };

  const close = () => {
    closeDialog();
  };

  return (
    <View style={styles.centeredView}>
      <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Box style={styles.container}>
            <Box style={styles.dialog}>
              <RadioButton.Group onValueChange={onPress} value={selectedFilterOption}>
                <Box>
                  <RadioButton.Item
                    label="Today"
                    value="option1"
                    color={COLORS.radioGreen}
                    labelStyle={
                      (selectedFilterOption === 'option1' && styles.selectedRadioText) || styles.radioText
                    }
                    position="leading"
                  />
                  <RadioButton.Item
                    label="All"
                    value="option2"
                    color={COLORS.radioGreen}
                    labelStyle={
                      (selectedFilterOption === 'option2' && styles.selectedRadioText) || styles.radioText
                    }
                    position="leading"
                  />
                  <RadioButton.Item
                    label="Custom"
                    value="option3"
                    color={COLORS.radioGreen}
                    labelStyle={
                      (selectedFilterOption === 'option3' && styles.selectedRadioText) || styles.radioText
                    }
                    position="leading"
                  />
                </Box>
              </RadioButton.Group>
              {selectedFilterOption === 'option3' && (
                <Box style={{ flexDirection: 'row', marginStart: 55, paddingEnd: 20, right: 10 }}>
                  <Box>
                    <Text style={{ color: COLORS.black }}>From</Text>
                    <TouchableOpacity style={styles.dateContainer} onPress={showDatePicker}>
                      <Image source={assets.CalendarIcon} style={{ height: 20, width: 20 }} />
                      <Text style={{ marginStart: 5 }}>{startDate}</Text>
                    </TouchableOpacity>
                  </Box>
                  <Box style={{ marginStart: 10, marginEnd: 20 }}>
                    <Text style={{ color: COLORS.black }}>To</Text>
                    <TouchableOpacity style={styles.dateContainer} onPress={showEndDatePicker}>
                      <Image source={assets.CalendarIcon} style={{ height: 20, width: 20 }} />
                      <Text style={{ marginStart: 5 }}>{endDate}</Text>
                    </TouchableOpacity>
                  </Box>
                </Box>
              )}
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date()}
              />
              <DateTimePicker
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={handleEndDateConfirm}
                onCancel={hideEndDatePicker}
                maximumDate={new Date()}
              />
              <Box style={styles.btnContainer}>
                <Box style={styles.bookSlotBtn}>
                  <TouchableOpacity activeOpacity={0.5} onPress={close}>
                    <Box>
                      <Text style={styles.bookSlotBtnText}>Cancel</Text>
                    </Box>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
                    <Box>
                      <Text style={[styles.bookSlotBtnText, { marginStart: 20 }]}>Submit</Text>
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = {
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    paddingBottom: 20,
    paddingTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    borderColor: COLORS.gray,
    borderWidth: 2,
    borderRadius: 6,
    padding: 3,
    shadowOffset: 6,
    shadowColor: COLORS.gray,
    shadowOpacity: 6,
    shadowRadius: 6,
    marginTop: 10,
  },
  selectedRadioText: {
    color: COLORS.background.primary,
    position: 'absolute',
    left: 55,
  },
  radioText: {
    color: COLORS.greyText,
    position: 'absolute',
    left: 55,
  },
  optionThree: { flexDirection: 'row', marginStart: 55, paddingEnd: 20, right: 10 },
  calendarIcon: { height: 20, width: 20 },
  toContainer: { marginStart: 10, marginEnd: 20 },
  calendarText: { marginStart: 5 },
  btnContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 20,
  },
  bookSlotBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bookSlotBtnText: {
    fontFamily: FONTS.SFProDisplayRegular,
    fontSize: 13,
    color: COLORS.background.primary,
    textAlign: 'center',
    backgroundColor: COLORS.grey,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
};

export default FiltertDialog;
