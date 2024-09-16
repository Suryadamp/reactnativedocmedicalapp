import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AbstractButton, Box } from '../../components';
import { COLORS, FONTS, SIZES, assets } from '../../constants';
import { ICustomFilterBottomSheetProps } from '../../@types/components';
import { Calendar } from 'react-native-calendars';
import { strings } from '../../i18n';
import styles from '../../styles/component_styles/CalenderBottomSheet.styles';

type Day = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

interface CustomCalenderBottomSheetProps extends ICustomFilterBottomSheetProps {
  onDateSelected?: (startDate: string, endDate: string) => void;
}

const CustomCalenderBottomSheet: React.FC<CustomCalenderBottomSheetProps> = ({
  handleClosePress,
  handleSelectedFilterType,
  handleParentClosePress,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const handleApply = () => {
    const selectedDateRange = {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    };
    handleSelectedFilterType?.(selectedDateRange);
    setSelectedStartDate('');
    setSelectedEndDate('');
    handleParentClosePress?.();
  };

  const handleDayPress = (day: Day) => {
    if (!selectedStartDate) {
      // Selecting the start date
      setSelectedStartDate(day?.dateString);
      setSelectedEndDate(''); // Reset end date
    } else if (day.dateString < selectedStartDate) {
      // Selecting a date before the start date, swap start and end dates
      setSelectedEndDate(selectedStartDate);
      setSelectedStartDate(day?.dateString);
    } else {
      // Selecting the end date
      setSelectedEndDate(day?.dateString);
    }
  };

  const getDatesBetween = (start: string, end: string) => {
    const result = [];
    let currentDate = new Date(start);

    // Increment currentDate by 1 day to avoid adding the start date
    currentDate.setDate(currentDate.getDate() + 1);

    while (currentDate < new Date(end)) {
      result.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.boxStyle}>
        <Calendar
          onDayPress={handleDayPress}
          markingType="period"
          markedDates={{
            [selectedStartDate]: {
              startingDay: true,
              selected: true,
              color: COLORS.background.primary,
              textColor: COLORS.background.white,
            },
            [selectedEndDate]: {
              endingDay: true,
              selected: true,
              color: COLORS.background.primary,
              textColor: COLORS.background.white,
            },
            ...getDatesBetween(selectedStartDate, selectedEndDate).reduce(
              (acc, date) => ({
                ...acc,
                [date]: { color: COLORS.ligth_shade_blue },
              }),
              {},
            ),
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
      <Box style={styles.buttonBoxContainer}>
        <AbstractButton
          onPress={() => {
            handleApply?.();
            handleClosePress?.();
          }}
          disabled={!selectedStartDate || !selectedEndDate}
          buttonStyle={styles.applyBtnStyle}
          textStyle={styles.applyTxtStyle}
        >
          {strings.displayText.apply}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default CustomCalenderBottomSheet;
