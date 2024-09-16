import React, { useState } from 'react';
import { AbstractButton, Box } from '../../components';
import { COLORS } from '../../constants';
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

const CustomDateBottomSheet: React.FC<ICustomFilterBottomSheetProps> = ({
  handleClosePress,
  handleSelectedFilterType,
}) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate.toISOString().split('T')[0]);

  const handleApply = () => {
    handleSelectedFilterType?.(selectedDate);
    setSelectedDate('');
  };

  const handleDayPress = (day: Day) => {
    setSelectedDate(day?.dateString);
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.boxStyle}>
        <Calendar
          onDayPress={handleDayPress}
          //   markingType="period"
          markedDates={{
            [selectedDate]: {
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
      <Box style={styles.buttonBoxContainer}>
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
  );
};

export default CustomDateBottomSheet;
