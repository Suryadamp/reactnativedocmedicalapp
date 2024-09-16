// DateTimeBottomSheet
import React, { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { Calendar } from 'react-native-calendars';

import { AbstractButton, Box } from '../../components';
import { COLORS } from '../../constants';
import { strings } from '../../i18n';
import styles from '../../styles/component_styles/CalenderBottomSheet.styles';

type Day = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

interface IDateTimeBottomSheet {
  onChange: (date: string) => void;
}

const DateTimeBottomSheet: React.FC<IDateTimeBottomSheet> = ({ onChange }) => {
  const currentDate = moment();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handleApply = () => {
    onChange(selectedDate.format('DD/MM/YYYY h:mm:ss A'));
  };

  const handleDayPress = (day: Day) => {
    setSelectedDate(moment(day.dateString));
    setTimePickerVisible(true);
  };

  const handleTimeConfirm = (selectedTime: Date) => {
    // Handle the selected time here
    setTimePickerVisible(false);
    setSelectedDate((prevDate) =>
      moment(prevDate).set({
        hour: selectedTime.getHours(),
        minute: selectedTime.getMinutes(),
        second: selectedTime.getSeconds(),
      }),
    );
  };

  const handleTimeCancel = () => {
    setTimePickerVisible(false);
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.boxStyle}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate.format('YYYY-MM-DD')]: {
              selected: true,
              color: COLORS.background.primary,
              textColor: COLORS.background.white,
            },
          }}
          theme={{
            backgroundColor: COLORS.background.white,
            calendarBackground: COLORS.background.white,
            textSectionTitleColor: COLORS.background.primary,
            selectedDayBackgroundColor: COLORS.background.primary,
            selectedDayTextColor: COLORS.background.white,
            todayTextColor: COLORS.background.primary,
            dayTextColor: COLORS.text,
          }}
        />
      </Box>

      <DateTimePickerModal
        date={selectedDate.toDate()}
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={handleTimeCancel}
      />

      <Box style={styles.buttonBoxContainer}>
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

export default DateTimeBottomSheet;
