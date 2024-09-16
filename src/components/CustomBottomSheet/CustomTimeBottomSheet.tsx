import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AbstractButton, Box } from '..';
import { COLORS, FONTS, assets } from '../../constants';
import { ICustomFilterBottomSheetProps } from '../../@types/components';
import { strings } from '../../i18n';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import styles from '../../styles/component_styles/CustomPrescriptionBottomSheet.styles';

const amPm = ['AM', 'PM'];
const hours12ListWithMinutes = Array.from({ length: 12 * 60 }, (_, index) => {
  const hour = Math.floor(index / 60);
  const minute = index % 60;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

function timeToMinutes(time: any, type?: string) {
  // Check if time contains AM or PM
  const isAM = time.includes('AM');
  const isPM = time.includes('PM');

  if (type) {
    return isPM ? 1 : 0;
  }

  // Split the time into hours, minutes, and AM/PM
  const [rawTime, period] = time.split(' ');
  const [hours, minutes] = rawTime.split(':').map(Number);
  return hours * 60 + minutes;
}

const CustomTimeBottomSheet: React.FC<ICustomFilterBottomSheetProps> = ({
  value,
  title,
  handleClosePress,
  handleSelectedFilterType,
}) => {
  const [selectedDuration, setSelectedDuration] = useState('9:00');
  const [selecteddayWeek, setSelecteddayWeek] = useState('AM');
  const [selectDurationIndex, setSelectDurationIndex] = useState(timeToMinutes(value));
  const [selectDayWeekIndex, setSelectDayWeekIndex] = useState(timeToMinutes(value, 'ampm'));

  const handleApply = () => {
    const data = {
      time_count: { label: selectedDuration, value: selectDurationIndex },
      interval: { label: selecteddayWeek, value: selectDayWeekIndex },
    };
    handleSelectedFilterType?.({
      value: selectedDuration + ' ' + selecteddayWeek,
      data,
    });
    handleClosePress?.();
  };

  return (
    <Box style={styles.container}>
      <Box display="flex" justifyContent="center" flexDirection="row" marginTop={20}>
        <Box style={styles.timeDayweekBox}>
          <ScrollPicker
            dataSource={hours12ListWithMinutes}
            selectedIndex={selectDurationIndex}
            renderItem={(data, index) => {
              // Customize the rendering of each item if needed
              return (
                <Text
                  key={index.toLocaleString()}
                  style={{
                    color: selectDurationIndex === index ? COLORS.black : COLORS.shade_grey,
                  }}
                >
                  {data}
                </Text>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              setSelectDurationIndex(selectedIndex);
              setSelectedDuration(data);
            }}
            wrapperHeight={styles.scrollPickerStyles.height}
            wrapperBackground={COLORS.background.white}
            itemHeight={styles.scrollPickerStyles.itemHeight}
            highlightColor={COLORS.background.primary}
            highlightBorderWidth={styles.scrollPickerStyles.highlightBorderWidth}
          />
        </Box>
        <Box style={styles.timeNumberBox}>
          <ScrollPicker
            dataSource={amPm}
            selectedIndex={selectDayWeekIndex}
            renderItem={(data, index) => {
              // Customize the rendering of each item if needed
              return (
                <Text
                  key={index.toLocaleString()}
                  style={{ color: selectDayWeekIndex === index ? COLORS.black : COLORS.shade_grey }}
                >
                  {data}
                </Text>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              setSelectDayWeekIndex(selectedIndex);
              setSelecteddayWeek(data);
            }}
            wrapperHeight={styles.scrollPickerStyles.height}
            wrapperBackground={COLORS.background.white}
            itemHeight={styles.scrollPickerStyles.itemHeight}
            highlightColor={COLORS.background.primary}
            highlightBorderWidth={styles.scrollPickerStyles.highlightBorderWidth}
          />
        </Box>
      </Box>

      <Box style={styles.advanceButtonBoxContainer}>
        <AbstractButton
          onPress={() => {
            handleApply?.();
          }}
          buttonStyle={styles.advanceApplyBtnStyle}
          textStyle={styles.applyTxtStyle}
        >
          {strings.displayText.apply}
        </AbstractButton>
      </Box>
    </Box>
  );
};

export default CustomTimeBottomSheet;
